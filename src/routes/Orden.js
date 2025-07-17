import express from 'express'
import controller from '../controllers/Orden.js'

const router = express.Router();

router.post('/create/', controller.crearOrden);
router.post('/add-item/', controller.addItemToOrden);
router.get('/items/:idUsuario', controller.getItemsFromOrden);
router.get('/', controller.findAllOrdenes);

export default router;