import { addItem, deleteItem, getAll, getItem, updateItem } from "../../handlers/api.handlers.js";
import reviewModel from "../../../../db/models/reviews.mode.js"; 

export const addReview = addItem(reviewModel);

export const updateReview = updateItem(reviewModel);

export const deleteReview = deleteItem(reviewModel);

export const getAllReviews = getAll(reviewModel);

export const getOneReview = getItem(reviewModel);