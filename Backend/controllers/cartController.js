import userModel from "../models/userModel.js";

const addToCart = async (req, res) => {
  try {
    const { itemId, size } = req.body;
    const userId = req.userId; // 👈 comes from authUser middleware

    if (!itemId || !size) {
      return res
        .status(400)
        .json({ success: false, message: "Missing itemId or size" });
    }

    const user = await userModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    let cart = user.cartData || {};

    // Initialize itemId if it doesn't exist
    if (!cart[itemId]) {
      cart[itemId] = {};
    }

    // Initialize size if it doesn't exist
    if (!cart[itemId][size]) {
      cart[itemId][size] = 0;
    }

    cart[itemId][size] += 1;

    user.cartData = cart;
    await user.save();

    res.json({ success: true, message: "Item added to cart", cartData: cart });
  } catch (error) {
    console.log("Add to cart error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};

const updateCart = async (req, res) => {
  try {
    const { userId, itemId, size, quantity } = req.body;

    if (!userId || !itemId || !size || quantity === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const userData = await userModel.findById(userId);
    if (!userData) {
      return res.status(404).json({ message: "User not found" });
    }

    const cartData = userData.cartData || {};

    // Check if the item and size exist
    if (!cartData[itemId]) {
      cartData[itemId] = {};
    }

    if (quantity <= 0) {
      // Remove the size from cart if quantity is 0 or less
      delete cartData[itemId][size];

      // If no sizes remain for that item, remove the item too
      if (Object.keys(cartData[itemId]).length === 0) {
        delete cartData[itemId];
      }
    } else {
      // Update the quantity
      cartData[itemId][size] = quantity;
    }

    // Save updated cart
    userData.cartData = cartData;
    await userData.save();

    return res.status(200).json({
      message: "Cart updated successfully",
      cartData: userData.cartData,
    });
  } catch (error) {
    console.error("Update cart error:", error);
    return res.status(500).json({ message: "Server error" });
  }
};

const getUserCart = async (req, res) => {
  try {
    const userId = req.userId; // comes from token

    const user = await userModel.findById(userId);
    if (!user)
      return res
        .status(404)
        .json({ success: false, message: "User not found" });

    const cartData = user.cartData || {};
    res.json({ success: true, cartData });
  } catch (error) {
    console.log("Get user cart error:", error);
    res.status(500).json({ success: false, message: "Internal server error" });
  }
};
export { addToCart, updateCart, getUserCart };
