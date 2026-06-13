import Retailer from "../models/retailer.model.js";
import mongoose from "mongoose";
import bcrypt, { genSalt } from "bcryptjs";
import jwt from "jsonwebtoken";

export const signup = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {email, password} = req.body;

    if (!email) {
      const error = new Error("Email is required");
      error.statusCode = 400;
      throw error;
    }

    if (!password) {
      const error = new Error("Password is required");
      error.statusCode = 400;
      throw error;
    }

    if (password.length < 8) {
      const error = new Error("Password must be at least 8 characters long");
      error.statusCode = 400;
      throw error;
    }

    const existingRetailer = await Retailer.findOne({
      email: email
    }).session(session);

    if (existingRetailer) {
      const error = new Error("Retailer already exists");
      error.statusCode = 400;
      throw error;
    }

    const salt = await genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const retailer = await Retailer.create({
      email: email,
      password: hashedPassword,
    });

    res.status(200).json({
      success: true,
      message: "Signed up successfully",
      data: retailer
    });
    session.commitTransaction();
    session.endSession();

  } catch (error) {
    session.abortTransaction();
    session.endSession();
    next(error);
  }
}

export const signin = async (req, res) => {
  res.json({message: "Signin"})
}

export const signout = async (req, res) => {
  res.json({message: "Signout"})
}

export const forgotPassword = async (req, res) => {
  res.json({message: "Forgot Password"})
}

export const resetPassword = async (req, res) => {
  res.json({message: "Reset Password"})
}

export const verifyOtp = async (req, res) => {
  res.json({message: "Verify OTP"})
}