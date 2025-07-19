import React, { useState } from "react";
import { assets } from "../assets/assets";
import axios from "axios";
import { backendUrl } from "../App";
import { toast } from "react-toastify";

const Add = ({ token }) => {
  const [images, setImages] = useState({
    image1: null,
    image2: null,
    image3: null,
  });

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [category, setCategory] = useState("Men");
  const [bestseller, setBestseller] = useState(false);
  const [sizes, setSizes] = useState([]);

  const handleImageChange = (e, key) => {
    const file = e.target.files[0];
    if (file) {
      setImages((prev) => ({
        ...prev,
        [key]: file,
      }));
    }
  };

  const handleSizeClick = (size) => {
    setSizes((prev) =>
      prev.includes(size) ? prev.filter((s) => s !== size) : [...prev, size]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const token = localStorage.getItem("token");

      const formData = new FormData();
      formData.append("name", name);
      formData.append("description", description);
      formData.append("price", price);
      formData.append("category", category);
      formData.append("bestseller", bestseller);
      formData.append("sizes", sizes.join(","));

      // Append only image1, image2, image3
      if (images.image1) formData.append("image1", images.image1);
      if (images.image2) formData.append("image2", images.image2);
      if (images.image3) formData.append("image3", images.image3);

      const response = await axios.post(
        `${backendUrl}/api/product/add`,
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.data.success) {
        toast.success(response.data.message);
        setName("");
        setImages("");
        setDescription("");
        setPrice("");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error(
        "Error submitting product:",
        error.response?.data || error.message
      );
      alert("Failed to add product. Check console for details.");
    }
  };

  return (
    <form
      className="flex flex-col w-full items-start gap-3"
      onSubmit={handleSubmit}
    >
      <div>
        <p className="text-xl font-medium mb-2">Upload Images</p>
        <div className="flex gap-3 mb-3">
          {["image1", "image2", "image3"].map((key) => (
            <label className="w-20 cursor-pointer" htmlFor={key} key={key}>
              <img
                src={
                  images[key]
                    ? URL.createObjectURL(images[key])
                    : assets.upload_area
                }
                alt={key}
                className="h-20 w-20 object-cover border rounded"
              />
              <input
                type="file"
                id={key}
                hidden
                accept="image/*"
                onChange={(e) => handleImageChange(e, key)}
              />
            </label>
          ))}
        </div>
      </div>

      <div className="w-full flex flex-col">
        <b className="mb-2">Product name</b>
        <input
          className="w-full max-w-[500px] py-2 px-2 border border-gray-300 rounded"
          type="text"
          placeholder="Type here"
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
        />
      </div>

      <div className="w-full flex flex-col">
        <b className="mb-2">Product Description</b>
        <textarea
          className="w-full max-w-[500px] py-2 px-2 border border-gray-300 rounded"
          placeholder="Write the content here"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        />
      </div>

      <div className="w-full flex flex-col">
        <p className="mb-2">Product category</p>
        <select
          className="w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        >
          <option value="Men">Men</option>
          <option value="Women">Women</option>
          <option value="Kids">Kids</option>
        </select>
      </div>

      <div className="w-full flex flex-col">
        <p className="mb-2">Product price</p>
        <input
          type="number"
          placeholder="25"
          className="w-full max-w-[500px] py-2 px-2 border border-gray-300 rounded"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </div>

      <div className="flex flex-col gap-3 mt-3">
        <p>Product Sizes</p>
        <div className="flex gap-3 cursor-pointer font-semibold">
          {["S", "M", "L", "XL"].map((size) => (
            <div
              key={size}
              className={`px-3 py-2 rounded ${
                sizes.includes(size) ? "bg-black text-white" : "bg-slate-300"
              }`}
              onClick={() => handleSizeClick(size)}
            >
              {size}
            </div>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <input
          type="checkbox"
          id="bestseller"
          checked={bestseller}
          onChange={() => setBestseller(!bestseller)}
        />
        <label className="cursor-pointer font-semibold" htmlFor="bestseller">
          Add to Bestseller
        </label>
      </div>

      <button
        className="w-40 py-3 mt-4 bg-black text-white font-semibold cursor-pointer rounded"
        type="submit"
      >
        ADD
      </button>
    </form>
  );
};

export default Add;
