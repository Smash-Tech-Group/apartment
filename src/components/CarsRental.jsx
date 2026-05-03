import React, { useState } from "react";
import { Link } from "react-router-dom";
import CreditCard from "../assets/icons/9.svg";
import Shield from "../assets/icons/12.svg";
import HelpCircle from "../assets/icons/5.svg";
import Navbar from "./Navbar";
import Lock from "../assets/icons/2.svg";
import Heart from "../assets/icons/34.svg";
import HeartUnfilled from "../assets/icons/36.svg";
import Stay1 from "../assets/images/4.png";
import Stay2 from "../assets/images/5.png";
import Stay3 from "../assets/images/6.png";
import Calender from "../assets/icons/35.svg";
import Location from "../assets/icons/37.svg";
export default function Stays() {
  const [showMoreStays, setShowMoreStays] = useState(false);

  const stayBookings = [
  {
    id: "booking-1",
    title: "6 Bedroom Duplex",
    location: " Abuja",
    rating: 9.5,
    checkIn: "13 March, 25",
    checkOut: "15 March, 25",
    guests: 3,
    price: "₦490,000",
    image: Stay1,
    isFavorited: false,
    returnTime: {
      date: "15 March, 25",
      time: "12:00 PM",
    },
  },
  {
    id: "booking-2",
    title: "4 Bedroom Duplex",
    location: "Abuja",
    rating: 7.5,
    checkIn: "13 March, 25",
    checkOut: "15 March, 25",
    guests: 3,
    price: "₦490,000",
    image: Stay2,
    isFavorited: true,
    returnTime: {
      date: "15 March, 25",
      time: "12:00 PM",
    },
  },
  {
    id: "booking-3",
    title: "4 Bedroom Duplex",
    location: "Abuja",
    rating: 7.5,
    checkIn: "13 March, 25",
    checkOut: "15 March, 25",
    guests: 3,
    price: "₦490,000",
    image: Stay3,
    isFavorited: false,
    returnTime: {
      date: "15 March, 25",
      time: "12:00 PM",
    },
  },
];


  const stayBookingsMore = [
    {
      id: "booking-4",
      title: "3 Bedroom Terrace",
      location: "Abuja",
      rating: 8.1,
      checkIn: "13 March, 25",
      checkOut: "15 March, 25",
      guests: 3,
      price: "₦350,000",
      image: Stay2,
      isFavorited: false,
      returnTime: {
      date: "15 March, 25",
      time: "12:00 PM",
    },
    },
  ];

  const displayedStays = showMoreStays
    ? [...stayBookings, ...stayBookingsMore]
    : stayBookings;

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <Navbar showNavLinks={false} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-4 sm:py-8 pt-20 sm:pt-28 flex-1 w-full">
        {/* Breadcrumb */}
        <div className="mb-4 sm:mb-6 text-xs sm:text-sm text-gray-600 bg-[#FF7D011A] w-fit px-3 sm:px-4 py-2 rounded-full flex items-center">
          <Link
            to="/dashboard"
            className="font-semibold underline cursor-pointer hover:text-gray-900"
          >
            Booking Activity
          </Link>
          <span className="mx-1 sm:mx-2">|</span>
          <span className="text-gray-900">Car Rentals</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Left */}
          <div className="flex-1">
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-2 mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">
                Car Rentals
              </h1>
              <div className="hidden sm:block h-9 w-px bg-[#333333]/50"></div>
              <button className="flex items-center justify-center sm:justify-start gap-2 px-4 py-2 bg-white rounded-lg text-sm text-gray-700 hover:bg-gray-50 transition border border-gray-200 sm:border-0">
                <span>Filter By Date</span>
                <img src={Calender} alt="Filter By Date" className="w-4 h-4" />
              </button>
            </div>

         
            <div className="space-y-6 sm:space-y-10">
              {displayedStays.map((booking) => (
                <StayBookingItem key={booking.id} booking={booking} />
              ))}

              {/* Show More */}
              {!showMoreStays && stayBookingsMore.length > 0 && (
                <div className="mt-6 sm:mt-8 flex justify-center">
                  <button
                    onClick={() => setShowMoreStays(true)}
                    className="text-[#FF7D01] font-medium inline-flex items-center gap-2"
                  >
                    Show More{" "}
                    <span className="text-base">
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          d="M6.29659 12.079V0.500007C6.29659 0.358007 6.34425 0.239007 6.43959 0.143007C6.53492 0.047007 6.65392 -0.00065977 6.79659 6.89653e-06C6.93926 0.000673563 7.05826 0.0483404 7.15359 0.143007C7.24892 0.237674 7.29659 0.356674 7.29659 0.500007V12.079L12.7356 6.64001C12.8329 6.54267 12.9476 6.49167 13.0796 6.48701C13.2116 6.48301 13.3326 6.53634 13.4426 6.64701C13.5493 6.75634 13.6036 6.87401 13.6056 7.00001C13.6069 7.12534 13.5526 7.24334 13.4426 7.35401L7.36259 13.434C7.27459 13.5213 7.18526 13.5827 7.09459 13.618C7.00392 13.6533 6.90459 13.671 6.79659 13.671C6.68859 13.671 6.58925 13.6533 6.49859 13.618C6.40792 13.5833 6.31892 13.5223 6.23159 13.435L0.150588 7.35401C0.057255 7.26067 0.0072549 7.14701 0.000588234 7.01301C-0.00607843 6.87834 0.0439217 6.75601 0.150588 6.64601C0.260588 6.53601 0.379588 6.48101 0.507588 6.48101C0.635588 6.48101 0.754255 6.53601 0.863588 6.64601L6.29659 12.079Z"
                          fill="#FF7D01"
                        />
                      </svg>
                    </span>
                  </button>
                </div>
              )}
            </div>
          </div>

          {/* More Actions */}
          <div className="w-full lg:w-80 mt-6 lg:mt-0 lg:flex-shrink-0">
            <h2 className="text-lg sm:text-xl font-light text-gray-900 mb-4 sm:mb-6">
              More Actions
            </h2>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <ActionItem link="/details" icon={Lock} text="Personal Details" />
              <ActionItem
                link="/payment"
                icon={CreditCard}
                text="Payment Methods"
              />
              <ActionItem link="/privacy" icon={Shield} text="Privacy Policy" />
              <ActionItem
                link="/contact"
                icon={HelpCircle}
                text="Contact Customer Support"
              />
            </div>
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="mt-auto text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
            <p>
              <b className="">©</b> 2025 Smash Apartments. All Rights Reserved
            </p>
            <span className="hidden sm:inline">•</span>
            <p className="hover:text-gray-900 transition-colors cursor-pointer">
              Privacy Policy
            </p>
            <span className="hidden sm:inline">•</span>
            <p className="hover:text-gray-900 transition-colors cursor-pointer">
              Terms of Use
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}


