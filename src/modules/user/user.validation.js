import Joi from "joi"
export const createUserVal = Joi.object({
    name: Joi.string().min(2).max(20).trim().required(),
    email: Joi.string().email().trim().required(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    rePassword: Joi.valid(Joi.ref('password')).required(),
    role: Joi.string().valid('user','admin')
})

export const updateUserVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    name: Joi.string().min(2).max(20).trim(),
    email: Joi.string().email().trim(),
    password: Joi.string().pattern(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).{8,}$/),
    rePassword: Joi.valid(Joi.ref('password')),
    role: Joi.string().valid('user','admin')
})

export const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()
})