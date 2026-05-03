import { useRef, useState } from 'react';
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

export default function PasswordSecurity() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [idType, setIdType] = useState('drivers_license'); // 'drivers_license' | 'passport' | 'national_id'
  const [frontFile, setFrontFile] = useState(null);
  const [backFile, setBackFile] = useState(null);
  const [frontError, setFrontError] = useState('');
  const [backError, setBackError] = useState('');
  const [frontUploading, setFrontUploading] = useState(false);
  const [backUploading, setBackUploading] = useState(false);
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
    const duration = 2200 + Math.floor(Math.random() * 700); // 2.2s - 2.9s
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
    // set immediately so filename shows, preview will render after upload finishes too
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

  async function uploadToServer() {
    // Placeholder for future API integration
    // Implement multipart/form-data upload here when backend is ready.
    return Promise.resolve();
  }

  async function handleSubmit() {
    // Placeholder for future submit flow
    await uploadToServer();
  }

  function onIdTypeChange(nextType) {
    setIdType(nextType);
    // reset previously uploaded files and errors
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
      {/* Nav */}
      <Navbar showNavLinks={false} />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-20 sm:pt-28 flex-1 w-full">
        {/* Breadcrumb */}
        <div className="mb-6 text-xs sm:text-sm text-gray-600 bg-[#FF7D011A] w-fit px-3 sm:px-4 py-2 rounded-full flex items-center">
          <Link to="/dashboard" className="underline font-semibold cursor-pointer hover:text-gray-900">Manage Account</Link>
          <span className="mx-1 sm:mx-2">|</span>
          <Link to="/details" className="underline font-semibold cursor-pointer hover:text-gray-900">Personal Details </Link>
          <span className="mx-1 sm:mx-2">|</span>
          <span className="text-gray-900">Id Verification </span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left  */}
          <div className="flex-1">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-6 sm:mb-8">Upload Your ID</h1>

            <div className="mb-8">
              <h2 className="text-base font-medium text-gray-900 mb-4">Select ID Type</h2>
              <div className="flex flex-wrap gap-4">
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="idType" checked={idType==='drivers_license'} onChange={() => onIdTypeChange('drivers_license')} className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500" />
                  <span className="ml-2 text-sm text-gray-700">Driver's License</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="idType" checked={idType==='passport'} onChange={() => onIdTypeChange('passport')} className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500" />
                  <span className="ml-2 text-sm text-gray-700">Passport</span>
                </label>
                <label className="flex items-center cursor-pointer">
                  <input type="radio" name="idType" checked={idType==='national_id'} onChange={() => onIdTypeChange('national_id')} className="w-4 h-4 text-orange-500 border-gray-300 focus:ring-orange-500" />
                  <span className="ml-2 text-sm text-gray-700">National ID Card</span>
                </label>
              </div>
            </div>

            <div className="mb-8">
              <h2 className="text-base font-medium text-gray-900 mb-4">Upload Instructions</h2>
              <div className="space-y-3">
                <div className="flex items-start gap-2">
                    <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.707092 7.10703L7.90709 14.307L21.5071 0.707031" stroke="#FF7D01" stroke-linecap="square"/>
                    </svg>

                  <p className="text-sm text-gray-600">Your ID must be current and valid. Expired documents will not be accepted.</p>
                </div>
                <div className="flex items-start gap-2">
                    <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.707092 7.10703L7.90709 14.307L21.5071 0.707031" stroke="#FF7D01" stroke-linecap="square"/>
                    </svg>

                  <p className="text-sm text-gray-600">Ensure the entire document is visible, with no parts cut off, blurry, or obstructed.</p>
                </div>
                <div className="flex items-start gap-2">
                    <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.707092 7.10703L7.90709 14.307L21.5071 0.707031" stroke="#FF7D01" stroke-linecap="square"/>
                    </svg>

                  <p className="text-sm text-gray-600">Take the photo in good lighting to make sure all details (text, photo, and ID number) are clearly readable.</p>
                </div>
                <div className="flex items-start gap-2">
                    <svg width="23" height="16" viewBox="0 0 23 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path d="M0.707092 7.10703L7.90709 14.307L21.5071 0.707031" stroke="#FF7D01" stroke-linecap="square"/>
                    </svg>

                  <p className="text-sm text-gray-600">Accepted formats: <span className="font-medium text-[#333333]">JPG, PNG, or PDF</span> Maximum file size: <span className="font-medium text-[#333333]">5MB</span></p>
                </div>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div className=''>
                <h3 className="text-base font-medium text-gray-900 mb-4">{frontHeading}</h3>
                <div className="border border-dashed border-[#FF7D01] rounded-lg p-8 sm:p-12 flex items-center justify-center  min-h-[20rem]">
                  {frontUploading ? (
                    <div className="flex flex-col items-center justify-center w-full max-w-xs">
                      <p className="text-xs text-gray-500 mb-2">Uploading...</p>
                      <div className="w-full bg-orange-100 rounded-full h-2 mb-4 overflow-hidden">
                        <div className={`bg-orange-500 h-2 rounded-full transition-all duration-100 ${mapStepToWidthClass(frontProgressStep)}`}></div>
                      </div>
                      <button disabled className="bg-orange-400 text-white/90 px-6 py-3 rounded-full flex items-center gap-2 transition-colors cursor-not-allowed">
                        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5652 5.50373V14.5037M8.5652 5.50373L11.5652 8.50373M8.5652 5.50373L5.5652 8.50373M14.0652 10.5037C15.5842 10.5037 16.5652 9.27273 16.5652 7.75373C16.5651 7.15234 16.368 6.56756 16.0039 6.08893C15.6397 5.61031 15.1288 5.26424 14.5492 5.10373C14.46 3.98218 13.9952 2.92349 13.2299 2.09882C12.4646 1.27414 11.4435 0.731688 10.3317 0.559152C9.21993 0.386616 8.08246 0.594084 7.10319 1.14802C6.12392 1.70195 5.3601 2.56996 4.9352 3.61173C4.04063 3.36375 3.08418 3.4813 2.27628 3.93851C1.46837 4.39572 0.875179 5.15515 0.627202 6.04973C0.379224 6.9443 0.496772 7.90074 0.953985 8.70865C1.4112 9.51656 2.17063 10.1097 3.0652 10.3577" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span className="font-medium">Upload ID Front View</span>
                      </button>
                    </div>
                  ) : !frontFile ? (
                    <button onClick={() => frontInputRef.current?.click()} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors">
                      <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path d="M8.5652 5.50373V14.5037M8.5652 5.50373L11.5652 8.50373M8.5652 5.50373L5.5652 8.50373M14.0652 10.5037C15.5842 10.5037 16.5652 9.27273 16.5652 7.75373C16.5651 7.15234 16.368 6.56756 16.0039 6.08893C15.6397 5.61031 15.1288 5.26424 14.5492 5.10373C14.46 3.98218 13.9952 2.92349 13.2299 2.09882C12.4646 1.27414 11.4435 0.731688 10.3317 0.559152C9.21993 0.386616 8.08246 0.594084 7.10319 1.14802C6.12392 1.70195 5.3601 2.56996 4.9352 3.61173C4.04063 3.36375 3.08418 3.4813 2.27628 3.93851C1.46837 4.39572 0.875179 5.15515 0.627202 6.04973C0.379224 6.9443 0.496772 7.90074 0.953985 8.70865C1.4112 9.51656 2.17063 10.1097 3.0652 10.3577" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                      </svg>
                      <span className="font-medium">Upload ID Front View</span>
                    </button>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center text-center">
                      <p className="text-xs text-emerald-600 mb-2">Upload Complete</p>
                      {frontFile.previewUrl ? (
                        <img src={frontFile.previewUrl} alt={frontFile.name} className="max-h-56 object-contain rounded-md" />
                      ) : (
                        <div className="text-sm text-gray-700">{frontFile.name}</div>
                      )}
                      <div className="mt-4 flex gap-3">
                        <button onClick={() => frontInputRef.current?.click()} className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-colors">Change</button>
                        <button onClick={() => { setFrontFile(null); setFrontError(''); }} className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-full transition-colors">Remove</button>
                      </div>
                    </div>
                  )}
                </div>
                {frontError && <p className="mt-2 text-xs text-red-500">{frontError}</p>}
                <input ref={frontInputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={handleFrontChange} />
              </div>

              {needsTwoSides && (
                <div>
                  <h3 className="text-base font-medium text-gray-900 mb-4">{backHeading}</h3>
                  <div className="border border-dashed border-[#FF7D01] rounded-lg p-8 sm:p-12 flex items-center justify-center min-h-[20rem]">
                    {backUploading ? (
                      <div className="flex flex-col items-center justify-center w-full max-w-xs">
                        <p className="text-xs text-gray-500 mb-2">Uploading...</p>
                        <div className="w-full bg-orange-100 rounded-full h-2 mb-4 overflow-hidden">
                          <div className={`bg-orange-500 h-2 rounded-full transition-all duration-100 ${mapStepToWidthClass(backProgressStep)}`}></div>
                        </div>
                        <button disabled className="bg-orange-400 text-white/90 px-6 py-3 rounded-full flex items-center gap-2 transition-colors cursor-not-allowed">
                          <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M8.5652 5.50373V14.5037M8.5652 5.50373L11.5652 8.50373M8.5652 5.50373L5.5652 8.50373M14.0652 10.5037C15.5842 10.5037 16.5652 9.27273 16.5652 7.75373C16.5651 7.15234 16.368 6.56756 16.0039 6.08893C15.6397 5.61031 15.1288 5.26424 14.5492 5.10373C14.46 3.98218 13.9952 2.92349 13.2299 2.09882C12.4646 1.27414 11.4435 0.731688 10.3317 0.559152C9.21993 0.386616 8.08246 0.594084 7.10319 1.14802C6.12392 1.70195 5.3601 2.56996 4.9352 3.61173C4.04063 3.36375 3.08418 3.4813 2.27628 3.93851C1.46837 4.39572 0.875179 5.15515 0.627202 6.04973C0.379224 6.9443 0.496772 7.90074 0.953985 8.70865C1.4112 9.51656 2.17063 10.1097 3.0652 10.3577" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                          </svg>
                          <span className="font-medium">Upload ID Back View</span>
                        </button>
                      </div>
                    ) : !backFile ? (
                      <button onClick={() => backInputRef.current?.click()} className="bg-orange-500 hover:bg-orange-600 text-white px-6 py-3 rounded-full flex items-center gap-2 transition-colors">
                        <svg width="18" height="15" viewBox="0 0 18 15" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M8.5652 5.50373V14.5037M8.5652 5.50373L11.5652 8.50373M8.5652 5.50373L5.5652 8.50373M14.0652 10.5037C15.5842 10.5037 16.5652 9.27273 16.5652 7.75373C16.5651 7.15234 16.368 6.56756 16.0039 6.08893C15.6397 5.61031 15.1288 5.26424 14.5492 5.10373C14.46 3.98218 13.9952 2.92349 13.2299 2.09882C12.4646 1.27414 11.4435 0.731688 10.3317 0.559152C9.21993 0.386616 8.08246 0.594084 7.10319 1.14802C6.12392 1.70195 5.3601 2.56996 4.9352 3.61173C4.04063 3.36375 3.08418 3.4813 2.27628 3.93851C1.46837 4.39572 0.875179 5.15515 0.627202 6.04973C0.379224 6.9443 0.496772 7.90074 0.953985 8.70865C1.4112 9.51656 2.17063 10.1097 3.0652 10.3577" stroke="white" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                        <span className="font-medium">Upload ID Back View</span>
                      </button>
                    ) : (
                      <div className="w-full h-full flex flex-col items-center justify-center text-center">
                        <p className="text-xs text-emerald-600 mb-2">Upload Complete</p>
                        {backFile.previewUrl ? (
                          <img src={backFile.previewUrl} alt={backFile.name} className="max-h-56 object-contain rounded-md" />
                        ) : (
                          <div className="text-sm text-gray-700">{backFile.name}</div>
                        )}
                        <div className="mt-4 flex gap-3">
                          <button onClick={() => backInputRef.current?.click()} className="text-xs bg-orange-500 hover:bg-orange-600 text-white px-4 py-2 rounded-full transition-colors">Change</button>
                          <button onClick={() => { setBackFile(null); setBackError(''); }} className="text-xs bg-gray-200 hover:bg-gray-300 text-gray-700 px-4 py-2 rounded-full transition-colors">Remove</button>
                        </div>
                      </div>
                    )}
                  </div>
                  {backError && <p className="mt-2 text-xs text-red-500">{backError}</p>}
                  <input ref={backInputRef} type="file" accept=".jpg,.jpeg,.png,.pdf" className="hidden" onChange={handleBackChange} />
                </div>
              )}
            </div>
          </div>

        </div>
      </main>





      {/* Footer */}
      <footer className="mt-auto text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
            <p><b className=''>©</b> 2025 Smash Apartments. All Rights Reserved</p>
            <span className="hidden sm:inline">•</span>
            <p className="hover:text-gray-900 transition-colors cursor-pointer">Privacy Policy</p>
            <span className="hidden sm:inline">•</span>
            <p className="hover:text-gray-900 transition-colors cursor-pointer">Terms of Use</p>
          </div>
        </div>
      </footer>
    </div>
  );
}


function ActionItem({ icon, text }) {
  return (
    <button className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-3">
        <div className='w-10 h-10 flex items-center justify-center rounded-full bg-[#3333330D]'>
          <img src={icon} alt={text} className="w-4 h-4 text-gray-400" />
        </div>
        
        <span className="text-gray-700 font-extralight">{text}</span>
      </div>
    </button>
  );
}