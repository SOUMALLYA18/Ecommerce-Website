import React from "react";
import { assets } from "../assets/assets";

const OurPolicy = () => {
  return (
    <div className="flex  justify-around gap-12 sm:gap-2 text-center py-20 text-xs sm:text-sm md:text-base text-gray-700">
      <div>
        <img
          src={assets.exchange_icon}
          className="w-12 m-auto mb-5"
          alt="Exchange Icon"
        />
        <p className="font-semibold">Exchange Policy</p>
        <p className="text-gray-600">
          We offer hassle-free exchange policy within 30 days of purchase.
        </p>
      </div>
      <div>
        <img
          src={assets.quality_icon}
          className="w-12 m-auto mb-5"
          alt="Quality Icon"
        />
        <p className="font-semibold"> 7 days return policy</p>
        <p className="text-gray-600">
          We offer hassle-free return policy within 7 days of purchase.
        </p>
      </div>
      <div>
        <img
          src={assets.support_img}
          className="w-12 m-auto mb-5"
          alt="Support Icon"
        />
        <p className="font-semibold">Customer Support </p>
        <p className="text-gray-600">
          We offer 24/7 customer support for all your queries.
        </p>
      </div>
    </div>
  );
};

export default OurPolicy;
