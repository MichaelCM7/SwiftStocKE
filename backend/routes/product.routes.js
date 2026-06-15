import express from "express";
import {addItem, getItemsByRetailerID, editItem, deleteItem, restockItem} from "../controllers/product.controller.js"

const productRoutes = express.Router();

productRoutes.post("/add-item",addItem);

productRoutes.get("/get-items",getItemsByRetailerID);

productRoutes.put("/edit-item/:productID",editItem);

productRoutes.put("/restock-item/:productID",restockItem);

productRoutes.delete("/delete-item/:productID",deleteItem);

export default productRoutes;