
import {Router} from 'express';
import { render404 } from '../controllers/404Controller.mjs';
const errorRouter = Router();

errorRouter.use('*',render404);

export default error404;