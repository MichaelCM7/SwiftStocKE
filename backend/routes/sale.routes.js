import express from "express";
import { getSalesByRetailerID, recordNewSale, viewSale } from "../controllers/sale.controller.js";

const salesRoutes = express.Router();

salesRoutes.post("/record", recordNewSale);

salesRoutes.get("/", getSalesByRetailerID);

salesRoutes.get("/:saleID", viewSale);

export default salesRoutes;