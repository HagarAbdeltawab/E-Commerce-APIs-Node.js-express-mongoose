import Joi from 'joi';

export const addReviewSchema = Joi.object({
    text: Joi.string().min(3).max(30).trim().optional(),
    rating: Joi.number().max(5).min(1).optional(),
    product: Joi.string().hex().length(24).required(),
})

export const idParamSchema = Joi.object({
    id: Joi.string().hex().length(24).required(),
})

export const updateReviewSchema = Joi.object({
    id: Joi.string().hex().length(24),
    text: Joi.string().min(3).max(30).trim(),
    rating: Joi.number().max(5).min(1)
}) 