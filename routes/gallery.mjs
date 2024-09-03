
import {Router} from 'express';
import { getAll } from '../controllers/galleryController.mjs';
const galleryRouter = Router();

galleryRouter.get('/gallery',getAll);

module.exports = galleryRouter;



