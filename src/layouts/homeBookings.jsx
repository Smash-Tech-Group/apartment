import React, { useState, useRef, useEffect } from 'react';
import { Search, MapPin, Calendar, Users, ChevronDown } from 'lucide-react';
import homeImg from "../assets/homepage.webp"
import { useProperty } from '../context/PropertyContext';

const HomeBookings = () => {
  const { setSearchFilters } = useProperty();

  const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: {
      adults: 1,
      children: 0,
      infants: 0
    }
  });

  const [showGuestDropdown, setShowGuestDropdown] = useState(false);
  const dropdownRef = useRef(null);

  // Sync search data to context whenever it changes
  useEffect(() => {
    const totalGuests = searchData.guests.adults + searchData.guests.children + searchData.guests.infants;
    setSearchFilters({
      destination: searchData.destination,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      guests: totalGuests,
    });
  }, [searchData, setSearchFilters]);

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleGuestChange = (type, operation) => {
    setSearchData(prev => ({
      ...prev,
      guests: {
        ...prev.guests,
        [type]: operation === 'increase' 
          ? prev.guests[type] + 1 
          : Math.max(0, prev.guests[type] - 1)
      }
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

  const handleSearch = () => {
    console.log('Search data:', searchData);
    // Add your search logic here
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowGuestDropdown(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <>
      <div 
        className="relative mx-auto max-w-screen-2xl rounded-2xl overflow-hidden"
        style={{
          height: '476px'
        }}
      >
        {/* Animated Background Image */}
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{
            backgroundImage: `url(${homeImg})`,
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            animation: 'slowZoom 12s ease-in-out infinite alternate'
          }}
        />
        
        {/* Static Linear Gradient Overlay */}
        <div
          className="absolute inset-0"
          style={{
            background: 'linear-gradient(rgba(255, 125, 1, 0.1), rgba(255, 125, 1, 0.1))'
          }}
        />
        <style>{`
          @keyframes slowZoom {
            0% {
              transform: scale(1);
            }
            100% {
              transform: scale(1.05);
            }
          }
        `}</style>

        {/* Content Container */}
        <div className="h-full flex mt-[2.8rem] flex-col justify-center px-6 md:px-12 relative z-10">
          
          {/* Header Text - Center Left */}
          <div className="mb-8 max-w-[600px] ">
            <h1 className="text-[40px] font-bold text-white leading-[45px] mb-4">
              Find Your Perfect Stay with Smash Apartments
            </h1>
            <p className="text-md text-white/90">
              Book luxury apartments and short-let stays with ease. Experience comfort, convenience, and premium hospitality—whether for a getaway, business trip, or extended stay.
            </p>
          </div>

          {/* Search Filter */}
          <div className="hidden bg-white text-xs whitespace-nowrap rounded-full mx-auto md:flex items-center shadow-lg relative">
            
            {/* Destination */}
            <div className="flex-1 px-4 py-3 border-r border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">
                    Where are you going?
                  </label>
                  <input
                    type="text"
                    placeholder="Search your destination"
                    value={searchData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    className="w-full border-none outline-none text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

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
                    onChange={(e) => handleInputChange('checkIn', e.target.value)}
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
                    onChange={(e) => handleInputChange('checkOut', e.target.value)}
                    className="w-full border-none outline-none text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Guests */}
            <div className="flex-1 px-4 py-3 border-r border-gray-200 relative" ref={dropdownRef}>
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
                <div className="!absolute top-[-150px] left-[-80px] right-0 mt-2 bg-white min-w-[440px] p-4 rounded-xl" style={{ zIndex: 9999 }}>
                  <div className="space-y-4">
                    <div className="text-sm font-semibold text-gray-700 mb-3">
                      Select Number of Guests
                    </div>
                    
                    <div className='flex items-center'>
                                    {/* Adults */}
                    <div className="flex flex-col  border-r px-2  items-center justify-between">
                      <div className='flex items-center gap-1 mb-4'>
                        <div className="font-medium text-gray-900">Adults</div>
                        <div className="text-xs text-gray-500">12+ Years</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleGuestChange('adults', 'decrease')}
                          className="w-8 h-8 rounded-full  bg-tertiary  flex items-center justify-center hover:bg-primary disabled:opacity-50"
                          disabled={searchData.guests.adults <= 1}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{searchData.guests.adults}</span>
                        <button
                          onClick={() => handleGuestChange('adults', 'increase')}
                          className="w-8 h-8 rounded-full  bg-tertiary flex items-center justify-center hover:bg-primary "
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Children */}
                    <div className="flex flex-col  border-r  px-2  items-center justify-between">
                      <div className='flex items-center gap-1 mb-4'>
                        <div className="font-medium text-gray-900">Children</div>
                        <div className="text-xs text-gray-500">2-12 Years</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleGuestChange('children', 'decrease')}
                          className="w-8 h-8 rounded-full  bg-tertiary  flex items-center justify-center hover:bg-primary  disabled:opacity-50"
                          disabled={searchData.guests.children <= 0}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{searchData.guests.children}</span>
                        <button
                          onClick={() => handleGuestChange('children', 'increase')}
                          className="w-8 h-8 rounded-full  bg-tertiary  flex items-center justify-center hover:bg-primary"
                        >
                          +
                        </button>
                      </div>
                    </div>

                    {/* Infants */}
                    <div className="flex flex-col px-2 items-center justify-between">
                      <div className='flex items-center gap-1 mb-4'>
                        <div className="font-medium text-gray-900">Infants</div>
                        <div className="text-xs text-gray-500">&lt; 2 Years</div>
                      </div>
                      <div className="flex items-center space-x-3">
                        <button
                          onClick={() => handleGuestChange('infants', 'decrease')}
                          className="w-8 h-8 rounded-full flex bg-tertiary items-center justify-center hover:bg-primary  disabled:opacity-50"
                          disabled={searchData.guests.infants <= 0}
                        >
                          -
                        </button>
                        <span className="w-8 text-center">{searchData.guests.infants}</span>
                        <button
                          onClick={() => handleGuestChange('infants', 'increase')}
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

            {/* Search Button */}
            <div className="px-2">
              <button
                onClick={handleSearch}
                className="bg-tertiary text-white p-4 rounded-full transition-colors duration-200 flex items-center justify-center"
              >
                <Search className="w-6 h-6 text-black" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default HomeBookings;