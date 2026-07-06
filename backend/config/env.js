import dotenv from 'dotenv';

dotenv.config();

export const PORT = process.env.PORT;
export const MONGO_URI = process.env.MONGO_URI;

export const SMTP_USER = process.env.SMTP_USER;
export const SMTP_PASS = process.env.SMTP_PASS;

export const JWT_SECRET = process.env.JWT_SECRET;
export const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN;

export const OTP_SECRET = process.env.OTP_SECRET;
export const OTP_EXPIRES_IN = process.env.OTP_EXPIRES_IN;

export const EMAIL_TOKEN_SECRET = process.env.EMAIL_TOKEN_SECRET;

// export const {
//   PORT,
//   MONGO_URI,
//   SMTP_USER,
//   SMTP_PASS,
//   JWT_SECRET,
//   JWT_EXPIRES_IN,
//   OTP_SECRET,
//   OTP_EXPIRES_IN,
//   EMAIL_TOKEN_SECRET
// } = process.env;
