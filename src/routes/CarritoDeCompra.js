import express from 'express'
import controller from '../controllers/CarritoDeCompra.js'

const router = express.Router();

router.post('/create/', controller.crearCarrito);
router.delete('/delete/', controller.deleteItemFromCarrito);
router.delete('/delete-all/', controller.deleteAllItemsFromCarrito);
router.post('/add-item/', controller.addItemToCarrito);
router.get('/items/:idUsuario', controller.getItemsFromCarrito);

export default router;