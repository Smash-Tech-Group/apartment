import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import CreditCard from '../assets/icons/9.svg';
import Shield from '../assets/icons/12.svg';
import HelpCircle from '../assets/icons/5.svg';
import Navbar from './Navbar';
import Card from '../assets/icons/31.svg';
import Lock from '../assets/icons/2.svg';
import { useAuth } from '../context/AuthContext';
import MastercardIcon from '../assets/mastercard.svg';
import VisaIcon from '../assets/visa.svg';
import VerveIcon from '../assets/verve.svg';
import { getPaymentMethods, addPaymentMethod, removePaymentMethod } from '../lib/payment_method';
import { X } from 'lucide-react';

export default function Payment() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [paymentMethods, setPaymentMethods] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [formData, setFormData] = useState({
    card_number: '',
    expiration: '',
    cvv: '',
    country: 'Nigeria',
  });
  const [formError, setFormError] = useState(null);
  const [submitting, setSubmitting] = useState(false);
  const { loading: authLoading } = useAuth();

  useEffect(() => {
    if (!authLoading) fetchPaymentMethods();
  }, [authLoading]);

  const fetchPaymentMethods = async () => {
    try {
      setLoading(true);
      setError(null);
      const res = await getPaymentMethods();
      setPaymentMethods(res.data);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "card_number") {
      const cleaned = value.replace(/\D/g, "").slice(0, 16);
      const formatted = cleaned.match(/.{1,4}/g)?.join(" ") || "";
      setFormData(prev => ({ ...prev, card_number: formatted }));
      return;
    }

    if (name === "expiration") {
      const cleaned = value.replace(/\D/g, "").slice(0, 4);
      const formatted = cleaned.length > 2 ? `${cleaned.slice(0, 2)}/${cleaned.slice(2)}` : cleaned;
      setFormData(prev => ({ ...prev, expiration: formatted }));
      return;
    }

    if (name === "cvv") {
      const cleaned = value.replace(/\D/g, "").slice(0, 4);
      setFormData(prev => ({ ...prev, cvv: cleaned }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const detectCardType = (number) => {
    const cleaned = number.replace(/\s/g, "");
    if (cleaned.startsWith("5") || cleaned.startsWith("2")) return "mastercard";
    if (cleaned.startsWith("4")) return "visa";
    if (cleaned.startsWith("650") || cleaned.startsWith("506")) return "verve";
    return null;
  };

  const handleSubmit = async () => {
    setFormError(null);
    const cleaned = formData.card_number.replace(/\s/g, "");

    if (cleaned.length < 13) return setFormError("Enter a valid card number.");
    if (!formData.expiration || formData.expiration.length < 5) return setFormError("Enter a valid expiration date.");
    if (!formData.cvv || formData.cvv.length < 3) return setFormError("Enter a valid CVV.");

    try {
      setSubmitting(true);
      await addPaymentMethod(formData);
      await fetchPaymentMethods();
      setIsModalOpen(false);
      setFormData({ card_number: '', expiration: '', cvv: '', country: 'Nigeria' });
    } catch (err) {
      setFormError(err.message || "Failed to add card. Please try again.");
    } finally {
      setSubmitting(false);
    }
  };

  const handleRemove = async (id) => {
    try {
      await removePaymentMethod(id);
      setPaymentMethods(prev => prev.filter(m => m.id !== id));
    } catch (err) {
      console.error("Failed to remove card", err);
    }
  };

  const cardType = detectCardType(formData.card_number);

  return (
    <div className="min-h-screen bg-white flex flex-col">
      <Navbar showNavLinks={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-8 pt-20 sm:pt-28 flex-1 w-full">
        <div className="mb-6 text-xs sm:text-sm text-gray-600 bg-[#FF7D011A] w-fit px-3 sm:px-4 py-2 rounded-full flex items-center">
          <Link to="/dashboard" className="underline cursor-pointer hover:text-gray-900">Payments</Link>
          <span className="mx-1 sm:mx-2">|</span>
          <span className="text-gray-900">Payment Methods</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          <div className="flex-1">
            {/* Header */}
            <div className="flex items-center gap-4 mb-8">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900">Payment Methods</h1>
              <button
                onClick={() => setIsModalOpen(true)}
                className="text-[#FF7D01] text-sm font-medium flex items-center gap-1 hover:opacity-80 transition"
              >
                <span className="text-lg">+</span> Add New Payment Method
              </button>
            </div>

            {/* Loading */}
            {loading && (
              <div className="space-y-4">
                {[1, 2, 3].map(i => (
                  <div key={i} className="animate-pulse flex items-center gap-4 py-5 border-b border-gray-100">
                    <div className="w-12 h-12 rounded-full bg-gray-200"></div>
                    <div className="flex-1 h-4 bg-gray-200 rounded w-1/3"></div>
                    <div className="h-4 bg-gray-200 rounded w-20"></div>
                  </div>
                ))}
              </div>
            )}

            {/* Error */}
            {error && (
              <div className="text-center py-16">
                <p className="text-red-500 mb-4">{error}</p>
                <button onClick={fetchPaymentMethods} className="text-[#FF7D01] underline">Try again</button>
              </div>
            )}

            {/* Empty */}
            {!loading && !error && paymentMethods.length === 0 && (
              <div className="flex flex-col md:flex-row gap-8 md:gap-12 items-center">
                <div className="flex items-center justify-center w-48 h-48 sm:w-64 sm:h-64 md:w-80 md:h-80 rounded-full bg-[#F5F5F5] flex-shrink-0">
                  <img src={Card} alt="No card" className="w-24 h-24 sm:w-32 sm:h-32 md:w-40 md:h-40 object-contain" />
                </div>
                <div className="flex flex-col gap-4 text-center md:text-left">
                  <div className="text-xl sm:text-2xl font-medium text-[#333333]">No Payment Method Added</div>
                  <div className="font-extralight text-sm sm:text-base text-[#333333] max-w-md">
                    You haven't added any payment method yet. Add one now to make bookings faster and easier.
                  </div>
                  <div>
                    <button
                      onClick={() => setIsModalOpen(true)}
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FF7D01] text-white text-sm font-medium hover:bg-opacity-90 transition"
                    >
                      <span className="text-lg">+</span> Add a Payment Method
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* Card List */}
            {!loading && !error && paymentMethods.length > 0 && (
              <div className="space-y-0">
                {paymentMethods.map((method) => (
                  <CardItem
                    key={method.id}
                    method={method}
                    onRemove={() => handleRemove(method.id)}
                  />
                ))}
              </div>
            )}
          </div>

          {/* More Actions */}
          <div className="w-full lg:w-80 mt-8 lg:mt-0 lg:flex-shrink-0">
            <h2 className="text-lg sm:text-xl font-light text-gray-900 mb-4 sm:mb-6">More Actions</h2>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden">
              <ActionItem link="/details" icon={Lock} text="Personal Details" />
              <ActionItem link="/payment" icon={CreditCard} text="Payment Methods" />
              <ActionItem link="/privacy" icon={Shield} text="Privacy Policy" />
              <ActionItem link="/contact" icon={HelpCircle} text="Contact Customer Support" />
            </div>
          </div>
        </div>
      </main>

      {/* Add Card Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-3xl max-w-lg w-full p-6 sm:p-8 relative shadow-xl">
            <button
              onClick={() => { setIsModalOpen(false); setFormError(null); }}
              className="absolute top-6 right-6 w-8 h-8 flex items-center justify-center rounded-full bg-gray-100 hover:bg-gray-200 transition"
            >
              <X className="w-4 h-4 text-gray-600" />
            </button>

            <h2 className="text-xl font-semibold text-gray-900 mb-6">Add Card Details</h2>

            {/* Card Type Logos */}
            <div className="flex items-center gap-3 mb-4">
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition ${cardType === "mastercard" ? "border-[#FF7D01]" : "border-gray-200"}`}>
                <MastercardLogo />
              </div>
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition ${cardType === "visa" ? "border-[#FF7D01]" : "border-gray-200"}`}>
                <VisaLogo />
              </div>
              <div className={`w-12 h-12 rounded-full border-2 flex items-center justify-center transition ${cardType === "verve" ? "border-[#FF7D01]" : "border-gray-200"}`}>
                <VerveLogo />
              </div>
            </div>

            {/* Secure Badge */}
            <div className="flex items-center gap-2 text-xs text-gray-500 mb-6">
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect>
                <path d="M7 11V7a5 5 0 0 1 10 0v4"></path>
              </svg>
              Your details are well secured
            </div>

            {/* Form */}
            <div className="space-y-4">
              <input
                type="text"
                name="card_number"
                value={formData.card_number}
                onChange={handleChange}
                placeholder="Card Number"
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF7D01]"
              />
              <div className="flex gap-4">
                <input
                  type="text"
                  name="expiration"
                  value={formData.expiration}
                  onChange={handleChange}
                  placeholder="Expiration MM/YY"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF7D01]"
                />
                <input
                  type="password"
                  name="cvv"
                  value={formData.cvv}
                  onChange={handleChange}
                  placeholder="CVV"
                  className="flex-1 border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF7D01]"
                />
              </div>
              <select
                name="country"
                value={formData.country}
                onChange={handleChange}
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm focus:outline-none focus:border-[#FF7D01] bg-white"
              >
                <option value="Nigeria">Nigeria</option>
                <option value="Ghana">Ghana</option>
                <option value="Kenya">Kenya</option>
                <option value="South Africa">South Africa</option>
                <option value="United Kingdom">United Kingdom</option>
                <option value="United States">United States</option>
              </select>
            </div>

            {formError && (
              <p className="text-red-500 text-xs mt-3">{formError}</p>
            )}

            <button
              onClick={handleSubmit}
              disabled={submitting}
              className="mt-6 w-full bg-[#FF7D01] text-white py-4 rounded-full font-medium hover:bg-orange-500 transition disabled:opacity-50"
            >
              {submitting ? "Adding..." : "Add Card"}
            </button>
          </div>
        </div>
      )}

      <footer className="mt-auto text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
            <p><b>©</b> 2025 Smash Apartments. All Rights Reserved</p>
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

function CardItem({ method, onRemove }) {
  return (
    <div className="flex items-center py-6 border-b border-gray-100">
      <div className="w-12 h-12 rounded-full bg-gray-100 flex items-center justify-center flex-shrink-0">
        {method.card_type === "mastercard" && <MastercardLogo />}
        {method.card_type === "visa" && <VisaLogo />}
        {method.card_type === "verve" && <VerveLogo />}
      </div>
      <div className="flex-1 text-sm font-medium text-gray-900 text-center">
        {method.card_number}
      </div>
      <button
        onClick={onRemove}
        className="text-sm font-medium text-gray-900 underline hover:text-red-500 transition flex-shrink-0"
      >
        Remove Card
      </button>
    </div>
  );
}

function VisaLogo() {
  return <img src={VisaIcon} alt="Visa" className="w-8 h-5 object-contain" />;
}

function MastercardLogo() {
  return <img src={MastercardIcon} alt="Mastercard" className="w-8 h-5 object-contain" />;
}

function VerveLogo() {
  return <img src={VerveIcon} alt="Verve" className="w-8 h-5 object-contain" />;
}

function ActionItem({ icon, text, link }) {
  return (
    <Link to={link} className="w-full flex items-center justify-between p-4 hover:bg-gray-50 transition-colors border-b border-gray-100 last:border-b-0">
      <div className="flex items-center gap-3">
        <div className="w-10 h-10 flex items-center justify-center rounded-full bg-[#3333330D]">
          <img src={icon} alt={text} className="w-4 h-4" />
        </div>
        <span className="text-gray-700 font-extralight">{text}</span>
      </div>
    </Link>
  );
}