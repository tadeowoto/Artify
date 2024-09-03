
import express from 'express';
import  render404  from '../controllers/404Controller.mjs';
const errorRouter = express.Router();

errorRouter.use('*',render404);

export default errorRouter;