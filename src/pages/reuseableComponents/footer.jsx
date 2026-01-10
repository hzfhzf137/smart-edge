import React from 'react';
import { FaWhatsapp, FaInstagram, FaFacebook } from 'react-icons/fa';

const Footer = () => {
  return (
    <footer className="bg-black bg-opacity-100 w-full py-8 relative">
      <div className="max-w-7xl mx-auto px-4 flex flex-col items-center space-y-6">

        {/* Connect Text */}
        <span
          className="text-gray-300 text-xs sm:text-sm md:text-base text-center"
          aria-label="Connect with us"
          data-aos="fade-right"
          data-aos-delay="100"
          data-aos-duration="1000"
        >
          Connect with us through any of these platforms
        </span>

        {/* Social Media Links */}
        <div
          className="flex space-x-4"
          data-aos="fade-up"
          data-aos-delay="200"
          data-aos-duration="1000"
        >
          <a
            href="https://api.whatsapp.com/send?phone=923014278823"
            className="text-green-400 hover:text-green-500 transition-transform duration-300 transform hover:scale-110"
            aria-label="Chat with us on WhatsApp"
          >
            <FaWhatsapp size={40} />
          </a>

          <a
            href="https://www.instagram.com/"
            className="text-pink-500 hover:text-pink-600 transition-transform duration-300 transform hover:scale-110"
            aria-label="Follow us on Instagram"
          >
            <FaInstagram size={40} />
          </a>

          <a
            href="https://www.facebook.com/"
            className="text-blue-600 hover:text-blue-700 transition-transform duration-300 transform hover:scale-110"
            aria-label="Follow us on Facebook"
          >
            <FaFacebook size={40} />
          </a>
        </div>

        {/* Divider Line */}
        <div className="w-1/2 h-0.5 bg-gray-700 mt-5"></div>

        {/* Copyright */}
        <p className="text-gray-400 text-xs sm:text-sm md:text-base text-center select-none">
          © 2024 Smart Edge. All rights reserved.
        </p>

        {/* Footmark Divider */}
        <div className="w-1/3 h-px bg-gray-800 mt-4"></div>

        {/* Footmark */}
        <div className="text-center text-gray-500 text-[11px] sm:text-xs space-y-1">
          <p>
            Design and Developed by{' '}
            <span className="text-gray-300 font-medium">Huzaifa M.</span>
          </p>
          <p>
            Contact:{' '}
            <a
              href="https://huzaifa-mahmood.online"
              target="_blank"
              rel="noopener noreferrer"
              className="text-blue-400 hover:text-blue-500 transition"
            >
              huzaifa-mahmood.online
            </a>
          </p>
          <p>
            Email:{' '}
            <a
              href="mailto:hzfhzf137@gmail.com"
              className="text-blue-400 hover:text-blue-500 transition"
            >
              hzfhzf137@gmail.com
            </a>
          </p>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
