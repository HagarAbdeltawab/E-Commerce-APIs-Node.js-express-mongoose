import { addItem, deleteItem, getAll, getItem, updateItem } from "../../handlers/api.handlers.js";
import categoryModel from "../../../../db/models/category.model.js"; 

export const addCategory = addItem(categoryModel);

export const updateCategory =  updateItem(categoryModel);

export const deleteCategory = deleteItem(categoryModel);

export const getAllCategories = getAll(categoryModel);

export const getOneCategory = getItem(categoryModel);