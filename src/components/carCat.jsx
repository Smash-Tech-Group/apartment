import React, { useState, useEffect, useCallback } from 'react';
import { Heart, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { Link } from 'react-router-dom';
import filter from "../assets/filter.svg"
import carIcon1 from "../assets/carIcon1.svg"
import carIcon2 from "../assets/carIcon2.svg"
import carIcon3 from "../assets/carIcon4.svg"

import car1 from "../assets/car1.webp"
import car2 from "../assets/car2.webp"
import car3 from "../assets/car3.webp"
import car4 from "../assets/car4.webp"
import car5 from "../assets/car5.webp"

import car6 from "../assets/car2.webp"
import car7 from "../assets/car3.webp"
import car8 from "../assets/car4.webp"
import car9 from "../assets/car5.webp"
import car10 from "../assets/car6.webp"
import car11 from "../assets/car7.webp"
import car12 from "../assets/car8.webp"
import car13 from "../assets/car10.webp"
import { useCar } from '../context/CarContext'; // Assuming you'll create this context

const CarCat = () => {
  const { allCars, exploreCars, toggleLike, isCarLiked } = useCar();

  const [activeCategory, setActiveCategory] = useState('Suv');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedProperties, setDisplayedProperties] = useState([]);
  const [showMoreExplore, setShowMoreExplore] = useState(false);

  const categories = [
    { id: 'Suv', name: 'Suv', icon: carIcon1 },
    { id: 'Sedan', name: 'Sedan', icon: carIcon2 },
    { id: 'Van', name: 'Van', icon: carIcon3 },
    { id: 'filter', name: 'Filter', icon: filter }
  ];

  // Create image arrays for cars that don't have them
  const imageArrays = {
    1: [car1, car2, car3, car4, car5],
    2: [car7, car2, car3, car4, car5],
    3: [car6, car2, car3, car4, car5],
    4: [car7, car2, car3, car4, car5],
    5: [car2, car2, car3, car4, car5],
    6: [car8, car2, car3, car4, car5],
    7: [car9, car2, car3, car4, car5],
    8: [car3, car2, car3, car4, car5],
    9: [car10, car2, car3, car4, car5],
    10: [car11, car2, car3, car4, car5],
    11: [car12, car2, car3, car4, car5],
    12: [car13, car2, car3, car4, car5],
    13: [car5, car2, car3, car4, car5],
    14: [car8, car2, car3, car4, car5],
    15: [car9, car2, car3, car4, car5],
    16: [car5, car2, car3, car4, car5],
    17: [car2, car3, car4, car5],
    18: [car13, car2, car3, car4, car5],
    19: [car12, car2, car3, car4, car5],
    20: [car11, car2, car3, car4, car5],
    21: [car10, car2, car3, car4, car5],
    22: [car9, car2, car3, car4, car5],
    23: [car8, car2, car3, car4, car5],
    24: [car7, car2, car3, car4, car5],
    25: [car6, car2, car3, car4, car5],
    26: [car4, car2, car3, car4, car5],
    27: [car2, car2, car3, car4, car5]
  };

  const handleToggleLike = useCallback((carId, e) => {
    e.stopPropagation();
    e.preventDefault();
    toggleLike(carId);
  }, [toggleLike]);

  const PropertyCard = ({ property, showCarousel = true, index = 0 }) => {
    const [currentImageIndex, setCurrentImageIndex] = useState(0);
    const [imageLoading, setImageLoading] = useState(true);
    const [isDragging, setIsDragging] = useState(false);
    const [dragStart, setDragStart] = useState(0);
    const [dragOffset, setDragOffset] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);

    // Use context to check if car is liked
    const isLiked = isCarLiked(property.id);
    
    // Get images for this car
    const carImages = imageArrays[property.id] || [car1, car2, car3, car4, car5];

    const nextImage = useCallback((e) => {
      e?.preventDefault();
      e?.stopPropagation();
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentImageIndex((prev) => 
        prev === carImages.length - 1 ? 0 : prev + 1
      );
      setTimeout(() => setIsAnimating(false), 300);
    }, [carImages.length, isAnimating]);

    const prevImage = useCallback((e) => {
      e?.preventDefault();
      e?.stopPropagation();
      if (isAnimating) return;
      setIsAnimating(true);
      setCurrentImageIndex((prev) => 
        prev === 0 ? carImages.length - 1 : prev - 1
      );
      setTimeout(() => setIsAnimating(false), 300);
    }, [carImages.length, isAnimating]);

    const handleTouchStart = (e) => {
      if (carImages.length <= 1) return;
      setIsDragging(true);
      setDragStart(e.touches[0].clientX);
      setDragOffset(0);
    };

    const handleTouchMove = (e) => {
      if (!isDragging || carImages.length <= 1) return;
      e.preventDefault();
      const currentX = e.touches[0].clientX;
      const diff = currentX - dragStart;
      setDragOffset(diff);
    };

    const handleTouchEnd = (e) => {
      if (!isDragging || carImages.length <= 1) return;
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

    const handleMouseDown = (e) => {
      if (carImages.length <= 1) return;
      e.preventDefault();
      setIsDragging(true);
      setDragStart(e.clientX);
      setDragOffset(0);
    };

    const handleMouseMove = (e) => {
      if (!isDragging || carImages.length <= 1) return;
      e.preventDefault();
      const currentX = e.clientX;
      const diff = currentX - dragStart;
      setDragOffset(diff);
    };

    const handleMouseUp = (e) => {
      if (!isDragging || carImages.length <= 1) return;
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

    return (
      <div className="bg-white overflow-hidden transition-shadow duration-300 group">
        <Link to={`/car/${property.id}`} className="block">
          <div className="relative overflow-hidden">
            <div 
              className="relative w-full h-[350px] rounded-xl overflow-hidden cursor-grab select-none"
              style={{
                cursor: isDragging ? 'grabbing' : 'grab'
              }}
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
                  transform: `translateX(calc(-${currentImageIndex * 100}% + ${isDragging ? dragOffset : 0}px))`,
                  transition: isDragging ? 'none' : 'transform 0.3s ease-out'
                }}
              >
                {property.isNew && (
                  <div className="absolute top-3 right-3 bg-white px-3 py-1 rounded-full text-xs font-semibold shadow-md z-20">
                    ★ New
                  </div>
                )}
                {carImages.map((image, idx) => (
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
            </div>
            
            {/* Loading skeleton */}
            {imageLoading && (
              <div className="absolute inset-0 bg-gray-200 animate-pulse rounded-xl" />
            )}
            
            {showCarousel && carImages.length > 1 && (
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
                  {carImages.map((_, index) => (
                    <button
                      key={index}
                      onClick={(e) => handleIndicatorClick(index, e)}
                      disabled={isAnimating}
                      className={`w-1 h-3 rounded-full transition-all duration-200 ${
                        index === currentImageIndex 
                          ? 'bg-primary scale-125' 
                          : 'bg-white/50 hover:bg-primary'
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
            onClick={(e) => handleToggleLike(property.id, e)}
            className={`absolute top-5 right-3 p-3 rounded-full bg-tertiary hover:bg-tertiary transition-all duration-300 transform hover:scale-110 z-20 ${
              isLiked ? 'animate-bounce' : ''
            }`}
            style={{
              animation: isLiked ? 'heartBeat 0.6s ease-in-out' : 'none'
            }}
          >
            <Heart 
              className={`w-6 h-6 transition-all duration-300 transform ${
                isLiked
                  ? 'fill-primary text-primary scale-110' 
                  : 'text-gray-600 hover:text-primary hover:scale-105'
              }`}
            />
          </button>
          <h3 className="font-bold text-sm mb-2 text-gray-800">
            {property.type}
          </h3>
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
              <span className="text-gray-500 text-xs ml-1">Per Day</span>
            </div>
           
            <div className="flex w-fit text-xs mt-1 items-center bg-tertiary px-3 py-1 rounded-full border border-tertiary">
              <span className="text-primary mr-1">Rating ★</span>
              <span className="text-sm font-semibold text-primary">{property.rating}</span>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Handle category transitions with animation
  const handleCategoryChange = (categoryName) => {
    if (categoryName === activeCategory || categoryName === 'Filter') return;
    
    setIsTransitioning(true);
    
    // Fade out current content
    setTimeout(() => {
      setActiveCategory(categoryName);
      // Fade in new content after a brief delay
      setTimeout(() => {
        setIsTransitioning(false);
      }, 100);
    }, 300);
  };

  // Initialize and update displayed properties when activeCategory changes
  useEffect(() => {
    const currentProperties = allCars[activeCategory] || [];
    setDisplayedProperties(currentProperties);
  }, [activeCategory, allCars]);

  return (
    <>
      <section className='max-w-screen-2xl mx-auto'>
        {/* Category Navigation */}
        <div className='flex items-center justify-center mb-12 relative'>
          <div className='w-full overflow-x-auto scrollbar-hide'>
            <div className='flex justify-center md:space-y-0 md:space-x-8 space-x-4 relative bg-white/80 backdrop-blur-sm rounded-2xl p-2 mt-[2.5rem] min-w-max mx-auto'>
              {categories.map((category, index) => (
                <div
                  key={category.id}
                  className={`${
                    category.name === 'Filter' 
                      ? 'flex items-center p-3 gap-2 bg-tertiary justify-center cursor-pointer transition-all duration-300 rounded-full group relative flex-shrink-0' 
                      : 'flex flex-col items-center cursor-pointer transition-all justify-center duration-300 pb-[5x] px-1 rounded-full group relative flex-shrink-0'
                  } ${
                    activeCategory === category.name 
                      ? '' 
                      : ''
                  }`}
                  onClick={() => handleCategoryChange(category.name)} 
                >
                  <div className="transition-transform duration-200 group-hover:scale-110">
                    <img 
                      src={category.icon} 
                      alt={category.name} 
                      className="w-6 h-6" 
                    />
                  </div>
                  <p className="text-xs font-normal mt-1 whitespace-nowrap">
                    {category.name}
                  </p>
                  
                  {/* Active indicator */}
                  {activeCategory === category.name && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-[72px] h-[2px] bg-primary rounded-full"></div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Top Picks Section */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-[24px] font-bold mb-1 text-left"> 
              Best Deals In Your Location
            </h2>
            <p className="text-gray-600 text-left text-xs mb-4">Explore unbeatable car rental deals near you. Get the best rates on top-quality vehicles for a smooth and affordable ride.</p>
          </div>
          
          <div 
            className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ease-out ${
              isTransitioning 
                ? 'opacity-0 transform translate-y-12 scale-95' 
                : 'opacity-100 transform translate-y-0 scale-100'
            }`}
            style={{
              transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
            }}
          >
            {displayedProperties.slice(0, 3).map((property, index) => (
              <div
                key={property.id}
                className={`transition-all duration-500 ease-out ${
                  isTransitioning 
                    ? 'opacity-0 transform translate-y-8' 
                    : 'opacity-100 transform translate-y-0'
                }`}
                style={{
                  transitionDelay: isTransitioning ? '0ms' : `${index * 100}ms`,
                  transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              >
                <PropertyCard property={property} index={index} />
              </div>
            ))}
          </div>
        </div>

        {/* Explore Listings Section */}
        <div className="mb-8">
          <h2 className="text-[24px] text-left font-bold mb-1">Explore Listings</h2>
          <p className="text-gray-600 text-xs mb-6">Explore top listings with premium features, great deals, and unmatched performance.</p>
          
          {/* Desktop: 4 columns, 3 rows (12 cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {exploreCars.slice(0, 12).map((property) => (
              <PropertyCard key={property.id} property={property} />
            ))}
          </div>
          
          {/* Additional cards shown when "More" is clicked */}
          {showMoreExplore && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 transition-all duration-500 ease-in-out">
              {exploreCars.slice(12).map((property) => (
                <PropertyCard key={property.id} property={property} />
              ))}
            </div>
          )}
          
          {/* More Button */}
          <div className="text-center">
            <button 
              onClick={() => setShowMoreExplore(!showMoreExplore)}
              className="bg-primary text-xs text-white px-8 py-3 rounded-full font-medium hover:bg-primary transition-colors duration-200 flex items-center gap-2 mx-auto"
            >
              {showMoreExplore ? 'Show Less' : 'Show More'}
              {showMoreExplore ? (
                <ChevronUp className="w-4 h-4" />
              ) : (
                <ChevronDown className="w-4 h-4 !text-white !border-white" />
              )}
            </button>
          </div>
        </div>
      </section>
      
      <style>{`
        .scrollbar-hide {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
        .scrollbar-hide::-webkit-scrollbar {
          display: none;
        }
        
        @keyframes heartBeat {
          0% { transform: scale(1); }
          25% { transform: scale(1.2); }
          50% { transform: scale(1.1); }
          75% { transform: scale(1.25); }
          100% { transform: scale(1); }
        }
      `}</style>
    </>
  );
};

export default CarCat;