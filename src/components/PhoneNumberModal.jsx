import React, { useState, useEffect } from 'react'
import { apiFetch } from '../lib/api';
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';

function PhoneNumberModal({ isOpen, onClose, currentPhoneNumber = '' }) {
  const { refreshUser } = useAuth();
  const { showToast } = useToast();
  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState(currentPhoneNumber);
  const [otp, setOtp] = useState(['', '', '', '', '', '']);
  const [error, setError] = useState('');
  const [otpError, setOtpError] = useState('');
  const [loading, setLoading] = useState(false);

  // Re-populate when modal opens with latest user data
  useEffect(() => {
    if (isOpen) {
      setPhoneNumber(currentPhoneNumber);
      setStep(1);
      setOtp(['', '', '', '', '', '']);
      setError('');
      setOtpError('');
    }
  }, [isOpen, currentPhoneNumber]);

  if (!isOpen) return null;

  const validatePhoneNumber = (phone) => {
    if (!phone.trim()) return 'Phone number cannot be empty';
    const phoneRegex = /^[\+]?[(]?[0-9]{1,4}[)]?[-\s\.]?[(]?[0-9]{1,4}[)]?[-\s\.]?[0-9]{1,9}$/;
    if (!phoneRegex.test(phone.trim())) return 'Please enter a valid phone number';
    return '';
  };

  const handlePhoneSubmit = (e) => {
    e.preventDefault();
    const validationError = validatePhoneNumber(phoneNumber);
    if (validationError) {
      setError(validationError);
      return;
    }
    setError('');
    // Move to OTP step (OTP send API to be wired when endpoint is ready)
    setStep(2);
  };

  const handleOtpChange = (index, value) => {
    if (value && !/^\d$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);
    setOtpError('');
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      if (nextInput) nextInput.focus();
    }
  };

  const handleOtpKeyDown = (index, e) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      if (prevInput) prevInput.focus();
    }
  };

  const handleOtpPaste = (e) => {
    e.preventDefault();
    const pastedData = e.clipboardData.getData('text').trim();
    if (/^\d{6}$/.test(pastedData)) {
      const newOtp = pastedData.split('').slice(0, 6);
      setOtp(newOtp);
      setOtpError('');
      const lastInput = document.getElementById('otp-5');
      if (lastInput) lastInput.focus();
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    const otpValue = otp.join('');
    if (otpValue.length !== 6) {
      setOtpError('Please enter the complete 6-digit OTP');
      return;
    }
    setOtpError('');
    setLoading(true);
    try {
      // TODO: verify OTP with /auth/verify-otp when endpoint is ready
      // For now, call update directly after OTP step
      await apiFetch('/users/update', {
        method: 'PUT',
        body: JSON.stringify({ phone_number: phoneNumber.trim() }),
      });
      await refreshUser();
      showToast('Phone number updated successfully.');
      onClose();
    } catch (err) {
      setOtpError(err.message || 'Failed to update phone number. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = () => {
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
    // TODO: call resend OTP API when endpoint is ready
    console.log('Resending OTP to:', phoneNumber);
  };

  const handleBackToPhone = () => {
    setStep(1);
    setOtp(['', '', '', '', '', '']);
    setOtpError('');
  };

  const handleClose = () => {
    setStep(1);
    setPhoneNumber(currentPhoneNumber);
    setOtp(['', '', '', '', '', '']);
    setError('');
    setOtpError('');
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
          {step === 1 ? (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Update Your Phone Number</h2>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                This number may be used for booking confirmations, property contact, and account recovery. Please make sure it's active and accessible as a verification code would be sent to confirm the change.
              </p>
              
              <form onSubmit={handlePhoneSubmit}>
                <div className="mb-6">
                  <input
                    type="tel"
                    placeholder="Enter Your Phone Number"
                    value={phoneNumber}
                    onChange={(e) => {
                      setPhoneNumber(e.target.value);
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
                  Send Verification Code
                </button>
              </form>
            </>
          ) : (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Verify Your Phone Number</h2>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                Enter the 6-digit verification code sent to {phoneNumber}
              </p>
              
              <form onSubmit={handleVerifyOtp}>
                <div className="mb-6">
                  <div className="flex gap-3 justify-center mb-4">
                    {otp.map((digit, index) => (
                      <input
                        key={index}
                        id={`otp-${index}`}
                        type="text"
                        inputMode="numeric"
                        maxLength="1"
                        value={digit}
                        onChange={(e) => handleOtpChange(index, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(index, e)}
                        onPaste={index === 0 ? handleOtpPaste : undefined}
                        className="w-12 h-14 text-center text-xl font-semibold border-2 border-gray-200 rounded-lg focus:outline-none focus:border-orange-500 focus:ring-2 focus:ring-orange-500/20 transition-colors"
                      />
                    ))}
                  </div>
                  {otpError && (
                    <p className="text-sm text-red-500 text-center">{otpError}</p>
                  )}
                </div>

                <div className="space-y-3">
                  <button 
                    type="submit"
                    disabled={loading}
                    className="w-full bg-[#FF7D01] hover:bg-orange-600 text-white font-medium py-3.5 rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                  >
                    {loading ? 'Verifying...' : 'Verify'}
                  </button>
                  
                  <div className="flex gap-4">
                    <button
                      type="button"
                      onClick={handleBackToPhone}
                      className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3.5 rounded-full transition-colors"
                    >
                      Back
                    </button>
                    <button
                      type="button"
                      onClick={handleResendOtp}
                      className="flex-1 border border-gray-300 hover:border-gray-400 text-gray-700 font-medium py-3.5 rounded-full transition-colors"
                    >
                      Resend OTP
                    </button>
                  </div>
                </div>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default PhoneNumberModal