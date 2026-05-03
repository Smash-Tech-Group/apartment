import React, { useState } from 'react'

function EmailAddressModal({ isOpen, onClose, currentEmail = '' }) {
  const [email, setEmail] = useState(currentEmail);
  const [error, setError] = useState('');

  if (!isOpen) return null;

  const validateEmail = (email) => {
    if (!email.trim()) {
      return 'Email address cannot be empty';
    }
    // Basic email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email.trim())) {
      return 'Please enter a valid email address';
    }
    return '';
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validationError = validateEmail(email);
    
    if (validationError) {
      setError(validationError);
      return;
    }

    setError('');
    // Placeholder for update function
    handleUpdateEmail(email.trim());
  };

  const handleUpdateEmail = (email) => {
    // TODO: Implement API call to update email address
    console.log('Updating email address to:', email);
    // After successful update, close modal
    onClose();
  };

  const handleClose = () => {
    setEmail(currentEmail);
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
          <h2 className="text-2xl font-semibold text-gray-900 mb-3">Update Your Email Address</h2>
          <p className="text-sm text-gray-600 mb-8 leading-relaxed">
            This email will be used for important notifications, booking confirmations, and account-related updates. Make sure it's an active address you have access to, as we would send a verification link to confirm the change.
          </p>
          
          <form onSubmit={handleSubmit}>
            <div className="mb-6">
              <input
                type="email"
                placeholder="Enter Your Email Address"
                value={email}
                onChange={(e) => {
                  setEmail(e.target.value);
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
              className="w-full bg-[#FF7D01] hover:bg-orange-600 text-white font-medium py-3.5 rounded-full transition-colors"
            >
              Update
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}

export default EmailAddressModal







