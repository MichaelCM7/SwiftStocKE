import Retailer from "../models/retailer.model.js";
import mongoose from "mongoose";
import bcrypt, { genSalt } from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN } from "../utils/config.js";
import transporter from "../config/mailer.js";
import { otpGenerator } from "../utils/otpGenerator.js";
import { OTP_SECRET } from "../config/env.js";

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

    const newRetailer = await Retailer.create({
      email: email,
      password: hashedPassword,
    });

    // Creating JWT token
    const token = jwt.sign({retailerId: newRetailer._id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});

    // Setting JWT token in Cookie
    res.cookie("token", token, {
      httpOnly: true, 
      secure: true, 
      sameSite: "strict", 
      maxAge: 15 * 60 * 1000, // 15 minutes for now 24 hours actually 24 * 60 * 60 * 1000 
    });

    const otp = otpGenerator();
    
    const mailOptions = {
      from: 'SwiftStock@noreply.com',
      to: email,
      subject: "Account Verification",
      text: `Hello ${email},
      Your verification code is: 
      ${otp}
      This code will expire in 15 minutes.
      If you did not request this verification code, please ignore this email.
      Thank you`,
      html: `
      <p>Hello ${email},</p>
      <p>Your verification code is:</p>
      <p><b>${otp}</b></p>
      <p>This code will expire in 15 minutes.</p>
      <p>If you did not request this verification code, please ignore this email.</p>
      <p>Thank you</p>
      `,
    }
    
    await transporter.sendMail(mailOptions);

    req.otp = otp;
    
    res.status(200).json({
      success: true,
      message: `Signed up successfully. OTP: ${otp}`,
      token: token,
      data: newRetailer
    });
    session.commitTransaction();
    session.endSession();

  } catch (error) {
    session.abortTransaction();
    session.endSession();
    next(error);
  }
}

export const signin = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try{
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

    const retailer = await Retailer.findOne({
      email: email
    }).session(session);

    if (!retailer) {
      const error = new Error("Retailer Account Doesn't exist");
      error.statusCode = 400;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, retailer.password);

    if (!isPasswordValid) {
      const error = new Error("Invalid Password");
      error.statusCode = 400;
      throw error;
    }

    const token = jwt.sign({retailerId: retailer.id}, JWT_SECRET, {expiresIn: JWT_EXPIRES_IN});
    
    res.cookie("token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 24 * 60 * 60 * 1000,
    });
    
    res.status(200).json({
      success: true,
      message: "Signed in successfully",
      token: token,
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

export const signout = async (req, res, next) => {
  try{
    res.clearCookie("token", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    res.status(200).json({
      success: true,
      message: "Signed out successfully"
    });
  }
  catch(error) {
    next(error)
  }
}

export const forgotPassword = async (req, res) => {
  const session = await mongoose.startSession();
  session.startTransaction();
  try{
    const {email} = req.body;

    if (!email) {
      const error = new Error("Email is required");
      error.statusCode = 400;
      throw error;
    }

    const retailer = await Retailer.findOne({
      email: email
    }).session(session);

    if (!retailer) {
      const error = new Error("Retailer Account Doesn't exist");
      error.statusCode = 400;
      throw error;
    }

    const otp = otpGenerator();

    const mailOptions = {
      from: 'SwiftStock@noreply.com',
      to: email,
      subject: "Account Password Reset Verification",
      text: `Hello ${email},
      Your verification code is: 
      ${otp}
      This code will expire in 1 minute.
      If you did not request this verification code, please ignore this email.
      Thank you`,
      html: `
      <p>Hello ${email},</p>
      <p>Your verification code is:</p>
      <p><b>${otp}</b></p>
      <p>This code will expire in 1 minute.</p>
      <p>If you did not request this verification code, please ignore this email.</p>
      <p>Thank you</p>
      `,
    }
    
    await transporter.sendMail(mailOptions);

    const combinedKey = OTP_SECRET + otp;

    const otpToken = jwt.sign({email: email, otp: otp}, combinedKey, {expiresIn: "1m"});

    res.cookie("otpToken", otpToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 1 * 60 * 1000, // 1 minute
    });

    session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: `OTP sent successfully to ${email}. OTP: ${otp}`
    }); 
  }
  catch(error) {
    session.abortTransaction();
    session.endSession();
    next(error);
  }
}

export const resetPassword = async (req, res) => {
  res.json({message: "Reset Password"})
}

export const verifyOtp = async (req, res) => {
  res.json({message: "Verify OTP"})
}