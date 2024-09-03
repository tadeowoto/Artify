
import express from 'express';
import { Gallery } from '../controllers/galleryController.mjs';
const galleryRouter = express.Router();

galleryRouter.get('/gallery', Gallery.getAll);

export default galleryRouter;



