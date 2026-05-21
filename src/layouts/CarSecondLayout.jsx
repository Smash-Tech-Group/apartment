import React, { useState, useEffect } from 'react';
import { Search, MapPin, Calendar, Users } from 'lucide-react';
import SecImg from "../assets/carsecond.png"
import CarCat from "../components/carCat"
import { useCar } from '../context/CarContext';

const SecondLayout = () => {
 const { setSearchFilters } = useCar();

 const [searchData, setSearchData] = useState({
    destination: '',
    checkIn: '',
    checkOut: '',
    guests: ''
  });

  // Sync search data to context whenever it changes
  useEffect(() => {
    setSearchFilters({
      location: searchData.destination,
      pickUpDate: searchData.checkIn,
      pickUpTime: '',
      returnDate: searchData.checkOut,
      returnTime: '',
      needDriver: null,
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


          {/* Search Filter */}
          <div className="text-xs bg-white rounded-2xl mx-auto flex flex-col my-[2rem] py-[1rem] flex md:hidden items-center shadow-lg">
            
            {/* Destination */}
            <div className="flex flex-1 px-4 py-3 w-full justify-center text-center border-gray-200">
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
                    className="w-full border-none outline-none text-gray-900 text-center  placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* PickUp Date */}
            <div className="flex-1 flex px-4 py-3 w-full justify-center text-center  border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">
                    Pick-Up Date
                  </label>
                  <input
                    type="date"
                    value={searchData.pickUpDate}
                    onChange={(e) => handleInputChange('pickUpDate', e.target.value)}
                    className="w-full border-none outline-none text-gray-900 text-center  placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* PickUp Time */}
            <div className="flex-1 flex px-4 py-3 w-full justify-center text-center  border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">
                    Pick-Up Time
                  </label>
                  <input
                    type="time"
                    value={searchData.pickUpTime}
                    onChange={(e) => handleInputChange('pickUpTime', e.target.value)}
                    className="w-full border-none outline-none text-gray-900 text-center  placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Return Date */}
            <div className="flex-1 flex px-4 py-3 w-full justify-center text-center  border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">
                    Return Date
                  </label>
                  <input
                    type="date"
                    value={searchData.returnDate}
                    onChange={(e) => handleInputChange('returnDate', e.target.value)}
                    className="w-full border-none outline-none text-gray-900 text-center  placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Return Time */}
            <div className="flex-1 flex px-4 py-3 w-full justify-center text-center  border-gray-200">
              <div className="flex items-center space-x-3">
                <div className="flex-1">
                  <label className="block text-sm font-semibold mb-1">
                    Return Time
                  </label>
                  <input
                    type="time"
                    value={searchData.returnTime}
                    onChange={(e) => handleInputChange('returnTime', e.target.value)}
                    className="w-full border-none outline-none text-gray-900 text-center placeholder-gray-400"
                  />
                </div>
              </div>
            </div>

            {/* Need a Driver */}
            <div className="flex-1 flex px-4 py-3 w-full justify-center text-center  border-gray-200">
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
                        className="w-4 h-4 text-blue-600 border-gray-300 text-center focus:ring-blue-500"
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
                        className="w-4 h-4 text-blue-600 border-gray-300 text-center  focus:ring-blue-500"
                      />
                      <span className="text-sm text-gray-700">No</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Search Button */}
              <div className="px-2 pt-4 text-black ">
                      <button
                        onClick={handleSearch}
                        className="bg-tertiary  py-4 px-[4rem] rounded-full transition-colors duration-200 flex items-center justify-between"
                      >
                        <p className='mr-3 text-md font-semibold'>Search Car</p>
                        <Search className="w-6 h-6" />
                      </button>
                    </div>
          </div>



  <div className='flex flex-col md:flex-row items-center mx-auto justify-between w-full border p-6 max-w-screen-2xl rounded-2xl'>



        <div>
            <img src={SecImg} alt="" />
        </div>
<div className='md:ml-[1.5rem] mt-3 md:mt-0'>
<h3 className='text-[32px] font-bold max-w-[600px] leading-[40px] mb-3'>
    Enjoy an Exclusive <span className='text-primary'> 50%</span> Discount on Your First Car Rental with Smash Apartments!
</h3>
        <p className='text-xs'>
      This offer is valid for new users only and applies to the base rental fee. Additional charges may apply for extras, insurance, or extended rental periods. Terms and conditions apply.
        </p>
</div>



    </div> 


    <div>
      <CarCat/>
    </div>
    </section>
  
    </>


  );
};

export default SecondLayout;