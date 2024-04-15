import { addItem, deleteItem, getAll, getItem, updateItem } from "../../handlers/api.handlers.js";
import couponModel from "../../../../db/models/coupon.model.js"; 
import { HandleError } from "../../../middleware/HandleError.js";
import qrCode from 'qrcode';

export const addCoupon = addItem(couponModel);

export const updateCoupon = updateItem(couponModel);

export const deleteCoupon = deleteItem(couponModel);

export const getAllCoupons = getAll(couponModel);

export const getOneCoupon = HandleError(async(req,res) => {
    let Item = await couponModel.findById(req.params.id);
    let url = await qrCode.toDataURL(Item.code);
    res.json({message: 'success' , Item, url});
});