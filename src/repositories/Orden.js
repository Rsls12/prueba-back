import {Orden} from "../models/index.js";
import RepositoryBase from "./base.js";
import ItemDeLaOrden from "./ItemDeLaOrden.js";
import { Producto } from "../models/index.js";

class OrdenRepository extends RepositoryBase {
  constructor() {
    super(Orden);
  }

async addProducto(idOrden, idProducto, cantidad) {
  // Validar cantidad
  if (!cantidad || isNaN(cantidad) || cantidad <= 0) {
    throw new Error("Cantidad inválida");
  }

  // Buscar el producto
  const producto = await Producto.findByPk(idProducto);
  if (!producto || isNaN(producto.precio)) {
    throw new Error("Producto no encontrado o sin precio válido");
  }

  const monto = producto.precio * cantidad;

  // Crear item de la orden
  await ItemDeLaOrden.create({
    idOrden,
    idProducto,
    cantidad
  });

  // Actualizar total y subtotal
  const orden = await Orden.findByPk(idOrden);
  if (!orden) throw new Error("Orden no encontrada");

  orden.subTotal += monto;
  orden.total += monto;

  await orden.save();

  return orden;
}

  async getProductosByOrden(idOrden) {
    return await ItemDeLaOrden.findAllByOrden(idOrden);
  }

  async findAllByUsuario(idUsuario) {
    return await this.model.findAll({ where: { idUsuario } });
  }

}
export default new OrdenRepository();
