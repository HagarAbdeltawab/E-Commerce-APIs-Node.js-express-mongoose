import express from "express";
import * as P from "./controller/product.controller.js";
import { validation } from "../../middleware/validation.js";
import * as S from "./product.validation.js";
import { uploadFields } from "../../utils/fileUpload.js";
import { protectRoutes } from "../../middleware/authentication.js";
import { allowedTo } from "../../middleware/authorization.js";

const productRoutes = express.Router();
productRoutes.route('/')
    .post(protectRoutes,
        allowedTo('admin'),
        uploadFields([{name:'imageCover',maxCount: 1},{name:'images',maxCount: 10}]), 
        validation(S.addProductSchema),
        P.addProduct)
    .get(P.getAllProducts)
productRoutes.route('/:id')
    .get(validation(S.idParamSchema), P.getOneProduct)
    .put(protectRoutes,
        allowedTo('admin'),
        uploadFields([{name:'imageCover',maxCount: 1},{name:'images',maxCount: 10}]),
        validation(S.updateProductSchema), 
        P.updateProduct)
    .delete(protectRoutes,
        allowedTo('admin'),
        validation(S.idParamSchema), 
        P.deleteProduct)

export default productRoutes;