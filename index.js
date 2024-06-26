process.on('uncaughtException', err=> console.log(err));
import express from 'express';
import { dbConnection } from './db/dbConnection.js';
import { init } from './src/modules/routes.js';  
import dotenv from "dotenv";
import cors from 'cors';
dotenv.config();  
const app = express();
const port = 3000;
app.use(express.json());
app.use('/uploads', express.static('uploads'));
app.use(cors()); 
init(app);
dbConnection();
process.on('unhandledRejection', err=> console.log(err));
app.listen(process.env.PORT || port, () => console.log(`Example app listening on port ${port}!`));