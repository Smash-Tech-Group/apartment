import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "../../components/Navbar"
import Footer from "../../components/footer"
import HomepageBooking from "../../layouts/homeBookings"
import SecondLayout from "../../layouts/secondLayout"
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Share,
  ArrowLeft,
  X,
} from "lucide-react";
import MiddleContent from "../../components/PropertyDetail"
import React, { useState, useCallback, useRef, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useProperty } from "../../context/PropertyContext";
import WhatWEOffer from "../../components/whatWeOffer";
import Map from "../../components/map"
import ReviewsModal from '../../components/ReviewsModal';


const Details = () => {



    const { id } = useParams();
  const navigate = useNavigate();
  const { getPropertyById, toggleLike, isPropertyLiked, amenityIcons } =
    useProperty();

  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);


  // Get property data from context
  const property = getPropertyById(id);

  // Handle case where property is not found
  if (!property) {
    return (
      <div className="max-w-screen-2xl mx-auto px-4 py-8">
        <div className="text-center">
          <h1 className="text-2xl font-bold mb-4">Property Not Found</h1>
          <p className="text-gray-600 mb-6">
            The property you're looking for doesn't exist.
          </p>
          <button
            onClick={() => navigate("/")}
            className="bg-primary text-white px-6 py-3 rounded-full hover:bg-primary/90 transition-colors"
          >
            Back to Listings
          </button>
        </div>
      </div>
    );
  }

  const handleMouseDown = (e) => {
    if (property.images.length <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || property.images.length <= 1) return;
    e.preventDefault();
    const currentX = e.clientX;
    const diff = currentX - dragStart;
    setDragOffset(diff);
  };

  const handleMouseUp = (e) => {
    if (!isDragging || property.images.length <= 1) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);

    const threshold = 50;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        prevImage();
      } else {
        nextImage();
      }
    }
    setDragOffset(0);
  };

  const handleMouseLeave = () => {
    if (isDragging) {
      handleMouseUp();
    }
  };

  const handleIndicatorClick = (index, e) => {
    e.preventDefault();
    e.stopPropagation();
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentImageIndex(index);
      setTimeout(() => setIsAnimating(false), 300);
    }
  };

  const nextImage = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prev) =>
      prev === property.images.length - 1 ? 0 : prev + 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  }, [property.images.length, isAnimating]);

  const prevImage = useCallback(() => {
    if (isAnimating) return;
    setIsAnimating(true);
    setCurrentImageIndex((prev) =>
      prev === 0 ? property.images.length - 1 : prev - 1
    );
    setTimeout(() => setIsAnimating(false), 300);
  }, [property.images.length, isAnimating]);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: property.type,
        text: `Check out this ${property.type} in ${property.location}`,
        url: window.location.href,
      });
    } else {
      // Fallback - copy to clipboard
      navigator.clipboard.writeText(window.location.href);
      alert("Link copied to clipboard!");
    }
  };

  const handleLike = () => {
    toggleLike(property.id);
  };

  const handleTouchStart = (e) => {
    if (property.images.length <= 1) return;
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || property.images.length <= 1) return;
    const currentX = e.touches[0].clientX;
    const diff = currentX - dragStart;
    setDragOffset(diff);
  };

  const handleTouchEnd = () => {
    if (!isDragging || property.images.length <= 1) return;
    setIsDragging(false);

    const threshold = 50;
    if (Math.abs(dragOffset) > threshold) {
      if (dragOffset > 0) {
        prevImage();
      } else {
        nextImage();
      }
    }
    setDragOffset(0);
  };

  const [searchData, setSearchData] = useState({
    destination: "",
    checkIn: "",
    checkOut: "",
    guests: {
      adults: 1,
      children: 0,
      infants: 0,
    },
  });
  

  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const handleInputChange = (field, value) => {
    setSearchData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleGuestChange = (type, operation) => {
    setSearchData((prev) => ({
      ...prev,
      guests: {
        ...prev.guests,
        [type]:
          operation === "increase"
            ? prev.guests[type] + 1
            : Math.max(0, prev.guests[type] - 1),
      },
    }));
  };

  const getTotalGuests = () => {
    const { adults, children, infants } = searchData.guests;
    return adults + children + infants;
  };

  const getGuestText = () => {
    const total = getTotalGuests();
    if (total === 0) return "Add guests";
    if (total === 1) return "1 guest";
    return `${total} guests`;
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowGuestDropdown(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Get amenities data
  const getAmenities = () => {
    if (property.amenities && property.amenities.length > 0) {
      return property.amenities;
    }
    return [
      { name: "WiFi", icon: amenityIcons["WiFi"] },
      { name: "Air Conditioning", icon: amenityIcons["Air Conditioning"] },
      { name: "Parking", icon: amenityIcons["Parking"] },
      { name: "Swimming Pool", icon: amenityIcons["Swimming Pool"] },
    ];
  };

  const allAmenities = getAmenities();
  const visibleAmenities = allAmenities.slice(0, 6);
  const remainingCount = allAmenities.length - 6;


  return (
    <>
      <HelmetProvider>
        <Helmet>
         
        </Helmet>

        <div>
          <Navbar/>
        </div>

        <div>
<MiddleContent/>
        </div>

   <div>
{/* Map Section - Replace your existing Map component usage */}
<div className="w-full mt-8">
  <div className="bg-white overflow-hidden" style={{ height: '650px' }}>
    <Map
      location={property.location}
      propertyType={property.type}
      propertyId={property.id}
    />
  </div>
</div>

<div>
  <Footer/>
</div>
        </div>






 
      </HelmetProvider>
    </>
  );
};

export default Details;