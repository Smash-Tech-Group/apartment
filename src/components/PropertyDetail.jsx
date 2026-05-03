import React, { useState, useCallback, useRef, useEffect } from "react";
import {
  Heart,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  Share,
  ArrowLeft,
  X,
} from "lucide-react";
import { useParams, useNavigate } from "react-router-dom";
import { useProperty } from "../context/PropertyContext";
import flat from "../assets/flat-colors.svg";
import arr from "../assets/arr.svg";
import Navbar from "../components/Navbar";
import WhatWEOffer from "../components/whatWeOffer";
import Footer from "../components/footer"
import Map from "../components/map"
import ReviewsModal from '../components/ReviewsModal';




const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getPropertyById, toggleLike, isPropertyLiked, amenityIcons } =
    useProperty();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [showAmenitiesModal, setShowAmenitiesModal] = useState(false);
  const [showReviewsModal, setShowReviewsModal] = useState(false);


  // Get property data from context
  const property = getPropertyById(id);
  const isLiked = isPropertyLiked(parseInt(id));

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
      <div>
        <Navbar />
      </div>

      <div className="max-w-screen-2xl mx-auto pt-8">
        {/* Back Button */}
        <button
          onClick={() => navigate(-1)}
          className="flex items-center gap-2 mb-6 text-gray-600 hover:text-primary transition-colors"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="text-sm font-medium">Back to listings</span>
        </button>

        <div className="flex flex-col md:flex-row md:items-center w-full justify-between px-4">
          <h1 className="text-2xl lg:text-3xl font-bold mb-3 md:mb-6">{property.type}</h1>

          <div className="flex flex-col md:flex-row items-center gap-5 mb-6 text-xs">
            <div className="w-[380px] px-4 flex items-center gap-2 md:gap-5">
              <div>
                <img src={flat} className="hidden md:flex h-[50px] w-[50px] md:h-[80px] md:w-[80px]" alt="" />
              </div>

              <div>
                <h3 className="font-bold mb-1">Hear from Our Happy Guests</h3>
                <p>
                  Discover what guests love about their stays! Read real reviews
                  on comfort, convenience, and top-notch service at our premium
                  apartments.
                </p>
              </div>
            </div>

            <div>
              <div className="">
                <div className="flex items-center justify-between">
                  <div className="flex flex-col md:items-center px-3 py-2 rounded-full">
                    <span className="font-bold text-lg">{property.rating}</span>
                    <span className="text-primary mr-1">★★★★★</span>
                  </div>

             <div className="flex flex-col items-center px-3 py-2 rounded-full">
  <span className="font-bold text-lg">536</span>
  <button 
    onClick={() => setShowReviewsModal(true)}
    className="underline hover:font-semibold cursor-pointer transition-200 mr-1"
  >
    reviews
  </button>
