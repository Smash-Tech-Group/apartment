import React, { useState } from 'react'

function PasswordModal({ activeModal, onClose }) {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [passwordValue, setPasswordValue] = useState('');
  const [selectedReason, setSelectedReason] = useState('');
  const [otherReasonText, setOtherReasonText] = useState('');
  const [agreedToTerms, setAgreedToTerms] = useState(false);

  if (!activeModal) return null;

  const handleReasonChange = (reason) => {
    setSelectedReason(reason);
    if (reason !== 'other') {
      setOtherReasonText('');
    }
  };

  const getPasswordStrength = (password) => {
    if (!password) return null;
    const hasMinLength = password.length >= 8;
    const hasUppercase = /[A-Z]/.test(password);
    const hasLowercase = /[a-z]/.test(password);
    const hasNumberOrSpecial = /[0-9!@#$%^&*(),.?":{}|<>]/.test(password);
    
    if (hasMinLength && hasUppercase && hasLowercase && hasNumberOrSpecial) {
      return 'Strong';
    }
    return null;
  };

  const passwordStrength = getPasswordStrength(passwordValue);

  const renderContent = () => {
    switch (activeModal) {
      case 'password':
        if (step === 1) {
          return (
            <>
              <h2 className="text-xl font-medium text-gray-900 mb-3">Update Your Password</h2>
              <p className="text-xs font-normal text-gray-600 mb-8 leading-relaxed pr-5">
                Enter your registered email address to receive a password reset link. Once verified, choose a strong new password to continue enjoying seamless access to your Smash Apartments profile.
              </p>
              
              <div className="mb-6">
                <input
                  type="email"
                  placeholder="Enter Your Email Address"
                  className="w-full px-4 py-3.5 border border-gray-200 rounded-full text-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500"
                />
              </div>

              <button
                onClick={() => setStep(2)}
                className="w-full bg-[#FF7D01] hover:bg-orange-600 text-white font-medium py-3.5 rounded-full transition-colors"
              >
                Send Password Reset Link
              </button>
            </>
          );
        } else if (step === 2) {
          return (
            <>
              <h2 className="text-2xl font-semibold text-gray-900 mb-3">Update Your Password</h2>
              <p className="text-sm text-gray-600 mb-8 leading-relaxed">
                Create a strong new password to secure your account.
              </p>
              
              <div className="space-y-5 mb-6">
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    placeholder="Enter a Password"
                    value={passwordValue}
                    onChange={(e) => setPasswordValue(e.target.value)}
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-full text-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      {showPassword ? (
                        <>
                          <path d="M22 1C22 1 18.92 7.16 12.25 7.16C5.58 7.16 2.5 1.002 2.5 1.002M12.196 7.076V12.293M16.996 5.599L19.258 10.484M7.375 5.965L5.257 10.484" transform="translate(0, 5)"/>
                        </>
                      ) : (
                        <>
                          <path d="M12.547 12.5C14.48 12.5 16.047 10.933 16.047 9C16.047 7.067 14.48 5.5 12.547 5.5C10.614 5.5 9.047 7.067 9.047 9C9.047 10.933 10.614 12.5 12.547 12.5Z" transform="translate(-3, -0.5)"/>
                          <path d="M21.547 9C21.547 9 20.547 1 12.547 1C4.547 1 3.547 9 3.547 9" transform="translate(-3, -0.5)"/>
                        </>
                      )}
                    </svg>
                  </button>
                </div>

                {passwordValue && !passwordStrength && (
                  <div className="space-y-2 text-xs">
                    <div className="flex items-start gap-2 text-red-500">
                      <span className="mt-0.5">•</span>
                      <span>Minimum of 8 characters</span>
                    </div>
                    <div className="flex items-start gap-2 text-red-500">
                      <span className="mt-0.5">•</span>
                      <span>At least 1 uppercase</span>
                    </div>
                    <div className="flex items-start gap-2 text-red-500">
                      <span className="mt-0.5">•</span>
                      <span>At least 1 lowercase</span>
                    </div>
                    <div className="flex items-start gap-2 text-red-500">
                      <span className="mt-0.5">•</span>
                      <span>At least 1 number or special character</span>
                    </div>
                  </div>
                )}

                {passwordStrength && (
                  <div className="flex items-center gap-2 text-sm text-green-600">
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path>
                      <polyline points="22 4 12 14.01 9 11.01"></polyline>
                    </svg>
                    <span>Password Strength: <strong>Strong</strong></span>
                  </div>
                )}

                <div className="relative">
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    placeholder="Confirm Password"
                    className="w-full px-4 py-3.5 border border-gray-200 rounded-full text-sm placeholder:text-gray-400 focus:outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 pr-12"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#333333" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
                      {showConfirmPassword ? (
                        <>
                          <path d="M22 1C22 1 18.92 7.16 12.25 7.16C5.58 7.16 2.5 1.002 2.5 1.002M12.196 7.076V12.293M16.996 5.599L19.258 10.484M7.375 5.965L5.257 10.484" transform="translate(0, 5)"/>
                        </>
                      ) : (
                        <>
                          <path d="M12.547 12.5C14.48 12.5 16.047 10.933 16.047 9C16.047 7.067 14.48 5.5 12.547 5.5C10.614 5.5 9.047 7.067 9.047 9C9.047 10.933 10.614 12.5 12.547 12.5Z" transform="translate(-3, -0.5)"/>
                          <path d="M21.547 9C21.547 9 20.547 1 12.547 1C4.547 1 3.547 9 3.547 9" transform="translate(-3, -0.5)"/>
                        </>
                      )}
                    </svg>
                  </button>
                </div>
              </div>

              <button className="w-full bg-[#FF7D01] hover:bg-orange-400 text-white font-medium py-3.5 rounded-full transition-colors">
                Update
              </button>
            </>
          );
        }
        break;

      case 'deactivate':
        return (
        <>
          <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reason For Account Deactivation</h2>
          
          <div className="mb-6 flex items-start gap-2.5">
            <svg className="w-5 h-5 text-[#FF7D01] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <circle cx="12" cy="12" r="10"></circle>
              <line x1="12" y1="16" x2="12" y2="12"></line>
              <line x1="12" y1="8" x2="12.01" y2="8"></line>
            </svg>
            <p className="text-xs text-[#333333] font-light leading-6">
              Once your account is deactivated, it will remain in a suspended state for a <strong className="font-semibold text-gray-900">period of 25 days</strong>. During this time, you may request a restoration of your account. After the 25-day grace period, your account and all associated data will be permanently deleted and cannot be recovered.
            </p>
          </div>

          <p className="text-base font-medium text-gray-900 mb-4">
            Select a reason why you want to deactivate your account.
          </p>

          <div className="space-y-3.5 mb-6">
            <label className="flex items-center justify-between cursor-pointer group border-b py-3">
              <span className="text-md font-extralight text-gray-700">I no longer use Smash Apartments</span>
              <div className="relative flex items-center">
                <input
                  type="radio"
                  name="deactivate-reason"
                  value="no-longer-use"
                  checked={selectedReason === 'no-longer-use'}
                  onChange={(e) => handleReasonChange(e.target.value)}
                  className="w-5 h-5 border-2 border-[#FF7D01]/20 text-[#FF7D01] focus:ring-2 focus:ring-[#FF7D01] focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:border-[#FF7D01] checked:border-[1px]"
                />
              </div>
            </label>

            <label className="flex items-center justify-between cursor-pointer group border-b py-3">
              <span className="text-md font-extralight text-gray-700">I'm not satisfied with the platform or service</span>
              <div className="relative flex items-center">
                <input
                  type="radio"
                  name="deactivate-reason"
                  value="not-satisfied"
                  checked={selectedReason === 'not-satisfied'}
                  onChange={(e) => handleReasonChange(e.target.value)}
                  className="w-5 h-5 border-2 border-[#FF7D01]/20 text-[#FF7D01] focus:ring-2 focus:ring-[#FF7D01] focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:border-[#FF7D01] checked:border-[5px]"
                />
              </div>
            </label>

            <label className="flex items-center justify-between cursor-pointer group border-b py-3">
              <span className="text-md font-extralight text-gray-700">I have privacy or security concerns</span>
              <div className="relative flex items-center">
                <input
                  type="radio"
                  name="deactivate-reason"
                  value="privacy-concerns"
                  checked={selectedReason === 'privacy-concerns'}
                  onChange={(e) => handleReasonChange(e.target.value)}
                  className="w-5 h-5 border-2 border-[#FF7D01]/20 text-[#FF7D01] focus:ring-2 focus:ring-[#FF7D01] focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:border-[#FF7D01] checked:border-[5px]"
                />
              </div>
            </label>

            <div>
              <label className="flex items-center justify-between cursor-pointer group border-b py-3">
                <span className="text-md font-extralight text-gray-700">Other (Please Specify)</span>
                <div className="relative flex items-center">
                  <input
                    type="radio"
                    name="deactivate-reason"
                    value="other"
                    checked={selectedReason === 'other'}
                    onChange={(e) => handleReasonChange(e.target.value)}
                    className="w-5 h-5 border-2 border-[#FF7D01]/20 text-[#FF7D01] focus:ring-2 focus:ring-[#FF7D01] focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:border-[#FF7D01] checked:border-[5px]"
                  />
                </div>
              </label>

              {selectedReason === 'other' && (
                <textarea
                  placeholder="Enter Reason"
                  value={otherReasonText}
                  onChange={(e) => setOtherReasonText(e.target.value)}
                  rows="4"
                  className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#FF7D01] focus:ring-1 focus:ring-[#FF7D01] resize-none"
                />
              )}
            </div>
          </div>

          <label className="flex items-start gap-2.5 mb-6 cursor-pointer group">
            <input
              type="checkbox"
              checked={agreedToTerms}
              onChange={(e) => setAgreedToTerms(e.target.checked)}
              className="w-4 h-4 text-[#FF7D01] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#FF7D01] cursor-pointer mt-0.5 flex-shrink-0 checked:border-[#FF7D01] checked:border-[5px]"
            />
            <span className="text-xs font-light text-gray-600 leading-relaxed">
              By clicking "Deactivate Account", I agree that my account can only be restored within <strong className="font-semibold text-gray-900">25 days</strong> of deactivation. After this period, it will be permanently deleted and cannot be recovered.
            </span>
          </label>

          <button className="w-full bg-[#FF7D01] hover:bg-[#E87000] text-white font-medium py-3.5 rounded-full transition-colors duration-200">
            Deactivate Account
          </button>
        </>
      );

      case 'delete':
  return (
    <>
      <h2 className="text-2xl font-semibold text-gray-900 mb-4">Reason For Deleting Account</h2>
      
      <div className="mb-6 flex items-start gap-2.5">
        <svg className="w-5 h-5 text-[#FF7D01] mt-0.5 flex-shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <line x1="12" y1="16" x2="12" y2="12"></line>
          <line x1="12" y1="8" x2="12.01" y2="8"></line>
        </svg>
        <p className="text-xs text-[#333333] font-light leading-6">
          Deleting your account is permanent. All data, preferences, and activity history associated with your profile will be irreversibly removed and cannot be restored.
        </p>
      </div>

      <p className="text-base font-medium text-gray-900 mb-4">
        Select a reason why you want to delete your account.
      </p>

      <div className="space-y-3.5 mb-6">
        <label className="flex items-center justify-between cursor-pointer group border-b py-3">
          <span className="text-md font-extralight text-gray-700">No longer interested in using the platform</span>
          <div className="relative flex items-center">
            <input
              type="radio"
              name="delete-reason"
              value="no-longer-interested"
              checked={selectedReason === 'no-longer-interested'}
              onChange={(e) => handleReasonChange(e.target.value)}
              className="w-5 h-5 border-2 border-[#FF7D01]/20 text-[#FF7D01] focus:ring-2 focus:ring-[#FF7D01] focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:border-[#FF7D01] checked:border-[5px]"
            />
          </div>
        </label>

        <label className="flex items-center justify-between cursor-pointer group border-b py-3">
          <span className="text-md font-extralight text-gray-700">Unsatisfactory user experience</span>
          <div className="relative flex items-center">
            <input
              type="radio"
              name="delete-reason"
              value="unsatisfactory"
              checked={selectedReason === 'unsatisfactory'}
              onChange={(e) => handleReasonChange(e.target.value)}
              className="w-5 h-5 border-2 border-[#FF7D01]/20 text-[#FF7D01] focus:ring-2 focus:ring-[#FF7D01] focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:border-[#FF7D01] checked:border-[5px]"
            />
          </div>
        </label>

        <label className="flex items-center justify-between cursor-pointer group border-b py-3">
          <span className="text-md font-extralight text-gray-700">Security concerns or suspicious activity</span>
          <div className="relative flex items-center">
            <input
              type="radio"
              name="delete-reason"
              value="security-concerns"
              checked={selectedReason === 'security-concerns'}
              onChange={(e) => handleReasonChange(e.target.value)}
              className="w-5 h-5 border-2 border-[#FF7D01]/20 text-[#FF7D01] focus:ring-2 focus:ring-[#FF7D01] focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:border-[#FF7D01] checked:border-[5px]"
            />
          </div>
        </label>

        <div>
          <label className="flex items-center justify-between cursor-pointer group border-b py-3">
            <span className="text-md font-extralight text-gray-700">Other (Please Specify)</span>
            <div className="relative flex items-center">
              <input
                type="radio"
                name="delete-reason"
                value="other"
                checked={selectedReason === 'other'}
                onChange={(e) => handleReasonChange(e.target.value)}
                className="w-5 h-5 border-2 border-[#FF7D01]/20 text-[#FF7D01] focus:ring-2 focus:ring-[#FF7D01] focus:ring-offset-0 cursor-pointer appearance-none rounded-full checked:border-[#FF7D01] checked:border-[5px]"
              />
            </div>
          </label>

          {selectedReason === 'other' && (
            <textarea
              placeholder="Enter Reason"
              value={otherReasonText}
              onChange={(e) => setOtherReasonText(e.target.value)}
              rows="4"
              className="w-full mt-3 px-4 py-3 border border-gray-300 rounded-lg text-sm text-gray-700 placeholder:text-gray-400 focus:outline-none focus:border-[#FF7D01] focus:ring-1 focus:ring-[#FF7D01] resize-none"
            />
          )}
        </div>
      </div>

      <label className="flex items-start gap-2.5 mb-6 cursor-pointer group">
        <input
          type="checkbox"
          checked={agreedToTerms}
          onChange={(e) => setAgreedToTerms(e.target.checked)}
          className="w-4 h-4 text-[#FF7D01] border-2 border-gray-300 rounded focus:ring-2 focus:ring-[#FF7D01] cursor-pointer mt-0.5 flex-shrink-0 checked:border-[#FF7D01] checked:border-[5px]"
        />
        <span className="text-xs font-light text-gray-600 leading-relaxed">
          By clicking "Delete Account", I agree that all associated data will be permanently deleted without the option for recovery.
        </span>
      </label>

      <button className="w-full bg-[#FF7D01] hover:bg-[#E87000] text-white font-medium py-3.5 rounded-full transition-colors duration-200">
        Delete Account
      </button>
    </>
  );

      default:
        return null;
    }
  };

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-1 md:p-4">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-[900px] relative my-auto max-h-[98vh] md:max-h-none overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute right-5 top-5 text-black hover:text-gray-600 transition-colors"
        >
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round">
            <line x1="18" y1="6" x2="6" y2="18"></line>
            <line x1="6" y1="6" x2="18" y2="18"></line>
          </svg>
        </button>
        
        <div className="p-8">
          {renderContent()}
        </div>
      </div>
    </div>
  );
}

export default PasswordModal