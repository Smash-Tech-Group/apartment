import { useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { apiFetch } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import CreditCard from '../assets/icons/9.svg';
import Shield from '../assets/icons/12.svg';
import HelpCircle from '../assets/icons/5.svg';
import Navbar from './Navbar';
import NotAuthenticated from './NotAuthenticated';
import Car from '../assets/icons/26.svg';
import Lock from '../assets/icons/2.svg';

import Car1 from "../assets/icons/28.svg";
import Car2 from "../assets/icons/29.svg";
import Car3 from "../assets/icons/30.svg";

export default function ManageRides() {
  const { user, loading: authLoading } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [rides, setRides] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchRides = async () => {
      if (authLoading || !user) return;
      
      try {
        setLoading(true);
        const response = await apiFetch('/rides/me');
        // Handle wrapped data (e.g., response.data.data or response.data)
        const ridesData = response?.data?.data || response?.data || response || [];
        setRides(Array.isArray(ridesData) ? ridesData : []);
        setError('');
      } catch (err) {
        setError(err.message || "Failed to load rides");
      } finally {
        setLoading(false);
      }
    };
    fetchRides();
  }, [authLoading, user]);

  if (authLoading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar showNavLinks={false} />
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Synchronizing your session...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <NotAuthenticated />;
  }

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
          <span className="text-gray-900">Manage Rides</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left  */}
          <div className="flex-1">
            <div className="flex items-center justify-between mb-6 sm:mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">Ride Listings</h1>
              {rides.length > 0 && (
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className='inline-flex items-center justify-center gap-2 px-4 py-2 rounded-full bg-[#FF7D01] text-white text-sm font-medium hover:bg-opacity-90 transition-colors'>
                  <span className='text-lg'>+</span> Add Listing
                </button>
              )}
            </div>

            {loading ? (
              <div className="flex items-center justify-center h-64">
                <div className="flex flex-col items-center gap-2">
                  <div className="w-8 h-8 border-4 border-orange-400 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-gray-500">Loading your rides...</p>
                </div>
              </div>
            ) : error ? (
              <div className="flex items-center justify-center h-64 bg-red-50 rounded-2xl p-6 text-center">
                <p className="text-red-500 font-medium">{error}</p>
              </div>
            ) : rides.length === 0 ? (
              <div className='flex flex-col md:flex-row gap-8 md:gap-12 items-center'>
                <div className="flex items-center justify-center w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-[#F5F5F5] flex-shrink-0">
                  <img
                    src={Car}
                    alt="No Rides"
                    className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain"
                  />
                </div>
                <div className='flex flex-col gap-4 sm:gap-6 text-center md:text-left'>
                  <div className='text-xl sm:text-2xl font-medium leading-tight text-[#333333]'>No Rides Added</div>
                  <div className='font-extralight text-sm sm:text-base text-[#333333] max-w-md'>You haven't uploaded any rides yet. Add one now to start earning on Smash Apartments.</div>
                  <div>
                    <button 
                      onClick={() => setIsModalOpen(true)}
                      className='inline-flex items-center justify-center gap-2 px-5 py-2.5 sm:px-6 sm:py-3 rounded-full bg-[#FF7D01] text-white text-sm sm:text-base font-medium hover:bg-opacity-90 transition-colors'>
                      <span className='text-lg sm:text-xl'>+</span>
                      Add a Listing
                    </button>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {rides.map(ride => (
                  <div key={ride.id || ride._id} className="border border-gray-100 rounded-2xl p-4 shadow-sm hover:shadow-md transition-shadow flex flex-col h-full bg-white">
                    <div className="w-full h-48 bg-gray-100 rounded-xl mb-4 overflow-hidden relative group">
                      {ride.photos && ride.photos.length > 0 ? (
                        <img 
                          src={ride.photos[0].url || ride.photos[0]} 
                          alt={ride.ride_type} 
                          className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105" 
                          onError={(e) => {
                            e.target.onerror = null;
                            e.target.src = Car; // fallback to the empty state icon or a placeholder
                            e.target.className = "w-full h-full object-contain p-8 opacity-20";
                          }}
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center text-gray-400 bg-gray-50">
                          <img src={Car} alt="Placeholder" className="w-16 h-16 opacity-20" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900 capitalize mb-1">{ride.ride_type || "Ride"}</h3>
                      <p className="text-sm text-gray-500 mb-4 line-clamp-1 flex items-center gap-1">
                        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg>
                        {ride.pickup_location}
                      </p>
                    </div>
                    <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                      <div className="flex flex-col">
                        <span className="text-xs text-gray-400 uppercase font-bold tracking-wider">Starting from</span>
                        <span className="text-[#FF7D01] font-bold text-xl">₦{Number(ride.price)?.toLocaleString()}</span>
                      </div>
                      <div className="flex items-center gap-1 px-2 py-1 bg-green-50 text-green-600 rounded-lg text-xs font-medium">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500 animate-pulse"></span>
                        Active
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* More Actions */}
          <div className="w-full lg:w-80 mt-8 lg:mt-0 lg:flex-shrink-0">
            <h2 className="text-lg sm:text-xl font-light text-gray-900 mb-4 sm:mb-6">More Actions</h2>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <ActionItem link="password-security" icon={Lock} text="Password and Security" />
              <ActionItem link="payment" icon={CreditCard} text="Payment Methods" />
              <ActionItem link="privacy" icon={Shield} text="Privacy Policy" />
              <ActionItem link="customer-support" icon={HelpCircle} text="Contact Customer Support" />
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
              How to list your ride on Smash Apartments
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
                  <h3 className="font-medium text-gray-900 mb-2 text-base">Describe Your Ride</h3>
                  <p className="text-xs font-light text-gray-600 tracking-normal leading-relaxed">
                    Tell us your pickup location and how many passengers your ride accommodates.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-24 h-24">
                    <img src={Car1} />
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
                    Upload high-quality photos, then add the features that come with your ride—we'll guide you along the way.
                  </p>
                </div>
                <div className="flex-shrink-0 flex">
                  <div className="w-24 h-24">
                    <img src={Car2} />
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
                    Select your pricing, confirm a few quick details, and publish your ride for renters to discover.
                  </p>
                </div>
                <div className="flex-shrink-0">
                  <div className="w-24 h-24 flex">
                    <img src={Car3} />
                  </div>
                </div>
              </div>
            </div>

            {/* Proceed Button */}
            <div className="flex justify-center mt-2">
                <button
                    onClick={() => {
                    setIsModalOpen(false);
                    navigate('/upload-rides/basic');
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