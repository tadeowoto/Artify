import { express } from 'express';
import { path, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import gallery from './routes/gallery.mjs'
import { error } from './routes/error'; 

const __fileName = fileURLToPath(import.meta.url); //URL del archivo actual
const __dirName = dirname(__fileName); // saca el directorio a partir de la URL de filename
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirName), 'public'));
app.set('views', path.join(__dirname, 'views'));
app.set('view engine','pug'); //le indicamos a express que motor de renderizado vamnos a usar

app.get('/', );
app.get('/gallery', ); //preguntar para rutear el home
app.get('/detail', );
app.get('/', );


app.use(error.error404);

app.listen(port, () => {
    console.log('Servidor funcionando en ',port);
});