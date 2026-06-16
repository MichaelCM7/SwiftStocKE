import express from "express";
import { getSalesByRetailerID, recordNewSale, getSaleBySaleID } from "../controllers/sale.controller.js";

const salesRoutes = express.Router();

salesRoutes.post("/record", recordNewSale);

salesRoutes.get("/", getSalesByRetailerID);

salesRoutes.get("/:saleID", getSaleBySaleID);

export default salesRoutes;