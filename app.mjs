import { express } from 'express';
import { path, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import gallery from './routes/gallery.mjs'

const __fileName = fileURLToPath(import.meta.url); //URL del archivo actual
const __dirName = dirname(__fileName); // saca el directorio a partir de la URL de filename
const app = express();
const port = 3000;

app.use(express.static(path.join(__dirName), 'public'));

app.get('/gallery', gallery); //que es esto


app.listen(port, () => {
    console.log('Servidor funcionando en ',port);
});