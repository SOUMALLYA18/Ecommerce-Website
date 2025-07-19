import React from "react";
import { assets } from "../assets/assets";
import { Link } from "react-router-dom";
const Footer = () => {
  return (
    <div>
      <div className="max-w-[1200px] mx-auto px-4 py-10 grid grid-cols-1 sm:grid-cols-[3fr_1fr_1fr] gap-14">
        {/* Column 1 */}
        <div className="flex flex-col items-center sm:items-start">
          <img src={assets.logo} alt="Footer Logo" className="h-10 mb-4" />
          <p className="text-gray-400 text-sm">
            © 2025 All rights reserved by Soumallya Mukherjee.
          </p>
        </div>

        {/* Placeholder for Column 2 and 3 */}
        <div className="flex flex-col gap-2 text-sm">
          <Link to="/about" className="text-gray-400">
            About
          </Link>
          <Link to="/contact" className="text-gray-400">
            Contact
          </Link>
          <Link to="/privacy" className="text-gray-400">
            Privacy
          </Link>
        </div>

        <div className="flex flex-col gap-2 text-sm">
          <h3 className="text-white font-semibold">Support</h3>
          <p className="text-gray-400">Help Center</p>
          <p className="text-gray-400">Terms</p>
          <p className="text-gray-400">FAQs</p>
        </div>
      </div>
    </div>
  );
};

export default Footer;
