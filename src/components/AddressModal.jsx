import React, { useState } from 'react';
import { apiFetch } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';

export default function AddressModal({ isOpen, onClose, currentAddress }) {
  const [address, setAddress] = useState(currentAddress || '');
  const [loading, setLoading] = useState(false);
  const { refreshUser } = useAuth();
  const { showToast } = useToast();

  if (!isOpen) return null;

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await apiFetch('/users/update', {
        method: 'PUT',
        body: JSON.stringify({ address }),
      });
      if (res.success) {
        await refreshUser();
        showToast('Address updated successfully.');
        onClose();
      }
    } catch (err) {
      showToast(err.message || 'Failed to update address.', 'error');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[1000] p-4">
      <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-xl">
        <button
          onClick={onClose}
          className="absolute top-6 right-6 text-gray-400 hover:text-gray-600 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>

        <h2 className="text-2xl font-semibold text-gray-900 mb-2">Update Address</h2>
        <p className="text-gray-500 text-sm mb-8">
          Providing your address allows properties to verify your location.
        </p>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">Your Address</label>
            <textarea
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter your full address"
              rows={4}
              className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:border-transparent transition-all"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[#FF7D01] text-white py-4 rounded-full font-semibold hover:bg-opacity-90 transition-all disabled:opacity-50"
          >
            {loading ? 'Updating...' : 'Save Changes'}
          </button>
        </form>
      </div>
    </div>
  );
}
