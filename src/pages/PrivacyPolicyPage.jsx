import React from 'react';
import MainLayout from '../layouts/MainLayout';

const PrivacyPolicyPage = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-2">Privacy Policy</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Last updated: February 7, 2026</p>

          <div className="prose dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Introduction</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                GN News ("we," "us," "our," or "Company") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and safeguard your information when you visit our website and use our services.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Information We Collect</h2>
              <div className="space-y-4">
                <div>
                  <h3 className="text-xl font-semibold mb-2">2.1 Personal Information You Provide</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    We may collect information that you voluntarily provide to us when you:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                    <li>Register an account with us</li>
                    <li>Contact us through our contact form</li>
                    <li>Subscribe to our newsletter</li>
                    <li>Comment on our news articles</li>
                    <li>Participate in surveys or polls</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-xl font-semibold mb-2">2.2 Automatically Collected Information</h3>
                  <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                    When you visit our website, we automatically collect certain information about your device and browsing behavior, including:
                  </p>
                  <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-2 space-y-1">
                    <li>IP address</li>
                    <li>Browser type and version</li>
                    <li>Operating system</li>
                    <li>Pages visited and time spent</li>
                    <li>Referral source</li>
                    <li>Cookies and tracking technologies</li>
                  </ul>
                </div>
              </div>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. How We Use Your Information</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                We use the information we collect for various purposes, including:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Providing and improving our services</li>
                <li>Sending newsletters and promotional content (with your consent)</li>
                <li>Responding to your inquiries and requests</li>
                <li>Analyzing website usage and trends</li>
                <li>Detecting and preventing fraud or security issues</li>
                <li>Complying with legal obligations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Information Sharing and Disclosure</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We do not sell, trade, or rent your personal information to third parties. We may share your information in the following circumstances:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 mt-4 space-y-2">
                <li>With service providers who assist us in operating our website and conducting our business</li>
                <li>When required by law or to protect our legal rights</li>
                <li>In the event of a merger, acquisition, or bankruptcy</li>
                <li>With your explicit consent</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Data Security</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We implement appropriate technical and organizational measures to protect your personal information against unauthorized access, alteration, disclosure, or destruction. However, no method of transmission over the Internet is 100% secure. While we strive to protect your information, we cannot guarantee absolute security.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Cookies and Tracking Technologies</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We use cookies and similar tracking technologies to enhance your experience on our website. You can control cookie preferences through your browser settings. Disabling cookies may affect some functionality of our website.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Your Privacy Rights</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Depending on your location, you may have certain rights regarding your personal information:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Right to access your personal information</li>
                <li>Right to correct or update your information</li>
                <li>Right to delete your information</li>
                <li>Right to opt-out of marketing communications</li>
                <li>Right to data portability</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Children's Privacy</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our website is not intended for children under 13 years of age. We do not knowingly collect personal information from children. If we become aware that we have collected information from a child under 13, we will take steps to delete such information and terminate the child's account.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. Third-Party Links</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                Our website may contain links to third-party websites. We are not responsible for the privacy practices of these external sites. We encourage you to review their privacy policies before providing any information.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Changes to This Privacy Policy</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                We may update this Privacy Policy from time to time. We will notify you of any changes by updating the "Last updated" date at the top of this page. Your continued use of our website following the posting of revised Privacy Policy means that you accept and agree to the changes.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Contact Us</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have questions about this Privacy Policy or our privacy practices, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>GN News</strong><br />
                  Email: privacy@gnnews.com<br />
                  Contact Form: <a href="/contact" className="text-primary-600 hover:underline">Visit Contact Page</a>
                </p>
              </div>
            </section>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default PrivacyPolicyPage;
