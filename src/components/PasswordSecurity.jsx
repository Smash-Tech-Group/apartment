import { ChevronRight } from 'lucide-react';
import React, { useState } from 'react';
import User from "../assets/icons/1.svg";
import CreditCard from '../assets/icons/9.svg';
import Shield from '../assets/icons/12.svg';
import HelpCircle from '../assets/icons/5.svg';
import Shield2 from "../assets/icons/16.svg";
import Navbar from './Navbar';
import PasswordModal from "./PasswordModal";
import {  Link } from "react-router-dom";
export default function PasswordSecurity() {
  const [activeModal, setActiveModal] = useState(null);
  values: "password", "deactivate", "delete"

  
  return (
    
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <Navbar showNavLinks={false} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-20 sm:pt-28">
        {/* Breadcrumb */}
        <div className="mb-6 text-xs sm:text-sm text-gray-600 bg-[#FF7D011A] w-fit px-3 sm:px-4 py-2 rounded-full flex items-center">
          <Link to="/dashboard" className="underline cursor-pointer hover:text-gray-900">Manage Account</Link>
          <span className="mx-1 sm:mx-2">|</span>
          <span className="text-gray-900">Password & Security</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left  */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 sm:mb-8">Password & Security</h1>

            {/* Banner */}
            <div className="bg-[#6D6BAF] rounded-2xl p-4 sm:p-6 mb-8 sm:mb-10 text-white">
              <div className="items-center gap-4">
                <div className="flex flex-shrink-0 items-start sm:items-center">
                  <img src={Shield2} alt="Security Icon" className="w-6 h-6 sm:w-8 sm:h-8 lg:w-auto lg:h-auto" />
                  <h2 className="text-lg sm:text-xl lg:text-2xl font-semibold ml-2 sm:m-3">Account Security & Privacy Assurance</h2>
                </div>
                <div>
                  <p className="text-indigo-50 leading-relaxed font-extralight mt-3 lg:mt-1 text-sm sm:text-base">
                    At Smash Apartments, your privacy and data security are our top priorities. We use advanced 
                    security measures to ensure your personal information remains safe at all times. Our team routinely 
                    reviews all accounts and activities to detect and prevent unauthorized access. Rest assured, your 
                    details are protected, and we're committed to maintaining a secure and trustworthy platform for all 
                    our users.
                  </p>
                </div>
              </div>
            </div>

            {/* Security Options */}
            <div className="space-y-4 sm:space-y-6">
              {/* Password */}
              <SecurityRow
                label="Password"
                description="Last updated 11 days ago"
                action="Update"
                actionStyle="normal"
                onClick={() => setActiveModal('password')}
              />

              {/* Deactivate Account */}
              <SecurityRow
                label="Deactivate Account"
                description="Temporarily Disable Your Account"
                action="Deactivate"
                actionStyle="danger"
                onClick={() => setActiveModal('deactivate')}
              />

              {/* Delete Account */}
              <SecurityRow
                label="Delete Account"
                description="Permanently Delete Your Account"
                action="Delete"
                actionStyle="danger"
                onClick={() => setActiveModal('delete')}
              />
            </div>
          </div>

          {/* More Actions */}
          <div className="w-full lg:w-80 mt-8 lg:mt-0">
            <h2 className="text-lg sm:text-xl font-light text-gray-900 mb-4 sm:mb-6">More Actions</h2>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <ActionItem link="/details" icon={User} text="Personal Details" />
              <ActionItem link="/payment" icon={CreditCard} text="Payment Methods" />
              <ActionItem link="/privacy" icon={Shield} text="Privacy Policy" />
              <ActionItem link="/contact-support" icon={HelpCircle} text="Contact Customer Support" />
            </div>
          </div>
        </div>
      </main>

      <PasswordModal
        activeModal={activeModal} 
        onClose={() => setActiveModal(null)}  />

            {/* make component Footer */}
      <footer className="mt-12 sm:mt-16 text-xs">
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

function SecurityRow({ label, description, action, actionStyle, onClick  }) {
  return (
    <div className="border-b border-gray-100 pb-4 sm:pb-6">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-0">
        <div className="flex flex-1 flex-col sm:flex-row sm:items-center gap-2 sm:gap-8">
          <h3 className="font-medium text-gray-900 sm:w-48">{label}</h3>
          <div className='flex justify-start'><p className="text-sm sm:text-md text-gray-500">{description}</p></div>
        </div>
        <button
          onClick={onClick}
          className={`font-medium underline transition-colors whitespace-nowrap self-start sm:self-auto ${
            actionStyle === 'danger' 
              ? 'text-red-500 hover:text-red-600' 
              : 'text-gray-900 hover:text-orange-500'
          }`}
        >
          {action}
        </button>
      </div>
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