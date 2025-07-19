import userModel from "../models/userModel.js";
import validator from "validator";
import { hashPassword, comparePassword } from "../utils/hashPassword.js";
import { generateToken } from "../utils/jwtUtils.js";

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: "User not found" });
    }
    const isMatch = await comparePassword(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ msg: "Invalid credentials" });
    }
    const token = generateToken(user._id);

    res.status(200).json({
      msg: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (error) {}
};

const registerUser = async (req, res) => {
  try {
    console.log("Incoming register request body:", req.body); // ✅ LOG INPUT

    const { name, email, password } = req.body;

    // ✅ Ensure all required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ msg: "All fields are required" });
    }

    // ✅ Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res
        .status(400)
        .json({ msg: "User already exists with this email" });
    }

    // ✅ Validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ msg: "Please enter a valid email" });
    }

    // ✅ Validate password
    if (password.length < 6) {
      return res
        .status(400)
        .json({ msg: "Please enter a strong password (6+ characters)" });
    }

    // ✅ Hash password
    const hashedPassword = await hashPassword(password);

    // ✅ Save new user
    const newUser = new userModel({
      name,
      email,
      password: hashedPassword,
    });

    await newUser.save();

    // ✅ Generate JWT
    const token = generateToken(newUser._id);

    // ✅ Respond
    res.status(201).json({
      msg: "User registered successfully",
      token,
      user: {
        id: newUser._id,
        name: newUser.name,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Register Error:", error); // ✅ LOG ERROR
    res.status(500).json({ msg: "Server Error" });
  }
};

const adminLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = generateToken("admin"); // You can use a unique identifier

      return res.status(200).json({
        msg: "Admin login successful",
        token,
        user: {
          role: "admin",
          email,
        },
      });
    } else {
      return res.status(401).json({ msg: "Invalid admin credentials" });
    }
  } catch (error) {
    console.error("Admin Login Error:", error);
    res.status(500).json({ msg: "Server Error" });
  }
};

export { loginUser, registerUser, adminLogin };
