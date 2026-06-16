import express from "express";
import {addItem, getItemsByRetailerID, getItemByProductID, editItem, deleteItem, restockItem} from "../controllers/product.controller.js"

const productRoutes = express.Router();

productRoutes.post("/add-item",addItem);

productRoutes.get("/get-items",getItemsByRetailerID);

productRoutes.get("/get-item/:productID",getItemByProductID);

productRoutes.put("/edit-items/:productID",editItem);

productRoutes.put("/restock-item",restockItem);

productRoutes.delete("/delete-items/:productID",deleteItem);

export default productRoutes;