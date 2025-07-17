import RepositoryBase from '../repositories/base.js';
import {CarritoDeCompra} from '../models/index.js';
import ItemRepo from './ItemDeCarrito.js';

class CarritoDeCompraRepository extends RepositoryBase {
  constructor() {
    super(CarritoDeCompra);
  }

  async findByUsuario(idUsuario) {
    const carrito = await this.model.findOne({ where: { idUsuario } });
    return carrito ? carrito : null;
  }

  async deleteItem(idCarrito, idProducto) {
    return await ItemRepo.deleteByProductoYCarrito(idCarrito, idProducto);
  }

  async deleteAllItems(idCarrito) {
    return await ItemRepo.deleteAllByCarrito(idCarrito);
  }

  async updateItem(idCarrito, idProducto, cantidad) {
    return await ItemRepo.updateCantidad(idCarrito, idProducto, cantidad);
  }

  async addItem(idCarrito, idProducto, cantidad) {
    return await ItemRepo.addProducto(idCarrito, idProducto, cantidad);
  }

  async getItems(idCarrito) {
    return await ItemRepo.getProductosByCarrito(idCarrito);
  }
}

export default new CarritoDeCompraRepository();
