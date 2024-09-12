import express from 'express';
import  path  from 'node:path';
import  homeRouter  from './routes/home.mjs';
import  galleryRouter  from './routes/gallery.mjs';
import  errorRouter  from './routes/error.mjs';

const directorioName = path.dirname(new URL(import.meta.url).pathname).substring(1);
//const directorioName = path.dirname(new URL(import.meta.url).pathname); //direccion de la carpeta del directorio
const app = express();
const port = process.env.PORT || 3000;


//aca configuro la carpeta public de los archivos estaticos
app.use(express.static(path.join(directorioName, 'public')));

//configuro pug aca
app.set('view engine','pug'); //le indicamos a express que motor de renderizado vamnos a usar
app.set('views', path.join(directorioName, 'views'));//le indicamos donde van a estar las vistas
app.locals.basedir = path.join(directorioName, 'views'); 

//llamo a la ruta de el home :)
app.get('/', homeRouter);
//ahora llamo a la ruta de gallery
app.use('/gallery',galleryRouter);

app.use('*', errorRouter);

app.listen(port, () => {
    console.log('Servidor funcionando en ',port);
});

export default app;