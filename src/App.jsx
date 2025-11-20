import { BrowserRouter, Routes, Route } from "react-router-dom";
import React, { useRef } from 'react';
import { GoogleOAuthProvider } from "@react-oauth/google";
import HomePage from "./pages/homePage";
import CarRentals from "./pages/carRentals"
import PropertyDetail from './pages/detail'; 
import { PropertyProvider } from './context/PropertyContext';
import { CarProvider } from './context/CarContext';



function App() {
  return (
    <GoogleOAuthProvider clientId="">
          <PropertyProvider>
            <CarProvider>
        <Routes>

          <Route path="/" element={<HomePage />} />
          <Route path="/car-rentals" element={<CarRentals />} />
          <Route path="/property/:id" element={<PropertyDetail />} />
          <Route path="/car/:id" element={<PropertyDetail />} />

        </Routes>
        </CarProvider>
    </PropertyProvider>
    </GoogleOAuthProvider>
  );
}




export default App;