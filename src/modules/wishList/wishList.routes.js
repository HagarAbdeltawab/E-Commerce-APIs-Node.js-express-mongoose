import express from "express";
import * as W from "./controller/wishList.controller.js";
import { validation } from "../../middleware/validation.js";
import * as S from "./wishList.validation.js"; 
import { protectRoutes } from "../../middleware/authentication.js";
import { allowedTo } from "../../middleware/authorization.js";

const wishListRoutes = express.Router();

wishListRoutes.route('/')
    .patch(protectRoutes,
        allowedTo('user'),
        validation(S.WishlistVal),
        W.addToWishList)
    .delete(protectRoutes,
        allowedTo('user'),
        validation(S.WishlistVal),
        W.removeFromWishList)
    .get(protectRoutes,
            allowedTo('user'),
            W.getAllWishList)

export default wishListRoutes;