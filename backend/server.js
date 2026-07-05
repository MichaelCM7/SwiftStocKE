import express from "express";
// import dayjs from "dayjs";
import { PORT } from "./config/env.js";
// Database
import connectDB from "./database/dbconnection.js";
// Nodemailer
// import transporter from "./config/mailer.js";
// External middlewares
import cookieParser from "cookie-parser";
import { urlencoded } from "express";
// API Routes
import authRoutes from "./routes/auth.routes.js";
import productRoutes from "./routes/product.routes.js";
import salesRoutes from "./routes/sale.routes.js";
import historyRoutes from "./routes/history.routes.js";
import analyticsRoutes from "./routes/analytics.routes.js";
// API Middlewares
import authorize from "./middlewares/authorization.middleware.js";
import errorHandler from "./middlewares/error.middleware.js";
// Deployment
import path from 'path';
import { fileURLToPath } from 'url';

const app = express();

// External Middlewares
app.use(express.json());
app.use(urlencoded({ extended: false }));
app.use(cookieParser());

// API Routes
app.use('/api/auth/', authRoutes);
app.use('/api/products/', authorize, productRoutes);
app.use('/api/sales/', authorize, salesRoutes);
app.use('/api/history/', authorize, historyRoutes);
app.use('/api/analytics/', authorize, analyticsRoutes);

// API Middlewares
app.use(errorHandler);

// Deployment
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.static(path.join(__dirname, '../frontend/dist')));

app.get('/*splat', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/dist/index.html'));
});

// Server Start
app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB();
});

// console.log(dayjs().format('DD-MM-YYYY HH:mm:ss'));

// Test Nodemailer transporter (Uncomment When Sending Emails)
// try {
//   await transporter.verify();
//   console.log("Server is ready to take our messages");
// } catch (err) {
//   console.error("Verification failed:", err);
// }