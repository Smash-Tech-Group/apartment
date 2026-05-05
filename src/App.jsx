import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useRef } from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import HomePage from "./pages/homePage";
import CarRentals from "./pages/carRentals"
import PropertyDetail from './components/PropertyDetail';
import { PropertyProvider } from './context/PropertyContext';
import { CarProvider } from './context/CarContext';
import Dashboard from './components/Dashboard';
import PersonalDetail from './components/PersonalDetails';
import PasswordSecurity from './components/PasswordSecurity';
import NotFound from './components/NotFound';
import ManageStays from './components/ManageStays';
import { WizardProvider } from './context/WizardContext';
import { AuthProvider } from './context/AuthContext';
import Basic from './pages/upload/Basic';
import Location from './pages/upload/Location';
import Photos from './pages/upload/Photos';
import Features from './pages/upload/Features';
import Review from './pages/upload/Review';
import Complete from './pages/upload/Complete';
import Success from './pages/upload/Success';
import BasicRide from './pages/upload-rides/Basic';
import LocationRide from './pages/upload-rides/Location';
import PhotosRide from './pages/upload-rides/Photos';
import FeaturesRide from './pages/upload-rides/Features';
import ReviewRide from './pages/upload-rides/Review';
import CompleteRide from './pages/upload-rides/Complete';
import SuccessRide from './pages/upload-rides/Success';
import ManageStaysPopulate from './components/ManageStaysPopulate';
import ManageRides from './components/ManageRides';
import IdVerify from './components/IdVerify';
import UploadId from "./components/UploadId"
import Payment from './components/Payment';
import PaymentHistory from './components/PaymentHistory';
import Favourites from './components/Favourites';
import Reviews from './components/Reviews';
import Stays from './components/Stays';
import CarsRental from "./components/CarsRental";
import ProtectedRoute from './components/ProtectedRoute';
import AdminFavorites from './components/admin/AdminFavorites';
import VendorFavorites from './components/vendor/VendorFavorites';
function App() {
  return (
    <GoogleOAuthProvider clientId="">
      <AuthProvider>
        <PropertyProvider>
          <CarProvider>
            <WizardProvider>
              <Routes>

                <Route path="/" element={<HomePage />} />
                <Route path="/car-rentals" element={<CarRentals />} />
                <Route path="/property/:id" element={<PropertyDetail />} />
                <Route path="/car/:id" element={<PropertyDetail />} />
                <Route path="/dashboard/" element={<Dashboard />} />
                <Route path="/details/" element={<PersonalDetail />} />
                <Route path="/password-security/" element={<PasswordSecurity />} />
                <Route path="/manage-stays/" element={<ManageStays />} />
                <Route path="/upload/basic" element={<Basic />} />
                <Route path="/upload/location" element={<Location />} />
                <Route path="/upload/photos" element={<Photos />} />
                <Route path="/upload/features" element={<Features />} />
                <Route path="/upload/review" element={<Review />} />
                <Route path="/upload/complete" element={<Complete />} />
                <Route path="/upload/success" element={<Success />} />
                <Route path="/manage-stays-populate" element={<ManageStaysPopulate />} />
                <Route path="/manage-rides" element={<ManageRides />} />
                <Route path="/upload-rides/basic" element={<BasicRide />} />
                <Route path="/upload-rides/location" element={<LocationRide />} />
                <Route path="/upload-rides/photos" element={<PhotosRide />} />
                <Route path="/upload-rides/features" element={<FeaturesRide />} />
                <Route path="/upload-rides/review" element={<ReviewRide />} />
                <Route path="/upload-rides/complete" element={<CompleteRide />} />
                <Route path="/upload-rides/success" element={<SuccessRide />} />
                <Route path="/id-verify" element={<IdVerify />} />
                <Route path="/upload-id" element={<UploadId />} />
                <Route path="/payment" element={<Payment />} />
                <Route path="/payment-history" element={<PaymentHistory />} />
                <Route path="/favourites" element={<Favourites />} />
                <Route path="/reviews" element={<Reviews />} />
                <Route path="/stays" element={<Stays />} />
                <Route path="/carsrental" element={<CarsRental />} />
                <Route path="/admin/favorites" element={
                  <ProtectedRoute roles={["admin"]}>
                    <AdminFavorites />
                  </ProtectedRoute>
                } />

                <Route path="/vendor/favorites" element={
                  <ProtectedRoute roles={["vendor", "admin"]}>
                    <VendorFavorites />
                  </ProtectedRoute>
                } />
                <Route path="*" element={<NotFound />} />


              </Routes>
            </WizardProvider>
          </CarProvider>
        </PropertyProvider>
      </AuthProvider>
    </GoogleOAuthProvider>
  );
}




export default App;