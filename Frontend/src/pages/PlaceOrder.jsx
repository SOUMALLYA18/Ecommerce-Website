import React, { useContext, useState } from "react";
import Tittle from "../components/Tittle";
import CartTotal from "../components/CartTotal";
import { assets } from "../assets/assets";
import { ShopContext } from "../context/ShopContext";
const PlaceOrder = () => {
  const [method, setMethod] = useState("cod");
  const { navigate } = useContext(ShopContext);
  return (
    <div className="flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] bortder-t ">
      <div className="flex flex-col gap-4 w-full sm:max-w-[480px] ">
        <div className="text-xl sm-text-2xl my-3 ">
          <Tittle text1={"DELIVERY"} text2={"INFORMATION"} />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1,5 px-3.5 w-full  "
            placeholder="Firstname"
            type="text"
          />
          <input
            className="border border-gray-300 rounded py-1,5 px-3.5 w-full  "
            placeholder="Lastname"
            type="text"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1,5 px-3.5 w-full  "
          placeholder="Enter your email"
          type="email"
        />
        <input
          className="border border-gray-300 rounded py-1,5 px-3.5 w-full  "
          placeholder="Street"
          type="text"
        />
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1,5 px-3.5 w-full  "
            placeholder="city"
            type="text"
          />
          <input
            className="border border-gray-300 rounded py-1,5 px-3.5 w-full  "
            placeholder="state"
            type="text"
          />
        </div>
        <div className="flex gap-3">
          <input
            className="border border-gray-300 rounded py-1,5 px-3.5 w-full  "
            placeholder="zipcode"
            type="number"
          />
          <input
            className="border border-gray-300 rounded py-1,5 px-3.5 w-full  "
            placeholder="country"
            type="text"
          />
        </div>
        <input
          className="border border-gray-300 rounded py-1,5 px-3.5 w-full  "
          placeholder="phone"
          type="number"
        />
      </div>
      {/*-------------------Right Side-----------------*/}
      <div className="mt-8 min-w-8">
        <CartTotal />
      </div>
      <div className="mt-12 ">
        <Tittle text1={"PAYMNET"} text2={"METHOD"} />
        <div className="flex items-center gap-8">
          <div
            onClick={() => {
              setMethod("razorpay");
            }}
            className="flex gap-3 flex-col lg:flex-row"
          >
            <div className="flex items-center gap-3 border p-2 cursor-pointer">
              <p
                className={`min-w-3.5 h-3.5 border rounded-full ${
                  method === "razorpay" ? "bg-green-400" : ""
                }  `}
              ></p>
              <img className="h-5 mx-4" src={assets.razorpay_logo} alt="" />
            </div>
          </div>
          <div className="flex gap-3 flex-col lg:flex-row">
            <div
              onClick={() => {
                setMethod("cod");
              }}
              className="flex items-center gap-3 border p-2 cursor-pointer"
            >
              <p
                className={`min-w-5 h-6 rounded-lg  font font-semibold ${
                  method === "cod" ? "bg-green-400" : ""
                }`}
              >
                {" "}
                Cash On Delivery
              </p>
            </div>
          </div>
        </div>
        <div className="w-full text-end mt-8">
          <button
            onClick={() => {
              navigate("/orders");
            }}
            className="bg-black text-white px-16 py-4 rounded-lg text-sm cursor-pointer"
          >
            PLACE ORDER
          </button>
        </div>
      </div>
    </div>
  );
};

export default PlaceOrder;
