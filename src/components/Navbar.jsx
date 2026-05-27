import Logo from "../assets/logo.png";
import burger from "../assets/burger.svg";
import profile from "../assets/profile.svg";
import { NavLink, Link, useLocation, useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef  } from "react";
import { useAuth } from "../context/AuthContext";
import { forgotPassword } from "../lib/auth";
import { useToast } from "./Toast";
import VendorEligibilityModal from "./VendorEligibilityModal";
import {
  getVendorEligibilityCriteria,
  isPendingVendorRequest,
  isVendorVerifiedBySuperAdmin,
} from "../lib/vendorEligibility";

const Navbar = ({ showNavLinks = true }) => {
  const { user, loading, loginUser, registerUser, logoutUser, isAdmin } = useAuth();
  const { showToast } = useToast();

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isVendorCriteriaOpen, setIsVendorCriteriaOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const [isForgotPasswordOpen, setIsForgotPasswordOpen] = useState(false);
  const [forgotPasswordEmail, setForgotPasswordEmail] = useState("");
  const [forgotPasswordSubmitted, setForgotPasswordSubmitted] = useState(false);

  const dropdownRef = useRef(null);

  // Use React Router's useLocation and useNavigate
  const location = useLocation();
  const navigate = useNavigate();

  // Determine active tab based on current route
  const getActiveTab = () => {
    if (location.pathname === "/car-rentals") {
      return "car-rental";
    }
    return "apartments"; 
  };

  const [activeTab, setActiveTab] = useState(getActiveTab());

  // Auth-related state
  const [registerStep, setRegisterStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [agreeToTerms, setAgreeToTerms] = useState(false);
  const [authError, setAuthError] = useState("");
  const [isLoadingAuth, setIsLoadingAuth] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");
  const [pendingVerification, setPendingVerification] = useState(false);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isDropdownOpen]);

  // Update activeTab when route changes
  useEffect(() => {
    setActiveTab(getActiveTab());
  }, [location.pathname]);

  // Password strength validation
  const getPasswordStrength = (password) => {
    const checks = {
      length: password.length >= 8,
      uppercase: /[A-Z]/.test(password),
      lowercase: /[a-z]/.test(password),
      numberOrSpecial: /[0-9!@#$%^&*(),.?":{}|<>]/.test(password),
    };

    const passedChecks = Object.values(checks).filter(Boolean).length;

    return {
      checks,
      strength:
        passedChecks === 4 ? "Strong" : passedChecks >= 2 ? "Medium" : "Weak",
      isStrong: passedChecks === 4,
    };
  };

  const passwordStrength = getPasswordStrength(password);
  const vendorCriteria = getVendorEligibilityCriteria(user);
  const vendorVerified = isVendorVerifiedBySuperAdmin(user);
  const vendorPending = isPendingVendorRequest(user);

  const handleListStayClick = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsVendorCriteriaOpen(true);
  };

  const handleVendorProceed = () => {
    if (!vendorVerified) {
      showToast(
        vendorPending
          ? "Your vendor request is pending Super Admin approval."
          : "Vendor verification is required before you can list a stay.",
        "error"
      );
      return;
    }
    setIsVendorCriteriaOpen(false);
    navigate("/manage-stays");
  };

  const handleAuthClick = (type) => {
    if (type === "dashboard" || type === "profile" || type === "settings") {
      navigate(`/${type}`);
      setIsDropdownOpen(false);
      setIsMobileMenuOpen(false);
      return;
    }
    setModalType(type);
    setIsModalOpen(true);
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setRegisterStep(1);
    setAuthError("");
    setPendingVerification(false);
    // Reset form states
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setAgreeToTerms(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setModalType("");
    setRegisterStep(1);
    setAuthError("");
    setPendingVerification(false);
    // Reset form states
    setPassword("");
    setConfirmPassword("");
    setEmail("");
    setFirstName("");
    setLastName("");
    setAgreeToTerms(false);
    setShowPassword(false);
    setShowConfirmPassword(false);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setAuthError("");
    setIsLoadingAuth(true);
    try {
      await loginUser({ login: email, password });
      setIsModalOpen(false);
      // Reset form
      setEmail("");
      setPassword("");
    } catch (err) {
      setAuthError(err.message || "Login failed. Please try again.");
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleLogout = async () => {
    try {
      await logoutUser();
    } catch (err) {
      console.error("Logout error:", err);
    }
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
  };

  const handleRegisterNext = async () => {
    if (registerStep === 1) {
      // Validate step 1
      if (
        email &&
        password &&
        confirmPassword &&
        password === confirmPassword &&
        passwordStrength.isStrong
      ) {
        setRegisterStep(2);
      }
    } else if (registerStep === 2) {
      // Handle final registration via API
      if (firstName && lastName && agreeToTerms) {
        setAuthError("");
        setIsLoadingAuth(true);
        try {
          await registerUser({
            first_name: firstName,
            last_name: lastName,
            email,
            password,
          });
          setIsModalOpen(false);
          // Reset form
          setEmail("");
          setPassword("");
          setConfirmPassword("");
          setFirstName("");
          setLastName("");
          setAgreeToTerms(false);
        } catch (err) {
          setAuthError(err.message || "Registration failed. Please try again.");
        } finally {
          setIsLoadingAuth(false);
        }
      }
    }
  };

  const handleForgotPasswordSubmit = async (e) => {
    e.preventDefault();
    setIsLoadingAuth(true);
    setAuthError("");
    try {
      await forgotPassword(forgotPasswordEmail);
      setForgotPasswordSubmitted(true);
    } catch (err) {
      setAuthError(err.message || "Failed to send reset link. Please try again.");
    } finally {
      setIsLoadingAuth(false);
    }
  };

  const handleForgotPasswordClose = () => {
    setIsForgotPasswordOpen(false);
    setForgotPasswordEmail("");
    setForgotPasswordSubmitted(false);
    setAuthError("");
  };

  const handleTabClick = (tab) => {
    setIsMobileMenuOpen(false);
    
    // Use React Router navigation instead of window.location.href
    if (tab === "car-rental") {
      navigate("/car-rentals");
    } else if (tab === "apartments") {
      navigate("/");
    }
  };

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
    setIsDropdownOpen(false);
  };

  const handleGoogleSignIn = () => {
    // Google OAuth stub — requires a valid clientId in App.jsx
    console.log("Google sign in clicked — not configured yet");
  };

  return (
    <>
      <nav className="fixed top-0 left-0 right-0 bg-white z-50 shadow-sm">
        <div className="flex max-w-screen-2xl mx-auto p-3 items-center justify-between relative">
          <motion.div
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Link to='/'>
                        <img src={Logo} alt="Logo" className="h-10" />
            </Link>
          </motion.div>

          {/* Desktop Navigation */}

          {showNavLinks && (
            <div className="hidden md:block">
              <div className="flex relative p-1">
                <motion.button
                  onClick={() => handleTabClick("apartments")}
                  className={`relative z-10 px-6 py-2 flex-1 transition-all duration-300 ${activeTab === "apartments"
                    ? "text-black font-medium"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    animate={{
                      color: activeTab === "apartments" ? "#000000" : "#6b7280"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    Apartments
                  </motion.span>
                </motion.button>


                <motion.button
                  onClick={() => handleTabClick("car-rental")}
                  className={`relative z-10 px-6 py-2 flex-1 transition-all duration-300 ${activeTab === "car-rental"
                    ? "text-black font-medium"
                    : "text-gray-500 hover:text-gray-700"
                    }`}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <motion.span
                    animate={{
                      color: activeTab === "car-rental" ? "#000000" : "#6b7280"
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    Car rentals
                  </motion.span>
                </motion.button>
              </div>
            </div>
          )}

          {/* Desktop Right Side */}
          <div className="hidden md:flex bg-tertiary p-2 rounded-full items-center gap-3" ref={dropdownRef}>
            <div className="relative">
              <motion.button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <motion.img
                  src={burger}
                  alt="Menu"
                  animate={{ rotate: isDropdownOpen ? 90 : 0 }}
                  transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                  className="w-4 h-4"
                />
              </motion.button>

              <AnimatePresence>
                {isDropdownOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{
                      duration: 0.2,
                      type: "spring",
                      stiffness: 300,
                    }}
                    className="absolute right-[-80px] mt-4 w-39 bg-white rounded-2xl text-sm shadow-lg border px-3 border-gray-200 py-2 z-50"
                  >
                    {user ? (
                      <>
                        <motion.button
                          onClick={() => handleAuthClick("dashboard")}
                          className="w-full text-left py-2 px-3 text-gray-700 hover:font-semibold transition-colors duration-200"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          My Account
                        </motion.button>

                        {isAdmin && (
                          <motion.button
                            onClick={() => { navigate('/admin'); setIsDropdownOpen(false); }}
                            className="w-full text-left py-2 px-3 text-orange-600 hover:font-semibold border-t transition-colors duration-200"
                            whileHover={{ x: 4 }}
                            transition={{ type: "spring", stiffness: 300 }}
                          >
                            ⚡ Admin Dashboard
                          </motion.button>
                        )}

                        <motion.button
                          onClick={() => handleAuthClick("Notifications")}
                          className="w-full text-left py-2 px-3 text-gray-700 hover:font-semibold border-t transition-colors duration-200"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          Notifications
                        </motion.button>

                        <motion.button
                          onClick={handleListStayClick}
                          className="w-full text-left py-2 px-3 text-gray-700 hover:font-semibold border-t transition-colors duration-200"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          List Stays
                        </motion.button>

                        <motion.button
                          onClick={() => handleAuthClick("dashboard")}
                          className="w-full text-left py-2 px-3 text-gray-700 hover:font-semibold border-t transition-colors duration-200"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          List Rides
                        </motion.button>

                        <motion.button
                          onClick={handleLogout}
                          className="w-full text-left py-2 px-3 text-gray-700 hover:font-semibold border-t transition-colors duration-200"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          Sign Out
                        </motion.button>
                      </>
                    ) : (
                      <>
                        <motion.button
                          onClick={() => handleAuthClick("register")}
                          className="w-full text-left py-2 px-3 text-gray-700 hover:font-semibold transition-colors duration-200"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          Register
                        </motion.button>
                        <motion.button
                          onClick={() => handleAuthClick("signin")}
                          className="w-full text-left py-2 px-3 text-gray-700 hover:font-semibold border-t transition-colors duration-200"
                          whileHover={{ x: 4 }}
                          transition={{ type: "spring", stiffness: 300 }}
                        >
                          Sign In
                        </motion.button>
                   
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div 
              className="flex items-center gap-2"
              whileHover={{ scale: 1.02 }}
            >
              <motion.span 
                className="text-sm font-medium text-gray-700"
                animate={{ opacity: user ? 1 : 0.7 }}
                transition={{ duration: 0.3 }}
              >
                {user ? user.first_name : "Guest"}
              </motion.span>
              <motion.img 
                src={profile} 
                alt="Profile" 
                className="w-6 h-6"
                // whileHover={{ rotate: 360 }}
                // transition={{ duration: 0.5 }}
              />
            </motion.div>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden flex items-center gap-2">
            <div className="flex items-center gap-2">
              <motion.img 
                src={profile} 
                alt="Profile" 
                className="w-6 h-6"
                whileHover={{ rotate: 360 }}
                transition={{ duration: 0.5 }}
              />
              <span className="text-sm font-medium text-gray-700 hidden sm:block">
                {user ? user.first_name : "Guest"}
              </span>
            </div>
            <motion.button
              onClick={toggleMobileMenu}
              className="p-2 hover:bg-gray-100 rounded-lg transition-colors duration-200"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <motion.img
                src={burger}
                alt="Menu"
                animate={{ rotate: isMobileMenuOpen ? 90 : 0 }}
                transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
                className="w-6 h-6"
              />
            </motion.button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.3, type: "spring", stiffness: 200 }}
            className="md:hidden fixed top-16 left-0 right-0 bg-white border-b border-gray-200 shadow-lg z-40"
          >
            <div className="max-w-screen-2xl mx-auto px-3 py-4 space-y-2">
              {/* Mobile Navigation Links */}
              <div className="space-y-1">
                <motion.button
                  onClick={() => handleTabClick("apartments")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${activeTab === "apartments"
                    ? "bg-gray-100 text-base font-medium"
                    : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                    }`}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <motion.div
                    animate={{
                      color: activeTab === "apartments" ? "#000" : "#6b7280",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    Apartments
                  </motion.div>
                </motion.button>

                <motion.button
                  onClick={() => handleTabClick("car-rental")}
                  className={`w-full text-left px-4 py-3 rounded-lg transition-all duration-300 ${
                    activeTab === "car-rental"
                      ? "bg-gray-100 text-bases font-medium"
                      : "text-gray-500 hover:text-gray-700 hover:bg-gray-50"
                  }`}
                  whileHover={{ x: 4, scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.15 }}
                >
                  <motion.div
                    animate={{
                      color: activeTab === "car-rental" ? "#000" : "#6b7280",
                    }}
                    transition={{ duration: 0.2 }}
                  >
                    Car rentals
                  </motion.div>
                </motion.button>
              </div>

              {/* Mobile Auth Buttons */}
              <motion.div
                className="border-t border-gray-200 pt-2 mt-2 space-y-1"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2 }}
              >
                {user ? (
                  <motion.button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                    whileHover={{ x: 4, scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    Logout
                  </motion.button>
                ) : (
                  <>
                    <motion.button
                      onClick={() => handleAuthClick("signin")}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      whileHover={{ x: 4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Sign In
                    </motion.button>
                    <motion.button
                      onClick={() => handleAuthClick("register")}
                      className="w-full text-left px-4 py-3 text-gray-700 hover:bg-gray-50 rounded-lg transition-colors duration-200"
                      whileHover={{ x: 4, scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Register
                    </motion.button>
                  </>
                )}
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Modal Overlay */}
      <AnimatePresence>
        {isModalOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
            onClick={handleModalClose}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ duration: 0.3, type: "spring", stiffness: 300 }}
              className="bg-white rounded-2xl p-6 w-full max-w-xl mx-4 shadow-xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <img src={Logo} className="h-10" alt="" />
                </motion.div>
                <motion.button
                  onClick={handleModalClose}
                  className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                  whileHover={{ scale: 1.1, rotate: 90 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg
                    className="w-6 h-6"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M6 18L18 6M6 6l12 12"
                    />
                  </svg>
                </motion.button>
              </div>

              {/* Error Display */}
              {authError && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg"
                >
                  <p className="text-red-700 text-sm">{authError}</p>
                </motion.div>
              )}

              {/* Sign In Form */}
              {modalType === "signin" && (
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  <h3 className="text-sm font-semibold text-center">
                    Sign In To Your Account
                  </h3>
                  <div className="w-full">
                    <motion.div 
                      className="flex items-center border border-gray-300 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-blue-500"

                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      <span className="px-4 text-sm text-gray-500 border-r border-gray-300">
                        Email
                      </span>
                      <input
                        type="email"
                        onChange={(e) => setEmail(e.target.value)}
                        className="flex-1 px-3 py-[13px] text-xs focus:outline-none"
                        placeholder="Enter your email"
                      />
                    </motion.div>
                  </div>

                  <div className="w-full">
                    <motion.div 
                      className="flex items-center border border-gray-300 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 relative"

                      transition={{ type: "spring", stiffness: 300 }}
                    >
                      {/* Left inline label with separator */}
                      <span className="px-4 text-sm text-gray-500 border-r border-gray-300">
                        Password
                      </span>

                      {/* Input field */}
                      <input
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="flex-1 px-3 py-[13px] text-xs focus:outline-none"
                        placeholder="Enter your password"
                      />

                      {/* Show/hide password button */}
                      <motion.button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                      >
                        {showPassword ? (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                            />
                          </svg>
                        ) : (
                          <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                            />
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                            />
                          </svg>
                        )}
                      </motion.button>
                    </motion.div>
                  </div>

                  {/* Forgotten Password */}
                  <div className="text-right">
                    <motion.button
                      onClick={() => setIsForgotPasswordOpen(true)}
                      className="text-xs text-primary hover:text-blue-700 font-medium"
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Forgotten Password?
                    </motion.button>

                    {/* Forgot Password Modal */}
                    <AnimatePresence>
                      {isForgotPasswordOpen && (
                        <motion.div
                          initial={{ opacity: 0 }}
                          animate={{ opacity: 1 }}
                          exit={{ opacity: 0 }}
                          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4"
                          onClick={handleForgotPasswordClose}
                        >
                          <motion.div
                            initial={{ opacity: 0, scale: 0.9, y: 20 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.9, y: 20 }}
                            transition={{
                              duration: 0.3,
                              type: "spring",
                              stiffness: 300,
                            }}
                            className="bg-white rounded-2xl p-6 w-full max-w-xl !h-[500px] mx-4 shadow-xl"
                            onClick={(e) => e.stopPropagation()}
                          >
                            <div className="flex justify-between items-center mb-6">
                              <motion.div
                                whileHover={{ scale: 1.05 }}
                                transition={{ type: "spring", stiffness: 300 }}
                              >
                                <img src={Logo} className="h-10" alt="" />
                              </motion.div>
                              <motion.button
                                onClick={handleForgotPasswordClose}
                                className="text-gray-400 hover:text-gray-600 transition-colors duration-200 p-1"
                                whileHover={{ scale: 1.1, rotate: 90 }}
                                whileTap={{ scale: 0.9 }}
                              >
                                <svg
                                  className="w-6 h-6"
                                  fill="none"
                                  stroke="currentColor"
                                  viewBox="0 0 24 24"
                                >
                                  <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    strokeWidth={2}
                                    d="M6 18L18 6M6 6l12 12"
                                  />
                                </svg>
                              </motion.button>
                            </div>

                            <motion.div
                              className="space-y-4"
                              initial={{ opacity: 0, y: 20 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.1 }}
                            >
                              {!forgotPasswordSubmitted ? (
                                <>
                                  <div className="text-center mb-4">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                      Reset Your Password
                                    </h3>
                                    <p className="text-sm text-left text-gray-600">
                              Enter your email address linked to Smash Apartments, and we'll send you a reset link to regain access to your account.
                                    </p>
                                  </div>

                                  <form
                                    onSubmit={handleForgotPasswordSubmit}
                                    className="space-y-4"
                                  >
                                    <div className="w-full">
                                      <motion.div
                                        className="flex items-center border border-gray-300 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-blue-500"

                                        transition={{
                                          type: "spring",
                                          stiffness: 300,
                                        }}
                                      >
                                        <span className="px-4 text-sm text-gray-500 border-r border-gray-300">
                                          Email
                                        </span>
                                        <input
                                          type="email"
                                          value={forgotPasswordEmail}
                                          onChange={(e) =>
                                            setForgotPasswordEmail(
                                              e.target.value
                                            )
                                          }
                                          className="flex-1 px-3 py-[13px] text-xs focus:outline-none"
                                          placeholder="Enter your email"
                                          required
                                        />
                                      </motion.div>
                                    </div>

                                    <div className="flex space-x-3">
                                      {/* <motion.button
                                        type="button"
                                        onClick={handleForgotPasswordClose}
                                        className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-full hover:bg-gray-300 transition-colors duration-200 font-medium text-sm"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        Cancel
                                      </motion.button> */}
                                      <motion.button
                                        type="submit"
                                        className="flex-1 bg-primary text-white py-3 px-4 rounded-full hover:bg-opacity-80 transition-colors duration-200 font-medium text-sm"
                                        whileHover={{ scale: 1.02 }}
                                        whileTap={{ scale: 0.98 }}
                                      >
                                        Send Reset Link
                                      </motion.button>
                                    </div>
                                  </form>
                                </>
                              ) : (
                                <>
                                  <div className="text-center py-6">
                                    <motion.div
                                      initial={{ scale: 0 }}
                                      animate={{ scale: 1 }}
                                      transition={{
                                        delay: 0.2,
                                        type: "spring",
                                        stiffness: 300,
                                      }}
                                      className="mx-auto mb-4 w-16 h-16 bg-green-100 rounded-full flex items-center justify-center"
                                    >
                                      <svg
                                        className="w-8 h-8 text-green-600"
                                        fill="none"
                                        stroke="currentColor"
                                        viewBox="0 0 24 24"
                                      >
                                        <path
                                          strokeLinecap="round"
                                          strokeLinejoin="round"
                                          strokeWidth={2}
                                          d="M5 13l4 4L19 7"
                                        />
                                      </svg>
                                    </motion.div>
                                    <h3 className="text-lg font-semibold text-gray-800 mb-2">
                                      Check Your Email
                                    </h3>
                                    <p className="text-sm text-gray-600 mb-6">
                                      We've sent a password reset link to{" "}
                                      <span className="font-medium">
                                        {forgotPasswordEmail}
                                      </span>
                                    </p>
                                    <motion.button
                                      onClick={handleForgotPasswordClose}
                                      className="w-full bg-primary text-white py-3 px-4 rounded-full hover:bg-opacity-80 transition-colors duration-200 font-medium text-sm"
                                      whileHover={{ scale: 1.02 }}
                                      whileTap={{ scale: 0.98 }}
                                    >
                                      Done
                                    </motion.button>
                                  </div>
                                </>
                              )}
                            </motion.div>
                          </motion.div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>

                  <motion.button
                    onClick={handleLogin}
                    disabled={isLoadingAuth}
                    className="w-full bg-primary text-white py-3 px-4 rounded-full hover:bg-opacity-80 transition-colors duration-200 font-medium text-sm disabled:opacity-50"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {isLoadingAuth ? "Signing in..." : "Sign In"}
                  </motion.button>

                  {/* Divider */}
                  <div className="flex items-center my-6">
                    <div className="flex-grow border-t border-gray-300"></div>
                    <span className="px-4 text-sm text-gray-500">
                      or continue with
                    </span>
                    <div className="flex-grow border-t border-gray-300"></div>
                  </div>

                  {/* Google Sign In */}
                  <motion.button
                    onClick={handleGoogleSignIn}
                    className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200 font-medium text-sm"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg className="w-5 h-5" viewBox="0 0 24 24">
                      <path
                        fill="#4285F4"
                        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      />
                      <path
                        fill="#34A853"
                        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      />
                      <path
                        fill="#FBBC05"
                        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      />
                      <path
                        fill="#EA4335"
                        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      />
                    </svg>
                    Continue with Google
                  </motion.button>

                </motion.div>
              )}

              {/* Register Form */}
              {modalType === "register" && (
                <motion.div
                  className="space-y-3"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                >
                  {registerStep === 1 && (
                    <>
                      {authError && (
                        <div className="bg-red-50 text-red-600 p-2 text-xs rounded mb-2">
                          {authError}
                        </div>
                      )}
                      <div className="w-full">
                        <motion.div
                          className="flex items-center border border-gray-300 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-blue-500"

                        >
                          <span className="px-4 text-sm text-gray-500 border-r border-gray-300">
                            Email
                          </span>
                          <input
                            type="email"
                            onChange={(e) => setEmail(e.target.value)}
                            className="flex-1 px-3 py-[13px] text-xs focus:outline-none"
                            placeholder="Enter your email"
                          />
                        </motion.div>
                      </div>

                      {/* Password Field */}
                      <div className="w-full mb-6">
                        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 relative">
                          <span className="px-4 text-sm text-gray-500 border-r border-gray-300">
                            Password
                          </span>
                          <input
                            type={showPassword ? "text" : "password"}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="flex-1 px-3 py-[13px] text-xs focus:outline-none"
                            placeholder="Enter your password"
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showPassword ? (
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7
               a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 
               9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 
               9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 
               0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            )}
                          </button>
                        </div>

                        {/* Password Strength Indicators */}
                        {password && (
                          <div className="mt-2 space-y-1">
                            <div className="flex items-center justify-between">
                              <span className="text-xs">
                                Password Strength:
                              </span>
                              <span
                                className={`text-sm font-medium ${passwordStrength.strength === "Strong"
                                  ? "text-green-600"
                                  : passwordStrength.strength === "Medium"
                                    ? "text-yellow-600"
                                    : "text-red-600"
                                  }`}
                              >
                                {passwordStrength.strength}
                              </span>
                            </div>
                            <div className="space-y-1 text-xs">
                              <div
                                className={
                                  passwordStrength.checks.length
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                ✓ Minimum of 8 characters
                              </div>
                              <div
                                className={
                                  passwordStrength.checks.uppercase
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                ✓ At least 1 uppercase
                              </div>
                              <div
                                className={
                                  passwordStrength.checks.lowercase
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                ✓ At least 1 lowercase
                              </div>
                              <div
                                className={
                                  passwordStrength.checks.numberOrSpecial
                                    ? "text-green-600"
                                    : "text-red-600"
                                }
                              >
                                ✓ At least 1 number or special character
                              </div>
                            </div>
                          </div>
                        )}
                      </div>

                      {/* Confirm Password Field */}
                      <div className="w-full">
                        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-blue-500 relative">
                          <span className="px-4 text-sm text-gray-500 border-r border-gray-300">
                            Confirm
                          </span>
                          <input
                            type={showConfirmPassword ? "text" : "password"}
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="flex-1 text-xs px-3 py-[13px] focus:outline-none"
                            placeholder="Confirm your password"
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowConfirmPassword(!showConfirmPassword)
                            }
                            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
                          >
                            {showConfirmPassword ? (
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7
               a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 
               9.878l4.242 4.242M9.878 9.878L3 3m6.878 6.878L21 21"
                                />
                              </svg>
                            ) : (
                              <svg
                                className="w-5 h-5"
                                fill="none"
                                stroke="currentColor"
                                viewBox="0 0 24 24"
                              >
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                />
                                <path
                                  strokeLinecap="round"
                                  strokeLinejoin="round"
                                  strokeWidth={2}
                                  d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 
               9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 
               0-8.268-2.943-9.542-7z"
                                />
                              </svg>
                            )}
                          </button>
                        </div>

                        {/* Mismatch error */}
                        {confirmPassword && password !== confirmPassword && (
                          <p className="text-red-600 text-xs mt-1">
                            Passwords do not match
                          </p>
                        )}
                      </div>

                      <button
                        onClick={handleRegisterNext}
                        disabled={
                          !email ||
                          !password ||
                          !confirmPassword ||
                          password !== confirmPassword ||
                          !passwordStrength.isStrong
                        }
                        className="w-full bg-primary text-white py-3 px-4 rounded-full hover:bg-opacity-80 transition-colors duration-200 font-medium text-base disabled:bg-gray-300 disabled:cursor-not-allowed"
                      >
                        Next
                      </button>

                      {/* Divider */}
                      <div className="flex items-center my-6">
                        <div className="flex-grow border-t border-gray-300"></div>
                        <span className="px-4 text-sm text-gray-500">
                          or continue with
                        </span>
                        <div className="flex-grow border-t border-gray-300"></div>
                      </div>

                      {/* Google Sign In */}
                      <button
                        onClick={handleGoogleSignIn}
                        className="w-full flex items-center justify-center gap-3 py-3 px-4 border border-gray-300 rounded-full hover:bg-gray-50 transition-colors duration-200 font-medium text-sm"
                      >
                        <svg className="w-5 h-5" viewBox="0 0 24 24">
                          <path
                            fill="#4285F4"
                            d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                          />
                          <path
                            fill="#34A853"
                            d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                          />
                          <path
                            fill="#FBBC05"
                            d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                          />
                          <path
                            fill="#EA4335"
                            d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                          />
                        </svg>
                        Continue with Google
                      </button>
                    </>
                  )}

                  {registerStep === 2 && (
                    <>
                      {authError && (
                        <div className="bg-red-50 text-red-600 p-2 text-xs rounded mb-2 w-full text-center">
                          {authError}
                        </div>
                      )}

                      <div className="text-center mb-4">
                        <h3 className="text-md font-semibold text-gray-800">
                          Complete Your Profile
                        </h3>
                        <p className="text-sm text-gray-600">
                          Just a few more details to get started
                        </p>
                      </div>

                      {/* First Name Field */}
                      <div className="w-full mb-6">
                        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                          <span className="px-4 text-sm text-gray-500 border-r border-gray-300">
                            First Name
                          </span>
                          <input
                            type="text"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="flex-1 px-3 py-[13px] text-xs focus:outline-none"
                            placeholder="Enter your first name"
                          />
                        </div>
                      </div>

                      {/* Last Name Field */}
                      <div className="w-full">
                        <div className="flex items-center border border-gray-300 rounded-full overflow-hidden focus-within:ring-2 focus-within:ring-blue-500">
                          <span className="px-4 text-sm text-gray-500 border-r border-gray-300">
                            Last Name
                          </span>
                          <input
                            type="text"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="flex-1 px-3 py-[13px] text-xs focus:outline-none"
                            placeholder="Enter your last name"
                          />
                        </div>
                      </div>

                      <div className="flex  items-start space-x-3">
                        <input
                          type="checkbox"
                          id="terms"
                          checked={agreeToTerms}
                          onChange={(e) => setAgreeToTerms(e.target.checked)}
                          className="mt-1 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                        />
                        <label
                          htmlFor="terms"
                          className="text-xs text-gray-700"
                        >
                          By clicking "Agree and Continue”, I confirm that I
                          have read and agree to Smash Apartments'
                          <button
                            onClick={() => console.log("Terms clicked")}
                            className="text-primary font-medium"
                          >
                            Payment Terms, Terms of Service,
                          </button>{" "}
                          and{" "}
                          <button
                            onClick={() => console.log("Privacy clicked")}
                            className="text-primary font-medium"
                          >
                            acknowledge the Privacy Policy.
                          </button>
                        </label>
                      </div>

                      <div className="flex space-x-3">
                        <button
                          onClick={() => setRegisterStep(1)}
                          className="flex-1 bg-gray-200 text-gray-700 py-3 px-4 rounded-full hover:bg-gray-300 transition-colors duration-200 font-medium text-base"
                        >
                          Back
                        </button>
                        <button
                          onClick={handleRegisterNext}
                          disabled={!firstName || !lastName || !agreeToTerms || isLoadingAuth}
                          className="flex-1 bg-primary text-white py-3 px-4 rounded-full hover:bg-opacity-80 transition-colors duration-200 font-medium text-base disabled:bg-gray-300 disabled:cursor-not-allowed"
                        >
                          {isLoadingAuth ? "Creating..." : "Create Account"}
                        </button>
                      </div>
                    </>
                  )}
                </motion.div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <VendorEligibilityModal
        isOpen={isVendorCriteriaOpen}
        onClose={() => setIsVendorCriteriaOpen(false)}
        onProceed={handleVendorProceed}
        onGoToDetails={() => {
          setIsVendorCriteriaOpen(false);
          navigate('/details');
        }}
        onGoToIdVerification={() => {
          setIsVendorCriteriaOpen(false);
          navigate('/id-verify');
        }}
        criteria={vendorCriteria}
        isVendorVerified={vendorVerified}
        isPendingApproval={vendorPending}
      />
    </>
  );
};

export default Navbar;
