import History from "../models/history.model.js";
import dayjs from "dayjs";

export async function addHistory() {
  try {
    const retailerID = req.retailer._id;
    const {itemName, change} = req.body;
    const dateTime = dayjs().format('DD-MM-YYYY HH:mm:ss');

    if (!retailerID) {
      const error = new Error("Unauthorized");
      error.statusCode = 400;
      throw error;
    }

    if (!itemName) {
      const error = new Error("No item");
      error.statusCode = 400;
      throw error;
    }

    if (!change) {
      const error = new Error("No change found");
      error.statusCode = 400;
      throw error;
    }

    const history = await History.create({
      retailer: retailerID,
      itemName: itemName,
      change: change,
      dateTime: dateTime
    });

    res.status(201).json({
      success: true,
      message: "History Added Successfully",
      history: history
    });
  }
  catch (error) {
    next(error);
  }
}

export async function getHistoryByRetailerID() {
  try {
    const retailerID = req.retailer._id;

    if (!retailerID) {
      const error = new Error("Unauthorized");
      error.statusCode = 403;
      throw error;
    }

    const history = await History.find({retailerID});

    if (!history && history.length === 0) {
      const error = new Error("No Sales History Found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "History Found Successfully",
      history: history
    });
  }
  catch (error) {
    next(error);
  }
}