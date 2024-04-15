import userModel from "../../db/models/user.model.js";
import { AppError } from "../utils/AppError.js"
import { HandleError } from "./HandleError.js"; 
import jwt from "jsonwebtoken";

export const protectRoutes = HandleError(async(req,res,next)=>{
    let {token} = req.headers;
    //check we have token or not
    if(!token) return next(new AppError('please provide token',401));
    //verify token
    let decoded = jwt.verify(token,process.env.JWT_KEY)
    //check user of this token exist or not
    let user = await userModel.findById(decoded.userId)
    if(!user) return next(new AppError('user not found',401))
    //check if password change after this token 
    if(user.passwordChangedAt && decoded.iat < parseInt(user?.passwordChangedAt.getTime() / 1000)){
        return next(new AppError('invalid token.. login again',401))  
    } 
    // check if user logout after this token
    if (user.logoutTime && decoded.iat < user.logoutTime.getTime() / 1000) {
        return next(new AppError('Token issued after user logged out. Please log in again', 401));
    }
    req.user = user
    next()
}) 