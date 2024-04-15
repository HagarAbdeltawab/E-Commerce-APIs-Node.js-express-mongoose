import { AppError } from "../utils/AppError.js"

export const HandleError = (fn)=>{
    return(req,res,next) => { 
        fn(req,res,next).catch(
            err=>{
                // console.log(err);
                next(new AppError(err,401))
            }
        );
    };
};