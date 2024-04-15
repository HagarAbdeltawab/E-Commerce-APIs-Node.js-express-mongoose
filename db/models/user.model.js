import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

const schema = new mongoose.Schema({
    name: {
        type: String,
        required: [true, 'user name required'],  
        trim: true,
        minLength: [2,'too short name']
    },
    email: {
        type: String,
        trim: true,  
        required: [true, 'email required'],
        unique: [true, 'email must be unique'],
    },
    phone: {
        type: String, 
    },
    password: {
        type: String,
        required: true,  
    }, 
    role: {
        type: String,
        enum: ['admin', 'user'],
        default: 'user'
    },
    isActive: Boolean, 
    logoutTime: Date,
    passwordChangedAt: Date,
    wishList: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Product"
    }],
    address: [{
        street: String,
        city: String, 
        phone: String
    }]
},{
    timestamps: true
});

schema.pre('save', function() {
    this.password =  bcrypt.hashSync(this.password,8)
})
schema.pre('findOneAndUpdate', function() {
    // this._update.password =  bcrypt.hashSync(this.password,8)
    const update = this.getUpdate();
    if (update.password) {
        update.password = bcrypt.hashSync(update.password, 8); 
    } 
})

const userModel = mongoose.model('User',schema);
export default userModel;