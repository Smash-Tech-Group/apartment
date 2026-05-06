import React, { useState, useEffect } from 'react'
import { apiFetch } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';

function FullNameModal({ isOpen, onClose, currentFullName = '' }) {
  const { refreshUser } = useAuth();
  const { showToast } = useToast();

  // Split the full name into first/last for the two separate inputs
  const splitName = (full) => {
    const parts = full.trim().split(' ');
    return { first: parts[0] || '', last: parts.slice(1).join(' ') || '' };
  };

  const [firstName, setFirstName] = useState(() => splitName(currentFullName).first);
  const [lastName, setLastName] = useState(() => splitName(currentFullName).last);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  // Re-populate when modal opens with latest user data
  useEffect(() => {
    if (isOpen) {
      const { first, last } = splitName(currentFullName);
      setFirstName(first);
      setLastName(last);
      setError('');
    }
  }, [isOpen, currentFullName]);

  if (!isOpen) return null;

  const validateFullName = (first, last) => {
    const full = `${first} ${last}`.trim();
    if (!full) return 'Full name cannot be empty';
    if (full.length < 2) return 'Full name must be at least 2 characters';
    if (!/^[a-zA-Z\s'-]+$/.test(full)) return 'Full name can only contain letters, spaces, hyphens, and apostrophes';
    return '';
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationError = validateFullName(firstName, lastName);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    setLoading(true);
    try {
      await apiFetch('/users/update', {
        method: 'PUT',
        body: JSON.stringify({
          first_name: firstName.trim(),
          last_name: lastName.trim(),
        }),
      });
      await refreshUser();
      showToast('Full name updated successfully.');
      onClose();
    } catch (err) {
      setError(err.message || 'Failed to update name. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    const { first, last } = splitName(currentFullName);
    setFirstName(first);
    setLastName(last);
    setError('');
    onClose();
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-1 md:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[900px] relative my-auto max-h-[98vh] md:max-h-none overflow-y-auto">
        <button
          onClick={handleClose}
          className="absolute right-5 top-5 text-black hover:text-gray-600 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="p-8">
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Update Your Full Name</h2>
          <p className="text-sm text-gray-600 mb-8 leading-relaxed">
            This name will appear across your bookings, messages, and account records. Make sure it matches any official documents if required for verification purposes.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6 flex flex-col gap-y-5">
              <input
                type="text"
                placeholder="Enter Your First Name"
                value={firstName}
                onChange={(e) => {
                  setFirstName(e.target.value);
                  setError('');
                }}
                className={`w-full px-4 py-3.5 border rounded-full text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-colors ${
                  error 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-200 focus:border-orange-500 focus:ring-orange-500'
                }`}
              />
              <input
                type="text"
                placeholder="Enter Your Last Name"
                value={lastName}
                onChange={(e) => {
                  setLastName(e.target.value);
                  setError('');
                }}
                className={`w-full px-4 py-3.5 border rounded-full text-sm placeholder:text-gray-400 focus:outline-none focus:ring-1 transition-colors ${
                  error 
                    ? 'border-red-500 focus:border-red-500 focus:ring-red-500' 
                    : 'border-gray-200 focus:border-orange-500 focus:ring-orange-500'
                }`}
              />
              {error && (
                <p className="mt-2 text-sm text-red-500">{error}</p>
              )}
            </div>

            <button 
              type="submit"
              disabled={loading}
              className="w-full bg-[#FF7D01] hover:bg-orange-600 text-white font-medium py-3.5 rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? 'Updating...' : 'Update'}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default FullNameModal