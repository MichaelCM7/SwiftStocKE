import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.js";
import Retailer from "../models/retailer.model.js";

export default async function authorize(req, res, next) {
  try {
    const token = req.cookies.token;

    if (!token) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    const decodedToken = jwt.verify(token, JWT_SECRET);

    if (!decodedToken) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    const retailer = await Retailer.findById(decodedToken.retailerId);

    if (!retailer) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    req.retailer = retailer;

    next();

  } catch (error) {
    next(error);
  }
}