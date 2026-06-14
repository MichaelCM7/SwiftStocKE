import dotenv from 'dotenv';

dotenv.config();

export const {
  PORT,
  MONGO_URI,
  SMTP_USER,
  SMTP_PASS,
  JWT_SECRET,
  JWT_EXPIRES_IN,
} = process.env;