function StayBookingItem({ booking }) {
  return (
    <div className="mb-6 sm:mb-10">
      <div className="flex flex-col sm:flex-row items-start gap-4">
        <div className="w-full sm:w-[140px] h-[200px] sm:h-[140px] md:w-[160px] md:h-[160px] rounded-2xl overflow-hidden flex-shrink-0">
          <img
            src={booking.image}
            alt={booking.title}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="flex-1 flex flex-col w-full">
          <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 sm:gap-0 mb-3">
            <div className="flex-1">
              <h3 className="text-lg sm:text-xl font-semibold text-gray-900 mb-1">
                {booking.title}
              </h3>
              <div className="flex gap-2 items-center text-sm text-gray-500">
                <img src={Location} alt="Location" className="w-3.5 h-3.5" />
                <p>{booking.location}</p>
              </div>
            </div>
            <div className="text-xl sm:text-2xl font-semibold text-gray-900">
              {booking.price}
            </div>
          </div>

          <div className="mb-4">
            <span className="text-sm font-normal bg-[#FFF1E6] text-[#FF7D01] rounded-full px-3 py-1 inline-block">
              Rating <span className="font-semibold">{booking.rating}</span>
            </span>
          </div>

          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div className="text-sm">
              
              <div className="
                grid grid-cols-2 gap-4 
                sm:flex sm:items-center sm:gap-6 sm:overflow-x-auto
              ">
                
                <div className="flex-shrink-0">
                  <span className="text-[#333333] block text-xs font-semibold mb-1">
                    Pick Up Date
                  </span>
                  <span className="font-normal text-xs text-gray-900">
                    {booking.checkIn}
                  </span>
                </div>

                
                <div className="hidden sm:block h-9 w-px bg-[#333333]/50 flex-shrink-0"></div>

               
                <div className="flex-shrink-0">
                  <span className="text-[#333333] font-semibold block text-xs mb-1">
                    Pick Up Time
                  </span>
                  <span className="font-normal text-xs text-gray-900">
                    {booking.checkOut}
                  </span>
                </div>

           
                <div className="hidden sm:block h-9 w-px bg-[#333333]/50 flex-shrink-0"></div>

               
                <div className="flex-shrink-0">
                  <span className="text-[#333333] font-semibold block text-xs mb-1">
                    Return Date
                  </span>
                  <span className="font-normal text-xs text-gray-900">
                    {booking.returnTime.date}
                  </span>
                </div>

                
                <div className="hidden sm:block h-9 w-px bg-[#333333]/50 flex-shrink-0"></div>

               
                <div className="flex-shrink-0">
                  <span className="text-[#333333] font-semibold block text-xs mb-1">
                    Return Time
                  </span>
                  <span className="font-normal text-xs text-gray-900">
                    {booking.returnTime.time}
                  </span>
                </div>
              </div>
            </div>


            <Link
              to="#"
              className="text-black text-sm sm:text-md font-medium hover:underline underline flex-shrink-0 self-start sm:self-auto"
            >
              Re-Book
            </Link>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 sm:gap-4 mt-4 sm:mt-6">
        <button className="w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-full bg-[#FFF3E6] flex-shrink-0">
          <img src={HeartUnfilled} alt="Favorite" className="w-5 h-5 sm:w-6 sm:h-6" />
        </button>

        <button className="flex-1 sm:flex-initial px-4 sm:px-5 py-3 sm:py-4 bg-[#FF7D01]/10 text-[#FF7D01] rounded-full font-medium shadow-sm hover:shadow transition text-sm sm:text-base">
          Make a Review
        </button>
      </div>
    </div>
  );
}


function ActionItem({ icon, text, link = "#" }) {
  return (
    <Link
      to={link}
      className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0"
    >
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3333330D]">
          <img src={icon} alt={text} className="w-4 h-4" />
        </div>
        <span className="text-gray-700 font-extralight">{text}</span>
      </div>
    </Link>
  );
}