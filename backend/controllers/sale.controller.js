import Sale from "../models/sale.model.js";
import Product from "../models/product.model.js";
import mongoose from "mongoose";
import dayjs from "dayjs";

export async function recordNewSale(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const retailerID = req.retailer._id;
    const { items } = req.body;
    const dateTime = dayjs().format('DD-MM-YYYY HH:mm:ss');

    if (!retailerID) {
      const error = new Error("Unauthorized");
      error.statusCode = 400;
      throw error;
    }

    if (!items && items.length === 0) {
      const error = new Error("No items");
      error.statusCode = 400;
      throw error;
    }

    const sales = await Sale.find({
      retailer: retailerID
    });

    const saleNameCounter = () => {
      let counter = sales.length + 1;
      return `Sale #${counter}`;
    }

    const products = await Product.find({
      retailer: retailerID
    });

    if (products.length === 0) {
      const error = new Error("No Products Found");
      error.statusCode = 404;
      throw error;
    }

    items.map(async (item) => {
      const product = await Product.findById(item.itemId);
      // console.log(product);

      if (!product) {
        const error = new Error("Product Not Found");
        error.statusCode = 404;
        throw error;
      }

      if (product.quantity < item.quantity) {
        const error = new Error("Insufficient Quantity");
        error.statusCode = 400;
        throw error;
      }

      product.quantity -= item.quantity;

      // Add update Sales Count
      product.salesCount += item.quantity;

      await product.save();
    })

    // fix items if it breaks
    const sale = await Sale.create({
      retailer: retailerID,
      saleName: saleNameCounter(),
      items: items,
      dateTime: dateTime
    });

    await session.commitTransaction();

    res.status(201).json({
      success: true,
      message: "Sale Recorded Successfully",
      sale: sale
    });

  }
  catch (error) {
    next(error);
  }
}

export async function getSalesByRetailerID(req, res, next) {
  try {
    const retailerID = req.retailer._id;

    if (!retailerID) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    const sales = await Sale.find({
      retailer: retailerID
    });

    if (!sales && sales.length === 0) {
      const error = new Error("No Sales Found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Sales Fetched Successfully",
      sales: sales
    });

  }
  catch (error) {
    next(error);
  }
}

export async function getSaleBySaleID(req, res, next) {
  try {
    const retailerID = req.retailer._id;
    const { saleID } = req.params;

    if (!retailerID) {
      const error = new Error("Unauthorized");
      error.statusCode = 401;
      throw error;
    }

    if (!saleID) {
      const error = new Error("No Sale ID");
      error.statusCode = 400;
      throw error;
    }

    const sale = await Sale.findOne({
      retailer: retailerID,
      _id: saleID
    });

    if (!sale) {
      const error = new Error("No Sale Found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "Sale Fetched Successfully",
      sale: sale
    });

  }
  catch (error) {
    next(error);
  }
}

