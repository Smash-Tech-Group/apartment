import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CreditCard from '../assets/icons/9.svg';
import Shield from '../assets/icons/12.svg';
import HelpCircle from '../assets/icons/5.svg';
import Navbar from './Navbar';
import Card from '../assets/icons/31.svg';
import Lock from '../assets/icons/2.svg';
import Bunk from "../assets/icons/19.svg";
import Desk from "../assets/icons/20.svg";
import Hands from "../assets/icons/21.svg";

export default function PaymentHistory() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <Navbar showNavLinks={false} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-20 sm:pt-28 flex-1 w-full">
        {/* Breadcrumb */}
        <div className="mb-6 text-xs sm:text-sm text-gray-600 bg-[#FF7D011A] w-fit px-3 sm:px-4 py-2 rounded-full flex items-center">
          <Link to="/dashboard" className="underline cursor-pointer hover:text-gray-900">Manage Account</Link>
          <span className="mx-1 sm:mx-2">|</span>
          <span className="text-gray-900">Payment History </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left  */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 sm:mb-8">Payment History</h1>

            {/* Content */}

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


function ActionItem({ icon, text, link }) {
  return (
    <Link to={link} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-3">
        <div className='w-10 h-10 flex items-center justify-center rounded-full bg-[#3333330D]'>
          <img src={icon} alt={text} className="w-4 h-4 text-gray-400" />
        </div>
        
        <span className="text-gray-700 font-extralight">{text}</span>
      </div>
    </Link>
  );
}