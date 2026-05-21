import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import SecImg from "../assets/secondImg.webp"
import Housing from "../components/housingCat"
import { useProperty } from '../context/PropertyContext';

const SecondLayout = () => {
 const { setSearchFilters } = useProperty();

 const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: ''
  });

  // Sync search data to context whenever it changes
  useEffect(() => {
    setSearchFilters({
      destination: searchData.destination,
      checkIn: searchData.checkIn,
      checkOut: searchData.checkOut,
      guests: parseInt(searchData.guests) || 0,
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




    <section>
<div className='max-w-screen-2xl pb-[2rem]'>
      {/* Search Filter */}
          <div className="bg-white rounded-2xl flex-col py-[1rem] mx-auto flex md:hidden items-center shadow-md max-w-5xl">
            
            {/* Destination */}
            <div className="flex-1 px-4 py-3 border-gray-200  flex justify-center text-center">
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
                    className="w-full border-none outline-none text-gray-900 text-center placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
  
            {/* Check In */}
            <div className="flex-1 px-4 py-3  border-gray-200  flex justify-center text-center">
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
                    className="w-full border-none outline-none text-gray-900 text-center placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
  
            {/* Check Out */}
            <div className="flex-1 px-4 py-3 border-gray-200 flex justify-center text-center">
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
                    className="w-full border-none outline-none text-gray-900 text-center placeholder-gray-400"
                  />
                </div>
              </div>
            </div>
  
            {/* Guests */}
            <div className="flex-1 px-4 py-3 border-gray-200 flex justify-center text-center">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">
                    Guests
                  </label>
                  <input
                    type="number"
                    placeholder="Add number of guests"
                    value={searchData.guests}
                    onChange={(e) => handleInputChange('guests', e.target.value)}
                    className="w-full border-none outline-none text-gray-900 text-center placeholder-gray-400"
                    min="1"
                  />
                </div>
              </div>
            </div>
  
            {/* Search Button */}
            <div className="px-2 pt-4 text-black ">
              <button
                onClick={handleSearch}
                className="bg-tertiary  py-4 px-[4rem] rounded-full transition-colors duration-200 flex items-center justify-between"
              >
                <p className='mr-3 text-md font-semibold'>Search Stay</p>
                <Search className="w-6 h-6" />
              </button>
            </div>
          </div>
</div>


  <div className='flex flex-col md:flex-row items-center mx-auto justify-between w-full border p-6 max-w-screen-2xl rounded-2xl'>



        <div>
            <img src={SecImg} alt="" />
        </div>
<div className='md:ml-[1.5rem] mt-3 md:mt-0'>
<h3 className='text-[32px] font-bold max-w-[600px] leading-[40px] mb-3'>
    Get<span className='text-primary'> 50%</span> Off Your First Stay with Smash Apartments!
</h3>
        <p className='text-xs'>
            Your dream stay just got more affordable! As a first-time user, enjoy an exclusive 50% discount on any apartment or short-let booking.
             Whether you're traveling for business or leisure, experience top-tier comfort, prime locations,
             and seamless booking—all at half the price. Book now and make your stay unforgettable!
        </p>
</div>



    </div> 


    <div>
      <Housing/>
    </div>
    </section>
  
    </>


  );
};

export default SecondLayout;