import React from 'react';
import { useAuth } from '../context/AuthContext';
import Navbar from './Navbar';
import NotAuthenticated from './NotAuthenticated';

const ProtectedRoute = ({ children }) => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-white flex flex-col">
        <Navbar showNavLinks={false} />
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="w-10 h-10 border-4 border-orange-400 border-t-transparent rounded-full animate-spin mb-4"></div>
          <p className="text-gray-500 font-medium">Authenticating...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return <NotAuthenticated />;
  }

  return children;
};

export default ProtectedRoute;
