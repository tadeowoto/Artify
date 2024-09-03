import  express  from 'express';
import { path, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { homeRouter } from './routes/home.mjs';
import {galleryRouter} from './routes/gallery.mjs';
import {errorRouter} from './routes/error.mjs';


const __fileName = fileURLToPath(import.meta.url); //URL del archivo actual
const __dirName = dirname(__fileName); // saca el directorio a partir de la URL de filename
const app = express();
const port = 3000;

//aca configuro la carpeta static
app.use(express.static(path.join(__dirName), 'public'));

//configuro pug aca
app.set('view engine','pug'); //le indicamos a express que motor de renderizado vamnos a usar
app.set('views', path.join(__dirname, 'views')); //le indicamos donde van a estar las vistas

//llamo a la ruta de el home :)
app.get('/', homeRouter);
//ahora llamo a la ruta de gallery
app.get('/gallery',galleryRouter);

app.use('*', errorRouter);

app.listen(port, () => {
    console.log('Servidor funcionando en ',port);
});