import Retailer from "../models/retailer.model.js";
import mongoose from "mongoose";
import bcrypt, { genSalt } from "bcryptjs";
import jwt from "jsonwebtoken";
import { JWT_SECRET, JWT_EXPIRES_IN, OTP_SECRET, OTP_EXPIRES_IN } from "../config/env.js";
import transporter from "../config/mailer.js";
import { otpGenerator } from "../utils/otpGenerator.js";

export async function signup(req, res, next) {
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

    const combinedKey = OTP_SECRET + otp;
    const otpToken = jwt.sign({email: email}, combinedKey, {expiresIn: OTP_EXPIRES_IN});

    req.otp = otp;

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
      message: `Signed up successfully. OTP: ${otp}`,
      token: token,
      data: newRetailer
    });

  } catch (error) {
    session.abortTransaction();
    session.endSession();
    next(error);
  }
}

export async function signin(req, res, next) {
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

    session.commitTransaction();
    session.endSession();
    
    res.status(200).json({
      success: true,
      message: "Signed in successfully",
      token: token,
      data: retailer
    });
    
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    next(error);
  }
}

export async function signout(req, res, next) {
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

export async function forgotPassword(req, res, next) {
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

    const otpToken = jwt.sign({email: email}, combinedKey, {expiresIn: OTP_EXPIRES_IN});

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

export async function verifyOtp(req, res, next) {
  try{
    const {otpToken} = req.cookies;
    const {otp, purpose} = req.body;

    if (!otpToken) {
      const error = new Error("OTP Token is required. Unauthorized Action");
      error.statusCode = 400;
      throw error;
    }

    if (!otp) {
      const error = new Error("OTP is required");
      error.statusCode = 400;
      throw error;
    }

    const decodedOTP = jwt.verify(otpToken, OTP_SECRET + otp);

    if (!decodedOTP) {
      const error = new Error("Invalid OTP");
      error.statusCode = 400;
      throw error;
    }

    const email = decodedOTP.email;

    const retailer = await Retailer.findOne({
      email: email
    });

    if (!retailer) {
      const error = new Error("Retailer Account Doesn't exist");
      error.statusCode = 400;
      throw error;
    }

    res.clearCookie("otpToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    const emailToken = jwt.sign({email: email}, OTP_SECRET, {expiresIn: "10m"});
    
    res.cookie("emailToken", emailToken, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 10 * 60 * 1000, // 10 minutes
    });
    
    // req.email = email;
    
    res.status(200).json({
      success: true,
      purpose: purpose,
      message: "OTP verified successfully",
    });

  } catch (error) {
    next(error);
  }
}

export async function resetPassword(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try{
    const emailToken = req.cookies.emailToken;
    const password = req.body.password;

    const decodedEmail = jwt.verify(emailToken, OTP_SECRET);
    const email = decodedEmail.email;

    console.log('Email: ', email);
    console.log('Password: ', password);
    
    if (!email) {
      const error = new Error("Email is required. Unauthorized action");
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

    const salt = await bcrypt.genSalt(10);
    const newHashedPassword = await bcrypt.hash(password, salt);
    
    const updatedRetailer = await Retailer.findOneAndUpdate({
      email: email
    }, {
      $set: {password: newHashedPassword}
    }, {returnDocument: "after", runValidators: true}).session(session);

    if (!updatedRetailer) {
      const error = new Error("Failed to update password");
      error.statusCode = 400;
      throw error;
    }

    res.clearCookie("emailToken", {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
    });

    session.commitTransaction();
    session.endSession();

    res.status(200).json({
      success: true,
      message: "Password reset successfully",
      data: updatedRetailer
    });
    
  } catch (error) {
    session.abortTransaction();
    session.endSession();
    next(error);
  }
}
