import express from "express";
import * as U from "./controller/user.controller.js";
import { validation } from "../../middleware/validation.js";
import * as S from "./user.validation.js"; 
import { userExists } from "../../middleware/userExists.js";
import { protectRoutes } from "../../middleware/authentication.js";
import { allowedTo } from "../../middleware/authorization.js";

const userRoutes = express.Router();
userRoutes.route('/')
    .post(protectRoutes,
        allowedTo('admin'),
        validation(S.createUserVal), 
        userExists, 
        U.addUser)
    .get(protectRoutes,
        allowedTo('admin'),
        U.getAllUsers);
userRoutes.route('/:id')
    .get(protectRoutes,
        allowedTo('admin'),
        validation(S.paramsIdVal), 
        U.getOneUser)
    .put(protectRoutes,
        allowedTo('admin'),
        validation(S.updateUserVal),
        userExists, 
        U.updateUser)
    .delete(protectRoutes,
        allowedTo('admin'),
        validation(S.paramsIdVal), 
        U.deleteUser);

export default userRoutes;