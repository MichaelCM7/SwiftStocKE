import nodemailer from 'nodemailer';
import {SMTP_USER, SMTP_PASS} from '../config/env.js'

const transporter = nodemailer.createTransport({
  host: "smtp.google.com",
  port: 587,
  secure: false, // use STARTTLS (upgrade connection to TLS after connecting)
  family: 4,
  auth: {
    user: SMTP_USER,
    pass: SMTP_PASS,
  },
});

export default transporter;