
import express from 'express';
import renderHome from '../controllers/homeController.mjs';
const homeRouter = express.Router(); 

homeRouter.get('/',renderHome);

export default  homeRouter;
