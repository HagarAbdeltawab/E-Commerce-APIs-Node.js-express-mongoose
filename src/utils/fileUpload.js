import multer from 'multer';
import mongoose from 'mongoose';
import { AppError } from './AppError.js';

const uploadFile = () => {
    const storage = multer.diskStorage({
        destination: function (req, file, cb) {
            cb(null, './uploads')
        },
        filename: function (req, file, cb) {
            cb(null, new mongoose.Types.ObjectId() + '_' + file.originalname)
        }
    })
    function fileFilter (req, file, cb) {
        if(file.mimetype.startsWith('image')){
            cb(null, true)
        }else{
            cb(new AppError('Invalid Image Type', 401), false) 
        }
        
    }
    const upload = multer({ storage, fileFilter });
    return upload;
}

export const uploadSingle = (fieldName) => uploadFile().single(fieldName);
export const uploadArray = (fieldName) => uploadFile().array(fieldName);
export const uploadFields = (fieldName) => uploadFile().fields(fieldName);