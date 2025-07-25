import React, { useContext } from "react";
import { ShopContext } from "../context/ShopContext";
import Tittle from "../components/Tittle";
const Orders = () => {
  const { products, currency } = useContext(ShopContext);

  return (
    <div className="border-t pt-16">
      <div className="text-2xl ">
        <Tittle text1={"MY"} text2={"ORDERS"} />
      </div>
      <div>
        {products.slice(1, 4).map((item, index) => (
          <div
            key={index}
            className="py-4 border-t border-b text-gray-500 flex flex-col md:flex-row md:items-start md:justify-start gap-4"
          >
            <div className="flex items-start text-sm gap-6 ">
              <img className="w-16 sm:w-20" src={item.image[0]} alt="" />
              <div>
                <p className="sm:text-base font-medium">{item.name}</p>
                <div className="flex items-center gap-3 mt-2 text-base text-gray-700 ">
                  <p className="text-lg">
                    {currency}
                    {item.price}
                  </p>
                  <p>Quantity: 1</p>
                  <p>Size: M</p>
                </div>
                <p className="mt-2">
                  Date: <span className="text-gray-400">25/07/2025</span>
                </p>
              </div>
            </div>
            <div className="flex flex-1 items-center justify-between md:pl-16">
              <div className="flex items-center gap-2 mx-auto">
                <p className="min-w-2 h-2 rounded-full bg-green-500"></p>
                <p className="sm:text-sm text-base">Ready To Ship</p>
              </div>
              <button className="border px-4 py-2 text-sm font-medium rounded-sm cursor-pointer">
                Track Order
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Orders;
