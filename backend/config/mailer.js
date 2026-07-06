import nodemailer from 'nodemailer';
// import {SMTP_USER, SMTP_PASS} from '../config/env.js'

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465, // 587 // 465
  secure: true, // use STARTTLS (upgrade connection to TLS after connecting)
  // In case of issues with nodemailer uncomment the line below
  family: 4, 
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
  connectionTimeout: 30000,
});

export default transporter;