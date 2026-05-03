import React, { useState } from 'react';
import Navbar from './Navbar';
import LockIcon from "../assets/icons/2.svg";
import PaymentIcon from "../assets/icons/9.svg";
import PrivacyIcon from "../assets/icons/12.svg";
import SupportIcon from "../assets/icons/5.svg";
import Check from "../assets/icons/15.svg";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import FullNameModal from './FullNameModal';
import PhoneNumberModal from './PhoneNumberModal';
import EmailAddressModal from './EmailAddressModal';

export default function PersonalDetails() {
  const [showFullNameModal, setShowFullNameModal] = useState(false);
  const [showPhoneNumberModal, setShowPhoneNumberModal] = useState(false);
  const [showEmailAddressModal, setShowEmailAddressModal] = useState(false);

  // Current user data - in a real app, this would come from state/API
  const currentFullName = "Hamsah Yusuf";
  const currentEmail = "HamsahYusuf917@gmail.com";
  const currentPhoneNumber = ""; // Empty since it says "Add Your Phone Number"

  return (
    <div className="min-h-screen bg-white">
      {/* Nav */}
      <Navbar showNavLinks={false} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 sm:pt-28">
        {/* Breadcrumb */}
        <div className="mb-6 text-xs sm:text-sm text-gray-600 bg-[#FF7D011A] w-fit px-3 sm:px-4 py-2 rounded-full flex items-center">
          <Link to="/dashboard" className="underline cursor-pointer font-semibold hover:text-gray-900">Manage Account</Link>
          <span className="mx-1 sm:mx-2">|</span>
          <span className="text-gray-900 font-extralight">Personal Details</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12">
          {/* Left Section- Details Form */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 sm:mb-8">Personal Details</h1>

            <div className="space-y-0">
              {/* Full Name */}
              <DetailRow
                label="Full Name"
                value="Hamsah Yusuf"
                action="Update"
                onClick={() => setShowFullNameModal(true)}
              />

              {/* Email Address */}
              <DetailRow
                label="Email Address"
                value="HamsahYusuf917@gmail.com"
                action="Update"
                verified={true}
                description="This is the email address you use to sign in. It's also where we send your booking confirmations."
                onClick={() => setShowEmailAddressModal(true)}
              />

              {/* Phone Number */}
              <DetailRow
                label="Phone Number"
                value="Add Your Phone Number"
                action="Add"
                placeholder={true}
                description="Properties or attractions you book will use this number if they need to contact you."
                onClick={() => setShowPhoneNumberModal(true)}
              />

              {/* Id Verification */}
              <DetailRow
                label="Identity Verification"
                link="/id-verify"
                value="Add a Means of Identification"
                action="Add"
                placeholder={true}
                description="This will be used by properties or attractions you book to verify your identity when necessary."
              />

              {/* Address */}
              <DetailRow
                label="Address"
                link="/"
                value="Add Your Address"
                action="Add"
                placeholder={true}
                description="Providing your address allows properties or attractions to verify your location, ensuring a seamless booking and reservation process."
              />
            </div>
          </div>

          {/* Right More Actions */}
          <div className="w-full lg:w-72 xl:w-80 flex-shrink-0">
            <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">More Actions</h2>
          
            <div className="bg-white border border-[#3333331A] rounded-xl overflow-hidden shadow-sm">
              <ActionItem link="/password-security" icon={LockIcon} text="Password & Security" />
              <ActionItem link="/payment " icon={PaymentIcon} text="Payment Methods" />
              <ActionItem link="/privacy" icon={PrivacyIcon} text="Privacy Policy" />
              <ActionItem link="/customer-support" icon={SupportIcon} text="Contact Customer Support" />
            </div>
          </div>
        </div>
      </main>

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

      {/* Modals */}
      <FullNameModal
        isOpen={showFullNameModal}
        onClose={() => setShowFullNameModal(false)}
        currentFullName={currentFullName}
      />
      <PhoneNumberModal
        isOpen={showPhoneNumberModal}
        onClose={() => setShowPhoneNumberModal(false)}
        currentPhoneNumber={currentPhoneNumber}
      />
      <EmailAddressModal
        isOpen={showEmailAddressModal}
        onClose={() => setShowEmailAddressModal(false)}
        currentEmail={currentEmail}
      />
    </div>
  );
}

function DetailRow({ label, link, value, action, verified, placeholder, description, onClick }) {
  const handleActionClick = (e) => {
    if (onClick) {
      e.preventDefault();
      onClick();
    }
  };

  // If link is provided, use Link component; otherwise use button with onClick
  const ActionElement = link ? (
    <Link to={link} className="text-gray-900 font-medium underline hover:text-orange-500 transition-colors flex-shrink-0">
      {action}
    </Link>
  ) : (
    <button 
      onClick={handleActionClick}
      className="text-gray-900 font-medium underline hover:text-orange-500 transition-colors flex-shrink-0"
    >
      {action}
    </button>
  );

  const MobileActionElement = link ? (
    <Link to={link} className="text-gray-900 font-medium underline hover:text-orange-500 transition-colors text-sm flex-shrink-0">
      {action}
    </Link>
  ) : (
    <button 
      onClick={handleActionClick}
      className="text-gray-900 font-medium underline hover:text-orange-500 transition-colors text-sm flex-shrink-0"
    >
      {action}
    </button>
  );

  return (
    <div className="border-b border-gray-100 py-5 sm:py-6">
      <div className="hidden sm:flex sm:items-start sm:justify-between gap-4">
        {/* Left Side */}
        <div className="flex items-start gap-4 lg:gap-6 flex-1 min-w-0">
          {/* Label */}
          <h3 className="font-semibold text-gray-900 w-36 lg:w-44 flex-shrink-0 pt-0.5">
            {label}
          </h3>

          {/* Value + Description */}
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1">
              <span
                className={
                  placeholder ? "text-gray-400 break-words" : "text-gray-700 break-words"
                }
              >
                {value}
              </span>
              {verified && <img src={Check} alt="verified" className="w-5 h-5 flex-shrink-0" />}
            </div>
            {description && (
              <p className="text-sm text-gray-500 mt-2 leading-relaxed">
                {description}
              </p>
            )}
          </div>
        </div>

        {/* Right Side: Action Button */}
        {ActionElement}
      </div>

      {/* Mobile Layout*/}
      <div className="sm:hidden space-y-3">
        {/* Row 1: Label and Action */}
        <div className="flex items-center justify-between gap-3">
          <h3 className="font-semibold text-gray-900 text-sm">{label}</h3>
          {MobileActionElement}
        </div>

        {/* Row 2: Value & Verified Icon */}
        <div className="flex items-center gap-2">
          <span
            className={
              placeholder ? "text-gray-400 break-words text-sm" : "text-gray-700 break-words text-sm"
            }
          >
            {value}
          </span>
          {verified && <img src={Check} alt="verified" className="w-5 h-5 flex-shrink-0" />}
        </div>

        {/* Row 3: Description */}
        {description && (
          <p className="text-xs text-gray-500 leading-relaxed">
            {description}
          </p>
        )}
      </div>
    </div>
  );
}

function ActionItem({ icon, text, link }) {
  return (
    <Link to={link} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-[#3333331A] last:border-b-0 group">
      <div className="flex items-center gap-3">
        <div className="w-8 h-8 flex items-center justify-center rounded-full bg-[#3333330D]">
          <img src={icon} alt="" className="w-5 h-5" />
        </div>
        <span className="text-[#333333] font-extralight text-sm sm:text-base group-hover:text-gray-900 transition-colors">{text}</span>
      </div>
    </Link>
  );
}