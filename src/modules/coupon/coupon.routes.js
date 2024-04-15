import express from "express";
import * as R from "./controller/coupon.controller.js";
import { validation } from "../../middleware/validation.js";
import * as S from "./coupon.validation.js"; 
import { protectRoutes } from "../../middleware/authentication.js";
import { allowedTo } from "../../middleware/authorization.js";

const couponRoutes = express.Router();
couponRoutes.route('/')
    .post(protectRoutes,
        allowedTo('admin'),
        validation(S.addCouponSchema), 
        R.addCoupon)
    .get(protectRoutes,
        allowedTo('admin'),
        R.getAllCoupons);

couponRoutes.route('/:id')
    .get(protectRoutes,
        allowedTo('admin'),
        validation(S.idParamSchema), 
        R.getOneCoupon)
    .put(protectRoutes,
        allowedTo('admin'),
        validation(S.updateCouponSchema), 
        R.updateCoupon)
    .delete(protectRoutes,
        allowedTo('admin'),
        validation(S.idParamSchema), 
        R.deleteCoupon);

export default couponRoutes;