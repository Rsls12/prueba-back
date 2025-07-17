import express from 'express';
import controller from '../controllers/producto.js';
import upload from '../middleware/multerConfig.js';

const router = express.Router();

router.get('/', controller.findAllWithCategorias);
router.get('/:id', controller.findWithCategoria);
router.post('/', upload.single('image'), controller.create);
router.put('/', upload.single('image'), controller.update);
router.delete('/:id', controller.remove);

export default router; 
/*prueba*/