import Joi from 'joi';

export const addProductSchema = Joi.object({
    title: Joi.string().min(3).max(100).trim().required(),
    description: Joi.string().min(3).max(300).trim().required(),
    price: Joi.number().min(0).required(),
    priceAfterDiscount: Joi.number().min(0).required(),
    quantity: Joi.number().min(0).required(),
    category: Joi.string().hex().length(24).required(),
    subcategory: Joi.string().hex().length(24).required(),
    brand: Joi.string().hex().length(24).required(),
    imageCover: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required() 
    }).required()).required(),
    images: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required() 
    }).required()).required()
})

export const idParamSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
})

export const updateProductSchema = Joi.object({
    id: Joi.string().hex().length(24).required(), 
    title: Joi.string().min(3).max(100).trim(),
    description: Joi.string().min(3).max(300).trim(),
    price: Joi.number().min(0),
    priceAfterDiscount: Joi.number().min(0),
    quantity: Joi.number().min(0),
    category: Joi.string().hex().length(24),
    subcategory: Joi.string().hex().length(24),
    brand: Joi.string().hex().length(24),
    imageCover: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required() 
    }).required()),
    images: Joi.array().items(Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png', 'image/jpg').required(),
        size: Joi.number().max(5242880).required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required() 
    }).required())
}) 