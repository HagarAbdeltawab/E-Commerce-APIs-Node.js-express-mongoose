import { HandleError } from "../../middleware/HandleError.js";
import slugify from 'slugify';
import { ApiFeatures } from "../../utils/apiFeatures.js";
import { AppError } from "../../utils/AppError.js"

export const addItem = (model)=>{
    return HandleError(async(req,res,next) => { 
        req.body.createdBy = req.user._id;
        if(req.body.title) {
            req.body.slug = slugify(req.body.title);
        }; 
        if(req.file) { 
            req.body.image = req.file.filename;  
        };
        if(req.files?.imageCover) {
            req.body.imageCover = req.files.imageCover[0].filename;
        };
        if(req.files?.images) {
            req.body.images = req.files.images.map(ele => ele.filename);
        };
        // check if user created a review before
        if(req.body.text || req.body.rating){
            let review = await model.findOne({createdBy:req.user._id,product:req.body.product});
            if(review) return next(new AppError('you created a review before.'));
            req.body.user = req.user._id;
        };
        // check if coupon exist
        if(req.body.code){
            let couponExist = await model.findOne({code:req.body.code});
            if(couponExist) return next(new AppError('you created this coupon before.'));
        };
        // add item in db
        let preItem  = new model(req.body);
        let addedItem = await preItem.save();
        res.json({message: 'success' , addedItem});
    });
};

export const updateItem = (model)=>{
    return HandleError(async(req,res,next) => { 
        if(req.body.title) req.body.slug = slugify(req.body.title); 
        if(req.file) { 
            req.body.image = req.file.filename;  
        };
        if(req.files?.imageCover) req.body.imageCover = req.files.imageCover[0].filename;
        if(req.files?.images) req.body.images = req.files.images.map(ele => ele.filename);
        // check if review exist
        if(req.body.code){
            let couponExist = await model.findOne({code:req.body.code});
            if(couponExist) return next(new AppError('you created this coupon before.'));
        }; 
        let updatedItem = await model.findOneAndUpdate({
            _id: req.params.id,
            createdBy: req.user._id
        },req.body,{new:true});
        updatedItem && res.json({message: 'success' , updatedItem});
        !updatedItem && next(new AppError("Not found.",404));
    });
};

export const deleteItem = (model)=>{
    return HandleError(async(req,res,next) => { 
        let deletedItem = await model.findOneAndDelete({
            _id: req.params.id,
            createdBy: req.user._id
        });
        deletedItem && res.json({message: 'success' , deletedItem});
        !deletedItem &&  next(new AppError("Not found.",404))
    });
};   

export const getAll =(model)=>{
    return HandleError(async(req,res,next) => {
        let filterObj ={};
        if(req.params.category)  filterObj.category = req.params.category;
        let apiFeatures = new ApiFeatures(model.find(filterObj),req.query)
            .pagination().fields().sort().search().filter();   
        let allItems = await apiFeatures.mongooseQuery;
        res.json({message: 'success' , allItems});
    });
};

export const getItem = (model)=>{
    return HandleError(async(req,res,next) => {
        let Item = await model.findById(req.params.id);
        !Item && next(new AppError("Not found.",404));
        Item && res.json({message: "Success",Item});
    });
};