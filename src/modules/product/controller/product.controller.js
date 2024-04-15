import { addItem, deleteItem, getAll, getItem, updateItem } from "../../handlers/api.handlers.js";
import productModel from "../../../../db/models/product.model.js";

export const addProduct = addItem(productModel);

export const updateProduct = updateItem(productModel);

export const deleteProduct = deleteItem(productModel)

export const getAllProducts = getAll(productModel);

export const getOneProduct = getItem(productModel);
