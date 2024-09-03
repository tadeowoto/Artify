//trae el la funcion renderHome del controlador y cuando se acceda
//a la ruta / (home) se va a llamar
import {express} from 'express';
import {renderHome} from '../controllers/artController.mjs';
const homeRouter = express.Router(); 

homeRouter.get('/',renderHome);

module.exports = homeRouter;
