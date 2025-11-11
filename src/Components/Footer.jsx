import React from "react";
import { MdEmail } from "react-icons/md";
import { FaGithub,FaInstagram } from "react-icons/fa";

const Footer = () => {
  return (
    // Switched to light gray background for a clean, modern footer look
    <footer className="bg-gray-50 text-gray-700 w-full py-10 border-t border-gray-200">
      <div className="container mx-auto px-6 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-center">
          
          {/* Company Info */}
          <div className="text-center md:text-left mb-6 md:mb-0">
            {/* Logo/Title - Using the brand accent color */}
            <h2 className="text-2xl font-extrabold text-gray-900">
                BLOG<span className="text-blue-600">VIBES</span>
            </h2>
            <p className="mt-2 text-sm text-gray-500">
              © 2024 Your Company. All rights reserved. | Built with Clarity.
            </p>
          </div>
          
          {/* Social Icons - Increased size, using blue accent on hover */}
          <div className="flex space-x-6">
            <a
              href="https://mail.google.com/mail/?view=cm&fs=1&to=creationmz445@gmail.com"
              target="_blank"
              className="text-gray-500 hover:text-blue-600 text-2xl transition duration-200"
              aria-label="Email"
            >
              <MdEmail />
            </a>
            <a
              href="https://github.com/GitZaidHub"
              target="_blank"
              className="text-gray-500 hover:text-blue-600 text-2xl transition duration-200"
              aria-label="GitHub"
            >
              <FaGithub />
            </a>
            <a
              href="https://www.instagram.com/zaidmohd517/"
              target="_blank"
              className="text-gray-500 hover:text-blue-600 text-2xl transition duration-200"
              aria-label="Instagram"
            >
              <FaInstagram />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;