import express from 'express';
import cors from 'cors';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';

import productoRoutes from './src/routes/producto.js'
import CarritoDeCompraRouter from './src/routes/CarritoDeCompra.js'
import OrdenRouter from './src/routes/Orden.js'
import UsuarioRouter from './src/routes/Usuario.js'
import CategoriaRouter from './src/routes/categoria.js';
import loginRouter from './src/routes/login.js';

const app = express();
app.use(cors());
//app.use(bodyParser.json());
app.use(express.json()); // Para JSON
app.use(express.urlencoded({ extended: true })); // Para formularios

app.get('/', (req, res) => {
  res.send('API de Tienda Online');
});

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Servir archivos estáticos de la carpeta uploads
app.use('/uploads', express.static(path.join(__dirname, 'src/uploads')));
app.use('/producto', productoRoutes); 
app.use('/Usuario',UsuarioRouter); 
app.use('/Carrito', CarritoDeCompraRouter); 
app.use('/Orden',OrdenRouter);
app.use('/Categoria', CategoriaRouter);
app.use('/login', loginRouter);

export default app;