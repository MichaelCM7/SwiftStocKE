import Product from "../models/product.model.js";
import History from "../models/history.model.js";
import Analytics from "../models/analytics.model.js";
import Retailer from "../models/retailer.model.js";
import transporter from "../config/mailer.js";
import dayjs from "dayjs";
import mongoose from "mongoose";

export async function addItem(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const {itemName, quantity, lowStockThreshold} = req.body;
    const retailerID = req.retailer._id;
    const dateTime = dayjs().format('DD-MM-YYYY HH:mm:ss');

    // console.log(`ItemNam: ${itemName}, Quantity: ${quantity}, LowStock: ${lowStockThreshold}`)
    // console.log(`RetailerID: ${retailerID}`)

    if (!itemName) {
      const error = new Error('Item name is required.');
      error.status = 400;
      throw error;
    }

    if (!quantity) {
      const error = new Error('Quantity is required.');
      error.status = 400;
      throw error;
    }

    if (!lowStockThreshold) {
      const error = new Error('Low stock threshold is required.');
      error.status = 400;
      throw error;
    }

    if (!retailerID) {
      const error = new Error('Unauthorized.');
      error.status = 401;
      throw error;
    }

    let productStatus;

    if (quantity === 0) {
      productStatus = "Out of Stock"
    } else if (quantity <= lowStockThreshold) {
      productStatus = "Low Stock"
    } else if (quantity <= lowStockThreshold * 4) {
      productStatus = "Moderate Stock"
    } else {
      productStatus = "Good Stock"
    }

    const product = await Product.create([{
      itemName,
      quantity,
      status: productStatus,
      lowStockThreshold,
      retailer: retailerID
    }], {session});

    const history = await History.create([{
      retailer: retailerID,
      itemName: itemName,
      change: `Added new item (+${quantity})`,
      dateTime: dateTime
    }], {session});

    if (!history) {
      const error = new Error("Failed to log history");
      error.statusCode = 500;
      throw error;
    }

    const productsList = await Product.find({ retailer: retailerID }).session(session);
    let totalQuantity = 0;
    productsList.forEach((product) => {
      totalQuantity += product.quantity;
    });

    const timeNow = new Date();
    const analytics = await Analytics.findOne({ retailer: retailerID }).session(session);

    if (!analytics) {
      await Analytics.create([
        {
          retailer: retailerID,
          data: [
            { 
              totalQuantity: totalQuantity, 
              dateTime: timeNow 
            }
          ]
        }
      ], {session});
    } else {
      await Analytics.findOneAndUpdate(
        { retailer: retailerID },
        {
          $push: {
            data: {
              $each: [
                {
                  totalQuantity: totalQuantity, 
                  dateTime: timeNow 
                }
              ],
              $sort: { dateTime: 1 },
              $slice: -30
            }
          }
        },
        { returnDocument: "after", runValidators: true, session }
      );
    }

    // console.log(analytics);

    await session.commitTransaction();
    await session.endSession();

    res.status(201).json({ 
      success: true, 
      message: "Product added successfully",
      data: {product} 
    });
  }
  catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
}

export async function getItemsByRetailerID(req, res, next) {
  try {
    const retailerId = req.retailer._id;

    if (!retailerId) {
      const error = new Error('Unauthorized.');
      error.status = 401;
      throw error;
    }

    const products = await Product.find({ retailer: retailerId });

    if (!products) {
      const error = new Error('No products found.');
      error.status = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'Products fetched successfully',
      products: products
    })
  }
  catch (error) {
    next(error);
  }
}

export async function getItemByProductID (req, res, next) {
  try {
    const retailerID = req.retailer._id;
    const productID = req.params.productID;

    if (!retailerID) {
      const error = new Error('Unauthorized');
      error.statusCode = 401;
      throw error;
    }

    if (!productID) {
      const error = new Error('No item selected');
      error.statusCode = 404;
      throw error;
    }

    const product = await Product.findOne({_id: productID, retailer: retailerID})

    if (!product) {
      const error = new Error('Item not found.');
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: 'Item fetched successfully',
      product: product
    })

  } catch (error) {
    next(error)
  }
}

