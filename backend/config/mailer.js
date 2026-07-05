import nodemailer from 'nodemailer';
import {SMTP_USER, SMTP_PASS} from '../config/env.js'

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  // In case of issues with nodemailer uncomment the line below
  family: 4, 
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
  connectionTimeout: 10000,
});

export default transporter;