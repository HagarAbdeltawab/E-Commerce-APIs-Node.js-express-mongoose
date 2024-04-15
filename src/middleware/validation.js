import { AppError } from "../utils/AppError.js";

export const validation = (schema)=>{
    return (req,res,next) => {
        // Determine the filter object based on the request type
        let filter = {}
        if(req.file){
            filter = {
                image: req.file ,
                ...req.body,
                ...req.params,
                ...req.query
            }
        }else if(req.files){
            filter = {
                ...req.files,
                ...req.body,
                ...req.params,
                ...req.query
            }
        }else{
            filter = {
                ...req.body,
                ...req.params,
                ...req.query
            }
        }
        // Validate the filter object against the schema
        let { error } = schema.validate(filter, {abortEarly: false});
        if(!error){
            next() 
        }else{
            // If there are validation errors, construct an error message object
            let errMes =[]
            error.details.forEach(val => {
                errMes.push(val.message)
            });
            next(new AppError(errMes,401))
        }
    }
}
