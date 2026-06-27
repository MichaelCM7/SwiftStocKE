import express from "express";
import { signup, signin, signout, forgotPassword, resetPassword, verifyOtp, resendOTP } from "../controllers/auth.controller.js";

const authRoutes = express.Router();

authRoutes.post('/signup', signup);

authRoutes.post('/signin', signin);

authRoutes.post('/signout', signout);

authRoutes.post('/forgot-password', forgotPassword);

authRoutes.post('/reset-password', resetPassword);

authRoutes.post('/verify-otp', verifyOtp);

authRoutes.post('/resend-otp', resendOTP);

export default authRoutes;