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
    image: String,
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

const categoryModel = mongoose.model('Category',schema);
export default categoryModel;