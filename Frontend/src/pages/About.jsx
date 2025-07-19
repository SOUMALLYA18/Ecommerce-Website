// src/pages/About.jsx
import React from "react";
import { assets } from "../assets/assets";

const About = () => {
  return (
    <div className="min-h-screen px-4 py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto flex flex-col gap-12">
        {/* Title */}
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-800 mb-4">
            About Us
          </h1>
          <p className="text-gray-600 text-lg">
            Discover who we are, what we do, and why we do it.
          </p>
        </div>

        {/* Section 1 */}
        <div className="flex flex-col-reverse sm:flex-row items-center gap-8">
          <div className="sm:w-1/2">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Our Mission
            </h2>
            <p className="text-gray-600 leading-relaxed">
              At our core, we're driven by the desire to bring the best products
              to your doorstep. Our mission is to make quality, affordability,
              and style accessible for everyone.
            </p>
          </div>
          <img
            src={assets.contact_img}
            alt="Our Mission"
            className="w-full sm:w-1/2 rounded-lg shadow-md"
          />
        </div>

        {/* Section 2 */}
        <div className="flex flex-col sm:flex-row items-center gap-8">
          <img
            src={assets.about_img}
            alt="Our Team"
            className="w-full sm:w-1/2 rounded-lg shadow-md"
          />
          <div className="sm:w-1/2">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Our Team
            </h2>
            <p className="text-gray-600 leading-relaxed">
              We are a team of passionate developers, designers, and visionaries
              working together to build experiences that matter. Each team
              member brings a unique perspective and skillset.
            </p>
          </div>
        </div>

        {/* Section 3 */}
        <div className="flex flex-col-reverse sm:flex-row items-center gap-8">
          <div className="sm:w-1/2">
            <h2 className="text-2xl font-semibold mb-3 text-gray-800">
              Our Vision
            </h2>
            <p className="text-gray-600 leading-relaxed">
              Looking ahead, we aim to redefine eCommerce by introducing more
              personalization, AI, and sustainability into every product we
              sell.
            </p>
          </div>
          <img
            src="https://source.unsplash.com/featured/?vision,future"
            alt="Our Vision"
            className="w-full sm:w-1/2 rounded-lg shadow-md"
          />
        </div>
      </div>
    </div>
  );
};

export default About;
