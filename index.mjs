import express from 'express';
import  path  from 'node:path';
import  homeRouter  from './routes/home.mjs';
import  galleryRouter  from './routes/gallery.mjs';
import  errorRouter  from './routes/error.mjs';

const directorioName = path.dirname(new URL(import.meta.url).pathname);
//const directorioName = path.dirname(new URL(import.meta.url).pathname).slice(1); //direccion de la carpeta del directoriolocal
const app = express();
const port = process.env.PORT || 3000;


app.use(express.static(path.join(directorioName, 'public')));



app.set('view engine','pug'); 
app.set('views', path.join(directorioName, 'views'));
app.locals.basedir = path.join(directorioName, 'views'); 


app.use('/', homeRouter);
app.use('/gallery',galleryRouter);
app.use('*', errorRouter);


app.listen(port, () => {
    console.log('Servidor funcionando en ',port);
});
