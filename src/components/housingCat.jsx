import React, { useState, useEffect, useCallback } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';
import { useProperty } from '../context/PropertyContext';
import PropertyCard from './PropertyCard';

import door from "../assets/door.svg"
import filter from "../assets/filter.svg"
import hotel from "../assets/hotel.svg"
import house from "../assets/house.svg"
import space3 from "../assets/space.svg"

import house1 from "../assets/house1.webp"
import house2 from "../assets/house2.webp"
import house3 from "../assets/house3.webp"
import house4 from "../assets/house4.webp"
import house5 from "../assets/house5.webp"

import house6 from "../assets/house02.webp"
import house7 from "../assets/house03.webp"
import house8 from "../assets/house04.webp"
import house9 from "../assets/house05.webp"
import house10 from "../assets/house6.webp"
import house11 from "../assets/house7.webp"
import house12 from "../assets/house8.webp"
import house13 from "../assets/house10.webp"
import house14 from "../assets/house11.webp"
import house15 from "../assets/house12.webp"

// ─── Declared at MODULE level so these objects are created ONCE ──────────────
// This is critical: if declared inside HousingCat, a new object is created on
// every render, and React.memo on PropertyCard can't bail out because it sees
// a different `images` array reference each time.
const imageArrays = {
  1: [house1, house2, house3, house4, house5],
  2: [house7, house2, house3, house4, house5],
  3: [house6, house2, house3, house4, house5],
  4: [house7, house2, house3, house4, house5],
  5: [house2, house2, house3, house4, house5],
  6: [house8, house2, house3, house4, house5],
  7: [house9, house2, house3, house4, house5],
  8: [house3, house2, house3, house4, house5],
  9: [house10, house2, house3, house4, house5],
  10: [house11, house2, house3, house4, house5],
  11: [house15, house2, house3, house4, house5],
  12: [house12, house2, house3, house4, house5],
  13: [house5, house2, house3, house4, house5],
  14: [house14, house2, house3, house4, house5],
  15: [house13, house2, house3, house4, house5],
  16: [house5, house2, house3, house4, house5],
  17: [house15, house2, house3, house4, house5],
  18: [house13, house2, house3, house4, house5],
  19: [house12, house2, house3, house4, house5],
  20: [house11, house2, house3, house4, house5],
  21: [house10, house2, house3, house4, house5],
  22: [house9, house2, house3, house4, house5],
  23: [house8, house2, house3, house4, house5],
  24: [house7, house2, house3, house4, house5],
  25: [house6, house2, house3, house4, house5],
  26: [house4, house2, house3, house4, house5],
  27: [house2, house2, house3, house4, house5],
};

const fallbackImages = [house1, house2, house3, house4, house5];

const categories = [
  { id: 'new', name: 'New Apartments', icon: house },
  { id: 'studio', name: 'Studio Apartments', icon: door },
  { id: 'duplex', name: 'Duplex', icon: hotel },
  { id: 'bungalow', name: 'Bungalow', icon: space3 },
  { id: 'filter', name: 'Filter', icon: filter },
];
// ─────────────────────────────────────────────────────────────────────────────

const HousingCat = () => {
  const { allProperties, exploreProperties } = useProperty();

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
    setDisplayedProperties(allProperties[activeCategory] || []);
  }, [activeCategory, allProperties]);

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

        {/* ── Top Picks ── */}
        <div className="mb-16">
          <div className="text-center mb-8">
            <h2 className="text-[24px] font-bold mb-1 text-left">
              Top Picks for your Unmatched comfort.
            </h2>
            <p className="text-gray-600 text-left text-xs mb-4">
              Stay in top-rated apartments loved by our guests for luxury, convenience, and prime locations.
            </p>
          </div>

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
                  images={imageArrays[property.id] || fallbackImages}
                  showCarousel={true}
                />
              </div>
            ))}
          </div>
        </div>

        {/* ── Explore Listings ── */}
        <div className="mb-8">
          <h2 className="text-[24px] text-left font-bold mb-1">Explore Listings</h2>
          <p className="text-gray-600 text-xs mb-6">
            Explore top listings with premium amenities, great locations, and unmatched comfort.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {exploreProperties.slice(0, 12).map((property) => (
              <PropertyCard
                key={property.id}
                property={property}
                images={imageArrays[property.id] || fallbackImages}
              />
            ))}
          </div>

          {showMoreExplore && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-6 transition-all duration-500 ease-in-out">
              {exploreProperties.slice(12).map((property) => (
                <PropertyCard
                  key={property.id}
                  property={property}
                  images={imageArrays[property.id] || fallbackImages}
                />
              ))}
            </div>
          )}

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