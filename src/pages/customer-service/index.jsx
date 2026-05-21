import React, { useState } from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import { Link } from 'react-router-dom';
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";
import { Phone, Mail, MessageCircle, Clock, MapPin, HelpCircle, FileText, Shield } from 'lucide-react';

const CustomerServicePage = () => {
  const [formData, setFormData] = useState({ name: '', email: '', subject: '', category: 'general', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const contactChannels = [
    { icon: <Phone className="w-6 h-6" />, title: 'Phone Support', detail: '+234 800 SMASH AP', sub: 'Mon–Fri, 8am–8pm WAT', color: 'from-blue-500 to-cyan-500' },
    { icon: <Mail className="w-6 h-6" />, title: 'Email Support', detail: 'info@smashapartments.com', sub: 'We respond within 24 hours', color: 'from-orange-500 to-amber-500' },
    { icon: <MessageCircle className="w-6 h-6" />, title: 'Live Chat', detail: 'Available on the website', sub: 'Instant responses during business hours', color: 'from-emerald-500 to-green-500' },
    { icon: <MapPin className="w-6 h-6" />, title: 'Visit Us', detail: 'Lagos, Abuja, Port Harcourt', sub: 'Walk-in support at our offices', color: 'from-purple-500 to-violet-500' },
  ];

  const quickLinks = [
    { icon: <HelpCircle className="w-5 h-5" />, title: 'Frequently Asked Questions', desc: 'Find instant answers to common questions', link: '/faq' },
    { icon: <Shield className="w-5 h-5" />, title: 'Safety Guides', desc: 'Learn how we keep you safe', link: '/safety-guides' },
    { icon: <FileText className="w-5 h-5" />, title: 'Terms of Use', desc: 'Read our terms and conditions', link: '/terms-of-use' },
  ];

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <HelmetProvider>
      <Helmet>
        <title>Customer Service | Smash Apartments - We're Here to Help</title>
        <meta name="description" content="Get help from Smash Apartments customer service. Contact us via phone, email, live chat, or submit a support request. We're available 24/7." />
        <link rel="canonical" href="https://www.smashapartments.com/Customer-service" />
      </Helmet>

      <div>
        <Navbar />
      </div>

      <main className="mt-[6.5rem]">
        {/* Hero */}
        <section className="mx-[15px] md:mx-[32px] mb-16">
          <div className="max-w-screen-2xl mx-auto bg-gradient-to-br from-orange-50 via-white to-orange-50 rounded-2xl p-8 md:p-16">
            <div className="max-w-3xl">
              <p className="text-primary font-semibold text-sm mb-3 tracking-wider uppercase">Customer Service</p>
              <h1 className="text-3xl md:text-5xl font-bold text-gray-900 leading-tight mb-6">
                We're Here to <span className="text-primary">Help</span>
              </h1>
              <p className="text-gray-600 text-base md:text-lg leading-relaxed">
                Whether you need help with a booking, have a question about a listing, or want to report an issue, 
                our dedicated support team is ready to assist you. Reach out through any of our channels below.
              </p>
            </div>
          </div>
        </section>

        {/* Contact Channels */}
        <section className="mx-[15px] md:mx-[32px] mb-16">
          <div className="max-w-screen-2xl mx-auto">
            <div className="text-center mb-10">
              <p className="text-primary font-semibold text-sm mb-2 tracking-wider uppercase">Get In Touch</p>
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900">Contact Channels</h2>
            </div>
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactChannels.map((ch, i) => (
                <div key={i} className="bg-white border border-gray-100 rounded-2xl p-6 hover:shadow-lg transition-shadow duration-300 group">
                  <div className={`w-14 h-14 rounded-xl bg-gradient-to-br ${ch.color} flex items-center justify-center mb-4 text-white group-hover:scale-110 transition-transform duration-300`}>
                    {ch.icon}
                  </div>
                  <h3 className="font-bold text-gray-900 mb-1">{ch.title}</h3>
                  <p className="text-primary text-sm font-medium mb-1">{ch.detail}</p>
                  <p className="text-gray-500 text-xs">{ch.sub}</p>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Response Times */}
        <section className="mx-[15px] md:mx-[32px] mb-16">
          <div className="max-w-screen-2xl mx-auto">
            <div className="bg-gradient-to-br from-primary/5 to-orange-100 rounded-2xl p-8 md:p-12">
              <div className="flex items-center gap-3 mb-6">
                <Clock className="w-6 h-6 text-primary" />
                <h2 className="text-xl font-bold text-gray-900">Expected Response Times</h2>
              </div>
              <div className="grid sm:grid-cols-3 gap-6">
                {[
                  { method: 'Live Chat', time: 'Under 5 minutes', note: 'During business hours' },
                  { method: 'Email', time: 'Within 24 hours', note: 'Typically faster' },
                  { method: 'Phone', time: 'Immediate', note: 'Mon–Fri, 8am–8pm WAT' },
                ].map((item, i) => (
                  <div key={i} className="bg-white rounded-xl p-5 border border-gray-100">
                    <p className="font-bold text-gray-900 mb-1">{item.method}</p>
                    <p className="text-primary text-2xl font-bold mb-1">{item.time}</p>
                    <p className="text-gray-500 text-xs">{item.note}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Contact Form */}
        <section className="mx-[15px] md:mx-[32px] mb-16">
          <div className="max-w-screen-2xl mx-auto">
            <div className="grid md:grid-cols-5 gap-12">
              <div className="md:col-span-3">
                <p className="text-primary font-semibold text-sm mb-2 tracking-wider uppercase">Send a Message</p>
                <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6">Submit a Support Request</h2>

                {submitted ? (
                  <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-8 text-center">
                    <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-emerald-100 flex items-center justify-center">
                      <svg className="w-8 h-8 text-emerald-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
                    </div>
                    <h3 className="text-lg font-bold text-gray-900 mb-2">Request Submitted!</h3>
                    <p className="text-gray-600 text-sm">We've received your message and will respond within 24 hours. Check your email for updates.</p>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Full Name</label>
                        <input name="name" value={formData.name} onChange={handleChange} required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="John Doe" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Email Address</label>
                        <input name="email" type="email" value={formData.email} onChange={handleChange} required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="you@email.com" />
                      </div>
                    </div>
                    <div className="grid sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Subject</label>
                        <input name="subject" value={formData.subject} onChange={handleChange} required
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary" placeholder="Brief description" />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">Category</label>
                        <select name="category" value={formData.category} onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary bg-white">
                          <option value="general">General Inquiry</option>
                          <option value="booking">Booking Issue</option>
                          <option value="payment">Payment Problem</option>
                          <option value="listing">Listing Report</option>
                          <option value="account">Account Help</option>
                          <option value="complaint">Complaint</option>
                        </select>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">Message</label>
                      <textarea name="message" value={formData.message} onChange={handleChange} required rows={5}
                        className="w-full px-4 py-3 border border-gray-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary resize-none" placeholder="Describe your issue in detail..." />
                    </div>
                    <button type="submit" className="bg-primary text-white px-8 py-3 rounded-full text-sm font-semibold hover:bg-orange-600 transition-colors">
                      Submit Request
                    </button>
                  </form>
                )}
              </div>

              {/* Quick Links Sidebar */}
              <div className="md:col-span-2">
                <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
                <div className="space-y-3">
                  {quickLinks.map((ql, i) => (
                    <Link key={i} to={ql.link} className="flex items-start gap-3 bg-white border border-gray-100 rounded-xl p-4 hover:shadow-md transition-shadow duration-300 group">
                      <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center shrink-0 text-primary group-hover:bg-primary group-hover:text-white transition-colors">
                        {ql.icon}
                      </div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{ql.title}</p>
                        <p className="text-gray-500 text-xs">{ql.desc}</p>
                      </div>
                    </Link>
                  ))}
                </div>

                <div className="mt-8 bg-gray-900 rounded-2xl p-6 text-center">
                  <h4 className="text-white font-bold mb-2">Emergency?</h4>
                  <p className="text-gray-400 text-xs mb-4">For urgent safety concerns, call us immediately.</p>
                  <a href="tel:+2348001234567" className="inline-block bg-red-500 text-white px-6 py-2.5 rounded-full text-sm font-semibold hover:bg-red-600 transition-colors">
                    Call Emergency Line
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </HelmetProvider>
  );
};

export default CustomerServicePage;
