import express from "express";
import * as B from "./controller/brand.controller.js";
import { validation } from "../../middleware/validation.js";
import * as S from "./brand.validation.js";
import { uploadSingle } from "../../utils/fileUpload.js";
import { protectRoutes } from "../../middleware/authentication.js";
import { allowedTo } from "../../middleware/authorization.js";

const brandRoutes = express.Router();
brandRoutes.route('/')
    .post(protectRoutes,
        allowedTo('admin'),
        uploadSingle('image'), 
        validation(S.addBrandSchema), 
        B.addBrand)
    .get(B.getAllBrands);

brandRoutes.route('/:id')
    .get(validation(S.idParamSchema), 
        B.getOneBrand)
    .put(protectRoutes,
        allowedTo('admin'),
        uploadSingle('image'), 
        validation(S.updateBrandSchema), 
        B.updateBrand)
    .delete(protectRoutes,
        allowedTo('admin'),
        validation(S.idParamSchema), 
        B.deleteBrand);

export default brandRoutes;