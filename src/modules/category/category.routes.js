import express from "express";
import * as C from "./controller/category.controller.js";
import { validation } from "../../middleware/validation.js";
import * as S from "./category.validation.js";
import { uploadSingle } from "../../utils/fileUpload.js";
import subcategoryRoutes from "../subcategory/subcategory.routes.js";
import { protectRoutes } from "../../middleware/authentication.js";
import { allowedTo } from "../../middleware/authorization.js";

const categoryRoutes = express.Router();

categoryRoutes.use("/:category/subcategory", subcategoryRoutes)
categoryRoutes.route('/')
    .post(protectRoutes, 
        allowedTo('admin'),
        uploadSingle('image'), 
        validation(S.addCategorySchema), 
        C.addCategory)
    .get(C.getAllCategories)
categoryRoutes.route('/:id')
    .get(validation(S.idParamSchema), 
        C.getOneCategory)
    .put(protectRoutes, 
        allowedTo('admin'),
        uploadSingle('image'), 
        validation(S.updateCategorySchema), 
        C.updateCategory)
    .delete(protectRoutes, 
        allowedTo('admin'),
        validation(S.idParamSchema), 
        C.deleteCategory)

export default categoryRoutes;