export async function editItem(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { productID } = req.params;
    const { itemName, quantity, lowStockThreshold } = req.body;
    const retailerID = req.retailer._id;
    const dateTime = dayjs().format('DD-MM-YYYY HH:mm:ss');

    if (!productID) {
      const error = new Error("No item selected.");
      error.statusCode = 404;
      throw error;
    }

    if (!retailerID) {
      const error = new Error("Unauthorized.")
      error.statusCode = 401;
      throw error;
    }

    if (!itemName) {
      const error = new Error("Item name is required");
      error.statusCode = 400;
      throw error;
    }

    if (!quantity) {
      const error = new Error("Quantity is required");
      error.statusCode = 400;
      throw error;
    }

    if (!lowStockThreshold) {
      const error = new Error("Low stock threshold is required");
      error.statusCode = 400;
      throw error;
    }

    const existingProduct = await Product.findOne({
      _id: productID,
      retailer: retailerID
    }).session(session);

    if (!existingProduct) {
      const error = new Error("Item not found");
      error.statusCode = 404;
      throw error;
    }

    const retailer = await Retailer.findById({ _id: retailerID }).session(session);

    if (!retailer) {
      const error = new Error("Retailer not found");
      error.statusCode = 404;
      throw error;
    }

    let productStatus;
    let mailOptions;

    if (quantity === 0) {
      productStatus = "Out of Stock";

      mailOptions = {
        from: 'SwiftStock@noreply.com',
        to: retailer.email,
        subject: `Inventory Alert: Product ${existingProduct.itemName} is now Out of Stock.`,
        text: `Hello Retailer,
        Your product ${existingProduct.itemName} is now Out of Stock.
        Please restock your product as soon as possible.
        Thank you`,
        html: `
          <p>Hello Retailer,</p>
          <p>Your product ${existingProduct.itemName} is now Out of Stock.</p>
          <p>Please restock your product as soon as possible.</p>
          <p>Thank you</p>
        `
      };

      await transporter.sendMail(mailOptions);

    } else if (quantity <= lowStockThreshold) {
      productStatus = "Low Stock";

      mailOptions = {
        from: 'SwiftStock@noreply.com',
        to: retailer.email,
        subject: `Inventory Alert: Product ${existingProduct.itemName} is Low on Stock.`,
        text: `Hello Retailer,
        Your product ${existingProduct.itemName} is Low on Stock.
        Please restock your product as soon as possible.
        Thank you`,
        html: `
        <p>Hello Retailer,</p>
        <p>Your product ${existingProduct.itemName} is Low on Stock.</p>
        <p>Please restock your product as soon as possible.</p>
        <p>Thank you</p>
        `
      };

      await transporter.sendMail(mailOptions);

    } else if (quantity <= lowStockThreshold * 4) {
      productStatus = "Moderate Stock";
    } else {
      productStatus = "Good Stock"
    }

    const updatedProduct = await Product.findOneAndUpdate(
      {_id: productID},
      {itemName, quantity, status: productStatus, lowStockThreshold},
      {returnDocument: "after", runValidators: true, session}
    );

    if (!updatedProduct) {
      const error = new Error("Failed to update item.");
      error.statusCode = 500;
      throw error;
    }

    let message = "";
    const diffQuantity = quantity - existingProduct.quantity;
    const diffLowThreshold = lowStockThreshold - existingProduct.lowStockThreshold;

    if (existingProduct.itemName !== itemName && existingProduct.lowStockThreshold !== lowStockThreshold && existingProduct.quantity !== quantity) {
      message = "Name, Quantity, and Low Stock Threshold Updated";
    } else if (existingProduct.lowStockThreshold !== lowStockThreshold && existingProduct.quantity !== quantity) {
      message = "Low Stock Threshold and Quantity Updated";
    } else if (existingProduct.itemName !== itemName && existingProduct.quantity !== quantity) {
      message = "Name and Quantity Updated";
    } else if (existingProduct.itemName !== itemName && existingProduct.lowStockThreshold !== lowStockThreshold) {
      message = "Name and Low Stock Threshold Updated";
    } else if (existingProduct.itemName !== itemName) {
      message = `Name changed to ${itemName}`;
    } else if (existingProduct.quantity !== quantity) {
      message = `Stock Updated (${diffQuantity >= 0 ? "+" : ""}${diffQuantity})`;
    } else if (existingProduct.lowStockThreshold !== lowStockThreshold) {
      message = `Low Stock Threshold Updated (${diffLowThreshold >= 0 ? "+" : ""}${diffLowThreshold})`;
    }

    const history = await History.create([{
      retailer: retailerID,
      itemName: existingProduct.itemName,
      change: message,
      dateTime: dateTime
    }], {session});

    if (!history) {
      const error = new Error("Failed to log history");
      error.statusCode = 500;
      throw error;
    }

    const productsList = await Product.find({ retailer: retailerID }).session(session);
    let totalQuantity = 0;
    productsList.forEach((product) => {
      totalQuantity += product.quantity;
    });

    const timeNow = new Date();

    const analytics = await Analytics.findOneAndUpdate(
      { retailer: retailerID },
      {
        $push: {
          data: {
            $each: [{ totalQuantity: totalQuantity, dateTime: timeNow }],
            $sort: { dateTime: 1 },
            $slice: -30
          }
        }
      }, {returnDocument: "after", runValidators: true, session});

    // console.log(analytics);

    await session.commitTransaction();
    await session.endSession();

    res.status(200).json({
      success: true,
      message: "Item updated successfully",
      product: updatedProduct
    });

  }
  catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
}

