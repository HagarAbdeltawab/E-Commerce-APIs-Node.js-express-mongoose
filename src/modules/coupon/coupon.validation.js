import Joi from 'joi';

export const addCouponSchema = Joi.object({
    code: Joi.string().min(3).max(30).trim(),
    discount: Joi.number(),
    expire: Joi.date().required()
})

export const idParamSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
})

export const updateCouponSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
    code: Joi.string().min(3).max(30).trim(),
    discount: Joi.number(),
    expire: Joi.date()
}) 