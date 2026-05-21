import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import homeImg from "../assets/carHeroImg.webp"
import { useCar } from '../context/CarContext';


const CarBookings = () => {
  const { setSearchFilters } = useCar();

  const [searchData, setSearchData] = useState({
    destination: '',
    pickUpDate: '',
    pickUpTime: '',
    returnDate: '',
    returnTime: '',
    needDriver: false
  });

  // Sync search data to context whenever it changes
  useEffect(() => {
    setSearchFilters({
      location: searchData.destination,
      pickUpDate: searchData.pickUpDate,
      pickUpTime: searchData.pickUpTime,
      returnDate: searchData.returnDate,
      returnTime: searchData.returnTime,
      needDriver: searchData.needDriver,
    });
  }, [searchData, setSearchFilters]);

  const handleInputChange = (field, value) => {
    setSearchData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSearch = () => {
    console.log('Search data:', searchData);
  };

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
            background: 'linear-gradient(rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.3))'
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
          <div className="mb-8 max-w-[600px]">
            <h1 className="text-[40px] font-bold text-white leading-[45px] mb-4">
              Rent a Car with Ease, <br/> Drive in Style
            </h1>
            <p className="text-md text-white/90">
              Explore our seamless car rental service, offering a wide range of vehicles for your travel needs. Whether for business or leisure, book the perfect ride at unbeatable rates.
            </p>
          </div>

          {/* Search Filter */}
          <div className="hidden text-xs bg-white rounded-full mx-auto md:flex items-center shadow-lg">
            
            {/* Destination */}
            <div className="flex-1 px-4 py-3 border-r border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <label className="block whitespace-nowrap text-sm font-semibold mb-1">
                    What is your Location?
                  </label>
                  <input
                    type="text"
                    placeholder="Search Location"
                    value={searchData.destination}
                    onChange={(e) => handleInputChange('destination', e.target.value)}
                    className="w-full border-none outline-none text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* PickUp Date */}
            <div className="flex-1 px-4 py-3 border-r border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <label className="block whitespace-nowrap text-sm font-semibold mb-1">
                    Pick-Up Date
                  </label>
                  <input
                    type="date"
                    value={searchData.pickUpDate}
                    onChange={(e) => handleInputChange('pickUpDate', e.target.value)}
                    className="w-full border-none outline-none text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* PickUp Time */}
            <div className="flex-1 px-4 py-3 border-r border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <label className="block whitespace-nowrap text-sm font-semibold mb-1">
                    Pick-Up Time
                  </label>
                  <input
                    type="time"
                    value={searchData.pickUpTime}
                    onChange={(e) => handleInputChange('pickUpTime', e.target.value)}
                    className="w-full border-none outline-none text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Return Date */}
            <div className="flex-1 px-4 py-3 border-r border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">
                    Return Date
                  </label>
                  <input
                    type="date"
                    value={searchData.returnDate}
                    onChange={(e) => handleInputChange('returnDate', e.target.value)}
                    className="w-full border-none outline-none text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Return Time */}
            <div className="flex-1 px-4 py-3 border-r border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">
                    Return Time
                  </label>
                  <input
                    type="time"
                    value={searchData.returnTime}
                    onChange={(e) => handleInputChange('returnTime', e.target.value)}
                    className="w-full border-none outline-none text-gray-900 placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Need a Driver */}
            <div className="flex-1 px-4 py-3 border-r border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">
                    Need a Driver?
                  </label>
                  <div className="flex items-center space-x-4">
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="needDriver"
                        value="yes"
                        checked={searchData.needDriver === true}
                        onChange={() => handleInputChange('needDriver', true)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">Yes</span>
                    </label>
                    <label className="flex items-center space-x-2">
                      <input
                        type="radio"
                        name="needDriver"
                        value="no"
                        checked={searchData.needDriver === false}
                        onChange={() => handleInputChange('needDriver', false)}
                        className="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button */}
            <div className="px-2">
              <button
                onClick={handleSearch}
                className="bg-tertiary text-black p-4 rounded-full transition-colors duration-200 flex items-center justify-center"
              >
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CarBookings;