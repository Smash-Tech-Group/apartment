/**
 * Helpful Articles / FAQ Page
 * File: src/components/HelpfulArticles.jsx
 * Route: /helpful
 *
 * Static content — no backend required.
 * Accordion: only one question open at a time.
 */

import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';

const FAQ_DATA = [
  {
    category: 'Bookings',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5" />
      </svg>
    ),
    items: [
      {
        q: 'How do I make a booking?',
        a: 'Browse available properties or rides, select the one you want, choose your dates, and click "Book Now". You\'ll be guided through the payment process and receive a confirmation email once your booking is confirmed.',
      },
      {
        q: 'Can I modify my booking after confirmation?',
        a: 'Yes, you can modify most bookings up to 48 hours before the check-in date. Go to Manage Stays in your dashboard, select the booking, and click "Modify". Changes are subject to availability and any price differences.',
      },
      {
        q: 'How do I cancel a booking?',
        a: 'Navigate to Manage Stays in your dashboard, find the booking you want to cancel, and click "Cancel Booking". Refunds depend on the cancellation policy of the specific property. Please review the policy before cancelling.',
      },
      {
        q: 'What happens if a host cancels my booking?',
        a: 'If a host cancels your confirmed booking, you will receive a full refund within 5–7 business days. Our team will also assist you in finding an alternative property if needed.',
      },
    ],
  },
  {
    category: 'Payments',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M2.25 8.25h19.5M2.25 9h19.5m-16.5 5.25h6m-6 2.25h3m-3.75 3h15a2.25 2.25 0 0 0 2.25-2.25V6.75A2.25 2.25 0 0 0 19.5 4.5h-15a2.25 2.25 0 0 0-2.25 2.25v10.5A2.25 2.25 0 0 0 4.5 19.5Z" />
      </svg>
    ),
    items: [
      {
        q: 'What payment methods are accepted?',
        a: 'We accept major debit and credit cards (Visa, Mastercard), bank transfers, and mobile payment options. All transactions are processed securely through our payment partners.',
      },
      {
        q: 'When will I be charged for my booking?',
        a: 'Payment is collected at the time of booking confirmation. For some properties, a deposit may be collected upfront with the balance due closer to your check-in date.',
      },
      {
        q: 'How long does a refund take?',
        a: 'Refunds are typically processed within 5–7 business days depending on your bank or payment provider. You will receive an email notification once the refund has been initiated.',
      },
      {
        q: 'Is my payment information secure?',
        a: 'Yes. We use industry-standard encryption (TLS/SSL) and do not store your full card details on our servers. All payments are handled through certified payment processors.',
      },
    ],
  },
  {
    category: 'Account & Profile',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z" />
      </svg>
    ),
    items: [
      {
        q: 'How do I update my personal details?',
        a: 'Go to your Dashboard and click on Personal Details. From there you can update your name, email address, and phone number. Changes take effect immediately after saving.',
      },
      {
        q: 'How do I change my password?',
        a: 'Go to Dashboard → Password & Security and click "Update" next to Password. You\'ll need to enter your current password and then choose a new one. Your session will be refreshed after a successful change.',
      },
      {
        q: 'I forgot my password. What do I do?',
        a: 'On the login page, click "Forgot Password" and enter your registered email address. You\'ll receive a password reset link within a few minutes. Check your spam folder if it doesn\'t arrive.',
      },
      {
        q: 'How do I upload a profile photo?',
        a: 'On the Personal Details page, click on your profile photo or the camera icon. Select an image file (JPG, PNG, max 5MB) and it will be uploaded and displayed immediately.',
      },
    ],
  },
  {
    category: 'Stays & Properties',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="m2.25 12 8.954-8.955c.44-.439 1.152-.439 1.591 0L21.75 12M4.5 9.75v10.125c0 .621.504 1.125 1.125 1.125H9.75v-4.875c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125V21h4.125c.621 0 1.125-.504 1.125-1.125V9.75M8.25 21h8.25" />
      </svg>
    ),
    items: [
      {
        q: 'How do I find available apartments?',
        a: 'Use the search bar on the homepage to enter your destination and dates. You can filter results by price, amenities, property type, and more to find the perfect place.',
      },
      {
        q: 'What is included in the listing price?',
        a: 'The listed price typically covers accommodation for the specified dates. Some listings may include additional fees for cleaning, utilities, or extra guests — these will be clearly shown before you confirm your booking.',
      },
      {
        q: 'How do I contact a host before booking?',
        a: 'On the property listing page, click the "Contact Host" button to send a message. The host will respond directly through the platform. We recommend reaching out if you have specific requirements.',
      },
      {
        q: 'What should I do if there\'s an issue with my stay?',
        a: 'First, try to resolve the issue directly with the host through the platform messaging. If the issue persists, contact our support team by submitting a ticket from the Help & Support section of your dashboard.',
      },
    ],
  },
  {
    category: 'Car Rentals',
    icon: (
      <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 18.75a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h6m-9 0H3.375a1.125 1.125 0 0 1-1.125-1.125V14.25m17.25 4.5a1.5 1.5 0 0 1-3 0m3 0a1.5 1.5 0 0 0-3 0m3 0h1.125c.621 0 1.129-.504 1.09-1.124a17.902 17.902 0 0 0-3.213-9.193 2.056 2.056 0 0 0-1.58-.86H14.25M16.5 18.75h-2.25m0-11.177v-.958c0-.568-.422-1.048-.987-1.106a48.554 48.554 0 0 0-10.026 0 1.106 1.106 0 0 0-.987 1.106v7.635m12-6.677v6.677m0 4.5v-4.5m0 0h-12" />
      </svg>
    ),
    items: [
      {
        q: 'What documents do I need to rent a car?',
        a: 'You will need a valid driver\'s licence, a government-issued ID, and a payment method. International guests may also need to provide a valid passport.',
      },
      {
        q: 'Is there a minimum rental period?',
        a: 'Most of our car rentals have a minimum rental period of 24 hours. Shorter durations may be available for select vehicles — check the specific listing for details.',
      },
      {
        q: 'What happens if the car is returned late?',
        a: 'Late returns may incur additional charges based on the hourly or daily rate. Please contact the host in advance if you anticipate returning the vehicle late.',
      },
    ],
  },
];

