import express from "express";
import { getAnalyticsByRetailerID } from "../controllers/analytics.controller.js";

const analyticsRoutes = express.Router();

analyticsRoutes.get("/", getAnalyticsByRetailerID);

export default analyticsRoutes;