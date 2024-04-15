import Joi from "joi";
export const addToCartVal = Joi.object({ 
    product: Joi.string().hex().length(24).required(),
    quantity: Joi.number().options({convert:false})
})
export const updateCartVal = Joi.object({
    id: Joi.string().hex().length(24).required(),
    quantity: Joi.number().options({convert:false}).required(), 
})
export const paramsIdVal = Joi.object({
    id: Joi.string().hex().length(24).required()
})

export const applyCouponVal = Joi.object({
    coupon: Joi.string().required(),
    
})
