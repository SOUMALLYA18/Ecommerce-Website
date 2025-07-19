import React from "react";
import { assets } from "../assets/assets";

const Navbar = ({ setToken }) => {
  return (
    <nav className="flex items-center justify-between px-6 py-4 bg-white shadow-md">
      {/* Logo */}
      <div className="flex items-center gap-2">
        <img
          src={assets.logo}
          alt="Logo"
          className="h-10 w-auto object-contain"
        />
      </div>

      {/* Logout Button */}
      <button
        onClick={() => {
          setToken("");
        }}
        className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600 transition cursor-pointer"
      >
        Logout
      </button>
    </nav>
  );
};

export default Navbar;
