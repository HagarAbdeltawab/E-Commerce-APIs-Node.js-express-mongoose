import Joi from "joi";
export const WishlistVal = Joi.object({ 
    product: Joi.string().hex().length(24).required(),
}) 