import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import Lock from '../assets/icons/2.svg';

const NotAuthenticated = () => {
  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar showNavLinks={false} />
      
      <main className="flex-1 flex flex-col items-center justify-center p-4 text-center">
        <div className="w-24 h-24 bg-orange-50 rounded-full flex items-center justify-center mb-8 animate-pulse">
          <img src={Lock} className="w-12 h-12 text-orange-500" alt="Locked" />
        </div>
        
        <h1 className="text-3xl font-bold text-gray-900 mb-4">Not Authenticated</h1>
        <p className="text-gray-600 mb-10 max-w-md text-lg">
          You need to be signed in to access this page. Please log in to manage your rides, stays, and account settings.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4">
          <Link
            to="/"
            className="px-8 py-3 bg-[#FF7D01] text-white rounded-full font-semibold hover:bg-orange-600 transition-all shadow-md hover:shadow-lg text-center"
          >
            Go to Homepage
          </Link>
          <button
            onClick={() => window.location.href = '/'} 
            className="px-8 py-3 border-2 border-gray-200 text-gray-700 rounded-full font-semibold hover:bg-gray-50 transition-all text-center"
          >
            Sign In
          </button>
        </div>
      </main>
      
      <footer className="mt-auto text-xs py-8 border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center text-gray-500">
          © 2025 Smash Apartments. All Rights Reserved
        </div>
      </footer>
    </div>
  );
};

export default NotAuthenticated;
