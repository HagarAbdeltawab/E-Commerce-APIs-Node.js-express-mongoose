import express from "express";
import * as A from "./controller/address.controller.js";
import { validation } from "../../middleware/validation.js";
import * as S from "./address.validation.js"; 
import { protectRoutes } from "../../middleware/authentication.js";
import { allowedTo } from "../../middleware/authorization.js";

const addressRoutes = express.Router();

addressRoutes.route('/')
    .patch(protectRoutes, 
        allowedTo('user'),
        validation(S.AddressVal),   
        A.addToAddress)
    .delete(protectRoutes, 
        allowedTo('user'), 
        validation(S.AddressVal),  
        A.removeFromAddress)
    .get(protectRoutes, 
        allowedTo('user', 'admin'),  
        A.getAllAddress)

export default addressRoutes;