</div>

                  <div className="flex ml-5 gap-4">
                    <button
                      onClick={handleLike}
                      className={`flex items-center gap-2 p-3 rounded-full bg-tertiary hover:bg-tertiary transition-all duration-300 transform hover:scale-110  ${
                        isLiked
                          ? "border-primary bg-primary text-primary"
                          : "border-gray-300 hover:border-primary hover:text-primary"
                      }`}
                    >
                      <Heart
                        className={`w-6 h-6 ${isLiked ? "fill-primary" : ""}`}
                      />
                      {isLiked ? "" : ""}
                    </button>

                    <button
                      onClick={handleShare}
                      className="flex items-center gap-2 p-3 rounded-full bg-tertiary hover:bg-tertiary transition-all duration-300 transform hover:scale-110"
                    >
                      <Share className="w-6 h-6" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 px-4">
          {/* Image Carousel */}
          <div className="relative">
            <div className="relative w-full h-[500px] rounded-xl overflow-hidden">
              {/* New Tag */}
              {property.isNew && (
                <div className="absolute top-4 right-4 bg-white px-3 py-1 rounded-full text-xs font-semibold shadow-md z-20">
                  ★ New
                </div>
              )}

              <div
                className="relative w-full h-full cursor-grab select-none"
                style={{ cursor: isDragging ? "grabbing" : "grab" }}
                onTouchStart={handleTouchStart}
                onTouchMove={handleTouchMove}
                onTouchEnd={handleTouchEnd}
                onMouseDown={handleMouseDown}
                onMouseMove={handleMouseMove}
                onMouseUp={handleMouseUp}
                onMouseLeave={handleMouseLeave}
              >
                <div
                  className="flex w-full h-full transition-transform duration-300 ease-out"
                  style={{
                    transform: `translateX(calc(-${
                      currentImageIndex * 100
                    }% + ${isDragging ? dragOffset : 0}px))`,
                    transition: isDragging ? "none" : "transform 0.3s ease-out",
                  }}
                >
                  {property.images.map((image, idx) => (
                    <img
                      key={idx}
                      src={image}
                      alt={`${property.type} - Image ${idx + 1}`}
                      className="flex-shrink-0 w-full h-full object-cover pointer-events-none"
                      draggable={false}
                    />
                  ))}
                </div>
              </div>

              {/* Navigation Buttons */}
              {property.images.length > 1 && (
                <>
                  <button
                    onClick={prevImage}
                    disabled={isAnimating}
                    className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-md transition-all duration-200 disabled:opacity-50 z-10"
                  >
                    <ChevronLeft className="w-5 h-5 text-gray-700" />
                  </button>
                  <button
                    onClick={nextImage}
                    disabled={isAnimating}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-3 shadow-md transition-all duration-200 disabled:opacity-50 z-10"
                  >
                    <ChevronRight className="w-5 h-5 text-gray-700" />
                  </button>
                </>
              )}

              {/* Image Indicators */}
              <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {property.images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => {
                      if (!isAnimating) {
                        setIsAnimating(true);
                        setCurrentImageIndex(index);
                        setTimeout(() => setIsAnimating(false), 300);
                      }
                    }}
                    disabled={isAnimating}
                    className={`w-1 h-4 rounded-full transition-all duration-200 ${
                      index === currentImageIndex
                        ? "bg-primary scale-125"
                        : "bg-white/50 hover:bg-white"
                    }`}
                  />
                ))}
              </div>
            </div>

            {/* Thumbnail Row */}
            <div className="flex gap-2 mt-4 overflow-x-auto">
              {property.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => {
                    if (!isAnimating) {
                      setIsAnimating(true);
                      setCurrentImageIndex(index);
                      setTimeout(() => setIsAnimating(false), 300);
                    }
                  }}
                  className={`flex-shrink-0 w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
                    index === currentImageIndex
                      ? "border-primary"
                      : "border-gray-200 hover:border-gray-300"
                  }`}
                >
                  <img
                    src={image}
                    alt={`Thumbnail ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Property Details */}
          <div className="space-y-6">
            <div>
              <p className="font-bold flex items-center mb-1">
                <span className="w-2 h-2 bg-green-500 rounded-full mr-2"></span>
                {property.location}
              </p>
              <p className="text-xs text-gray-600 font-semibold mb-1">
                • {property.type} • 3 Bed • 4 Bath
              </p>
              <p className="text-gray-500 text-xs">{property.posted}</p>
            </div>

            {/* Amenities */}
            <div>
              <h3 className="text-xl font-bold mb-3">What this place offers</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                {visibleAmenities.map((amenity, index) => (
                  <div
                    key={index}
                    className="flex items-center justify-center border p-3 whitespace-nowrap text-sm rounded-full gap-3 text-gray-600 hover:border-primary transition-colors"
                  >
                    {typeof amenity.icon === "string" ? (
                      <img className="text-lg" src={amenity.icon} alt="" />
                    ) : (
                      <span className="text-lg">{amenity.icon}</span>
                    )}
                    <span>{amenity.name}</span>
                  </div>
                ))}

                {remainingCount > 0 && (
                  <button
                    onClick={() => setShowAmenitiesModal(true)}
                    className="flex flex-col items-start justify-center whitespace-nowrap text-sm rounded-full gap-3 transition-colors"
                  >
                    <span className="rounded-full text-xs flex items-center justify-center bg-primary/10 w-7 h-7">
                      +{remainingCount}
                    </span>
                    <span className="flex items-center gap-2 underline">
                      {" "}
                      <img src={arr} alt="" /> View All Amenities{" "}
                    </span>
                  </button>
                )}
              </div>
            </div>

            {/* Price and Rating */}
            <div className="border shadow-md rounded-2xl p-5">
              <div className="flex items-center mb-4 justify-between">
                <div>
                  <span className="text-lg font-bold text-gray-900">
                    ₦{property.amount.toLocaleString()}
                  </span>
                  <span className="text-gray-500 text-sm ml-1">Per Night</span>
                </div>
              </div>

              {/* Search Filter */}
              <div className="hidden bg-white text-xs whitespace-nowrap rounded-full mx-auto md:flex items-center shadow-lg relative">
                {/* Check In */}
                <div className="flex-1 px-4 py-3 border-r border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold mb-1">
                        Check in
                      </label>
                      <input
                        type="date"
                        placeholder="Select date"
                        value={searchData.checkIn}
                        onChange={(e) =>
                          handleInputChange("checkIn", e.target.value)
                        }
                        className="w-full border-none outline-none text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Check Out */}
                <div className="flex-1 px-4 py-3 border-r border-gray-200">
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold mb-1">
                        Check out
                      </label>
                      <input
                        type="date"
                        placeholder="Select date"
                        value={searchData.checkOut}
                        onChange={(e) =>
                          handleInputChange("checkOut", e.target.value)
                        }
                        className="w-full border-none outline-none text-gray-900 placeholder-gray-400"
                      />
                    </div>
                  </div>
                </div>

                {/* Guests */}
                <div
                  className="flex-1 px-4 py-3  border-gray-200 relative"
                  ref={dropdownRef}
                >
                  <div className="flex items-center space-x-3">
                    <div className="flex-1">
                      <label className="block text-sm font-semibold mb-1">
                        Guests
                      </label>
                      <button
                        onClick={() => setShowGuestDropdown(!showGuestDropdown)}
                        className="w-full text-left border-none outline-none text-gray-900 placeholder-gray-400 flex items-center justify-between"
                      >
                        <span>{getGuestText()}</span>
                        <ChevronDown className="w-4 h-4 ml-2" />
                      </button>
                    </div>
                  </div>

                  {/* Guests Dropdown */}
                  {showGuestDropdown && (
                    <div
                      className="!absolute top-[-150px] right-[-20px] shadow-md right-0 mt-2 bg-white min-w-[440px] p-4 rounded-xl"
                      style={{ zIndex: 9999 }}
                    >
                      <div className="space-y-4">
                        <div className="text-sm font-semibold text-gray-700 mb-3">
                          Select Number of Guests
                        </div>

                        <div className="flex items-center">
                          {/* Adults */}
                          <div className="flex flex-col  border-r px-2  items-center justify-between">
                            <div className="flex items-center gap-1 mb-4">
                              <div className="font-medium text-gray-900">
                                Adults
                              </div>
                              <div className="text-xs text-gray-500">
                                12+ Years
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() =>
                                  handleGuestChange("adults", "decrease")
                                }
                                className="w-8 h-8 rounded-full  bg-tertiary  flex items-center justify-center hover:bg-primary disabled:opacity-50"
                                disabled={searchData.guests.adults <= 1}
                              >
                                -
                              </button>
                              <span className="w-8 text-center">
                                {searchData.guests.adults}
                              </span>
                              <button
                                onClick={() =>
                                  handleGuestChange("adults", "increase")
                                }
                                className="w-8 h-8 rounded-full  bg-tertiary flex items-center justify-center hover:bg-primary "
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Children */}
                          <div className="flex flex-col  border-r  px-2  items-center justify-between">
                            <div className="flex items-center gap-1 mb-4">
                              <div className="font-medium text-gray-900">
                                Children
                              </div>
                              <div className="text-xs text-gray-500">
                                2-12 Years
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() =>
                                  handleGuestChange("children", "decrease")
                                }
                                className="w-8 h-8 rounded-full  bg-tertiary  flex items-center justify-center hover:bg-primary  disabled:opacity-50"
                                disabled={searchData.guests.children <= 0}
                              >
                                -
                              </button>
                              <span className="w-8 text-center">
                                {searchData.guests.children}
                              </span>
                              <button
                                onClick={() =>
                                  handleGuestChange("children", "increase")
                                }
                                className="w-8 h-8 rounded-full  bg-tertiary  flex items-center justify-center hover:bg-primary"
                              >
                                +
                              </button>
                            </div>
                          </div>

                          {/* Infants */}
                          <div className="flex flex-col px-2 items-center justify-between">
                            <div className="flex items-center gap-1 mb-4">
                              <div className="font-medium text-gray-900">
                                Infants
                              </div>
                              <div className="text-xs text-gray-500">
                                &lt; 2 Years
                              </div>
                            </div>
                            <div className="flex items-center space-x-3">
                              <button
                                onClick={() =>
                                  handleGuestChange("infants", "decrease")
                                }
                                className="w-8 h-8 rounded-full flex bg-tertiary items-center justify-center hover:bg-primary  disabled:opacity-50"
                                disabled={searchData.guests.infants <= 0}
                              >
                                -
                              </button>
                              <span className="w-8 text-center">
                                {searchData.guests.infants}
                              </span>
                              <button
                                onClick={() =>
                                  handleGuestChange("infants", "increase")
                                }
                                className="w-8 h-8 rounded-full bg-tertiary flex items-center justify-center hover:bg-primary "
                              >
                                +
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>

              <hr className="my-[1.3rem]" />

              {/* Book Button */}
              <button className="w-full bg-primary text-white py-4 rounded-full font-semibold text-lg hover:bg-primary/90 transition-colors">
                Reserve This Apartment
              </button>
            </div>
          </div>
        </div>
        <hr className="my-[2rem]" />

        <div className="px-4">
          <WhatWEOffer />
        </div>






        {/* Amenities Modal */}
        {showAmenitiesModal && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl max-w-4xl w-full max-h-[80vh] overflow-hidden">
              <div className="flex items-center justify-between p-6 border-b">
                <h2 className="text-2xl font-bold">What this Place Offers</h2>
                <button
                  onClick={() => setShowAmenitiesModal(false)}
                  className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                >
                  <X className="w-6 h-6" />
                </button>
              </div>
              <div className="p-6 overflow-y-auto max-h-[60vh]">
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-4">
                  {allAmenities.map((amenity, index) => (
                    <div
                      key={index}
                      className="flex items-center border p-4 text-xs rounded-full gap-3 text-gray-600 hover:border-primary transition-colors"
                    >
                      {typeof amenity.icon === "string" ? (
                        <img className="text-xs" src={amenity.icon} alt="" />
                      ) : (
                        <span className="text-xs">{amenity.icon}</span>
                      )}
                      <span>{amenity.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {showReviewsModal && (
  <ReviewsModal
    isOpen={showReviewsModal}
    onClose={() => setShowReviewsModal(false)}
    propertyRating={property.rating}
  />
)}
    </>
  );
};

export default PropertyDetail;
