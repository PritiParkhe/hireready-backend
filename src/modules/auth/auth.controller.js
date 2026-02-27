import { User } from "../../models/user.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import { env } from "../../config/env.js";

export const register = async (req, res) => {
  try {
    // step 1 : request credentials from body
    const { name, email, password } = req.body;

    // step 2: Check credential is provided
    if (!name || !email || !password) {
      return res.status(400).json({
        message: "Please provide credentials",
      });
    }

    // step 3: check if user exist alredy
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(401).json({
        message: "User already exist",
      });
    }

    // step 4 : if not then hash password with bcrypt
    const hashedPassword = await bcrypt.hash(password, 10);

    // step 5: create user in db and save hashedpassword
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // step 6: generate token using jwt
    const token = jwt.sign({ userId: user._id }, env.jwt.accessSecret, {
      expiresIn: "7d",
    });

    return res.status(200).json({
      success: true,
      message: "User register  successfully !",
      data: {
        name,
        email,
        token,
      },
    });
  } catch (error) {
    console.log("register error", error);
    return res.status(500).json({
      success: false,
      message: "User registration failed !",
    });
  }
};

export const login = async (req, res) => {
  try {
    // step 1: get credentials from request body
    const { email, password } = req.body;

    //step 2: validate credential
    if (!email || !password) {
      return res.status(401).json({
        message: "Please provide credentials",
      });
    }
    //step 3: check user registered
    const existingUser = await User.findOne({ email }).select("+password");
    if (!existingUser) {
      return res.status(400).json({
        message: "Please register",
      });
    }

    //step 4: compare password with bcrypt
    const isPasswordValid = await bcrypt.compare(
      password,
      existingUser.password,
    );
    if (!isPasswordValid) {
      return res.status(401).json({
        message: "Please provide valid credentials",
      });
    }
    //step 5: token creation
    const token = jwt.sign({ userId: existingUser._id }, env.jwt.accessSecret, {
      expiresIn: "7d",
    });

    //step 6: return token
    return res.status(200).json({
      success: true,
      message: "User LoggedIn Successfully !",
      token,
    });
  } catch (error) {
    console.log("Login error", error);
    return res.status(500).json({
      success: false,
      message: "User Login Failed",
    });
  }
};
