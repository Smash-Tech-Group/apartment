import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CreditCard from '../assets/icons/9.svg';
import Shield from '../assets/icons/12.svg';
import HelpCircle from '../assets/icons/5.svg';
import Navbar from './Navbar';
import Phone from '../assets/icons/27.svg';
import Lock from '../assets/icons/2.svg';
import Bunk from "../assets/icons/19.svg";
import Desk from "../assets/icons/20.svg";
import Hands from "../assets/icons/21.svg";

export default function IdVerify() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white flex flex-col">
      {/* Nav */}
      <Navbar showNavLinks={false} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-20 sm:pt-28 flex-1 w-full">
        {/* Breadcrumb */}
        <div className="mb-6 text-xs sm:text-sm text-gray-600 bg-[#FF7D011A] w-fit px-3 sm:px-4 py-2 rounded-full flex items-center">
          <Link to="/dashboard" className="underline font-semibold cursor-pointer hover:text-gray-900">Manage Account</Link>
          <span className="mx-1 sm:mx-2">|</span>
          <Link to="/details" className="underline font-semibold cursor-pointer hover:text-gray-900">Personal Details </Link>
          <span className="mx-1 sm:mx-2">|</span>
          <span className="text-gray-900">Identify Verification </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left  */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 sm:mb-8">Identity Verification</h1>

            {/* Circle */}
            <div className='flex flex-col md:flex-row gap-8 md:gap-12 items-center'>
              <div className="flex items-center justify-center ">
                <img
                  src={Phone}
                  alt="Security Icon"
                  className="w-48 h-48 sm:w-32 sm:h-32 md:w-40 md:h-80 "
                />
              </div>
              <div className='flex flex-col gap-4 sm:gap-6 text-center md:text-left'>
                <div className='text-xl sm:text-2xl font-medium leading-tight text-[#333333]'>No Government ID Added</div>
                <div className='font-extralight text-sm sm:text-base text-[#333333] max-w-md'>
                  To know it is you, we ask you to verify your identity with a valid government-issued ID. Whether it’s a passport, driver’s license, or national ID card, this helps us confirm that you are who you say you are.
                </div>
                <div>
                  <Link
                    to="/upload-id"
                    className='inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#FF7D01] text-white text-sm sm:text-base font-medium hover:bg-opacity-90 transition-colors'>
                    <span className='text-lg sm:text-xl'>+</span>
                    Add a Government ID
                  </Link>
                </div>
              </div>
            </div>
          </div>

          {/* More Actions */}
          <div className="w-full lg:w-80 mt-8 lg:mt-0 lg:flex-shrink-0">
            <h2 className="text-lg sm:text-xl font-light text-gray-900 mb-4 sm:mb-6">More Actions</h2>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <ActionItem icon={Lock} text="Password and Security" />
              <ActionItem icon={CreditCard} text="Payment Methods" />
              <ActionItem icon={Shield} text="Privacy Policy" />
              <ActionItem icon={HelpCircle} text="Contact Customer Support" />
            </div>
          </div>
        </div>
      </main>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 relative shadow-xl my-auto max-h-[98vh] md:max-h-none overflow-y-auto">
            {/* Close Button */}
            <button
              onClick={() => setIsModalOpen(false)}
              className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
              aria-label="Close modal"
            >
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <line x1="18" y1="6" x2="6" y2="18"></line>
                <line x1="6" y1="6" x2="18" y2="18"></line>
              </svg>
            </button>

            {/* Modal Content */}
            <h2 className="text-md sm:text-2xl font-semibold text-gray-900 mb-6 pr-8">
              How to list your stay on Smash Apartments
            </h2>

            <div className="space-y-3">
              {/* Step 1 */}
              <div className="flex gap-1">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 text-black flex items-center justify-center font-semibold text-md">
                    1
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-medium text-gray-900 mb-2 text-base">Describe Your Space</h3>
                  <p className="text-xs font-light text-gray-600 tracking-normal leading-relaxed">
                    Let us know where your place is located and how many guests it comfortably accommodates.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-24 h-24">
                    <img src={Bunk} />
                  </div>
                </div>
              </div>

              {/* Step 2 */}
              <div className="flex gap-1">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 text-black flex items-center justify-center font-semibold text-md">
                    2
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-medium text-gray-900 mb-2 text-base">Showcase Its Best Features</h3>
                  <p className="text-xs font-light text-gray-600 leading-relaxed">
                    Upload at least five high-quality photos, then add the amenities that come with your stay—we'll guide you along the way.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-24 h-24">
                    <img src={Desk} />
                  </div>
                </div>
              </div>

              {/* Step 3 */}
              <div className="flex gap-1">
                <div className="flex-shrink-0">
                  <div className="w-10 h-10 text-black flex items-center justify-center font-semibold text-md">
                    3
                  </div>
                </div>
                <div className="flex-1 pt-2">
                  <h3 className="font-medium text-gray-900 mb-2 text-base">Set Your Details and Go Live</h3>
                  <p className="text-xs font-light text-gray-600 leading-relaxed">
                    Select a nightly rate, confirm a few quick details, and publish your listing for travelers to discover.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-24 h-24">
                    <img src={Hands} />
                  </div>
                </div>
              </div>
            </div>

            {/* Proceed Button */}
            <div className="flex justify-center mt-2">
                <button
                    onClick={() => {
                    setIsModalOpen(false);
                    navigate('/upload/basic');
                    }}
                    className="px-9 py-6 bg-[#FF7D01] text-white text-base font-semibold rounded-full shadow-md hover:shadow-lg hover:bg-[#e76e00] transition-all duration-300"
                >
                    Proceed To Listing
                </button>
            </div>
          </div>
        </div>
      )}

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


function ActionItem({ icon, text }) {
  return (
    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-3">
        <div className='w-10 h-10 flex items-center justify-center rounded-full bg-[#3333330D]'>
          <img src={icon} alt={text} className="w-4 h-4 text-gray-400" />
        </div>
        
        <span className="text-gray-700 font-extralight">{text}</span>
      </div>
    </button>
  );
}