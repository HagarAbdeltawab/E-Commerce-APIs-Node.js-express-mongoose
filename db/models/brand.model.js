import mongoose from 'mongoose';

const schema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        minLength: [3, 'Title is too short'],
        maxLength: [30, 'Title is too long'],
        unique: true,
        trim: true,
    },
    image: String,
    slug: {
        type: String,
        lowercase: true,
        required:  true,
    },
    createdBy: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
},{
    timestamps: true
});

schema.post('init', function (doc) {
    doc.image = process.env.BASE_URL + 'uploads/' + doc.image
})

const brandModel = mongoose.model('Brand',schema);
export default brandModel;