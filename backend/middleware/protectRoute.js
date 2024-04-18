import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;
    if (!token) {
      return res
        .status(401)
        .json({ error: "Unauthorized - no token provided" });
    }
    const decoded = jwt.verify(token, process.env.JWT_SECRETE);

    if (!decoded) {
      return res.status(401).json({ error: "Unauthorized - invalid token" });
    }
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(404).json({ error: "user not found" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log("Error in protectedRoute middleware: ", error.message);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

export default protectRoute;
