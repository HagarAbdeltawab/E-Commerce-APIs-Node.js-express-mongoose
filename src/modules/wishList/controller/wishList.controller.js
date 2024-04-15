import { addItem, deleteItem, getAll, getItem, updateItem } from "../../handlers/api.handlers.js";
import userModel from "../../../../db/models/user.model.js"; 
import { HandleError } from "../../../middleware/HandleError.js";

export const addToWishList = HandleError(async(req,res) => {  
    let data  = await userModel.findByIdAndUpdate(
        req.user._id,
        {$addToSet: {wishList: req.body.product}},
        {new:true})
    res.json({message: 'success' , data});
});

export const removeFromWishList = HandleError(async(req,res) => {  
    let data  = await userModel.findByIdAndUpdate(req.user._id,
        {$pull: {wishList: req.body.product}},{new:true})
    res.json({message: 'success' , data});
});

export const getAllWishList = HandleError(async(req,res) => { 
    let data  = await userModel.findOne({_id:req.user._id});
    res.json({message: 'success' , data: data.wishList });
});