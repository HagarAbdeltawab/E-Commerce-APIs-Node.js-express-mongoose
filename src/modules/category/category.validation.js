import Joi from 'joi';

export const addCategorySchema = Joi.object({
    title: Joi.string().min(3).max(100).trim().required(),
    image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png', 'image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    }).required()
})

export const idParamSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
})

export const updateCategorySchema = Joi.object({
    id: Joi.string().hex().length(24),
    title: Joi.string().min(3).max(100).trim(),
    image: Joi.object({
        fieldname: Joi.string().required(),
        originalname: Joi.string().required(),
        encoding: Joi.string().required(),
        mimetype: Joi.string().valid('image/jpeg','image/png', 'image/jpg').required(),
        destination: Joi.string().required(),
        filename: Joi.string().required(),
        path: Joi.string().required(),
        size: Joi.number().max(5242880).required()
    })
}) 