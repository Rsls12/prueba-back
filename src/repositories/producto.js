import {Producto} from '../models/index.js';
import RepositoryBase from '../repositories/base.js';
import Categorias from './categoria.js';

class ProductoRepository extends RepositoryBase {
  constructor() {
    super(Producto);
  }

  async findWithCategoria(id) {
    const producto = await this.findOne(id);
    if (producto) {
      const categoria = await Categorias.findOne(producto.idCategoria);
      return { ...producto.get({ plain: true }), categoria: categoria?.get({ plain: true }) };
    }
    return null;
  }

    async findAllWithCategorias() {
        const productos = await this.findAll();
        const productosConCategorias = [];
        for (const producto of productos) {
        const categoria = await Categorias.findOne(producto.idCategoria);
        productosConCategorias.push({
            ...producto.get({ plain: true }),
            categoria: categoria?.get({ plain: true })
        });
        }
        return productosConCategorias;
    }
}

export default new ProductoRepository();