export async function deleteItem(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const { productID } = req.params;
    const retailerID = req.retailer._id;
    const dateTime = dayjs().format('DD-MM-YYYY HH:mm:ss');

    if (!productID) {
      const error = new Error("No item selected.");
      error.statusCode = 404;
      throw error;
    }

    if (!retailerID) {
      const error = new Error("Unauthorized.")
      error.statusCode = 401;
      throw error;
    }

    const existingProduct = await Product.findOne({
      _id: productID,
      retailer: retailerID
    }).session(session);

    if (!existingProduct) {
      const error = new Error("Item not found.");
      error.statusCode = 404;
      throw error;
    }

    const deletedProduct = await Product.findOneAndDelete({
      _id: productID,
      retailer: retailerID
    }, {session});

    if (!deletedProduct) {
      const error = new Error("Failed to delete product.");
      error.statusCode = 500;
      throw error;
    }

    const history = await History.create([{
      retailer: retailerID,
      itemName: existingProduct.itemName,
      change: `Deleted item (-${existingProduct.quantity})`,
      dateTime: dateTime
    }], {session});

    if (!history) {
      const error = new Error("Failed to log history");
      error.statusCode = 500;
      throw error;
    }

    const productsList = await Product.find({ retailer: retailerID }).session(session);
    let totalQuantity = 0;

    productsList.forEach((product) => {
      totalQuantity += product.quantity;
    });

    const timeNow = new Date();

    const analytics = await Analytics.findOneAndUpdate(
      { retailer: retailerID },
      {
        $push: {
          data: {
            $each: [{ totalQuantity: totalQuantity, dateTime: timeNow }],
            $sort: { dateTime: 1 },
            $slice: -30
          }
        }
      }, {returnDocument: "after", runValidators: true, session});

    // console.log(analytics);

    await session.commitTransaction();
    await session.endSession();

    res.status(200).json({
      success: true,
      message: "Item deleted successfully",
      deletedProduct: deletedProduct
    });
  }
  catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
}

