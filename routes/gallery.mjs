
import express from 'express';
import { Gallery } from '../controllers/galleryController.mjs';
const galleryRouter = express.Router();

galleryRouter.get('/', Gallery.getAll);
galleryRouter.get('/:id', Gallery.getIndividual);
galleryRouter.use('*', (req, res) => {
    res.status(404).render('error/404');
});
export default galleryRouter;



