import express from "express";
import { addHistory, getHistoryByRetailerID } from "../controllers/history.controller.js";

const historyRoutes = express.Router();

historyRoutes.post("/add", addHistory);

historyRoutes.get("/", getHistoryByRetailerID);

export default historyRoutes;