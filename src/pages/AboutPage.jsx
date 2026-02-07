import React from 'react';
import MainLayout from '../layouts/MainLayout';

const AboutPage = () => {
  return (
    <MainLayout>
      <div className="max-w-4xl mx-auto px-4 py-12">
        <h1 className="text-4xl font-bold mb-8">About GN News</h1>

        <div className="prose dark:prose-invert max-w-none space-y-6">
          <section>
            <h2 className="text-2xl font-bold mb-4">Our Mission</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              GN News is dedicated to delivering accurate, timely, and comprehensive news coverage. 
              We strive to be your trusted source for breaking news, in-depth analysis, and investigative journalism.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Values</h2>
            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
              <li><strong>Accuracy:</strong> We verify all information before publication</li>
              <li><strong>Transparency:</strong> We disclose our sources and methods</li>
              <li><strong>Independence:</strong> We maintain editorial independence</li>
              <li><strong>Fairness:</strong> We present multiple perspectives on issues</li>
              <li><strong>Excellence:</strong> We strive for the highest standards in journalism</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Our Team</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Our team consists of experienced journalists, editors, and reporters who are passionate 
              about bringing you the most important stories from around the world.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-bold mb-4">Contact Us</h2>
            <p className="text-lg text-gray-700 dark:text-gray-300">
              Have a story to share or feedback? We'd love to hear from you. 
              Contact us through our <a href="/contact" className="text-primary-600 hover:underline">contact page</a>.
            </p>
          </section>
        </div>
      </div>
    </MainLayout>
  );
};

export default AboutPage;
