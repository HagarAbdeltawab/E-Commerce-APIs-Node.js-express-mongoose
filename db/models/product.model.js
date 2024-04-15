import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [3, 'Title is too short'],
        maxLength: [100, 'Title is too long'],
        unique: true,
        trim: true,
    },
    slug: {
        type: String,
        lowercase: true,
        required:  true,
    },
    description: {
        type: String,
        minLength: [3, 'Title is too short'],
        maxLength: [300, 'Title is too long'],
        required: true
    },
    price: {
        type: Number,
        min: 0,
        required: true
    },
    priceAfterDiscount: {
        type: Number,
        min: 0,
        required: true
    },
    category: {
        type: mongoose.Types.ObjectId,
        ref: 'Category'
    },
    subcategory: {
        type: mongoose.Types.ObjectId,
        ref: 'Subcategory'
    },
    brand: {
        type: mongoose.Types.ObjectId,
        ref: 'Brand'
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    imageCover: String,
    images: [String],
    sold: {
        type: Number,
        default: 0,
        required: true
    },
    quantity: {
        type: Number,
        required: true,
        default: 0
    },
    rateCount: Number,
    rateAvg: {
        type: Number,
        min: 0,
        max: 5
    }
},{
    timestamps: true,
    toJSON: { virtuals: true }, 
    toObject: { virtuals: true }
});

schema.post('init', function (doc) {
    if(doc.imageCover){
        doc.imageCover = process.env.BASE_URL + 'uploads/' + doc.imageCover
    }
    if(doc.images){
        doc.images =  doc.images.map(ele => process.env.BASE_URL + 'uploads/' + ele)
    }
})
// show all reviews of product
schema.virtual("myReviews", {
    ref: 'Review',
    localField: '_id',
    foreignField: 'product'
})
schema.pre(/^find/, function(){
    this.populate('myReviews')
})

const productModel = mongoose.model('Product',schema);
export default productModel;