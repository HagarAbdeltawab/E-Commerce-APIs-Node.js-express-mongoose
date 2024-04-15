import userModel from "../../../../db/models/user.model.js";
import { HandleError } from "../../../middleware/HandleError.js";
import bcrypt from 'bcrypt'; 
import { AppError } from "../../../utils/AppError.js";
import { generateToken } from "../../../utils/generateToken.js";

export const signUp = HandleError(async(req,res,next)=>{
    let user = new userModel(req.body);
    let data = await user.save();
    res.json({message: 'success',data});
});

export const signIn = HandleError(async(req,res,next)=>{
    // Check if user exists and password is correct
    let user = await userModel.findOne({email: req.body.email});
    if (user && bcrypt.compareSync(req.body.password, user.password)){
        user.isActive = true;
        user.logoutTime = null; 
        // Generate JWT token
        let token = generateToken(user._id, user.role);
        // Send success response with token
        return res.json({message: "success", token})
    }
    next(new AppError("incorrect email or password",401))
});

export const logOut = HandleError(async(req,res,next)=>{ 
    await userModel.findByIdAndUpdate(req.user._id, 
        {isActive: false, logoutTime: new Date()})
    res.json({ message: 'success' });
});

export const changePassword = HandleError(async(req,res,next)=>{
    // Check if user exists and password is correct
    let user = await userModel.findById(req.user._id);
    if (user && bcrypt.compareSync(req.body.password, user.password)){
        // Generate JWT token
        let token = generateToken(user._id, user.role);
        // Update password
        await userModel.findByIdAndUpdate(req.user._id,{password:req.body.newPassword,passwordChangedAt:Date.now()});
        return res.json({message: "success", token});
    }
    next(new AppError("incorrect email or password",401));
});