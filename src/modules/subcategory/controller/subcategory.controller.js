import { addItem, deleteItem, getAll, getItem, updateItem } from "../../handlers/api.handlers.js";
import subcategoryModel from "../../../../db/models/subCategory.model.js"; 

export const addSubcategory = addItem(subcategoryModel)

export const updateSubcategory = updateItem(subcategoryModel)

export const deleteSubcategory = deleteItem(subcategoryModel)

export const getAllSubcategories = getAll(subcategoryModel)

export const getOneSubcategory = getItem(subcategoryModel)
