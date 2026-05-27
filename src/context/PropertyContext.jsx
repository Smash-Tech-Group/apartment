import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from 'react';
import { BASE_URL } from '../lib/api';

// Import amenity images
import wifi from "../assets/wifi.svg";
import airCondition from "../assets/air.svg";
import parking from "../assets/parking.svg";
import tv from "../assets/tv.svg";
import pool from "../assets/swim.svg";
import wash from "../assets/wash.svg";

// Fallback images for properties that have no photos
import house1 from "../assets/house1.webp";
import house2 from "../assets/house2.webp";
import house3 from "../assets/house3.webp";

const PropertyContext = createContext();

export const useProperty = () => {
  const context = useContext(PropertyContext);
  if (!context) {
    throw new Error('useProperty must be used within a PropertyProvider');
  }
  return context;
};

// Helper: turn a backend created_at into "Posted X ago"
function timeAgo(dateStr) {
  const now = new Date();
  const created = new Date(dateStr);
  const diffMs = now - created;
  const diffDays = Math.floor(diffMs / (1000 * 60 * 60 * 24));

  if (diffDays < 1) return 'Posted today';
  if (diffDays === 1) return 'Posted 1 day ago';
  if (diffDays < 7) return `Posted ${diffDays} days ago`;
  if (diffDays < 30) {
    const weeks = Math.floor(diffDays / 7);
    return `Posted ${weeks} week${weeks > 1 ? 's' : ''} ago`;
  }
  const months = Math.floor(diffDays / 30);
  return `Posted ${months} month${months > 1 ? 's' : ''} ago`;
}

// Transform a backend property object into the shape PropertyCard expects
function transformProperty(p) {
  const photos = Array.isArray(p.photos) && p.photos.length > 0
    ? p.photos
    : [house1, house2, house3];

  return {
    id: p.id,
    type: p.name || p.type,
    location: p.location,
    posted: timeAgo(p.created_at),
    amount: p.price,
    rating: 4.5, // Placeholder until reviews system is built
    isNew: (new Date() - new Date(p.created_at)) < 30 * 24 * 60 * 60 * 1000,
    description: p.description || '',
    images: photos,
    beds: p.beds,
    baths: p.baths,
    amenities: Array.isArray(p.amenities)
      ? p.amenities.map(a => ({ name: typeof a === 'string' ? a : a.name || a, icon: null }))
      : [],
  };
}

function isPubliclyVisibleStatus(status) {
  const normalized = String(status || '').trim().toLowerCase();
  return normalized === 'active' || normalized === 'published' || normalized === 'approved';
}

const FALLBACK_IMAGES = [house1, house2, house3];

export const PropertyProvider = ({ children }) => {
  // Amenity icons mapping
  const amenityIcons = {
    'WiFi': wifi,
    'Air Conditioning': airCondition,
    'Parking': parking,
    'Tv': tv,
    'Swimming Pool': pool,
    'Washing Machine': wash,
  };

  const [allProperties, setAllProperties] = useState({
    'New Apartments': [],
    'Studio Apartments': [],
    'Duplex': [],
    'Bungalow': [],
  });
  const [exploreProperties, setExploreProperties] = useState([]);
  const [loading, setLoading] = useState(true);

  // Search filter state for real-time filtering
  const [searchFilters, setSearchFilters] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: 0,
  });

  // Fetch public listings on mount
  useEffect(() => {
    async function fetchPublicProperties() {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/properties/public`);
        const data = await res.json();
        const properties = (data?.data?.properties || [])
          .filter((property) => isPubliclyVisibleStatus(property?.status))
          .map(transformProperty);

        // Categorize properties by type keyword
        const categorized = {
          'New Apartments': [],
          'Studio Apartments': [],
          'Duplex': [],
          'Bungalow': [],
        };

        properties.forEach((p) => {
          const typeLower = (p.type || '').toLowerCase();
          if (typeLower.includes('studio')) {
            categorized['Studio Apartments'].push(p);
          } else if (typeLower.includes('duplex')) {
            categorized['Duplex'].push(p);
          } else if (typeLower.includes('bungalow')) {
            categorized['Bungalow'].push(p);
          } else {
            categorized['New Apartments'].push(p);
          }
        });

        setAllProperties(categorized);
        // Explore listings = all properties
        setExploreProperties(properties);
      } catch (err) {
        console.error('Failed to fetch public properties:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPublicProperties();
  }, []);

  // ── Filtered properties based on search filters ──
  const filterBySearch = useCallback((properties) => {
    const { destination, guests } = searchFilters;
    const q = (destination || '').trim().toLowerCase();
    const totalGuests = typeof guests === 'number' ? guests : 0;

    return properties.filter((p) => {
      // Filter by destination (partial, case-insensitive match on location or type)
      if (q && !((p.location || '').toLowerCase().includes(q) || (p.type || '').toLowerCase().includes(q))) {
        return false;
      }
      // Filter by guest count — only if > 0, match against beds
      if (totalGuests > 0 && p.beds && p.beds < totalGuests) {
        return false;
      }
      return true;
    });
  }, [searchFilters]);

  const filteredProperties = useMemo(() => {
    const result = {};
    for (const [key, props] of Object.entries(allProperties)) {
      result[key] = filterBySearch(props);
    }
    return result;
  }, [allProperties, filterBySearch]);

  const filteredExploreProperties = useMemo(() => {
    return filterBySearch(exploreProperties);
  }, [exploreProperties, filterBySearch]);

  // Liked properties state
  const [likedProperties, setLikedProperties] = useState(new Set());

  // Function to get property by ID from all sources
  const getPropertyById = useCallback((id) => {
    const strId = String(id);

    // Search in categorized properties
    for (const category of Object.values(allProperties)) {
      const property = category.find(p => String(p.id) === strId);
      if (property) return property;
    }

    // Search in explore properties
    const exploreProperty = exploreProperties.find(p => String(p.id) === strId);
    if (exploreProperty) return exploreProperty;

    return null;
  }, [allProperties, exploreProperties]);

  // Function to toggle like status
  const toggleLike = useCallback((propertyId) => {
    setLikedProperties(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(propertyId)) {
        newLiked.delete(propertyId);
      } else {
        newLiked.add(propertyId);
      }
      return newLiked;
    });
  }, []);

  // Function to check if property is liked
  const isPropertyLiked = useCallback((propertyId) => {
    return likedProperties.has(propertyId);
  }, [likedProperties]);

  const value = useMemo(() => ({
    allProperties,
    exploreProperties,
    filteredProperties,
    filteredExploreProperties,
    searchFilters,
    setSearchFilters,
    likedProperties,
    amenityIcons,
    getPropertyById,
    toggleLike,
    isPropertyLiked,
    loading,
    FALLBACK_IMAGES,
  }), [allProperties, exploreProperties, filteredProperties, filteredExploreProperties, searchFilters, likedProperties, toggleLike, isPropertyLiked, getPropertyById, loading]);

  return (
    <PropertyContext.Provider value={value}>
      {children}
    </PropertyContext.Provider>
  );
};
