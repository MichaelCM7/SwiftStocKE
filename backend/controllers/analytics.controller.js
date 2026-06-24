import Analytics from "../models/analytics.model.js";

export async function getAnalyticsByRetailerID(req, res, next) {
  try {
    const retailerID = req.retailer._id;

    if (!retailerID){
      const error = new Error("Unauthorized");
      error.statusCode = 403;
      throw error;
    }

    const analytics = await Analytics.find({ retailer: retailerID });

    if (!analytics && analytics.length === 0){
      const error = new Error("No Analytics Found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Analytics Found Successfully",
      analytics: analytics
    });
    
  } catch (error) {
    next(error);
  }
};