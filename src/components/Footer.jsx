import React, { useEffect, useState } from 'react';
import { socialMediaAPI } from '../api';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  const [socialLinks, setSocialLinks] = useState([]);

  useEffect(() => {
    const fetchSocialMedia = async () => {
      try {
        const res = await socialMediaAPI.getAll();
        setSocialLinks(res.data.data || []);
      } catch (error) {
        console.error('Failed to fetch social media links:', error);
      }
    };

    fetchSocialMedia();
  }, []);

  return (
    <footer className="bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white mt-12">
      <div className="max-w-7xl mx-auto px-4 py-8 md:py-12">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8 mb-8">
          <div>
            <h3 className="font-bold text-lg md:text-xl mb-4 text-gray-900 dark:text-white">GP News</h3>
            <p className="text-gray-600 dark:text-gray-400 text-sm md:text-base">Your trusted source for breaking news and in-depth analysis.</p>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Quick Links</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm md:text-base">
              <li><a href="/" className="hover:text-gray-900 dark:hover:text-white transition">Home</a></li>
              <li><a href="/about" className="hover:text-gray-900 dark:hover:text-white transition">About</a></li>
              <li><a href="/contact" className="hover:text-gray-900 dark:hover:text-white transition">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Legal</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm md:text-base">
              <li><a href="/privacy" className="hover:text-gray-900 dark:hover:text-white transition">Privacy Policy</a></li>
              <li><a href="/terms" className="hover:text-gray-900 dark:hover:text-white transition">Terms of Service</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-bold mb-4 text-gray-900 dark:text-white">Follow Us</h4>
            <ul className="space-y-2 text-gray-600 dark:text-gray-400 text-sm md:text-base">
              {socialLinks.length > 0 ? (
                socialLinks.map(link => (
                  <li key={link.id}>
                    <a 
                      href={link.url} 
                      target="_blank" 
                      rel="noopener noreferrer" 
                      className="hover:text-gray-900 dark:hover:text-white transition"
                    >
                      {link.platform_name}
                    </a>
                  </li>
                ))
              ) : (
                <>
                  <li><a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition">Twitter</a></li>
                  <li><a href="https://facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition">Facebook</a></li>
                  <li><a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-900 dark:hover:text-white transition">LinkedIn</a></li>
                </>
              )}
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-300 dark:border-gray-800 pt-8 text-center text-gray-600 dark:text-gray-400 text-sm md:text-base">
          <p>&copy; {currentYear} GP News. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
