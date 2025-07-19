import jwt from "jsonwebtoken";

const adminAuth = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ msg: "No token provided, access denied" });
    }

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Check if the token belongs to the admin
    if (decoded.id !== "admin") {
      return res.status(403).json({ msg: "Access denied. Not an admin." });
    }

    next();
  } catch (error) {
    console.error("Admin Auth Error:", error.message);
    res.status(401).json({ msg: "Invalid or expired token" });
  }
};

export default adminAuth;
