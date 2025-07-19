import React, { useState } from "react";

const NewsletterBox = () => {
  const [email, setEmail] = useState("");

  const onsubmitHandler = (e) => {
    e.preventDefault();
    console.log("Email submitted:", email);

    setEmail("");
  };

  return (
    <div className="text-center">
      <p className="text-2xl font-medium text-gray-800 mb-4">
        Subscribe now & get 20% off
      </p>
      <p className="text-gray-600 mt-3">
        Stay updated with our latest trends and offers.
      </p>
      <form
        onSubmit={onsubmitHandler}
        className="w-full h-44 flex-col sm:w-1/2 flex items-center gap-3 my-6 border pl-3 border-gray-300 rounded-md mx-auto"
      >
        <input
          type="email"
          name="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Enter your email"
          className="w-full mt-10 sm:flex-1 outline-none border border-gray-300 rounded-md p-2"
          required
        />
        <button
          type="submit"
          className="py-4 w-3/4 bg-blue-500 text-white rounded-md hover:bg-blue-600 cursor-pointer transition duration-300 mb-3"
        >
          Subscribe
        </button>
      </form>
    </div>
  );
};

export default NewsletterBox;