function AccordionItem({ question, answer, isOpen, onToggle }) {
  return (
    <div className="border-b border-gray-100 last:border-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between py-4 text-left group"
      >
        <span className={`text-sm font-medium pr-4 transition-colors ${isOpen ? 'text-[#FF7D01]' : 'text-gray-800 group-hover:text-gray-900'}`}>
          {question}
        </span>
        <span className={`flex-shrink-0 w-5 h-5 rounded-full flex items-center justify-center transition-all
          ${isOpen ? 'bg-[#FF7D01] text-white rotate-45' : 'bg-gray-100 text-gray-500'}`}>
          <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2.5">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
        </span>
      </button>
      <div className={`overflow-hidden transition-all duration-200 ${isOpen ? 'max-h-96 pb-4' : 'max-h-0'}`}>
        <p className="text-sm text-gray-500 leading-relaxed">{answer}</p>
      </div>
    </div>
  );
}

export default function HelpfulArticles() {
  // Track open item as "categoryIndex-itemIndex"
  const [openItem, setOpenItem] = useState(null);

  const handleToggle = (key) => {
    setOpenItem(prev => (prev === key ? null : key));
  };

  return (
    <div className="min-h-screen bg-white">
      <Navbar showNavLinks={false} />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 sm:pt-28">
        {/* Breadcrumb */}
        <div className="mb-6 text-xs sm:text-sm text-gray-600 bg-[#FF7D011A] w-fit px-3 sm:px-4 py-2 rounded-full flex items-center">
          <Link to="/dashboard" className="underline cursor-pointer font-semibold hover:text-gray-900">
            Manage Account
          </Link>
          <span className="mx-1 sm:mx-2">|</span>
          <span className="text-gray-900 font-extralight">Helpful Articles</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12">
          {/* Left — FAQ */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
              Helpful Articles & FAQs
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              Find answers to the most common questions about using Smash Apartments.
            </p>

            <div className="space-y-6">
              {FAQ_DATA.map((section, si) => (
                <div key={si} className="border border-gray-100 rounded-2xl overflow-hidden">
                  {/* Category Header */}
                  <div className="flex items-center gap-2.5 px-5 py-4 bg-gray-50 border-b border-gray-100">
                    <span className="text-[#FF7D01]">{section.icon}</span>
                    <h2 className="text-sm font-semibold text-gray-900">{section.category}</h2>
                  </div>

                  {/* Items */}
                  <div className="px-5">
                    {section.items.map((item, ii) => {
                      const key = `${si}-${ii}`;
                      return (
                        <AccordionItem
                          key={key}
                          question={item.q}
                          answer={item.a}
                          isOpen={openItem === key}
                          onToggle={() => handleToggle(key)}
                        />
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>

            {/* Still need help */}
            <div className="mt-8 border border-dashed border-orange-200 rounded-2xl p-6 text-center bg-orange-50/40">
              <p className="text-sm font-medium text-gray-900 mb-1">Still need help?</p>
              <p className="text-xs text-gray-500 mb-4">Our support team is ready to assist you.</p>
              <Link
                to="/customer-support"
                className="inline-flex items-center gap-2 bg-[#FF7D01] hover:bg-orange-600 text-white text-sm font-medium py-2.5 px-6 rounded-full transition-colors"
              >
                Contact Support
              </Link>
            </div>
          </div>

          {/* Right — More Actions */}
          <div className="w-full lg:w-80 mt-8 lg:mt-0">
            <h2 className="text-lg sm:text-xl font-light text-gray-900 mb-4 sm:mb-6">More Actions</h2>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-6">
              <SidebarItem link="/details" text="Personal Details" />
              <SidebarItem link="/password-security" text="Password & Security" />
              <SidebarItem link="/customer-support" text="Contact Customer Support" />
              <SidebarItem link="/payment" text="Payment Methods" />
            </div>

            {/* Quick tips */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Quick Tips</h3>
              <ul className="space-y-2 text-xs text-gray-500">
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7D01] mt-0.5">•</span>
                  Always read the cancellation policy before booking.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7D01] mt-0.5">•</span>
                  Keep your contact details up to date for important notifications.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7D01] mt-0.5">•</span>
                  Message your host directly if you have specific requirements.
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-[#FF7D01] mt-0.5">•</span>
                  Save your receipts — they're available in Payment History.
                </li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <footer className="mt-12 sm:mt-16 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-8">
          <div className="flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-3 text-xs sm:text-sm text-gray-600">
            <p><b>©</b> 2026 Smash Apartments. All Rights Reserved</p>
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

function SidebarItem({ link, text }) {
  return (
    <Link
      to={link}
      className="flex items-center justify-between px-4 py-3.5 hover:bg-gray-50 transition-colors border-b border-gray-50 last:border-0"
    >
      <span className="text-sm text-gray-700">{text}</span>
      <svg className="w-4 h-4 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="2">
        <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
      </svg>
    </Link>
  );
}