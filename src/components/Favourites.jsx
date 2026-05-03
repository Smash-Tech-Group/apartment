import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreditCard from "../assets/icons/9.svg";
import Shield from "../assets/icons/12.svg";
import HelpCircle from "../assets/icons/5.svg";
import Navbar from "./Navbar";
import Lock from "../assets/icons/2.svg";
import Bunk from "../assets/icons/19.svg";   
import Desk from "../assets/icons/20.svg";   
import Home from "../assets/icons/32.svg";  
import Car from "../assets/icons/33.svg";
import Heart from "../assets/icons/34.svg";
import Stay1 from "../assets/images/1.png";
import Stay2 from "../assets/images/2.png";
import Stay3 from "../assets/images/3.png";
import Car1 from "../assets/images/4.png";
import Car2 from "../assets/images/5.png";
import Car3 from "../assets/images/6.png";
export default function Favorites() {
  const [activeTab, setActiveTab] = useState("stays"); 
  const [showMoreStays, setShowMoreStays] = useState(false);
  const [showMoreCars, setShowMoreCars] = useState(false);

  // Dummy data arrays
  const stayFavorites = [
    {
      id: "stay-1",
      title: "6 Bedroom Duplex",
      location: "Katampe, Abuja",
      rating: 9.5,
      price: "₦490,000",
      image: Stay1,
    },
    {
      id: "stay-2",
      title: "4 Bedroom Duplex",
      location: "Gwarimpa, Abuja",
      rating: 7.5,
      price: "₦490,000",
      image: Stay2,
    },
    {
      id: "stay-3",
      title: "4 Bedroom Duplex",
      location: "Gwarimpa, Abuja",
      rating: 7.5,
      price: "₦490,000",
      image: Stay3,
    },
  ];

  const stayFavoritesMore = [
    {
      id: "stay-4",
      title: "3 Bedroom Terrace",
      location: "Wuse, Abuja",
      rating: 8.1,
      price: "₦350,000",
      image: Stay2,
    },
    {
      id: "stay-5",
      title: "Studio Apartment",
      location: "Asokoro, Abuja",
      rating: 8.8,
      price: "₦220,000",
      image: Stay3,
    },
  ];

  const carFavorites = [
    {
      id: "car-1",
      title: "2018 GT",
      location: "Abuja",
      rating: 8.2,
      price: "₦490,000",
      image: Car1,
      tag: null,
    },
    {
      id: "car-2",
      title: "2024 Mercedes S class",
      location: "Abuja",
      rating: 8.2,
      price: "₦490,000",
      image: Car2,
      tag: "Driver Assigned",
    },
    {
      id: "car-3",
      title: "2024 Mercedes Benz AMG",
      location: "Abuja",
      rating: 8.2,
      price: "₦490,000",
      image: Car3,
      tag: null,
    },
  ];

  const carFavoritesMore = [
    {
      id: "car-4",
      title: "Toyota Camry 2022",
      location: "Abuja",
      rating: 7.9,
      price: "₦240,000",
      image: Car1,
      tag: null,
    },
  ];


  const displayedStays = showMoreStays ? [...stayFavorites, ...stayFavoritesMore] : stayFavorites;
  const displayedCars = showMoreCars ? [...carFavorites, ...carFavoritesMore] : carFavorites;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <Navbar showNavLinks={false} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-20 sm:pt-28 flex-1 w-full">
        {/* Breadcrumb */}
        <div className="mb-6 text-xs sm:text-sm text-gray-600 bg-[#FF7D011A] w-fit px-3 sm:px-4 py-2 rounded-full flex items-center">
          <Link to="/dashboard" className="font-semibold underline cursor-pointer hover:text-gray-900">Booking Activity</Link>
          <span className="mx-1 sm:mx-2">|</span>
          <span className="text-gray-900">Favorites</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left  */}
          <div className="flex-1">
            <div className="flex gap-x-10">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 sm:mb-8">Favorites</h1>
                {/* Tabs */}
                <div className="flex items-center gap-6 mb-8">
                    <div className="flex flex-col items-center">
                        <div>
                            <img src={Home} />
                        </div>
                        <div>
                            <button
                                onClick={() => setActiveTab("stays")}
                                className={`pb-2 px-4 text-xs font-normal ${activeTab === "stays" ? " border-b-2 border-[#FF7D01]" : "text-gray-500"}`}
                            >
                                Stays
                            </button>
                        </div>
                    </div>
                    <div className="flex flex-col items-center">
                        <div>
                            <img src={Car} />
                        </div>
                        <div>
                            <button
                                onClick={() => setActiveTab("cars")}
                                className={`pb-2 px-2 text-xs font-normal ${activeTab === "cars" ? "text-[#FF7D01] border-b-2 border-[#FF7D01] font-medium" : "text-gray-500"}`}
                            >
                                Car Rentals
                            </button>
                        </div>

                    </div>
                    
                </div>
            </div>
            

            

            {/* Content list */}
            <div className="space-y-8">
              {activeTab === "stays" && (
                <div>
                  {displayedStays.map((item) => (
                    <FavoriteItem
                      key={item.id}
                      item={item}
                      type="stay"
                    />
                  ))}

                  {/* Show More */}
                  {!showMoreStays && stayFavoritesMore.length > 0 && (
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={() => setShowMoreStays(true)}
                        className="text-[#FF7D01] font-medium inline-flex items-center gap-2"
                      >
                        Show More <span className="text-base">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M6.29659 12.079V0.500007C6.29659 0.358007 6.34425 0.239007 6.43959 0.143007C6.53492 0.047007 6.65392 -0.00065977 6.79659 6.89653e-06C6.93926 0.000673563 7.05826 0.0483404 7.15359 0.143007C7.24892 0.237674 7.29659 0.356674 7.29659 0.500007V12.079L12.7356 6.64001C12.8329 6.54267 12.9476 6.49167 13.0796 6.48701C13.2116 6.48301 13.3326 6.53634 13.4426 6.64701C13.5493 6.75634 13.6036 6.87401 13.6056 7.00001C13.6069 7.12534 13.5526 7.24334 13.4426 7.35401L7.36259 13.434C7.27459 13.5213 7.18526 13.5827 7.09459 13.618C7.00392 13.6533 6.90459 13.671 6.79659 13.671C6.68859 13.671 6.58925 13.6533 6.49859 13.618C6.40792 13.5833 6.31892 13.5223 6.23159 13.435L0.150588 7.35401C0.057255 7.26067 0.0072549 7.14701 0.000588234 7.01301C-0.00607843 6.87834 0.0439217 6.75601 0.150588 6.64601C0.260588 6.53601 0.379588 6.48101 0.507588 6.48101C0.635588 6.48101 0.754255 6.53601 0.863588 6.64601L6.29659 12.079Z" fill="#FF7D01"/>
                          </svg>

                        </span>
                      </button>
                    </div>
                  )}
                </div>
              )}

              {activeTab === "cars" && (
                <div className="">
                  {displayedCars.map((item) => (
                    <FavoriteItem
                      key={item.id}
                      item={item}
                      type="car"
                    />
                  ))}

                  {/* Show More */}
                  {!showMoreCars && carFavoritesMore.length > 0 && (
                    <div className="mt-8 flex justify-center">
                      <button
                        onClick={() => setShowMoreCars(true)}
                        className="text-[#FF7D01] font-medium inline-flex items-center gap-2"
                      >
                        Show More <span className="text-base">
                          <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M6.29659 12.079V0.500007C6.29659 0.358007 6.34425 0.239007 6.43959 0.143007C6.53492 0.047007 6.65392 -0.00065977 6.79659 6.89653e-06C6.93926 0.000673563 7.05826 0.0483404 7.15359 0.143007C7.24892 0.237674 7.29659 0.356674 7.29659 0.500007V12.079L12.7356 6.64001C12.8329 6.54267 12.9476 6.49167 13.0796 6.48701C13.2116 6.48301 13.3326 6.53634 13.4426 6.64701C13.5493 6.75634 13.6036 6.87401 13.6056 7.00001C13.6069 7.12534 13.5526 7.24334 13.4426 7.35401L7.36259 13.434C7.27459 13.5213 7.18526 13.5827 7.09459 13.618C7.00392 13.6533 6.90459 13.671 6.79659 13.671C6.68859 13.671 6.58925 13.6533 6.49859 13.618C6.40792 13.5833 6.31892 13.5223 6.23159 13.435L0.150588 7.35401C0.057255 7.26067 0.0072549 7.14701 0.000588234 7.01301C-0.00607843 6.87834 0.0439217 6.75601 0.150588 6.64601C0.260588 6.53601 0.379588 6.48101 0.507588 6.48101C0.635588 6.48101 0.754255 6.53601 0.863588 6.64601L6.29659 12.079Z" fill="#FF7D01"/>
                          </svg>

                        </span>
                      </button>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>

          {/* More Actions */}
          <div className="w-full lg:w-80 mt-8 lg:mt-0 lg:flex-shrink-0">
            <h2 className="text-lg sm:text-xl font-light text-gray-900 mb-4 sm:mb-6">More Actions</h2>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <ActionItem link="/details" icon={Lock} text="Personal Details" />
              <ActionItem link="/payment" icon={CreditCard} text="Payment Methods" />
              <ActionItem link="/privacy" icon={Shield} text="Privacy Policy" />
              <ActionItem link="/contact" icon={HelpCircle} text="Contact Customer Support" />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
            <p><b className=''>©</b> 2025 Smash Apartments. All Rights Reserved</p>
            <span className="hidden sm:inline">•</span>
            <p className="hover:text-gray-900 transition-colors cursor-pointer">Privacy Policy</p>
            <span className="hidden sm:inline">•</span>
            <p className="hover:text-gray-900 transition-colors cursor-pointer">Terms of Use</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


function FavoriteItem({ item, type = "stay" }) {
  return (
    <div className="mb-8">
     
      <div className="flex items-start gap-4 mb-4">
  
        <div className="w-[120px] h-[110px] sm:w-[150px] sm:h-[150px] rounded-2xl overflow-hidden flex-shrink-0">
          <img src={item.image} alt={item.title} className="w-full h-full object-fill" />
        </div>
        
  
        <div className="flex-1">
          <h3 className="text-gray-900 font-semibold">{item.title}</h3>
          <div className="text-sm text-gray-500 mt-1 flex items-center gap-3">
            <div className="flex items-center gap-2">
              <span>{item.location}</span>
            </div>
          </div>
          <div className="mt-2">
            <span className="text-sm font-normal bg-[#FFF1E6] text-[#FF7D01] rounded-full px-2 py-1">
              Rating 
              <span className="font-semibold"> {item.rating}</span> 
            </span>
          </div>
        </div>
        
       
        <div className="flex-shrink-0 pr-2">
          <div className="text-2xl font-semibold text-gray-900">{item.price}</div>
        </div>
      </div>
      
      {/* Bottom Section: Actions Row */}
      <div className="flex items-center gap-4">
        <button className="w-14 h-14 flex items-center justify-center rounded-full bg-[#FFF3E6]">
          <img src={Heart} alt="favorite" className="w-5 h-5" />
        </button>

        <button className="px-5 py-5 bg-[#FF7D01]/10 text-[#FF7D01] rounded-full font-medium shadow-sm hover:shadow transition">
          {type === "stay" ? "Reserve This Place" : "Rent Ride"}
        </button>
      </div>
    </div>
  );
}


function ActionItem({ icon, text, link = "#" }) {
  return (
    <Link to={link} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3333330D]">
          <img src={icon} alt={text} className="w-4 h-4" />
        </div>
        <span className="text-gray-700 font-extralight">{text}</span>
      </div>
    </Link>
  );
}
