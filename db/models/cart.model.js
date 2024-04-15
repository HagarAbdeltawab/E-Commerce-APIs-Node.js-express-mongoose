import mongoose from 'mongoose';

const schema = mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    cartItems:[{
        product:{
            type: mongoose.Types.ObjectId,
            ref: 'product'
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: Number
    }],
    totalPrice: Number,
    discount: Number,
    totalPriceAfterDiscount: Number,
},
{ timestamp: true});

const cartModel = new mongoose.model('cart', schema);
export default cartModel