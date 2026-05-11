import React, { Suspense, lazy } from 'react';
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { AuthProvider } from './context/AuthContext';
import { GoogleOAuthProvider } from "@react-oauth/google";
import { ToastProvider } from './components/Toast';
import { PropertyProvider } from './context/PropertyContext';
import { CarProvider } from './context/CarContext';
import { WizardProvider } from './context/WizardContext';
import ProtectedRoute from './components/ProtectedRoute';

import HomePage from './pages/homePage';
import CarRentals from './pages/carRentals';
import PropertyDetail from './components/PropertyDetail';
import Dashboard from './components/Dashboard';
import PersonalDetail from './components/PersonalDetails';
import PasswordSecurity from './components/PasswordSecurity';
import ManageStays from './components/ManageStays';
import Basic from './pages/upload/Basic';
import Location from './pages/upload/Location';
import Photos from './pages/upload/Photos';
import Features from './pages/upload/Features';
import Review from './pages/upload/Review';
import Complete from './pages/upload/Complete';
import Success from './pages/upload/Success';
import ManageStaysPopulate from './components/ManageStaysPopulate';
import ManageRides from './components/ManageRides';
import BasicRide from './pages/upload-rides/Basic';
import LocationRide from './pages/upload-rides/Location';
import PhotosRide from './pages/upload-rides/Photos';
import FeaturesRide from './pages/upload-rides/Features';
import ReviewRide from './pages/upload-rides/Review';
import CompleteRide from './pages/upload-rides/Complete';
import SuccessRide from './pages/upload-rides/Success';
import IdVerify from './components/IdVerify';
import UploadId from './components/UploadId';
import Payment from './components/Payment';
import PaymentHistory from './components/PaymentHistory';
import Favourites from './components/Favourites';
import Reviews from './components/Reviews';
import Stays from './components/Stays';
import CarsRental from './components/CarsRental';
import CustomerSupport from './components/CustomerSupport';
import HelpfulArticles from './components/HelpfulArticles';
import NotFound from './components/NotFound';

function App() {
  return (
    <GoogleOAuthProvider clientId="">
      <AuthProvider>
        <ToastProvider>
        <PropertyProvider>
          <CarProvider>
            <WizardProvider>
              <Routes>
                <Route path="/" element={<HomePage />} />
                <Route path="/car-rentals" element={<CarRentals />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/car/:id" element={<PropertyDetail />} />
                
                {/* Protected Routes */}
                <Route path="/dashboard/" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
                <Route path="/details/" element={<ProtectedRoute><PersonalDetail /></ProtectedRoute>} />
                <Route path="/password-security/" element={<ProtectedRoute><PasswordSecurity /></ProtectedRoute>} />
                <Route path="/manage-stays/" element={<ProtectedRoute><ManageStays /></ProtectedRoute>} />
                <Route path="/manage-rides" element={<ProtectedRoute><ManageRides /></ProtectedRoute>} />
                <Route path="/id-verify" element={<ProtectedRoute><IdVerify /></ProtectedRoute>} />
                <Route path="/upload-id" element={<ProtectedRoute><UploadId /></ProtectedRoute>} />
                <Route path="/payment" element={<ProtectedRoute><Payment /></ProtectedRoute>} />
                <Route path="/payment-history" element={<ProtectedRoute><PaymentHistory /></ProtectedRoute>} />
                <Route path="/favourites" element={<ProtectedRoute><Favourites /></ProtectedRoute>} />
                <Route path="/reviews" element={<ProtectedRoute><Reviews /></ProtectedRoute>} />
                <Route path="/stays" element={<ProtectedRoute><Stays /></ProtectedRoute>} />
                <Route path="/carsrental" element={<ProtectedRoute><CarsRental /></ProtectedRoute>} />
                <Route path="/customer-support" element={<ProtectedRoute><CustomerSupport /></ProtectedRoute>} />
                
                {/* Upload Stays Flow */}
                <Route path="/upload/basic" element={<ProtectedRoute><Basic /></ProtectedRoute>} />
                <Route path="/upload/location" element={<ProtectedRoute><Location /></ProtectedRoute>} />
                <Route path="/upload/photos" element={<ProtectedRoute><Photos /></ProtectedRoute>} />
                <Route path="/upload/features" element={<ProtectedRoute><Features /></ProtectedRoute>} />
                <Route path="/upload/review" element={<ProtectedRoute><Review /></ProtectedRoute>} />
                <Route path="/upload/complete" element={<ProtectedRoute><Complete /></ProtectedRoute>} />
                <Route path="/upload/success" element={<ProtectedRoute><Success /></ProtectedRoute>} />
                <Route path="/manage-stays-populate" element={<ProtectedRoute><ManageStaysPopulate /></ProtectedRoute>} />

                {/* Upload Rides Flow */}
                <Route path="/upload-rides/basic" element={<ProtectedRoute><BasicRide /></ProtectedRoute>} />
                <Route path="/upload-rides/location" element={<ProtectedRoute><LocationRide /></ProtectedRoute>} />
                <Route path="/upload-rides/photos" element={<ProtectedRoute><PhotosRide /></ProtectedRoute>} />
                <Route path="/upload-rides/features" element={<ProtectedRoute><FeaturesRide /></ProtectedRoute>} />
                <Route path="/upload-rides/review" element={<ProtectedRoute><ReviewRide /></ProtectedRoute>} />
                <Route path="/upload-rides/complete" element={<ProtectedRoute><CompleteRide /></ProtectedRoute>} />
                <Route path="/upload-rides/success" element={<ProtectedRoute><SuccessRide /></ProtectedRoute>} />

                <Route path="/helpful" element={<HelpfulArticles />} />
                <Route path="*" element={<NotFound />} />
              </Routes>
            </WizardProvider>
          </CarProvider>
        </PropertyProvider>
        </ToastProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}

export default App;