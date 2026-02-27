import jwt from 'jsonwebtoken';
import { env } from '../config/env.js';
const authMiddleware = async (req, res, next) => {
  try {
    // step 1: check token exists
    const header = req.headers.authorization;
    if (!header) {
      return res.status(400).json({
        message: "Please Login",
      });
    }

    // step 2: check Bearer format
    if (!header.startsWith("Bearer ")) {
      return res.status(400).json({
        message: "Invalid token format",
      });
    }

    // step 3: verify token
    const token = header.split(" ")[1];
    const verifyToken = jwt.verify(token, env.jwt.accessSecret);

    // step 4: attach user to req, call next()
    req.user = verifyToken;
    next();

  } catch (error) {
    console.log("Authentication Error", error);
    return res.status(500).json({
      succsess: false,
      message: "Authentication failed !",
    });
  }
};
export default authMiddleware;
