/**
 * Customer Support Page
 * File: src/components/CustomerSupport.jsx
 * Route: /customer-support
 */

import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import Navbar from './Navbar';
import { useAuth } from '../context/AuthContext';
import { apiFetch } from '../lib/api';
import { useToast } from './Toast';

const CATEGORIES = [
  'Booking Issue',
  'Payment Issue',
  'Account Issue',
  'Other',
];

const STATUS_CONFIG = {
  open:        { label: 'Open',        bg: 'bg-orange-100',  text: 'text-orange-700' },
  in_progress: { label: 'In Progress', bg: 'bg-blue-100',    text: 'text-blue-700'   },
  resolved:    { label: 'Resolved',    bg: 'bg-green-100',   text: 'text-green-700'  },
};

function StatusBadge({ status }) {
  const cfg = STATUS_CONFIG[status] || STATUS_CONFIG.open;
  return (
    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${cfg.bg} ${cfg.text}`}>
      {cfg.label}
    </span>
  );
}

function TicketCard({ ticket }) {
  const date = new Date(ticket.created_at).toLocaleDateString('en-GB', {
    day: 'numeric', month: 'short', year: 'numeric',
  });

  return (
    <div className="border border-gray-100 rounded-2xl p-4 sm:p-5 hover:border-orange-200 hover:shadow-sm transition-all">
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <p className="font-medium text-gray-900 text-sm truncate">{ticket.subject}</p>
          <p className="text-xs text-gray-400 mt-0.5">{ticket.category} · {date}</p>
        </div>
        <StatusBadge status={ticket.status} />
      </div>
      <p className="text-xs text-gray-500 line-clamp-2 leading-relaxed">{ticket.message}</p>
    </div>
  );
}

export default function CustomerSupport() {
  const { user } = useAuth();
  const { showToast } = useToast();

  // Form state
  const [form, setForm] = useState({ subject: '', category: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitting, setSubmitting] = useState(false);

  // Ticket history state
  const [tickets, setTickets] = useState([]);
  const [loadingTickets, setLoadingTickets] = useState(true);
  const [ticketsError, setTicketsError] = useState('');

  // Load ticket history on mount
  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const res = await apiFetch('/support/tickets');
        setTickets(res.data?.tickets || []);
      } catch (err) {
        setTicketsError('Could not load your ticket history.');
      } finally {
        setLoadingTickets(false);
      }
    };
    fetchTickets();
  }, []);

  const validate = () => {
    const errs = {};
    if (!form.subject.trim()) errs.subject = 'Subject is required.';
    else if (form.subject.trim().length < 3) errs.subject = 'Subject must be at least 3 characters.';
    if (!form.category) errs.category = 'Please select a category.';
    if (!form.message.trim()) errs.message = 'Message is required.';
    else if (form.message.trim().length < 10) errs.message = 'Message must be at least 10 characters.';
    return errs;
  };

  const handleChange = (field) => (e) => {
    setForm(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' }));
  };

  const handleSubmit = async () => {
    const errs = validate();
    if (Object.keys(errs).length > 0) { setErrors(errs); return; }

    setSubmitting(true);
    try {
      const res = await apiFetch('/support/ticket', {
        method: 'POST',
        body: JSON.stringify(form),
      });
      const newTicket = res.data;
      setTickets(prev => [newTicket, ...prev]);
      setForm({ subject: '', category: '', message: '' });
      setErrors({});
      showToast('Your ticket has been submitted. We\'ll get back to you shortly.');
    } catch (err) {
      showToast(err.message || 'Failed to submit ticket. Please try again.', 'error');
    } finally {
      setSubmitting(false);
    }
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
          <span className="text-gray-900 font-extralight">Help & Support</span>
        </div>

        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8 xl:gap-12">
          {/* Left — Form + History */}
          <div className="flex-1 min-w-0">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-semibold text-gray-900 mb-2">
              Contact Customer Support
            </h1>
            <p className="text-sm text-gray-500 mb-8">
              Fill in the form below and our team will respond within 24 hours.
            </p>

            {/* Support Banner */}
            <div className="bg-[#6D6BAF] rounded-2xl p-4 sm:p-6 mb-8 text-white">
              <div className="flex items-start gap-3">
                <svg className="w-6 h-6 flex-shrink-0 mt-0.5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
                </svg>
                <div>
                  <h2 className="text-lg font-semibold mb-1">We're here to help</h2>
                  <p className="text-indigo-100 text-sm font-extralight leading-relaxed">
                    Our support team is available Monday–Friday, 9am–6pm WAT.
                    For urgent matters, email us at{' '}
                    <a href="mailto:complaints@smashapartments.com" className="underline">
                      complaints@smashapartments.com
                    </a>
                  </p>
                </div>
              </div>
            </div>

            {/* Ticket Form */}
            <div className="space-y-4 mb-10">
              {/* Category */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Category <span className="text-red-500">*</span>
                </label>
                <select
                  value={form.category}
                  onChange={handleChange('category')}
                  className={`w-full px-4 py-3.5 border rounded-full text-sm bg-white appearance-none
                    focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500
                    ${errors.category ? 'border-red-400' : 'border-gray-200'}
                    text-gray-700`}
                >
                  <option value="">Select a category</option>
                  {CATEGORIES.map(cat => (
                    <option key={cat} value={cat}>{cat}</option>
                  ))}
                </select>
                {errors.category && (
                  <p className="mt-1 text-xs text-red-500">{errors.category}</p>
                )}
              </div>

              {/* Subject */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Subject <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  placeholder="Brief summary of your issue"
                  value={form.subject}
                  onChange={handleChange('subject')}
                  className={`w-full px-4 py-3.5 border rounded-full text-sm placeholder:text-gray-400
                    focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500
                    ${errors.subject ? 'border-red-400' : 'border-gray-200'}`}
                />
                {errors.subject && (
                  <p className="mt-1 text-xs text-red-500">{errors.subject}</p>
                )}
              </div>

              {/* Message */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1.5">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  placeholder="Describe your issue in detail..."
                  value={form.message}
                  onChange={handleChange('message')}
                  rows={5}
                  className={`w-full px-4 py-3.5 border rounded-2xl text-sm placeholder:text-gray-400 resize-none
                    focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500
                    ${errors.message ? 'border-red-400' : 'border-gray-200'}`}
                />
                <div className="flex justify-between mt-1">
                  {errors.message
                    ? <p className="text-xs text-red-500">{errors.message}</p>
                    : <span />
                  }
                  <p className="text-xs text-gray-400 text-right">{form.message.length}/5000</p>
                </div>
              </div>

              {/* Submit */}
              <button
                onClick={handleSubmit}
                disabled={submitting}
                className="w-full sm:w-auto bg-[#FF7D01] hover:bg-orange-600 text-white font-medium py-3.5 px-8 rounded-full transition-colors disabled:opacity-60 disabled:cursor-not-allowed text-sm"
              >
                {submitting ? 'Submitting...' : 'Submit Ticket'}
              </button>
            </div>

            {/* Ticket History */}
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Your Ticket History</h2>

              {loadingTickets ? (
                // Skeleton
                <div className="space-y-3">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="border border-gray-100 rounded-2xl p-5 animate-pulse">
                      <div className="flex justify-between mb-3">
                        <div className="h-4 bg-gray-100 rounded-full w-48" />
                        <div className="h-5 bg-gray-100 rounded-full w-16" />
                      </div>
                      <div className="h-3 bg-gray-100 rounded-full w-32 mb-2" />
                      <div className="h-3 bg-gray-100 rounded-full w-full" />
                    </div>
                  ))}
                </div>
              ) : ticketsError ? (
                <p className="text-sm text-red-500">{ticketsError}</p>
              ) : tickets.length === 0 ? (
                <div className="border border-dashed border-gray-200 rounded-2xl p-8 text-center">
                  <svg className="w-10 h-10 text-gray-300 mx-auto mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M8.625 9.75a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H8.25m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0H12m4.125 0a.375.375 0 1 1-.75 0 .375.375 0 0 1 .75 0Zm0 0h-.375m-13.5 3.01c0 1.6 1.123 2.994 2.707 3.227 1.087.16 2.185.283 3.293.369V21l4.184-4.183a1.14 1.14 0 0 1 .778-.332 48.294 48.294 0 0 0 5.83-.498c1.585-.233 2.708-1.626 2.708-3.228V6.741c0-1.602-1.123-2.995-2.707-3.228A48.394 48.394 0 0 0 12 3c-2.392 0-4.744.175-7.043.513C3.373 3.746 2.25 5.14 2.25 6.741v6.018Z" />
                  </svg>
                  <p className="text-sm text-gray-500">No tickets yet.</p>
                  <p className="text-xs text-gray-400 mt-1">Submit a ticket above and it will appear here.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tickets.map(ticket => (
                    <TicketCard key={ticket.id} ticket={ticket} />
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Right — More Actions */}
          <div className="w-full lg:w-80 mt-8 lg:mt-0">
            <h2 className="text-lg sm:text-xl font-light text-gray-900 mb-4 sm:mb-6">More Actions</h2>
            <div className="bg-white border border-gray-100 rounded-2xl overflow-hidden mb-6">
              <SidebarItem link="/details" text="Personal Details" />
              <SidebarItem link="/password-security" text="Password & Security" />
              <SidebarItem link="/helpful" text="Helpful Articles" />
              <SidebarItem link="/payment" text="Payment Methods" />
            </div>

            {/* Contact info card */}
            <div className="bg-gray-50 rounded-2xl p-5">
              <h3 className="text-sm font-semibold text-gray-900 mb-3">Direct Contact</h3>
              <div className="space-y-3">
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Complaints</p>
                  <a href="mailto:complaints@smashapartments.com" className="text-sm text-[#FF7D01] hover:underline break-all">
                    complaints@smashapartments.com
                  </a>
                </div>
                <div>
                  <p className="text-xs text-gray-500 mb-0.5">Enquiries</p>
                  <a href="mailto:info@smashapartments.com" className="text-sm text-[#FF7D01] hover:underline break-all">
                    info@smashapartments.com
                  </a>
                </div>
              </div>
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