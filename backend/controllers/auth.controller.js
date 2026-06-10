import Retailer from "../models/retailer.model.js";
import bcrypt from "bcryptjs";

export const signup = async (req, res) => {
  res.json({message: "Signup"})
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