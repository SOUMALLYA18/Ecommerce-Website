import React from "react";
import { assets } from "../assets/assets";

const Hero = () => {
  return (
    <div className="flex flex-col sm:flex-row border border-gray-400">
      {/* Hero Left Side */}
      <div className="w-full sm:w-1/2 flex items-center justify-center py-10 sm:py-0 ">
        <div className="flex flex-col gap-4 text-[#414141] max-w-md px-6">
          {/* Tag line */}
          <div className="flex items-center gap-2">
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
            <p className="font-medium text-sm md:text-base">OUR BESTSELLER</p>
          </div>

          {/* Heading */}
          <h1 className=" prata-regular text-3xl sm:text-4xl lg:text-5xl leading-relaxed font-bold">
            Latest Arrivals
          </h1>

          {/* CTA */}
          <div className="flex items-center gap-2">
            <p className="font-semibold text-sm md:text-base">SHOP NOW</p>
            <p className="w-8 md:w-11 h-[2px] bg-[#414141]"></p>
          </div>
        </div>
      </div>

      {/* Hero Right Side (optional placeholder) */}
      <div className="w-full sm:w-1/2 bg-red-200 ">
        {/* Add an image or graphic here */}
        <img
          src={assets.hero_img}
          className="w-full h-full object-cover"
          alt="Hero"
        />
      </div>
    </div>
  );
};

export default Hero;
