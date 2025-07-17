import {ItemDeLaOrden} from '../models/index.js';
import RepositoryBase from '../repositories/base.js';

class ItemDeLaOrdenRepository extends RepositoryBase {
  constructor() {
    super(ItemDeLaOrden);
  }

  async addProducto(idOrden, idProducto, cantidad) {
    return await this.model.create({ idOrden, idProducto, cantidad });
  }

  async findAllByOrden(idOrden) {
    return await this.model.findAll({ where: { idOrden } });
  }
}

export default new ItemDeLaOrdenRepository();
