import express from "express";
import * as R from "./controller/review.controller.js";
import { validation } from "../../middleware/validation.js";
import * as S from "./review.validation.js"; 
import { protectRoutes } from "../../middleware/authentication.js";
import { allowedTo } from "../../middleware/authorization.js";

const reviewRoutes = express.Router();
reviewRoutes.route('/')
    .post(protectRoutes,
        allowedTo('user'),
        validation(S.addReviewSchema), 
        R.addReview)
    .get(R.getAllReviews);
reviewRoutes.route('/:id')
    .get(validation(S.idParamSchema), 
        R.getOneReview)
    .put(protectRoutes,
        allowedTo('user'), 
        validation(S.updateReviewSchema), 
        R.updateReview)
    .delete(protectRoutes,
        allowedTo('user','admin'),
        validation(S.idParamSchema), 
        R.deleteReview);

export default reviewRoutes;