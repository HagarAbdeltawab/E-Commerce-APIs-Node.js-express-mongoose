import { addItem, deleteItem, getAll, getItem, updateItem } from "../../handlers/api.handlers.js";
import brandModel from "../../../../db/models/brand.model.js"; 

export const addBrand = addItem(brandModel);

export const updateBrand = updateItem(brandModel);

export const deleteBrand = deleteItem(brandModel);

export const getAllBrands = getAll(brandModel);

export const getOneBrand = getItem(brandModel);