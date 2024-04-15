import express from 'express';
import * as A from  '../auth/controller/auth.controller.js'
import { userExists } from '../../middleware/userExists.js';
import { validation } from '../../middleware/validation.js';
import * as S from './auth.validation.js'
import { protectRoutes } from '../../middleware/authentication.js';
import { allowedTo } from '../../middleware/authorization.js';

const authRoutes = express.Router();

authRoutes.post("/signUp", 
    validation(S.signUpSchemaVal),
    userExists, 
    A.signUp);
authRoutes.post("/signIn",
    validation(S.signInSchemaVal),
    A.signIn);
authRoutes.patch("/changePassword", 
    protectRoutes,
    allowedTo('user','admin'),
    validation(S.changePasswordVal),
    A.changePassword);
authRoutes.patch("/logOut",
    protectRoutes,
    allowedTo('user','admin'), 
    A.logOut);

export default authRoutes;