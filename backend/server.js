import express from "express";
import { PORT } from "./config/env.js";
// Database
import connectDB from "./database/dbconnection.js";
// Nodemailer
import transporter from "./config/mailer.js";
// External middlewares
import cookieParser from "cookie-parser";
import { urlencoded } from "express";
// API Routes
import authRoutes from "./routes/auth.routes.js";

const app = express();
// External Middlewares
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// API Routes
app.use('/api/auth/', authRoutes);


app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB();
});

// Test Nodemailer transporter
try {
  await transporter.verify();
  console.log("Server is ready to take our messages");
} catch (err) {
  console.error("Verification failed:", err);
}