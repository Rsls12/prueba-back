import RepositoryBase from '../repositories/base.js';
import {ItemDeCarrito} from '../models/index.js';

class ItemDeCarritoRepository extends RepositoryBase {
  constructor() {
    super(ItemDeCarrito);
  }

  async deleteByProductoYCarrito(idCarrito, idProducto) {
    return await this.model.destroy({ where: { idCarrito, idProducto } });
  }

  async deleteAllByCarrito(idCarrito) {
    return await this.model.destroy({ where: { idCarrito } });
  }

  async updateCantidad(idCarrito, idProducto, cantidad) {
    return await this.model.update(
      { cantidad },
      { where: { idCarrito, idProducto } }
    );
  }

  async addProducto(idCarrito, idProducto, cantidad) {
    return await this.model.create({ idCarrito, idProducto, cantidad });
  }

  async getProductosByCarrito(idCarrito) {
    return await this.model.findAll({ where: { idCarrito } });
  }
}

export default new ItemDeCarritoRepository();
