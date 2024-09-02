import express from 'express';
import { galleryPage } from '../controllers/artController.mjs'; //esto trae la funcion que haga el controlador

const router = express.Router();

router.get('/gallery', galleryPage);

export default router;
