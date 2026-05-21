import React, { createContext, useContext, useState, useCallback, useEffect, useMemo } from 'react';
import { BASE_URL } from '../lib/api';

// Fallback images for rides with no photos
import car1 from "../assets/car1.webp";
import car2 from "../assets/car2.webp";
import car3 from "../assets/car3.webp";

const CarContext = createContext();

const FALLBACK_IMAGES = [car1, car2, car3];

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

// Transform a backend ride object into the shape the CarCat card expects
function transformRide(r) {
  // Extract photo URLs from the RideMedia array
  const photos = Array.isArray(r.photos) && r.photos.length > 0
    ? r.photos.map(p => p.url || p)
    : FALLBACK_IMAGES;

  // Map ride_type enum to display-friendly category
  const typeMap = {
    suv: 'Suv',
    sedan: 'Sedan',
    van: 'Van',
    coupe: 'Sedan',
    truck: 'Van',
  };

  return {
    id: r.id,
    type: `${r.ride_type?.charAt(0).toUpperCase()}${r.ride_type?.slice(1)} · ${r.seat_count} Seats`,
    location: r.pickup_location,
    posted: timeAgo(r.created_at),
    amount: r.price,
    rating: 4.5, // Placeholder until reviews are built
    isNew: (new Date() - new Date(r.created_at)) < 30 * 24 * 60 * 60 * 1000,
    images: photos,
    category: typeMap[(r.ride_type || '').toLowerCase()] || 'Suv',
  };
}

export const CarProvider = ({ children }) => {
  const [allCars, setAllCars] = useState({ Suv: [], Sedan: [], Van: [] });
  const [exploreCars, setExploreCars] = useState([]);
  const [loading, setLoading] = useState(true);
  const [likedCars, setLikedCars] = useState(new Set());

  // Search filter state for real-time filtering
  const [searchFilters, setSearchFilters] = useState({
    location: '',
    pickUpDate: '',
    pickUpTime: '',
    returnDate: '',
    returnTime: '',
    needDriver: null,
  });

  // Fetch public rides on mount
  useEffect(() => {
    async function fetchPublicRides() {
      setLoading(true);
      try {
        const res = await fetch(`${BASE_URL}/rides/public`);
        const data = await res.json();
        const rides = (data?.data || []).map(transformRide);

        // Categorize by vehicle type
        const categorized = { Suv: [], Sedan: [], Van: [] };
        rides.forEach((r) => {
          const cat = r.category;
          if (categorized[cat]) {
            categorized[cat].push(r);
          } else {
            categorized['Suv'].push(r);
          }
        });

        setAllCars(categorized);
        setExploreCars(rides);
      } catch (err) {
        console.error('Failed to fetch public rides:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchPublicRides();
  }, []);

  const toggleLike = useCallback((carId) => {
    setLikedCars(prev => {
      const newLiked = new Set(prev);
      if (newLiked.has(carId)) {
        newLiked.delete(carId);
      } else {
        newLiked.add(carId);
      }
      return newLiked;
    });
  }, []);

  const isCarLiked = useCallback((carId) => {
    return likedCars.has(carId);
  }, [likedCars]);

  // ── Filtered cars based on search filters ──
  const filterBySearch = useCallback((cars) => {
    const q = (searchFilters.location || '').trim().toLowerCase();

    return cars.filter((c) => {
      // Filter by location (partial, case-insensitive match on location or type)
      if (q && !((c.location || '').toLowerCase().includes(q) || (c.type || '').toLowerCase().includes(q))) {
        return false;
      }
      return true;
    });
  }, [searchFilters]);

  const filteredCars = useMemo(() => {
    const result = {};
    for (const [key, cars] of Object.entries(allCars)) {
      result[key] = filterBySearch(cars);
    }
    return result;
  }, [allCars, filterBySearch]);

  const filteredExploreCars = useMemo(() => {
    return filterBySearch(exploreCars);
  }, [exploreCars, filterBySearch]);

  const value = {
    allCars,
    exploreCars,
    filteredCars,
    filteredExploreCars,
    searchFilters,
    setSearchFilters,
    likedCars,
    toggleLike,
    isCarLiked,
    loading,
    FALLBACK_IMAGES,
  };

  return (
    <CarContext.Provider value={value}>
      {children}
    </CarContext.Provider>
  );
};

export const useCar = () => {
  const context = useContext(CarContext);
  if (!context) {
    throw new Error('useCar must be used within a CarProvider');
  }
  return context;
};