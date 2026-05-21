import React, { useState } from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import { ChevronDown, Search, Building2, Car, CreditCard, UserCog, Shield, HelpCircle } from 'lucide-react';

const FAQPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [activeCategory, setActiveCategory] = useState('all');
  const [openItems, setOpenItems] = useState({});

  const toggleItem = (id) => setOpenItems(prev => ({ ...prev, [id]: !prev[id] }));

  const categories = [
    { id: 'all', label: 'All Questions', icon: <HelpCircle className="w-4 h-4" /> },
    { id: 'booking', label: 'Bookings', icon: <Building2 className="w-4 h-4" /> },
    { id: 'payment', label: 'Payments', icon: <CreditCard className="w-4 h-4" /> },
    { id: 'cars', label: 'Car Rentals', icon: <Car className="w-4 h-4" /> },
    { id: 'account', label: 'Account', icon: <UserCog className="w-4 h-4" /> },
    { id: 'safety', label: 'Safety', icon: <Shield className="w-4 h-4" /> },
  ];

  const faqs = [
    // Bookings
    { id: 1, category: 'booking', q: 'How do I book an apartment on Smash Apartments?', a: 'Simply browse our listings, select your preferred apartment, choose your check-in and check-out dates, and click "Book Now." You\'ll be guided through a simple checkout process. You can also contact the host directly for any special requests before confirming your booking.' },
    { id: 2, category: 'booking', q: 'Can I cancel or modify my booking?', a: 'Yes, you can cancel or modify your booking depending on the cancellation policy of the listing. Each property has its own cancellation terms — you can view these on the listing page before booking. To cancel, go to your Dashboard → Manage Stays and select the booking you want to modify.' },
    { id: 3, category: 'booking', q: 'How far in advance should I book?', a: 'We recommend booking at least 3–7 days in advance for the best availability, especially in popular cities like Lagos and Abuja. However, some properties accept same-day bookings for last-minute travelers.' },
    { id: 4, category: 'booking', q: 'Can I book for someone else?', a: 'Yes, you can book on behalf of another person. During checkout, simply enter the guest\'s name and contact details in the guest information section. The booking confirmation will be sent to both your email and the guest\'s email.' },

    // Payments
    { id: 5, category: 'payment', q: 'What payment methods are accepted?', a: 'We accept bank transfers, debit/credit cards (Visa, Mastercard), and online payment gateways. All payments are processed securely through our platform. We do not accept cash payments to ensure safety and traceability.' },
    { id: 6, category: 'payment', q: 'Is my payment information secure?', a: 'Absolutely. We use bank-grade encryption (SSL/TLS) and partner with PCI-compliant payment processors to ensure your financial data is fully protected. We never store your full card details on our servers.' },
    { id: 7, category: 'payment', q: 'How do I get a refund?', a: 'Refunds are processed according to the listing\'s cancellation policy. If you\'re eligible for a refund, it will be processed within 5–10 business days to your original payment method. You can track your refund status in your Dashboard → Payment History.' },
    { id: 8, category: 'payment', q: 'Are there any hidden fees?', a: 'No. The price you see on the listing page is the price you pay. We display the total cost including all service fees before you confirm your booking. There are no surprise charges.' },

    // Car Rentals
    { id: 9, category: 'cars', q: 'How does car rental work on Smash Apartments?', a: 'Browse available vehicles in your city, select your preferred car, choose pickup and return dates, and complete the booking. Vehicles are provided by verified rental partners. You can choose between self-drive and chauffeur-driven options depending on availability.' },
    { id: 10, category: 'cars', q: 'Do I need a driver\'s license to rent a car?', a: 'Yes, for self-drive rentals you must have a valid Nigerian or international driver\'s license. You\'ll need to present it at pickup. For chauffeur-driven options, no license is required — your driver handles everything.' },
    { id: 11, category: 'cars', q: 'What happens if the car breaks down?', a: 'All listed vehicles come with roadside assistance provided by the rental partner. In case of a breakdown, contact the car owner directly or call our emergency support line for immediate help.' },
    { id: 12, category: 'cars', q: 'Is insurance included in the rental?', a: 'Basic insurance coverage is included in all car rentals on our platform. For additional comprehensive coverage, you can opt for premium insurance at an additional cost during the booking process.' },

    // Account
    { id: 13, category: 'account', q: 'How do I create an account?', a: 'Click "Register" on the navigation bar, enter your email, create a password, and fill in your personal details. You\'ll receive a verification email — click the link to activate your account. You can also sign up using your Google account for faster registration.' },
    { id: 14, category: 'account', q: 'How do I list my property or vehicle?', a: 'After creating an account, go to your Dashboard and click "List Stay" or "List Ride." Follow the step-by-step wizard to add photos, descriptions, pricing, and amenities. Your listing will be reviewed before going live to ensure quality standards.' },
    { id: 15, category: 'account', q: 'How do I reset my password?', a: 'Click "Forgotten Password?" on the login form, enter your registered email, and we\'ll send you a password reset link. The link expires after 24 hours for security. If you don\'t receive the email, check your spam folder.' },
    { id: 16, category: 'account', q: 'Can I have multiple accounts?', a: 'No, each user should have only one account. Multiple accounts may be flagged and deactivated. If you need to manage both personal and business listings, you can do so from a single account.' },

    // Safety
    { id: 17, category: 'safety', q: 'How does Smash Apartments verify listings?', a: 'All listings go through a multi-step verification process. We verify the host\'s identity, review property photos and descriptions for accuracy, and check for compliance with our quality standards. We also encourage guest reviews to maintain accountability.' },
    { id: 18, category: 'safety', q: 'What should I do if I feel unsafe at a listing?', a: 'Your safety is our top priority. If you feel unsafe, leave the property immediately and contact our emergency support line. We take all safety reports seriously and will investigate promptly. You can also reach local emergency services by dialing 112.' },
    { id: 19, category: 'safety', q: 'How are hosts vetted?', a: 'Hosts must complete ID verification and provide valid documentation before their listings go live. We also monitor host ratings and respond to guest feedback. Hosts with consistent negative reviews or policy violations are removed from the platform.' },
  ];

  const filtered = faqs.filter(faq => {
    const matchesCategory = activeCategory === 'all' || faq.category === activeCategory;
    const matchesSearch = !searchQuery || faq.q.toLowerCase().includes(searchQuery.toLowerCase()) || faq.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <HelmetProvider>
      <Helmet>
        <title>FAQ | Smash Apartments - Frequently Asked Questions</title>
        <meta name="description" content="Find answers to frequently asked questions about Smash Apartments. Learn about bookings, payments, car rentals, account management, and safety." />
        <link rel="canonical" href="https://www.smashapartments.com/faq" />
      </Helmet>

      <div>
        <Navbar />
      </div>

      <main className="mt-[6.5rem]">
        {/* Hero */}
        <section className="mx-[15px] md:mx-[32px] mb-12">
          <div className="max-w-screen-2xl mx-auto bg-gradient-to-br from-orange-50 via-white to-orange-50 rounded-2xl p-8 md:p-16">
            <div className="max-w-3xl mx-auto text-center">
              <p className="text-primary font-semibold text-sm mb-3 tracking-wider uppercase">Help Center</p>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Frequently Asked <span className="text-primary">Questions</span>
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                Everything you need to know about using Smash Apartments. Can't find what you're looking for? Contact our support team.
              </p>
              {/* Search */}
              <div className="relative max-w-xl mx-auto">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search questions..."
                  value={searchQuery}
                  onChange={e => setSearchQuery(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 border border-gray-200 rounded-2xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary shadow-sm"
                />
              </div>
            </div>
          </div>
        </section>

        {/* Category Tabs */}
        <section className="mx-[15px] md:mx-[32px] mb-10">
          <div className="max-w-screen-2xl mx-auto">
            <div className="flex flex-wrap gap-2 justify-center">
              {categories.map(cat => (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id)}
                  className={`flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-medium transition-all duration-200 ${
                    activeCategory === cat.id
                      ? 'bg-primary text-white shadow-md'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {cat.icon}
                  {cat.label}
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* FAQ Accordion */}
        <section className="mx-[15px] md:mx-[32px] mb-16">
          <div className="max-w-3xl mx-auto">
            {filtered.length === 0 ? (
              <div className="text-center py-12">
                <HelpCircle className="w-12 h-12 text-gray-300 mx-auto mb-4" />
                <p className="text-gray-500 text-lg font-medium mb-2">No questions found</p>
                <p className="text-gray-400 text-sm">Try a different search term or category.</p>
              </div>
            ) : (
              <div className="space-y-3">
                {filtered.map(faq => (
                  <div key={faq.id} className="bg-white border border-gray-100 rounded-2xl overflow-hidden hover:shadow-md transition-shadow duration-300">
                    <button
                      onClick={() => toggleItem(faq.id)}
                      className="w-full flex items-center justify-between px-6 py-5 text-left"
                    >
                      <span className="font-semibold text-gray-900 text-sm pr-4">{faq.q}</span>
                      <ChevronDown className={`w-5 h-5 text-gray-400 shrink-0 transition-transform duration-300 ${openItems[faq.id] ? 'rotate-180' : ''}`} />
                    </button>
                    {openItems[faq.id] && (
                      <div className="px-6 pb-5 border-t border-gray-50">
                        <p className="text-gray-600 text-sm leading-relaxed pt-4">{faq.a}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>

        {/* Still need help CTA */}
        <section className="mx-[15px] md:mx-[32px] mb-16">
          <div className="max-w-screen-2xl mx-auto bg-gray-900 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Still Have Questions?</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
              Can't find what you're looking for? Our support team is always ready to help.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/Customer-service" className="bg-primary text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors">
                Contact Support
              </Link>
              <a href="mailto:info@smashapartments.com" className="bg-white/10 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-white/20 transition-colors border border-white/20">
                Email Us
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </HelmetProvider>
  );
};

export default FAQPage;
