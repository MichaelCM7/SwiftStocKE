import express from "express";
import { signup, signin, signout, forgotPassword, resetPassword, verifyOtp } from "../controllers/auth.controller.js";

const authRouter = express.Router();

authRouter.post('/signup', signup);

authRouter.post('/signin', signin);

authRouter.post('/signout', signout);

authRouter.post('/forgot-password', forgotPassword);

authRouter.post('/reset-password', resetPassword);

authRouter.post('/verify-otp', verifyOtp);

export default authRouter;