import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

const TermsOfUsePage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Terms of Use | Smash Apartments</title>
        <meta name="description" content="Read the Terms of Use for Smash Apartments platform." />
      </Helmet>
      <div><Navbar /></div>
      <main className="mt-[6.5rem] mx-[15px] md:mx-[32px] mb-16">
        <div className="max-w-screen-md mx-auto">
          <div className="mb-10">
            <p className="text-primary font-semibold text-sm mb-2 tracking-wider uppercase">Legal</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Terms of Use</h1>
            <p className="text-gray-500 text-sm">Last updated: May 18, 2026</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Acceptance of Terms</h2>
              <p className="text-gray-600 text-sm leading-relaxed">By accessing or using the Smash Apartments website and services, you agree to be bound by these Terms of Use. If you do not agree, please do not use our platform. We reserve the right to modify these terms at any time, and your continued use constitutes acceptance of any changes.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Eligibility</h2>
              <p className="text-gray-600 text-sm leading-relaxed">You must be at least 18 years old and have the legal capacity to enter into binding agreements to use our services. By registering, you represent that the information you provide is accurate and complete.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Account Registration</h2>
              <p className="text-gray-600 text-sm leading-relaxed">To access certain features, you must create an account. You are responsible for maintaining the confidentiality of your login credentials and for all activities under your account. You agree to notify us immediately of any unauthorized use. Smash Apartments reserves the right to suspend or terminate accounts that violate these terms.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Services</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">Smash Apartments provides a platform connecting:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
                <li>Guests seeking short-let apartment rentals with verified property owners</li>
                <li>Users seeking car rentals with verified vehicle providers</li>
              </ul>
              <p className="text-gray-600 text-sm leading-relaxed mt-3">We act as an intermediary and are not the direct provider of accommodations or vehicles. Property owners and car providers are independent parties responsible for the quality and accuracy of their listings.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. Bookings & Payments</h2>
              <ul className="list-disc pl-6 space-y-2 text-gray-600 text-sm">
                <li>All bookings are subject to availability and confirmation by the property owner or car provider.</li>
                <li>Prices displayed include applicable fees unless otherwise stated.</li>
                <li>Payment must be made through our approved payment methods at the time of booking.</li>
                <li>Cancellation and refund policies vary by listing and are displayed at the time of booking.</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">6. User Conduct</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">You agree not to:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
                <li>Use the platform for any unlawful purpose</li>
                <li>Post false, misleading, or fraudulent content</li>
                <li>Harass, threaten, or abuse other users</li>
                <li>Attempt to bypass security measures or access unauthorized areas</li>
                <li>Scrape, copy, or redistribute content without permission</li>
                <li>Damage property or vehicles rented through the platform</li>
              </ul>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">7. Intellectual Property</h2>
              <p className="text-gray-600 text-sm leading-relaxed">All content on the Smash Apartments platform — including text, graphics, logos, images, and software — is the property of Smash Apartments or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or create derivative works without our prior written consent.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">8. Limitation of Liability</h2>
              <p className="text-gray-600 text-sm leading-relaxed">To the fullest extent permitted by law, Smash Apartments shall not be liable for any indirect, incidental, special, consequential, or punitive damages arising from your use of the platform. Our total liability shall not exceed the amount you paid for the specific booking giving rise to the claim. We are not responsible for the actions, omissions, or negligence of property owners or car providers.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">9. Indemnification</h2>
              <p className="text-gray-600 text-sm leading-relaxed">You agree to indemnify and hold harmless Smash Apartments, its officers, directors, employees, and agents from any claims, damages, losses, or expenses arising from your use of the platform, violation of these terms, or infringement of any third-party rights.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">10. Governing Law</h2>
              <p className="text-gray-600 text-sm leading-relaxed">These Terms of Use shall be governed by and construed in accordance with the laws of the Federal Republic of Nigeria. Any disputes arising from these terms shall be subject to the exclusive jurisdiction of the courts in Abuja, Nigeria.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">11. Contact Us</h2>
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 space-y-1">
                <p><strong>Smash Apartments</strong></p>
                <p>2 King Jaja Street, Works & Housing, 3rd Avenue, Gwarinpa, Abuja</p>
                <p>Email: <a href="mailto:info@smashapartments.com" className="text-primary hover:underline">info@smashapartments.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </main>
      <Footer />
    </HelmetProvider>
  );
};

export default TermsOfUsePage;
