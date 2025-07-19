import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const List = () => {
  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(`${backendUrl}/api/product/list`);
      if (response.data.success) {
        setList(response.data.products);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    fetchList();
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h2>All Product List</h2>
      <div style={{ display: "flex", flexWrap: "wrap", gap: "20px" }}>
        {list.map((product) => (
          <div
            key={product._id}
            style={{
              border: "1px solid #ddd",
              borderRadius: "8px",
              padding: "10px",
              width: "250px",
            }}
          >
            <img
              src={
                product.image && product.image.length > 0
                  ? product.image[0]
                  : "https://dummyimage.com/250x200/cccccc/000000&text=No+Image"
              }
              alt={product.name}
              style={{
                width: "100%",
                height: "200px",
                objectFit: "cover",
                marginBottom: "10px",
              }}
            />
            <h3 style={{ margin: "0 0 5px" }}>{product.name}</h3>
            <p style={{ margin: "0 0 5px" }}>{product.description}</p>
            <p style={{ fontWeight: "bold", margin: "0 0 5px" }}>
              ₹{product.price}
            </p>
            <p style={{ fontSize: "14px", color: "#666" }}>
              Sizes: {product.sizes?.join(", ") || "N/A"}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default List;
