import userModel from "../../../../db/models/user.model.js"; 
import { HandleError } from "../../../middleware/HandleError.js";
import { AppError } from "../../../utils/AppError.js";

export const addToAddress = HandleError(async(req,res) => { 
    let { street ,city , phone } = req.body;
    let data  = await userModel.findByIdAndUpdate(
        {_id:req.user._id},
        {$addToSet: {address: { street ,city , phone }}},
        {new:true});
    !data && next(new AppError("Not found.",404));
    data && res.json({message: "success", data: data.address});
});

export const removeFromAddress = HandleError(async(req,res) => { 
    let { street ,city , phone } = req.body;
    let data  = await userModel.findByIdAndUpdate(
        {_id:req.user._id},
        {$pull: {address: { street ,city , phone }}},
        {new:true});
    !data && next(new AppError("Not found.",404));
    data && res.json({message: "success",data: data.address});
});

export const getAllAddress = HandleError(async(req,res) => { 
    let data  = await userModel.findOne({_id:req.user._id});
    !data && next(new AppError("Not found.",404));
    data && res.json({message: "success", data: data.address});
});