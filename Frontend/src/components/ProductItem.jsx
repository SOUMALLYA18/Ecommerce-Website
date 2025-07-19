import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { ShopContext } from "../context/ShopContext";

const ProductItem = ({ id, image, name, price }) => {
  const { currency } = useContext(ShopContext);

  return (
    <Link
      to={`/product/${id}`}
      className="product-item text-gray-700 cursor-pointer"
    >
      <div className="product-details overflow-hidden">
        <img
          src={image?.[0]} // ✅ Optional chaining to prevent error if image is undefined
          alt={name}
          className="w-full h-56 object-cover mb-4 transform hover:scale-110 transition duration-300 ease-in-out" // ✅ Fixed hover scaling
        />
      </div>
      <p className="pt-3 pb-1 text-sm line-clamp-1">{name}</p>{" "}
      <p className="text-sm font-medium">
        {currency}
        {price}
      </p>
    </Link>
  );
};

export default ProductItem;
