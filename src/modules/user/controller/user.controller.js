import { getAll, getItem } from "../../handlers/api.handlers.js";
import userModel from "../../../../db/models/user.model.js"; 
import { HandleError } from "../../../middleware/HandleError.js";
import { AppError } from "../../../utils/AppError.js";

export const addUser = HandleError(async(req,res,next) => { 
    let preItem  = new userModel(req.body);
    let addedItem = await preItem.save();
    res.json({message: 'success' , addedItem});
});

export const updateUser = HandleError(async(req,res,next) => { 
    let updatedItem = await userModel.findByIdAndUpdate(req.params.id,req.body,{new:true});
    updatedItem && res.json({message: 'success' , updatedItem});
    !updatedItem && next(new AppError("Not found.",404));
});

export const deleteUser = HandleError(async(req,res,next) => { 
    let deletedItem = await userModel.findByIdAndDelete(req.params.id);
    deletedItem && res.json({message: 'success' , deletedItem});
    !deletedItem &&  next(new AppError("Not found.",404))
});

export const getAllUsers = getAll(userModel);

export const getOneUser = getItem(userModel);