import express from "express";
import { PORT } from "./config/env.js";
import connectDB from "./database/dbconnection.js";

const app = express();
// External Middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Inventory Backend" });
});



app.listen(PORT, async () => {
  console.log(`Server is running on http://localhost:${PORT}`);
  await connectDB();
});