import React from 'react';
import MainLayout from '../layouts/MainLayout';

const TermsAndServicesPage = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h1 className="text-4xl font-bold mb-2">Terms and Conditions</h1>
          <p className="text-gray-500 dark:text-gray-400 mb-8">Last updated: February 7, 2026</p>

          <div className="prose dark:prose-invert max-w-none space-y-8">
            <section>
              <h2 className="text-2xl font-bold mb-4">1. Acceptance of Terms</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                By accessing and using the GN News website and services, you agree to be bound by these Terms and Conditions. If you do not agree to abide by the above, please do not use this service. We reserve the right to modify these terms at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">2. Use License</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Permission is granted to temporarily download one copy of the materials (information or software) on GN News website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Modifying or copying the materials</li>
                <li>Using the materials for any commercial purpose or for any public display</li>
                <li>Attempting to decompile or reverse engineer any software contained on the website</li>
                <li>Removing any copyright or other proprietary notations from the materials</li>
                <li>Transferring the materials to another person or "mirroring" the materials on any other server</li>
                <li>Using the materials for illegal purposes or in violation of any laws or regulations</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">3. Disclaimer</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The materials on GN News website are provided on an 'as is' basis. GN News makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">4. Limitations</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                In no event shall GN News or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on GN News website, even if GN News or a GN News authorized representative has been notified orally or in writing of the possibility of such damage.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">5. Accuracy of Materials</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                The materials appearing on GN News website could include technical, typographical, or photographic errors. GN News does not warrant that any of the materials on its website are accurate, complete, or current. GN News may make changes to the materials contained on its website at any time without notice.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">6. Links</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                GN News has not reviewed all of the sites linked to its website and is not responsible for the contents of any such linked site. The inclusion of any link does not imply endorsement by GN News of the site. Use of any such linked website is at the user's own risk.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">7. Modifications</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                GN News may revise these terms of service for its website at any time without notice. By using this website, you are agreeing to be bound by the then current version of these terms of service.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">8. Governing Law</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                These terms and conditions are governed by and construed in accordance with the laws of India, and you irrevocably submit to the exclusive jurisdiction of the courts in that location.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">9. User Responsibilities</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                Users agree to:
              </p>
              <ul className="list-disc list-inside text-gray-700 dark:text-gray-300 space-y-2">
                <li>Use the website only for lawful purposes and in a way that does not infringe upon the rights of others or restrict their use and enjoyment of the website</li>
                <li>Not harass, abuse, or threaten other users</li>
                <li>Not post any content that is offensive, vulgar, obscene, or otherwise inappropriate</li>
                <li>Not attempt to gain unauthorized access to the website or its systems</li>
                <li>Not engage in any form of spam or unsolicited advertising</li>
              </ul>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">10. Intellectual Property Rights</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                All content on the GN News website, including but not limited to text, graphics, logos, images, and software, is the property of GN News or its content suppliers and is protected by international copyright laws. Unauthorized reproduction or distribution of this content is strictly prohibited.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">11. Account Termination</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                GN News reserves the right to terminate any user account or access to the website at any time, for any reason, without notice or liability. This includes accounts that violate these terms and conditions or engage in inappropriate behavior.
              </p>
            </section>

            <section>
              <h2 className="text-2xl font-bold mb-4">12. Contact Information</h2>
              <p className="text-gray-700 dark:text-gray-300 leading-relaxed">
                If you have any questions about these Terms and Conditions, please contact us at:
              </p>
              <div className="mt-4 p-4 bg-gray-100 dark:bg-gray-700 rounded">
                <p className="text-gray-700 dark:text-gray-300">
                  <strong>GN News</strong><br />
                  Email: support@gnnews.com<br />
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

export default TermsAndServicesPage;