export async function restockItem(req, res, next) {
  const session = await mongoose.startSession();
  session.startTransaction();
  try {
    const retailerID = req.retailer._id;
    const { itemName, quantity } = req.body;
    const dateTime = dayjs().format('DD-MM-YYYY HH:mm:ss');

    if (!itemName) {
      const error = new Error("Item name is required");
      error.statusCode = 400;
      throw error;
    }

    if (!quantity) {
      const error = new Error("Quantity is required");
      error.statusCode = 400;
      throw error;
    }

    const existingProduct = await Product.findOne({
      itemName: itemName,
      retailer: retailerID
    }).session(session);

    if (!existingProduct) {
      const error = new Error("Item not found.");
      error.statusCode = 404;
      throw error;
    }

    const newQuantity = Number(existingProduct.quantity) + Number(quantity);

    const retailer = await Retailer.findById(retailerID).session(session);

    if (!retailer) {
      const error = new Error('Retailer not found.');
      error.status = 404;
      throw error;
    }

    let productStatus;
    let mailOptions;

    if (newQuantity === 0) {
      productStatus = "Out of Stock";

      mailOptions = {
        from: 'SwiftStock@noreply.com',
        to: retailer.email,
        subject: `Inventory Alert: Product ${existingProduct.itemName} is now Out of Stock.`,
        text: `Hello Retailer,
        Your product ${existingProduct.itemName} is now Out of Stock.
        Please restock your product as soon as possible.
        Thank you`,
        html: `
          <p>Hello Retailer,</p>
          <p>Your product ${existingProduct.itemName} is now Out of Stock.</p>
          <p>Please restock your product as soon as possible.</p>
          <p>Thank you</p>
        `
      };

      await transporter.sendMail(mailOptions);

    } else if (newQuantity <= existingProduct.lowStockThreshold) {
      productStatus = "Low Stock";

      mailOptions = {
        from: 'SwiftStock@noreply.com',
        to: retailer.email,
        subject: `Inventory Alert: Product ${existingProduct.itemName} is Low on Stock.`,
        text: `Hello Retailer,
        Your product ${existingProduct.itemName} is Low on Stock.
        Please restock your product as soon as possible.
        Thank you`,
        html: `
          <p>Hello Retailer,</p>
          <p>Your product ${existingProduct.itemName} is Low on Stock.</p>
          <p>Please restock your product as soon as possible.</p>
          <p>Thank you</p>
        `
      };

      await transporter.sendMail(mailOptions);

    } else if (newQuantity <= existingProduct.lowStockThreshold * 4) {
      productStatus = "Moderate Stock"
    } else {
      productStatus = "Good Stock"
    }

    const updatedProduct = await Product.findOneAndUpdate(
      {_id: existingProduct._id,
      retailer: retailerID},
      {quantity: newQuantity, status: productStatus, restocks: existingProduct.restocks + 1}, 
      {returnDocument: "after", runValidators: true, session});

    if (!updatedProduct) {
      const error = new Error("Failed to restock item");
      error.statusCode = 500;
      throw error;
    }

    const history = await History.create([{
      retailer: retailerID,
      itemName: existingProduct.itemName,
      change: `Restocked item (+${quantity})`,
      dateTime: dateTime
    }], {session});

    if (!history) {
      const error = new Error("Failed to log history");
      error.statusCode = 500;
      throw error;
    }

    const productsList = await Product.find({ retailer: retailerID }).session(session);
    let totalQuantity = 0;
    productsList.forEach((product) => {
      totalQuantity += product.quantity;
    });

    const timeNow = new Date();

    const analytics = await Analytics.findOneAndUpdate(
      { retailer: retailerID },
      {
        $push: {
          data: {
            $each: [{ totalQuantity: totalQuantity, dateTime: timeNow }],
            $sort: { dateTime: 1 },
            $slice: -30
          }
        }
      }, {returnDocument: "after", runValidators: true, session});

    // console.log(analytics);

    await session.commitTransaction();
    await session.endSession();

    res.status(200).json({
      success: true,
      message: "Item restocked successfully",
      product: updatedProduct
    });
  }
  catch (error) {
    await session.abortTransaction();
    await session.endSession();
    next(error);
  }
}