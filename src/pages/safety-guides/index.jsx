import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import { Shield, Home, Car, CreditCard, AlertTriangle, Users, Phone, Lock, Eye, CheckCircle2 } from 'lucide-react';

const SafetyGuidesPage = () => {
  const guides = [
    {
      icon: <Home className="w-7 h-7" />,
      title: 'Apartment Safety',
      color: 'from-blue-500 to-cyan-500',
      tips: [
        { title: 'Verify the listing', desc: 'Check reviews, ratings, and photos before booking. Look for verified host badges and read previous guest experiences.' },
        { title: 'Confirm the address', desc: 'Before traveling, confirm the exact location with the host. Use Google Maps to check the neighborhood and proximity to major landmarks.' },
        { title: 'Inspect on arrival', desc: 'Check that the apartment matches the listing description. Document any issues with photos and report them immediately through the app.' },
        { title: 'Secure your belongings', desc: 'Use the in-room safe if available. Keep valuables locked and never leave doors or windows open when you leave.' },
        { title: 'Know the exits', desc: 'Familiarize yourself with emergency exits, fire extinguisher locations, and building evacuation procedures upon check-in.' },
      ]
    },
    {
      icon: <Car className="w-7 h-7" />,
      title: 'Car Rental Safety',
      color: 'from-emerald-500 to-green-500',
      tips: [
        { title: 'Inspect the vehicle', desc: 'Before driving off, walk around the car and document any existing damage (scratches, dents) with photos and timestamps.' },
        { title: 'Check documents', desc: 'Ensure the car has valid registration, insurance papers, and a spare tire. Verify the vehicle identification matches the booking.' },
        { title: 'Test before you go', desc: 'Check brakes, lights, indicators, horn, wipers, and air conditioning before leaving the pickup point.' },
        { title: 'Follow traffic rules', desc: 'Obey speed limits, wear seatbelts at all times, and avoid using your phone while driving. Nigerian roads can be unpredictable.' },
        { title: 'Emergency kit', desc: 'Ensure the car has a first aid kit, warning triangle, fire extinguisher, and the rental company\'s emergency contact number.' },
      ]
    },
    {
      icon: <CreditCard className="w-7 h-7" />,
      title: 'Payment Safety',
      color: 'from-orange-500 to-amber-500',
      tips: [
        { title: 'Pay through the platform', desc: 'Always make payments through Smash Apartments. Never transfer money directly to a host\'s personal bank account.' },
        { title: 'Avoid cash transactions', desc: 'Cash payments have no traceability. Use our secure payment gateway to ensure your transaction is protected.' },
        { title: 'Verify charges', desc: 'Review the total cost breakdown before confirming payment. Check for service fees, security deposits, and any additional charges.' },
        { title: 'Save your receipts', desc: 'Download and save payment receipts from your Dashboard. These serve as proof of payment in case of disputes.' },
        { title: 'Report suspicious activity', desc: 'If a host asks you to pay outside the platform or offers an unusual discount for direct payment, report them immediately.' },
      ]
    },
    {
      icon: <Lock className="w-7 h-7" />,
      title: 'Account Security',
      color: 'from-purple-500 to-violet-500',
      tips: [
        { title: 'Use a strong password', desc: 'Create a password with at least 8 characters, including uppercase, lowercase, numbers, and special characters.' },
        { title: 'Enable two-factor authentication', desc: 'Add an extra layer of security to your account by enabling 2FA in your account settings when available.' },
        { title: 'Don\'t share credentials', desc: 'Never share your login details with anyone. Smash Apartments staff will never ask for your password.' },
        { title: 'Log out on shared devices', desc: 'Always log out after using shared or public computers. Clear browser data if possible.' },
        { title: 'Update your info regularly', desc: 'Keep your email, phone number, and profile information up to date for account recovery purposes.' },
      ]
    },
    {
      icon: <Users className="w-7 h-7" />,
      title: 'Personal Safety',
      color: 'from-rose-500 to-pink-500',
      tips: [
        { title: 'Share your itinerary', desc: 'Let a trusted friend or family member know where you\'re staying and your expected check-in/check-out dates.' },
        { title: 'Trust your instincts', desc: 'If something feels wrong about a listing or a host\'s behavior, don\'t hesitate to cancel and contact our support team.' },
        { title: 'Meet in public areas', desc: 'If meeting a host for key handover, do so in a well-lit, public area during daylight hours when possible.' },
        { title: 'Keep emergency contacts handy', desc: 'Save local emergency numbers: Police (199), Fire (190), Ambulance (112), and Smash Apartments support.' },
        { title: 'Stay connected', desc: 'Keep your phone charged and ensure you have mobile data or Wi-Fi access for navigation and communication.' },
      ]
    },
  ];

  const emergencyContacts = [
    { label: 'Smash Apartments Support', number: '+234 800 SMASH AP', icon: <Phone className="w-4 h-4" /> },
    { label: 'Nigerian Police', number: '199 / 112', icon: <Shield className="w-4 h-4" /> },
    { label: 'Fire Service', number: '190', icon: <AlertTriangle className="w-4 h-4" /> },
    { label: 'Ambulance / Emergency', number: '112', icon: <Phone className="w-4 h-4" /> },
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>Safety Guides | Smash Apartments - Stay Safe with Us</title>
        <meta name="description" content="Your safety matters. Read Smash Apartments' comprehensive safety guides for apartment stays, car rentals, payments, account security, and personal safety tips." />
        <link rel="canonical" href="https://www.smashapartments.com/safety-guides" />
      </Helmet>

      <div>
        <Navbar />
      </div>

      <main className="mt-[6.5rem]">
        {/* Hero */}
        <section className="mx-[15px] md:mx-[32px] mb-16">
          <div className="max-w-screen-2xl mx-auto bg-gradient-to-br from-orange-50 via-white to-orange-50 rounded-2xl p-8 md:p-16">
            <div className="max-w-3xl">
              <p className="text-primary font-semibold text-sm mb-3 tracking-wider uppercase">Safety First</p>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Your Safety is Our <span className="text-primary">Priority</span>
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                At Smash Apartments, we take safety seriously. These comprehensive guides will help you stay protected 
                whether you're booking an apartment, renting a car, or managing your account. Review these tips before your next trip.
              </p>
              <div className="flex flex-wrap gap-4">
                <div className="flex items-center gap-2 bg-emerald-50 text-emerald-700 px-4 py-2 rounded-full text-sm font-medium">
                  <CheckCircle2 className="w-4 h-4" /> Verified Listings
                </div>
                <div className="flex items-center gap-2 bg-blue-50 text-blue-700 px-4 py-2 rounded-full text-sm font-medium">
                  <Lock className="w-4 h-4" /> Secure Payments
                </div>
                <div className="flex items-center gap-2 bg-purple-50 text-purple-700 px-4 py-2 rounded-full text-sm font-medium">
                  <Eye className="w-4 h-4" /> 24/7 Monitoring
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Safety Guides */}
        {guides.map((guide, idx) => (
          <section key={idx} className="mx-[15px] md:mx-[32px] mb-12">
            <div className="max-w-screen-2xl mx-auto">
              <div className="flex items-center gap-4 mb-6">
                <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${guide.color} flex items-center justify-center text-white`}>
                  {guide.icon}
                </div>
                <div>
                  <h2 className="text-xl md:text-2xl font-bold text-gray-900">{guide.title}</h2>
                  <p className="text-gray-500 text-xs">{guide.tips.length} safety tips</p>
                </div>
              </div>
              <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {guide.tips.map((tip, i) => (
                  <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 group">
                    <div className="flex items-start gap-3">
                      <div className="w-8 h-8 rounded-full bg-gray-100 flex items-center justify-center text-gray-500 font-bold text-sm shrink-0 group-hover:bg-primary/10 group-hover:text-primary transition-colors">
                        {i + 1}
                      </div>
                      <div>
                        <h3 className="font-bold text-gray-900 text-sm mb-1">{tip.title}</h3>
                        <p className="text-gray-500 text-xs leading-relaxed">{tip.desc}</p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Emergency Contacts */}
        <section className="mx-[15px] md:mx-[32px] mb-16">
          <div className="max-w-screen-2xl mx-auto">
            <div className="bg-gradient-to-br from-red-50 to-orange-50 rounded-2xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <AlertTriangle className="w-6 h-6 text-red-500" />
                <h2 className="text-xl font-bold text-gray-900">Emergency Contacts</h2>
              </div>
              <p className="text-gray-600 text-sm mb-6">Save these numbers in your phone before traveling. In an emergency, don't hesitate to call for help.</p>
              <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                {emergencyContacts.map((contact, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
                    <div className="flex items-center gap-2 mb-2">
                      <div className="text-red-500">{contact.icon}</div>
                      <p className="font-semibold text-gray-900 text-sm">{contact.label}</p>
                    </div>
                    <p className="text-primary text-lg font-bold">{contact.number}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Report CTA */}
        <section className="mx-[15px] md:mx-[32px] mb-16">
          <div className="max-w-screen-2xl mx-auto bg-gray-900 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Report a Safety Concern</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
              If you've experienced or witnessed something unsafe, please let us know immediately. 
              All reports are treated confidentially and investigated thoroughly.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link to="/Customer-service" className="bg-primary text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors">
                Report an Issue
              </Link>
              <a href="mailto:complaints@smashapartments.com" className="bg-white/10 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-white/20 transition-colors border border-white/20">
                Email Safety Team
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </HelmetProvider>
  );
};

export default SafetyGuidesPage;
