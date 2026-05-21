import React from 'react';
import { Helmet, HelmetProvider } from "react-helmet-async";
import Navbar from "../../components/Navbar";
import Footer from "../../components/footer";

const PrivacyPolicyPage = () => {
  return (
    <HelmetProvider>
      <Helmet>
        <title>Privacy Policy | Smash Apartments</title>
        <meta name="description" content="Read the Smash Apartments Privacy Policy. Learn how we collect, use, and protect your personal information when you use our apartment rental and car hire services." />
        <link rel="canonical" href="https://www.smashapartments.com/privacy-policy" />
      </Helmet>

      <div><Navbar /></div>

      <main className="mt-[6.5rem] mx-[15px] md:mx-[32px] mb-16">
        <div className="max-w-screen-md mx-auto">
          <div className="mb-10">
            <p className="text-primary font-semibold text-sm mb-2 tracking-wider uppercase">Legal</p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">Privacy Policy</h1>
            <p className="text-gray-500 text-sm">Last updated: May 18, 2026</p>
          </div>

          <div className="prose prose-sm max-w-none space-y-8">
            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">1. Introduction</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Smash Apartments ("we," "us," or "our") is committed to protecting the privacy and security of your personal information. 
                This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website 
                (www.smashapartments.com), use our mobile application, or engage with our apartment rental and car hire services across Nigeria.
              </p>
              <p className="text-gray-600 text-sm leading-relaxed mt-3">
                By accessing or using our services, you agree to the collection and use of information in accordance with this policy. 
                If you do not agree with the terms of this policy, please do not access our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">2. Information We Collect</h2>
              <h3 className="text-base font-semibold text-gray-800 mb-2">2.1 Personal Information</h3>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">We may collect the following personal information when you register, make a booking, or interact with our platform:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
                <li>Full name and contact details (email address, phone number)</li>
                <li>Government-issued identification for verification purposes</li>
                <li>Payment and billing information</li>
                <li>Profile photos and account preferences</li>
                <li>Booking history and preferences</li>
                <li>Communication records with our support team</li>
              </ul>

              <h3 className="text-base font-semibold text-gray-800 mb-2 mt-4">2.2 Automatically Collected Information</h3>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
                <li>Device information (browser type, operating system, device identifiers)</li>
                <li>IP address and approximate geolocation</li>
                <li>Usage data (pages visited, time spent, click patterns)</li>
                <li>Cookies and similar tracking technologies</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">3. How We Use Your Information</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">We use the information we collect to:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
                <li>Process and manage your bookings for apartments and car rentals</li>
                <li>Verify your identity and prevent fraud</li>
                <li>Communicate with you about your bookings, account updates, and promotions</li>
                <li>Improve our platform, services, and user experience</li>
                <li>Comply with legal obligations and resolve disputes</li>
                <li>Provide customer support and respond to inquiries</li>
                <li>Send marketing communications (with your consent)</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">4. Information Sharing</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">
                We do not sell your personal information to third parties. We may share your information with:
              </p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
                <li><strong>Property owners and car rental providers</strong> — to facilitate your bookings</li>
                <li><strong>Payment processors</strong> — to securely process transactions</li>
                <li><strong>Service providers</strong> — who assist us in operating our platform (hosting, analytics, customer support)</li>
                <li><strong>Legal authorities</strong> — when required by law or to protect our rights and safety</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">5. Data Security</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                We implement industry-standard security measures to protect your personal information, including encryption, 
                secure servers, and access controls. However, no method of transmission over the internet is 100% secure, 
                and we cannot guarantee absolute security. You are responsible for maintaining the confidentiality of your 
                account credentials.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">6. Data Retention</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                We retain your personal information for as long as your account is active or as needed to provide you services, 
                comply with legal obligations, resolve disputes, and enforce our agreements. You may request deletion of your 
                account and associated data at any time by contacting our support team.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">7. Your Rights</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-3">You have the right to:</p>
              <ul className="list-disc pl-6 space-y-1 text-gray-600 text-sm">
                <li>Access and receive a copy of your personal data</li>
                <li>Correct inaccurate or incomplete information</li>
                <li>Request deletion of your personal data</li>
                <li>Withdraw consent for marketing communications</li>
                <li>Object to processing of your personal data</li>
                <li>Lodge a complaint with a relevant data protection authority</li>
              </ul>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">8. Children's Privacy</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                Our services are not directed to individuals under the age of 18. We do not knowingly collect personal information 
                from children. If you believe we have inadvertently collected information from a minor, please contact us immediately 
                so we can take steps to delete such information.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">9. Changes to This Policy</h2>
              <p className="text-gray-600 text-sm leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any material changes by posting the 
                updated policy on our website with a revised "Last updated" date. Your continued use of our services after changes 
                are posted constitutes your acceptance of the updated policy.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-gray-900 mb-3">10. Contact Us</h2>
              <p className="text-gray-600 text-sm leading-relaxed mb-2">If you have questions about this Privacy Policy, please contact us:</p>
              <div className="bg-gray-50 rounded-xl p-4 text-sm text-gray-700 space-y-1">
                <p><strong>Smash Apartments</strong></p>
                <p>2 King Jaja Street, Works & Housing, 3rd Avenue, Gwarinpa, Abuja, Nigeria</p>
                <p>Email: <a href="mailto:info@smashapartments.com" className="text-primary hover:underline">info@smashapartments.com</a></p>
                <p>Complaints: <a href="mailto:complaints@smashapartments.com" className="text-primary hover:underline">complaints@smashapartments.com</a></p>
              </div>
            </section>
          </div>
        </div>
      </main>

      <Footer />
    </HelmetProvider>
  );
};

export default PrivacyPolicyPage;
