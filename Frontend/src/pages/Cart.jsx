import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Tittle from "../components/Tittle";
import { assets } from "../assets/assets";
import CartTotal from "../components/CartTotal";

const Cart = () => {
  const { products, currency, cartItems, updateQuantity, navigate } =
    useContext(ShopContext);

  const [cartData, setCartData] = useState([]);

  useEffect(() => {
    const tempData = [];
    for (const itemId in cartItems) {
      for (const size in cartItems[itemId]) {
        if (cartItems[itemId][size] > 0) {
          tempData.push({
            _id: itemId,
            size: size,
            quantity: cartItems[itemId][size],
          });
        }
      }
    }
    setCartData(tempData);
  }, [cartItems]);

  return (
    <div className="border-t pt-14">
      <div className="text-2xl mb-3">
        <Tittle text1={"YOUR"} text2={"CART"} />
      </div>
      <div>
        {cartData.map((item, index) => {
          const productData = products.find(
            (product) => product._id === item._id
          );

          if (!productData) return null;

          return (
            <div
              key={index}
              className="py-4 border-b text-gray-700 grid grid-cols-[4fr_0.5fr_0.5fr] sm:grid-cols-[4fr_2fr_0.5fr] items-center gap-4"
            >
              <div className="flex items-start gap-6">
                <img
                  className="w-16 sm:w-20 object-cover"
                  src={productData.image[0]}
                  alt={productData.name}
                />
                <div>
                  <div className="flex items-center gap-5 mt-2">
                    <p className="text-xs sm:text-lg font-medium">
                      {productData.name}
                    </p>
                    <p className="text-lg text-gray-500">Size: {item.size}</p>
                    <p className="text-lg text-gray-500">
                      Quantity: {item.quantity}
                    </p>
                    <p className="text-lg text-gray-500">
                      Price: {currency}
                      {productData.price * item.quantity}
                    </p>
                    <img
                      onClick={() => {
                        updateQuantity(item._id, item.size, 0);
                      }}
                      className="w-4 ml-10 sm:w-5 cursor-pointer"
                      src={assets.bin_icon}
                      alt=""
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ✅ Move this out of map loop */}
      <div className="flex justify-end my-20">
        <div className="w-full sm:w-[450px]">
          <CartTotal />
          <div className="w-full text-end">
            <button
              onClick={() => {
                navigate("/placeorder");
              }}
              className="bg-black text-white  text-sm my-8 px-8 py-3"
            >
              PROCEED TO CHECKOUT
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
