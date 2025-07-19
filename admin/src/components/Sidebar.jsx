import React from "react";
import { useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";

const Sidebar = () => {
  const navigate = useNavigate();

  return (
    <div className="h-screen w-60 bg-slate-400 text-white p-6 shadow-lg flex flex-col gap-6">
      <div className="text-2xl font-bold text-white mb-4">Admin Panel</div>

      <div
        className="flex items-center gap-3 cursor-pointer p-3 rounded-md hover:bg-slate-500 transition"
        onClick={() => navigate("/add")}
      >
        <img src={assets.add_icon} alt="Add" className="h-5 w-5" />
        <div className="text-sm font-medium">Add Items</div>
      </div>
      <div
        className="flex items-center gap-3 cursor-pointer p-3 rounded-md hover:bg-slate-500 transition"
        onClick={() => navigate("/list")}
      >
        <img src={assets.parcel_icon} alt="Products" className="h-5 w-5" />
        <div className="text-sm font-medium">Products</div>
      </div>

      <div
        className="flex items-center gap-3 cursor-pointer p-3 rounded-md hover:bg-slate-500 transition"
        onClick={() => navigate("/orders")}
      >
        <img src={assets.order_icon} alt="Orders" className="h-5 w-5" />
        <div className="text-sm font-medium">Orders</div>
      </div>
    </div>
  );
};

export default Sidebar;
