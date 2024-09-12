
import express from 'express';
import { Gallery } from '../controllers/galleryController.mjs';
const galleryRouter = express.Router();

galleryRouter.get('/', Gallery.getAll);
galleryRouter.get('/:id', Gallery.getIndividual);

export default galleryRouter;



