import mongoose from "mongoose";

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Product name is required"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "Product description is required"],
  },
  price: {
    type: Number,
    required: [true, "Product price is required"],
    min: [0, "Price cannot be negative"],
  },
  image: {
    type: [String], // Array of image URLs
    required: [true, "Product image is required"],
  },
  category: {
    type: String,
    required: [true, "Product category is required"],
  },

  sizes: {
    type: [String], // e.g., ["S", "M", "L", "XL"]
    default: [],
  },
  bestseller: {
    type: Boolean,
    default: false,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

const productModel = mongoose.model("product", productSchema);

export default productModel;
