import express from "express"; 
import { protectRoutes } from "../../middleware/authentication.js";
import * as C  from "./controller/cart.controller.js";
import {validation} from "../../middleware/validation.js" 
import { allowedTo } from "../../middleware/authorization.js"
import * as S from "./cart.validation.js"

const cartRoutes = express.Router();

cartRoutes.route('/')
    .post(protectRoutes,
        allowedTo('user'),
        validation(S.addToCartVal), 
        C.createCart)
    .get(protectRoutes,
        allowedTo('user'), 
        C.getCart)
    .delete(protectRoutes,
        allowedTo('user'), 
        C.clearUserCart)    
cartRoutes.route('/:id')
    .put(protectRoutes,
        allowedTo('user'), 
        validation(S.updateCartVal),
        C.updateQuantity)
    .delete(protectRoutes,
        allowedTo('user','admin'),
        validation(S.paramsIdVal),  
        C.removeCartItem)

cartRoutes.route('/applyCoupon')
        .post(protectRoutes,
            allowedTo('user'),
            validation(S.applyCouponVal), 
            C.applyCoupon)

export default cartRoutes; 