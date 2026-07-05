import History from "../models/history.model.js";

export async function getHistoryByRetailerID(req, res, next) {
  try {
    const retailerID = req.retailer._id;

    if (!retailerID) {
      const error = new Error("Unauthorized");
      error.statusCode = 403;
      throw error;
    }

    const history = await History.find({
      retailer: retailerID
    }).sort({ createdAt: -1 });

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