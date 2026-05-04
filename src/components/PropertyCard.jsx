import React, { useState, useCallback, memo } from "react";
import { Heart, ChevronLeft, ChevronRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useProperty } from "../context/PropertyContext";

const PropertyCard = memo(({ property, images, showCarousel = true }) => {
  const { toggleLike, isPropertyLiked } = useProperty();

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const [imageLoading, setImageLoading] = useState(true);
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState(0);
  const [dragOffset, setDragOffset] = useState(0);

  const isLiked = isPropertyLiked(property.id);

  const nextImage = useCallback(
    (e) => {
      e?.preventDefault();
      e?.stopPropagation();
      if (isAnimating || images.length <= 1) return;
      setIsAnimating(true);
      setCurrentImageIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
      setTimeout(() => setIsAnimating(false), 300);
    },
    [images.length, isAnimating]
  );

  const prevImage = useCallback(
    (e) => {
      e?.preventDefault();
      e?.stopPropagation();
      if (isAnimating || images.length <= 1) return;
      setIsAnimating(true);
      setCurrentImageIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
      setTimeout(() => setIsAnimating(false), 300);
    },
    [images.length, isAnimating]
  );

  const handleToggleLike = useCallback(
    (e) => {
      e.preventDefault();
      e.stopPropagation();
      toggleLike(property.id);
    },
    [property.id, toggleLike]
  );

  const handleMouseDown = (e) => {
    if (images.length <= 1) return;
    e.preventDefault();
    setIsDragging(true);
    setDragStart(e.clientX);
    setDragOffset(0);
  };

  const handleMouseMove = (e) => {
    if (!isDragging || images.length <= 1) return;
    e.preventDefault();
    setDragOffset(e.clientX - dragStart);
  };

  const handleMouseUp = (e) => {
    if (!isDragging || images.length <= 1) return;
    e?.preventDefault();
    e?.stopPropagation();
    setIsDragging(false);
    if (Math.abs(dragOffset) > 50) {
      dragOffset > 0 ? prevImage() : nextImage();
    }
    setDragOffset(0);
  };

  const handleTouchStart = (e) => {
    if (images.length <= 1) return;
    setIsDragging(true);
    setDragStart(e.touches[0].clientX);
    setDragOffset(0);
  };

  const handleTouchMove = (e) => {
    if (!isDragging || images.length <= 1) return;
    e.preventDefault();
    setDragOffset(e.touches[0].clientX - dragStart);
  };

  const handleTouchEnd = (e) => {
    if (!isDragging || images.length <= 1) return;
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (Math.abs(dragOffset) > 50) {
      dragOffset > 0 ? prevImage() : nextImage();
    }
    setDragOffset(0);
  };

  const handleIndicatorClick = useCallback(
    (idx, e) => {
      e.preventDefault();
      e.stopPropagation();
      if (!isAnimating) {
        setIsAnimating(true);
        setCurrentImageIndex(idx);
        setTimeout(() => setIsAnimating(false), 300);
      }
    },
    [isAnimating]
  );

  return (
    <div className="bg-white overflow-hidden transition-shadow duration-300 group">
      <Link to={`/property/${property.id}`} className="block">
        <div className="relative overflow-hidden">
          <div
            className="relative w-full h-[350px] rounded-xl overflow-hidden cursor-grab select-none image-container"
            style={{ cursor: isDragging ? "grabbing" : "grab" }}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={handleMouseUp}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <div
              className="flex w-full h-full transition-transform duration-300 ease-out property-images"
              style={{
                transform: `translateX(calc(-${currentImageIndex * 100}% + ${isDragging ? dragOffset : 0}px))`,
                transition: isDragging ? "none" : "transform 0.3s ease-out",
              }}
            >
              {images.map((image, idx) => (
                <img
                  key={idx}
                  src={image}
                  alt={`${property.type} - Image ${idx + 1}`}
                  className="flex-shrink-0 w-full h-full object-cover pointer-events-none"
                  onLoad={() => setImageLoading(false)}
                  draggable={false}
                />
              ))}
            </div>

            {property.isNew && (
              <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold shadow-md z-20">
                ★ New
              </div>
            )}
          </div>

          {imageLoading && (
            <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl" />
          )}

          {showCarousel && images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                disabled={isAnimating}
                className="absolute left-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-50 z-10"
              >
                <ChevronLeft className="w-4 h-4 text-gray-700" />
              </button>
              <button
                onClick={nextImage}
                disabled={isAnimating}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 bg-white/90 hover:bg-white rounded-full p-2 shadow-md transition-all duration-200 opacity-0 group-hover:opacity-100 disabled:opacity-50 z-10"
              >
                <ChevronRight className="w-4 h-4 text-gray-700" />
              </button>

              <div className="absolute bottom-3 left-1/2 transform -translate-x-1/2 flex space-x-2 z-10">
                {images.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={(e) => handleIndicatorClick(idx, e)}
                    disabled={isAnimating}
                    className={`w-1 h-3 rounded-full transition-all duration-200 ${idx === currentImageIndex
                        ? "bg-primary scale-125"
                        : "bg-white/50 hover:bg-primary"
                      }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      </Link>

      <div className="!relative p-3">
        <button
          onClick={handleToggleLike}
          className="absolute top-5 right-3 p-3 rounded-full bg-tertiary hover:bg-tertiary transition-all duration-300 transform hover:scale-110 z-20"
          style={{ animation: isLiked ? "heartBeat 0.6s ease-in-out" : "none" }}
        >
          <Heart
            className={`w-6 h-6 transition-all duration-300 transform ${isLiked
                ? "fill-primary text-primary scale-110"
                : "text-gray-600 hover:text-primary hover:scale-105"
              }`}
          />
        </button>

        <h3 className="font-bold text-sm mb-2 text-gray-800">{property.type}</h3>
        <p className="text-gray-600 text-xs font-medium mb-1 flex items-center">
          <span className="w-2 h-2 bg-green-500 text-xs rounded-full mr-2"></span>
          {property.location}
        </p>
        <p className="text-gray-500 text-xs mb-3">{property.posted}</p>

        <div className="flex flex-col justify-between">
          <div className="flex items-center">
            <span className="text-ms font-bold text-gray-900">
              ₦{property.amount.toLocaleString()}
            </span>
            <span className="text-gray-500 text-xs ml-1">Per Night</span>
          </div>
          <div className="flex w-fit text-xs mt-1 items-center bg-tertiary px-3 py-1 rounded-full border border-tertiary">
            <span className="text-primary mr-1">Rating ★</span>
            <span className="text-sm font-semibold text-primary">{property.rating}</span>
          </div>
        </div>
      </div>
    </div>
  );
});

PropertyCard.displayName = "PropertyCard";

export default PropertyCard;