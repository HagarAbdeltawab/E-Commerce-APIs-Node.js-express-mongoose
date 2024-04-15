import Joi from "joi";
export const  AddressVal = Joi.object({ 
    street: Joi.string().trim(),
    city: Joi.string().trim(),
    phone: Joi.string().trim(),
}); 