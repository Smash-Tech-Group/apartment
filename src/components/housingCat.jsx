import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, ChevronUp, Search } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from './PropertyCard';

import door from "../assets/door.svg"
import filter from "../assets/filter.svg"
import hotel from "../assets/hotel.svg"
import house from "../assets/house.svg"
import space3 from "../assets/space.svg"

// Fallback images for properties without photos
import house1 from "../assets/house1.webp"
import house2 from "../assets/house2.webp"
import house3 from "../assets/house3.webp"

const fallbackImages = [house1, house2, house3];

const categories = [
  { id: 'new', name: 'New Apartments', icon: house },
  { id: 'studio', name: 'Studio Apartments', icon: door },
  { id: 'duplex', name: 'Duplex', icon: hotel },
  { id: 'bungalow', name: 'Bungalow', icon: space3 },
  { id: 'filter', name: 'Filter', icon: filter },
];

const HousingCat = () => {
  const { allProperties, exploreProperties, filteredProperties, filteredExploreProperties, searchFilters, loading } = useProperty();

  const [activeCategory, setActiveCategory] = useState('New Apartments');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [displayedProperties, setDisplayedProperties] = useState([]);
  const [showMoreExplore, setShowMoreExplore] = useState(false);

  const handleCategoryChange = useCallback((categoryName) => {
    if (categoryName === activeCategory || categoryName === 'Filter') return;

    setIsTransitioning(true);
    setTimeout(() => {
      setActiveCategory(categoryName);
      setTimeout(() => setIsTransitioning(false), 100);
    }, 300);
  }, [activeCategory]);

  useEffect(() => {
    setDisplayedProperties(filteredProperties[activeCategory] || []);
  }, [activeCategory, filteredProperties]);

  // Get images for a property — use its own photos or fallback
  const getPropertyImages = useCallback((property) => {
    if (property.images && property.images.length > 0) {
      return property.images;
    }
    return fallbackImages;
  }, []);

  const isSearchActive = (searchFilters.destination || '').trim().length > 0;

  return (
    <>
      <section className='max-w-screen-2xl mx-auto'>

        {/* ── Category Navigation ── */}
        <div className='flex items-center justify-center mb-12 relative'>
          <div className='w-full overflow-x-auto scrollbar-hide'>
            <div className='flex justify-center md:space-y-0 md:space-x-8 space-x-4 relative bg-white/80 backdrop-blur-sm rounded-2xl p-2 mt-[2.5rem] min-w-max mx-auto'>
              {categories.map((category) => (
                <div
                  key={category.id}
                  className={`${category.name === 'Filter'
                      ? 'flex items-center p-3 gap-2 bg-tertiary justify-center cursor-pointer transition-all duration-300 rounded-full group relative flex-shrink-0'
                      : 'flex flex-col items-center cursor-pointer transition-all justify-center duration-300 pb-[5x] px-1 rounded-full group relative flex-shrink-0'
                    }`}
                  onClick={() => handleCategoryChange(category.name)}
                >
                  <div className="transition-transform duration-200 group-hover:scale-110">
                    <img src={category.icon} alt={category.name} className="w-6 h-6" />
                  </div>
                  <p className="text-xs font-normal mt-1 whitespace-nowrap">{category.name}</p>

                  {activeCategory === category.name && (
                    <div className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-[72px] h-[2px] bg-primary rounded-full" />
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* ── Loading State ── */}
        {loading && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-[24px] font-bold mb-1 text-left">
                Top Picks for your Unmatched comfort.
              </h2>
              <p className="text-gray-600 text-left text-xs mb-4">
                Loading listings…
              </p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3].map((i) => (
                <div key={i} className="animate-pulse">
                  <div className="bg-gray-200 rounded-xl h-[350px] mb-3" />
                  <div className="h-4 bg-gray-200 rounded w-3/4 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/2 mb-2" />
                  <div className="h-3 bg-gray-200 rounded w-1/3" />
                </div>
              ))}
            </div>
          </div>
        )}

        {/* ── Top Picks — always visible when not loading ── */}
        {!loading && (
          <div className="mb-16">
            <div className="text-center mb-8">
              <h2 className="text-[24px] font-bold mb-1 text-left">
                Top Picks for your Unmatched comfort.
              </h2>
              <p className="text-gray-600 text-left text-xs mb-4">
                Stay in top-rated apartments loved by our guests for luxury, convenience, and prime locations.
              </p>
            </div>

            {displayedProperties.length > 0 ? (
              <div
                className={`grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 transition-all duration-700 ease-out ${isTransitioning
                    ? 'opacity-0 transform translate-y-12 scale-95'
                    : 'opacity-100 transform translate-y-0 scale-100'
                  }`}
                style={{ transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)' }}
              >
                {displayedProperties.slice(0, 3).map((property, index) => (
                  <div
                    key={property.id}
                    className={`transition-all duration-500 ease-out ${isTransitioning ? 'opacity-0 transform translate-y-8' : 'opacity-100 transform translate-y-0'
                      }`}
                    style={{
                      transitionDelay: isTransitioning ? '0ms' : `${index * 100}ms`,
                      transition: 'opacity 0.4s cubic-bezier(0.4, 0, 0.2, 1), transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)'
                    }}
                  >
                    <PropertyCard
                      property={property}
                      images={getPropertyImages(property)}
                      showCarousel={true}
                    />
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-50 flex items-center justify-center">
                  <Search className="w-8 h-8 text-orange-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {isSearchActive ? 'No apartments match your search' : 'No apartments available'}
                </h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  {isSearchActive
                    ? 'Try adjusting your destination or guest count to see more results.'
                    : 'New listings will appear here once they are published.'}
                </p>
              </div>
            )}
          </div>
        )}

        {/* ── Explore Listings — always visible when not loading ── */}
        {!loading && (
          <div className="mb-8">
            <h2 className="text-[24px] text-left font-bold mb-1">Explore Listings</h2>
            <p className="text-gray-600 text-xs mb-6">
              Explore top listings with premium amenities, great locations, and unmatched comfort.
            </p>

            {filteredExploreProperties.length > 0 ? (
              <>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
                  {filteredExploreProperties.slice(0, 12).map((property) => (
                    <PropertyCard
                      key={property.id}
                      property={property}
                      images={getPropertyImages(property)}
                    />
                  ))}
                </div>

                {showMoreExplore && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 transition-all duration-500 ease-in-out">
                    {filteredExploreProperties.slice(12).map((property) => (
                      <PropertyCard
                        key={property.id}
                        property={property}
                        images={getPropertyImages(property)}
                      />
                    ))}
                  </div>
                )}

                {filteredExploreProperties.length > 12 && (
                  <div className="text-center">
                    <button
                      onClick={() => setShowMoreExplore(!showMoreExplore)}
                      className="bg-primary text-xs text-white px-8 py-3 rounded-full font-medium hover:bg-primary transition-colors duration-200 flex items-center gap-2 mx-auto"
                    >
                      {showMoreExplore ? 'Show Less' : 'Show More'}
                      {showMoreExplore
                        ? <ChevronUp className="w-4 h-4" />
                        : <ChevronDown className="w-4 h-4 !text-white !border-white" />
                      }
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="text-center py-12 bg-gray-50 rounded-2xl">
                <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-orange-50 flex items-center justify-center">
                  <Search className="w-8 h-8 text-orange-300" />
                </div>
                <h3 className="text-lg font-semibold text-gray-700 mb-2">
                  {isSearchActive ? 'No listings match your search' : 'No listings available yet'}
                </h3>
                <p className="text-gray-500 text-sm max-w-md mx-auto">
                  {isSearchActive
                    ? 'Try a different destination or adjust your filters.'
                    : 'Be the first to list your property! Listings will appear here once published.'}
                </p>
              </div>
            )}
          </div>
        )}

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
          0%   { transform: scale(1);    }
          25%  { transform: scale(1.2);  }
          50%  { transform: scale(1.1);  }
          75%  { transform: scale(1.25); }
          100% { transform: scale(1);    }
        }
      `}</style>
    </>
  );
};

export default HousingCat;