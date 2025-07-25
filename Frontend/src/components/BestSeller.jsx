import React, { useContext, useEffect, useState } from "react";
import { ShopContext } from "../context/ShopContext";
import Tittle from "./Tittle";
import ProductItem from "./ProductItem";

const BestSeller = () => {
  const { products } = useContext(ShopContext);
  const [bestSeller, setBestSeller] = useState([]);

 
  useEffect(() => {
    const sortedByPrice = [...products].sort((a, b) => b.price - a.price);
    setBestSeller(sortedByPrice.slice(0, 5));
  }, [products]);

  return (
    <div className="my-10">
      <div className="text-center text-3xl py-8">
        <Tittle text1={"Best"} text2={"Sellers"} />
        <p className="w-3/4 m-auto text-xs sm:text-sm md:text-base text-gray-500">
          Lorem ipsum dolor sit amet consectetur.
        </p>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 gap-y-6">
        {bestSeller.length > 0 ? (
          bestSeller.map((item, index) => (
            <ProductItem
              key={index}
              id={item._id}
              name={item.name} // ✅ use 'name' instead of 'title'
              price={item.price}
              image={item.image}
            />
          ))
        ) : (
          <p className="col-span-full text-center text-gray-500">
            No Best Sellers found.
          </p>
        )}
      </div>
    </div>
  );
};

export default BestSeller;
