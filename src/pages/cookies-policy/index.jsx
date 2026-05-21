import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

const CookiesPolicyPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Cookies Policy | Smash Apartments</title>
        <meta name="description" content="Learn how Smash Apartments uses cookies on our platform." />
      </Helmet>
      <div><Navbar /></div>
      <main className="mt-[6.5rem] mx-[15px] md:mx-[32px] mb-16">
        <div className="max-w-screen-md mx-auto">
          <div className="mb-10">
            <p className="text-primary font-semibold text-sm mb-2 tracking-wider uppercase">Legal</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Cookies Policy</h1>
            <p className="text-gray-500 text-sm">Last updated: May 18, 2026</p>
          </div>
          <div className="space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. What Are Cookies?</h2>
              <p className="text-gray-600 text-sm leading-relaxed">Cookies are small text files placed on your device when you visit a website. They help the site remember your preferences and improve your browsing experience. Cookies may be session-based (deleted when you close your browser) or persistent (remaining for a set period).</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. How We Use Cookies</h2>
              <div className="space-y-4">
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">Essential Cookies</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">Required for core site functionality including authentication, session management, and security. Cannot be disabled.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">Performance Cookies</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">Collect anonymous data about how visitors use our site, helping us improve performance and user experience.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">Functionality Cookies</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">Remember your preferences such as language, region, and display settings to provide a more personalized experience.</p>
                </div>
                <div className="bg-gray-50 rounded-xl p-4">
                  <h3 className="font-semibold text-gray-800 text-sm mb-1">Marketing Cookies</h3>
                  <p className="text-gray-600 text-xs leading-relaxed">Track browsing activity to deliver relevant advertisements and measure campaign effectiveness. Placed by third-party networks with our permission.</p>
                </div>
              </div>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. Third-Party Cookies</h2>
              <p className="text-gray-600 text-sm leading-relaxed">We use third-party services including Google Analytics and payment processors that may place their own cookies. We do not control these cookies and recommend reviewing their respective privacy policies.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Managing Cookies</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">You can manage cookies through:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
                <li><strong>Browser settings:</strong> Set your browser to refuse, delete, or alert you about cookies.</li>
                <li><strong>Device settings:</strong> Limit ad tracking or reset advertising identifiers on mobile devices.</li>
              </ul>
              <p className="text-gray-600 text-sm leading-relaxed mt-3">Disabling cookies may affect website functionality.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. Updates</h2>
              <p className="text-gray-600 text-sm leading-relaxed">We may update this policy periodically. Changes will be posted on this page with an updated date.</p>
            </section>
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">6. Contact Us</h2>
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

export default CookiesPolicyPage;
