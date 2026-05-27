import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';
import VendorEligibilityModal from './VendorEligibilityModal';
import {
  getVendorEligibilityCriteria,
  isPendingVendorRequest,
  isVendorVerifiedBySuperAdmin,
} from '../lib/vendorEligibility';

export default function VendorListingRoute({ children }) {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [showModal, setShowModal] = useState(true);

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar showNavLinks={false} />
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Checking vendor access...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return children;
  }

  const verifiedVendor = isVendorVerifiedBySuperAdmin(user);
  if (verifiedVendor) {
    return children;
  }

  const criteria = getVendorEligibilityCriteria(user);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar showNavLinks={false} />
      <div className="flex-1 flex items-center justify-center px-4 pt-20">
        <div className="max-w-lg text-center">
          <h1 className="text-2xl font-semibold text-[#1a174d]">Listing Access Restricted</h1>
          <p className="mt-2 text-sm text-gray-500">
            Complete vendor onboarding and wait for Super Admin verification before listing stays.
          </p>
          <button
            onClick={() => navigate('/dashboard')}
            className="mt-5 rounded-full bg-[#FF7D01] px-5 py-2.5 text-sm font-semibold text-white hover:bg-[#e76e00]"
          >
            Back To Dashboard
          </button>
        </div>
      </div>

      <VendorEligibilityModal
        isOpen={showModal}
        onClose={() => {
          setShowModal(false);
          navigate('/dashboard');
        }}
        onProceed={() => navigate('/dashboard')}
        onGoToDetails={() => navigate('/details')}
        onGoToIdVerification={() => navigate('/id-verify')}
        criteria={criteria}
        isVendorVerified={false}
        isPendingApproval={isPendingVendorRequest(user)}
      />
    </div>
  );
}
