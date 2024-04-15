import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    code: {
        type: String,
        required: true, 
        unique: true,
        trim: true,
    },
    discount: {
        type: Number, 
        required:  true,
        min:0
    },
    expire: {
        type: Date, 
        required:  true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
},{
    timestamps: true
});

const couponModel = mongoose.model('Coupon',schema);
export default couponModel;