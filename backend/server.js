import express from "express";
import { PORT } from "./config/env.js";

const app = express();
// External Middlewares
app.use(express.json());

app.get("/", (req, res) => {
  res.json({ message: "Inventory Backend" });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});