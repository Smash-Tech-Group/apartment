import { useRef, useState, useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import CreditCard from '../assets/icons/9.svg';
import Shield from '../assets/icons/12.svg';
import HelpCircle from '../assets/icons/5.svg';
import Navbar from './Navbar';
import Door from '../assets/icons/17.svg';
import Lock from '../assets/icons/2.svg';
import Bunk from "../assets/icons/19.svg";
import Desk from "../assets/icons/20.svg";
import Hands from "../assets/icons/21.svg";
import { useAuth } from '../context/AuthContext';
import { useToast } from './Toast';
import { getAccessToken } from '../lib/auth';
import { BASE_URL } from '../lib/api';

export default function UploadId() {
  const { refreshUser } = useAuth();
  const { showToast } = useToast();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idType, setIdType] = useState('drivers_license'); // 'drivers_license' | 'passport' | 'national_id'
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [frontError, setFrontError] = useState('');
  const [backError, setBackError] = useState('');
  const [frontUploading, setFrontUploading] = useState(false);
  const [backUploading, setBackUploading] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [frontProgressStep, setFrontProgressStep] = useState(0); // 0..12
  const [backProgressStep, setBackProgressStep] = useState(0); // 0..12
  const frontInputRef = useRef(null);
  const backInputRef = useRef(null);
  const navigate = useNavigate();

  const ACCEPTED_TYPES = ['image/jpeg', 'image/png', 'application/pdf'];
  const MAX_BYTES = 5 * 1024 * 1024; // 5MB
  const MAX_STEPS = 12; // maps to Tailwind fraction widths

  function validateFile(file) {
    if (!ACCEPTED_TYPES.includes(file.type)) {
      return 'Only .jpg, .png, or .pdf files are allowed.';
    }
    if (file.size > MAX_BYTES) {
      return 'File size must be 5 MB or less.';
    }
    return '';
  }

  function createPreview(file) {
    if (file.type === 'application/pdf') return null;
    return URL.createObjectURL(file);
  }

  function mapStepToWidthClass(step) {
    const classes = [
      'w-0',        // 0
      'w-1/12',     // 1
      'w-2/12',     // 2
      'w-3/12',     // 3
      'w-4/12',     // 4
      'w-5/12',     // 5
      'w-6/12',     // 6
      'w-7/12',     // 7
      'w-8/12',     // 8
      'w-9/12',     // 9
      'w-10/12',    // 10
      'w-11/12',    // 11
      'w-full',     // 12
    ];
    return classes[Math.max(0, Math.min(MAX_STEPS, step))];
  }

  function simulateUpload(which) {
    const duration = 1200 + Math.floor(Math.random() * 500); 
    const intervalMs = Math.max(80, Math.floor(duration / MAX_STEPS));
    let step = 0;
    if (which === 'front') {
      setFrontUploading(true);
      setFrontProgressStep(0);
    } else {
      setBackUploading(true);
      setBackProgressStep(0);
    }
    const timer = setInterval(() => {
      step += 1;
      if (which === 'front') setFrontProgressStep(step);
      else setBackProgressStep(step);
      if (step >= MAX_STEPS) {
        clearInterval(timer);
        if (which === 'front') setFrontUploading(false);
        else setBackUploading(false);
      }
    }, intervalMs);
  }

  function handleFrontChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const err = validateFile(file);
    if (err) {
      setFrontError(err);
      setFrontFile(null);
      return;
    }
    setFrontError('');
    const previewUrl = createPreview(file);
    setFrontFile({ file, name: file.name, previewUrl, type: file.type });
    simulateUpload('front');
  }

  function handleBackChange(e) {
    const file = e.target.files && e.target.files[0];
    if (!file) return;
    const err = validateFile(file);
    if (err) {
      setBackError(err);
      setBackFile(null);
      return;
    }
    setBackError('');
    const previewUrl = createPreview(file);
    setBackFile({ file, name: file.name, previewUrl, type: file.type });
    simulateUpload('back');
  }

  async function handleSubmit() {
    if (!frontFile) {
      showToast('Please upload at least the front view of your ID.', 'error');
      return;
    }
    
    setIsSubmitting(true);
    try {
      const formData = new FormData();
      formData.append('file', frontFile.file);
      
      const token = getAccessToken();
      const response = await fetch(`${BASE_URL}/users/upload-id`, {
        method: 'POST',
        headers: token ? { Authorization: `Bearer ${token}` } : {},
        body: formData,
      });
      const data = await response.json();
      
      if (!response.ok || !data?.success) {
        throw new Error(data?.message || 'Upload failed.');
      }

      await refreshUser();
      showToast('Identity verification document uploaded successfully.');
      navigate('/details');
    } catch (err) {
      showToast(err.message || 'Failed to upload document.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  }

  function onIdTypeChange(nextType) {
    setIdType(nextType);
    if (frontFile?.previewUrl) URL.revokeObjectURL(frontFile.previewUrl);
    if (backFile?.previewUrl) URL.revokeObjectURL(backFile.previewUrl);
    setFrontFile(null);
    setBackFile(null);
    setFrontError('');
    setBackError('');
    setFrontUploading(false);
    setBackUploading(false);
    setFrontProgressStep(0);
    setBackProgressStep(0);
  }

  const needsTwoSides = idType !== 'passport';
  const frontHeading =
    idType === 'passport'
      ? "Passport Data Page"
      : "Front View of Driver's License";
  const backHeading =
    idType === 'national_id'
      ? "Back View of National ID Card"
      : "Back View of Driver's License";

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar showNavLinks={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-20 sm:pt-28 flex-1 w-full text-[#333333]">
        <div className="mb-6 text-xs sm:text-sm text-gray-600 bg-[#FF7D011A] w-fit px-3 sm:px-4 py-2 rounded-full flex items-center">
          <Link to="/dashboard" className="underline font-semibold cursor-pointer hover:text-gray-900">Manage Account</Link>
          <span className="mx-1 sm:mx-2">|</span>
          <Link to="/details" className="underline font-semibold cursor-pointer hover:text-gray-900">Personal Details </Link>
          <span className="mx-1 sm:mx-2">|</span>
          <span className="text-gray-900">Id Verification </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 sm:mb-8">Upload Your ID</h1>

            <div className="mb-8">
              <h2 className="text-base font-medium text-gray-900 mb-4">Select ID Type</h2>
              <div className="flex flex-wrap gap-4">
                {['drivers_license', 'passport', 'national_id'].map(type => (
                  <label key={type} className="flex items-center cursor-pointer">
                    <input 
                      type="radio" 
                      name="idType" 
                      checked={idType === type} 
                      onChange={() => onIdTypeChange(type)} 
                      className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500" 
                    />
                    <span className="ml-2 text-sm text-gray-700 capitalize">{type.replace('_', ' ')}</span>
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-base font-medium text-gray-900 mb-4">Upload Instructions</h2>
              <div className="space-y-3">
                {[
                  "Your ID must be current and valid. Expired documents will not be accepted.",
                  "Ensure the entire document is visible, with no parts cut off, blurry, or obstructed.",
                  "Take the photo in good lighting to make sure all details are clearly readable.",
                  <>Accepted formats: <span className="font-medium text-[#333333]">JPG, PNG, or PDF</span>. Max size: <span className="font-medium text-[#333333]">5MB</span></>
                ].map((text, i) => (
                  <div key={i} className="flex items-start gap-2">
                    <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg" className="flex-shrink-0 mt-1">
                        <path d="M0.707092 7.10703L7.90709 14.307L21.5071 0.707031" stroke="#FF7D01" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                    <p className="text-sm text-gray-600">{text}</p>
                  </div>
                ))}
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-12">
              <div>
                <h3 className="text-base font-medium text-gray-900 mb-4">{frontHeading}</h3>
                <div className="border border-dashed border-[#FF7D01] rounded-2xl p-8 flex items-center justify-center min-h-[20rem] bg-orange-50/30">
                  {frontUploading ? (
                    <div className="flex flex-col items-center justify-center w-full max-w-xs">
                      <p className="text-xs text-gray-500 mb-2 font-medium">Uploading...</p>
                      <div className="w-full bg-orange-100 rounded-full h-1.5 mb-4 overflow-hidden">
                        <div className={`bg-orange-500 h-full rounded-full transition-all duration-150 ${mapStepToWidthClass(frontProgressStep)}`}></div>
                      </div>
                    </div>
                  ) : !frontFile ? (
                    <button onClick={() => frontInputRef.current?.click()} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-full flex items-center gap-3 transition-all shadow-sm">
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                      </svg>
                      <span className="font-semibold">Upload ID Front</span>
                    </button>
                  ) : (
                    <div className="w-full flex flex-col items-center">
                      <div className="relative group">
                        {frontFile.previewUrl ? (
                          <img src={frontFile.previewUrl} alt="Front preview" className="max-h-64 rounded-xl shadow-md" />
                        ) : (
                          <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                            <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                            <span className="text-sm font-medium">{frontFile.name}</span>
                          </div>
                        )}
                        <button onClick={() => setFrontFile(null)} className="absolute -top-3 -right-3 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors">
                           <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
                {frontError && <p className="mt-2 text-xs text-red-500 font-medium">{frontError}</p>}
                <input ref={frontInputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={handleFrontChange} />
              </div>

              {needsTwoSides && (
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">{backHeading}</h3>
                  <div className="border border-dashed border-[#FF7D01] rounded-2xl p-8 flex items-center justify-center min-h-[20rem] bg-orange-50/30">
                    {backUploading ? (
                      <div className="flex flex-col items-center justify-center w-full max-w-xs">
                        <p className="text-xs text-gray-500 mb-2 font-medium">Uploading...</p>
                        <div className="w-full bg-orange-100 rounded-full h-1.5 mb-4 overflow-hidden">
                          <div className={`bg-orange-500 h-full rounded-full transition-all duration-150 ${mapStepToWidthClass(backProgressStep)}`}></div>
                        </div>
                      </div>
                    ) : !backFile ? (
                      <button onClick={() => backInputRef.current?.click()} className="bg-orange-500 hover:bg-orange-600 text-white px-8 py-3.5 rounded-full flex items-center gap-3 transition-all shadow-sm">
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="17 8 12 3 7 8"/><line x1="12" y1="3" x2="12" y2="15"/>
                        </svg>
                        <span className="font-semibold">Upload ID Back</span>
                      </button>
                    ) : (
                      <div className="w-full flex flex-col items-center">
                        <div className="relative group">
                          {backFile.previewUrl ? (
                            <img src={backFile.previewUrl} alt="Back preview" className="max-h-64 rounded-xl shadow-md" />
                          ) : (
                            <div className="p-8 bg-white rounded-xl shadow-sm border border-gray-100 flex items-center gap-3">
                              <svg className="w-8 h-8 text-orange-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"/></svg>
                              <span className="text-sm font-medium">{backFile.name}</span>
                            </div>
                          )}
                          <button onClick={() => setBackFile(null)} className="absolute -top-3 -right-3 bg-red-500 text-white p-1.5 rounded-full shadow-lg hover:bg-red-600 transition-colors">
                            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                  {backError && <p className="mt-2 text-xs text-red-500 font-medium">{backError}</p>}
                  <input ref={backInputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={handleBackChange} />
                </div>
              )}
            </div>

            <div className="flex justify-end">
              <button
                onClick={handleSubmit}
                disabled={isSubmitting || frontUploading || backUploading}
                className="bg-[#333333] text-white px-12 py-4 rounded-full font-bold text-lg hover:bg-black transition-all shadow-lg disabled:opacity-50 flex items-center gap-3"
              >
                {isSubmitting ? 'Saving Details...' : 'Save & Submit Verification'}
                {!isSubmitting && (
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="5" y1="12" x2="19" y2="12"></line>
                    <polyline points="12 5 19 12 12 19"></polyline>
                  </svg>
                )}
              </button>
            </div>
          </div>

          <div className="w-full lg:w-80 lg:flex-shrink-0">
             <h2 className="text-lg sm:text-xl font-semibold text-gray-900 mb-4 sm:mb-6">More Actions</h2>
             <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden shadow-sm">
               <ActionItem link="/password-security" icon={Lock} text="Password and Security" />
               <ActionItem link="/payment" icon={CreditCard} text="Payment Methods" />
               <ActionItem link="/privacy" icon={Shield} text="Privacy Policy" />
               <ActionItem link="/customer-support" icon={HelpCircle} text="Contact Support" />
             </div>
          </div>
        </div>
      </main>

      <footer className="mt-auto border-t border-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 text-sm text-gray-500">
            <p>© 2025 Smash Apartments. All Rights Reserved</p>
            <div className="flex gap-4">
              <span className="hover:text-gray-900 cursor-pointer">Privacy Policy</span>
              <span className="hover:text-gray-900 cursor-pointer">Terms of Use</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}

function ActionItem({ icon, text, link }) {
  return (
    <Link to={link} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-b-0 group">
      <div className="flex items-center gap-3">
        <div className='w-9 h-9 flex items-center justify-center rounded-full bg-gray-100 group-hover:bg-orange-100 transition-colors'>
          <img src={icon} alt="" className="w-4 h-4 opacity-70" />
        </div>
        <span className="text-gray-700 font-medium text-sm group-hover:text-gray-900">{text}</span>
      </div>
      <svg className="w-4 h-4 text-gray-300 group-hover:text-orange-500 transition-all" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"/></svg>
    </Link>
  );
}