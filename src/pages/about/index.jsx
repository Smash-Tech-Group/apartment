import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import { Building2, Car, Shield, Users, Heart, MapPin } from 'lucide-react';

const AboutPage = () => {
  const values = [
    { icon: <Shield className="w-8 h-8 text-primary" />, title: 'Trust & Safety', desc: 'Every listing is verified to ensure quality and safety for our guests. Your peace of mind is our top priority.' },
    { icon: <Heart className="w-8 h-8 text-primary" />, title: 'Exceptional Hospitality', desc: 'We go above and beyond to deliver premium experiences. From booking to checkout, every detail matters.' },
    { icon: <MapPin className="w-8 h-8 text-primary" />, title: 'Prime Locations', desc: "Our properties and vehicles are strategically located across Nigeria's major cities for maximum convenience." },
    { icon: <Users className="w-8 h-8 text-primary" />, title: 'Community First', desc: 'We empower property owners and car rental businesses to reach more customers through our platform.' },
  ];

  return (
    <HelmetProvider>
      <Helmet>
        <title>About Us | Smash Apartments - Your Peace, Our Promise</title>
        <meta name="description" content="Learn about Smash Apartments — Nigeria's premier platform for apartment rentals and car hire. Discover our mission, values, and commitment to exceptional hospitality." />
        <link rel="canonical" href="https://www.smashapartments.com/about" />
      </Helmet>

      <div>
        <Navbar />
      </div>

      <main className="mt-[6.5rem]">
        {/* Hero Section */}
        <section className="mx-[15px] md:mx-[32px] mb-16">
          <div className="max-w-screen-2xl mx-auto bg-gradient-to-br from-orange-50 via-white to-orange-50 rounded-2xl p-8 md:p-16">
            <div className="max-w-3xl">
              <p className="text-primary font-semibold text-sm mb-3 tracking-wider uppercase">About Smash Apartments</p>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                Your Peace, <br />Our <span className="text-primary">Promise</span>
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed mb-8">
                Smash Apartments is Nigeria's leading platform for premium apartment rentals and car hire services. 
                We connect travelers, business professionals, and families with top-quality short-let apartments 
                and reliable car rental options across Lagos, Abuja, Port Harcourt, and other major cities nationwide.
              </p>
              <div className="flex flex-wrap gap-6">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Building2 className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">500+</p>
                    <p className="text-xs text-gray-500">Listed Properties</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Car className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">200+</p>
                    <p className="text-xs text-gray-500">Vehicles Available</p>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center">
                    <Users className="w-6 h-6 text-primary" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900">10K+</p>
                    <p className="text-xs text-gray-500">Happy Guests</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Mission Section */}
        <section className="mx-[15px] md:mx-[32px] mb-16">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <p className="text-primary font-semibold text-sm mb-2 tracking-wider uppercase">Our Mission</p>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">Making Premium Stays & Rides Accessible</h2>
                <p className="text-gray-600 text-sm leading-relaxed mb-4">
                  At Smash Apartments, we believe everyone deserves a comfortable, luxurious experience—whether they're 
                  traveling for business, leisure, or relocation. Our mission is to bridge the gap between premium hospitality 
                  and affordability by providing a seamless platform where guests can discover, compare, and book top-rated 
                  apartments and cars with confidence.
                </p>
                <p className="text-gray-600 text-sm leading-relaxed">
                  We partner with verified property owners and car rental businesses to offer a curated selection of 
                  accommodations and vehicles. Every listing goes through our quality assurance process to ensure 
                  it meets the Smash Apartments standard of excellence.
                </p>
              </div>
              <div className="bg-gradient-to-br from-primary/5 to-orange-100 rounded-2xl p-8 md:p-12">
                <h3 className="text-xl font-bold text-gray-900 mb-6">Why Choose Smash Apartments?</h3>
                <ul className="space-y-4">
                  {['Verified & quality-assured listings', 'Competitive pricing with no hidden fees', 'Seamless booking experience', '24/7 customer support', 'Flexible cancellation policies', 'Nationwide coverage across Nigeria'].map((item, i) => (
                    <li key={i} className="flex items-center gap-3">
                      <span className="w-2 h-2 rounded-full bg-primary flex-shrink-0" />
                      <span className="text-sm text-gray-700">{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="mx-[15px] md:mx-[32px] mb-16">
          <div className="max-w-screen-2xl mx-auto">
            <div className="text-center mb-12">
              <p className="text-primary font-semibold text-sm mb-2 tracking-wider uppercase">Our Values</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">What Drives Us</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {values.map((val, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center mb-4">
                    {val.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-2">{val.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed">{val.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact CTA */}
        <section className="mx-[15px] md:mx-[32px] mb-16">
          <div className="max-w-screen-2xl mx-auto bg-gray-900 rounded-2xl p-8 md:p-12 text-center">
            <h2 className="text-2xl md:text-3xl font-bold text-white mb-3">Have Questions?</h2>
            <p className="text-gray-400 text-sm mb-6 max-w-lg mx-auto">
              Our team is here to help. Reach out to us for inquiries about listings, partnerships, or support.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <a href="mailto:info@smashapartments.com" className="bg-primary text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors">
                Email Us
              </a>
              <a href="/customer-support" className="bg-white/10 text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-white/20 transition-colors border border-white/20">
                Customer Support
              </a>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </HelmetProvider>
  );
};

export default AboutPage;
