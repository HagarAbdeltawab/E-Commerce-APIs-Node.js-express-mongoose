import userModel from "../../db/models/user.model.js"
import { AppError } from "../utils/AppError.js"

export const userExists = async(req,res,next)=>{
    let user = await userModel.findOne({email:req.body.email});
    if(user) return next(new AppError('email is found',409));
    else  next(); 
}