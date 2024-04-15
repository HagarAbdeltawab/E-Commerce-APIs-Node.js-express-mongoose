import mongoose from 'mongoose';

const schema = mongoose.Schema({
    user:{
        type: mongoose.Types.ObjectId,
        ref: 'user'
    },
    orderItems:[{
        product:{
            type: mongoose.Types.ObjectId,
            ref: 'Product'
        },
        quantity: {
            type: Number,
            default: 1
        },
        price: Number
    }],
    totalOrderPrice: Number,
    discount: Number,
    totalPriceAfterDiscount: Number,
    paymentMethod:{
        type:String,
        enum:["Cash", "Card"],
        default: "Cash"
    },
    shippingAddress:{
        street: String,
        city: String,
        phone: String
    },
    isDerived: {
        type: Boolean,
        default: false
    },
    deliveredAt: Date,
    isPaid: {
        type: Boolean,
        default: false
    },
    paidAt: Date,
},
{ timestamp: true});

const orderModel = new mongoose.model('Order', schema);
export default orderModel;