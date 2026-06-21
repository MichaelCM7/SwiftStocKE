import express from "express";
import { getHistoryByRetailerID } from "../controllers/history.controller.js";

const historyRoutes = express.Router();

historyRoutes.get("/", getHistoryByRetailerID);

export default historyRoutes;