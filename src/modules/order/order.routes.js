import express from "express"; 
import { protectRoutes } from "../../middleware/authentication.js";
import * as O from "./controller/order.controller.js";
import * as S from "./order.validation.js";
import { allowedTo } from "../../middleware/authorization.js";
import { validation } from "../../middleware/validation.js";

const orderRoutes = express.Router();

orderRoutes.route('/:id')
    .post(protectRoutes,
        allowedTo('user'),
        validation(S.createOrderVal), 
        O.createOrder) 
orderRoutes.route('/')
    .get(protectRoutes,  
        allowedTo('user'),
        O.getOrder) 
orderRoutes.route('/all')
        .get(protectRoutes,  
            allowedTo('admin'),
            O.getAllOrder) 
    
orderRoutes.route('/checkout/:id')
    .post(protectRoutes, 
        allowedTo('user'),
        validation(S.paramsIdVal), 
        O.onlinePayment)
        
orderRoutes.post('/webhook', 
    express.raw({type: 'application/json'}), 
    O.createOnlineOrder)

export default orderRoutes;