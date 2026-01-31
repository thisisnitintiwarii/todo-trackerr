import User from "../models/User.model.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";

/* ================= SIGNUP ================= */
export const signup = async (req, res) => {
  try {
    const { fullName, email, pass } = req.body;

    if (!fullName || !email || !pass) {
      return res.status(400).json({
        message: "Enter all the essential details",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({
        message: "User with this email already exists",
      });
    }

    const hashedPass = await bcrypt.hash(pass, 10);

    const newUser = await User.create({
      fullName,
      email,
      password: hashedPass,
    });

    const token = jwt.sign(
      { userId: newUser._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(201).json({
      message: "User created successfully",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error in signup",
    });
  }
};

/* ================= LOGIN ================= */
export const login = async (req, res) => {
  try {
    const { email, pass } = req.body;

    if (!email || !pass) {
      return res.status(400).json({
        message: "Email and password are required",
      });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const isMatch = await bcrypt.compare(pass, user.password);
    if (!isMatch) {
      return res.status(401).json({
        message: "Invalid email or password",
      });
    }

    const token = jwt.sign(
      { userId: user._id },
      process.env.JWT_SECRET_KEY,
      { expiresIn: "7d" }
    );

    res.cookie("jwt", token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "strict",
    });

    return res.status(200).json({
      message: "Login successful",
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      message: "Error in login",
    });
  }
};

/* ================= LOGOUT ================= */
export const logout = async (req, res) => {
  try {
    res.clearCookie("jwt");
    return res.status(200).json({
      message: "Logout successful",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error in logout",
    });
  }
};

/* ================= ME ================= */
export const me = async (req, res) => {
  try {
    const token = req.cookies.jwt; 

    if (!token) {
      return res.status(401).json({ loggedIn: false });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET_KEY);

    return res.status(200).json({
      loggedIn: true,
      userId: decoded.userId,
    });
  } catch (error) {
    return res.status(401).json({ loggedIn: false });
  }
};
