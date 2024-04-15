import express from "express";
import * as SC from "./controller/subcategory.controller.js";
import { validation } from "../../middleware/validation.js";
import * as S from "./subcategory.validation.js";
import { uploadSingle } from "../../utils/fileUpload.js";
import { protectRoutes } from "../../middleware/authentication.js";
import { allowedTo } from "../../middleware/authorization.js";

const subcategoryRoutes = express.Router({mergeParams: true});
subcategoryRoutes.route('/')
    .post(protectRoutes,
        allowedTo('admin'),
        uploadSingle('image'), 
        validation(S.addSubcategorySchema), 
        SC.addSubcategory)
    .get(SC.getAllSubcategories)
subcategoryRoutes.route('/:id')
    .get(validation(S.idParamSchema), 
        SC.getOneSubcategory)
    .put(protectRoutes,
        allowedTo('admin'),
        uploadSingle('image'), 
        validation(S.updateSubcategorySchema), 
        SC.updateSubcategory)
    .delete(protectRoutes,
        allowedTo('admin'),
        validation(S.idParamSchema), 
        SC.deleteSubcategory)

export default subcategoryRoutes;