import { AppError } from "../utils/AppError.js"; 
import { HandleError } from "./HandleError.js";

export const allowedTo = (...roles)=>{
    return HandleError(async(req,res,next)=>{
        if(!roles.includes(req.user.role))
            return next(new AppError('you are not authorized.',403))
        next()
    })
}