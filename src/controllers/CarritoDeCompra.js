import CarritoDeCompra from '../repositories/CarritoDeCompras.js';
import Productos from '../repositories/producto.js';

const crearCarrito = async (req, res) => {
  const { idUsuario } = req.body;
  try {
    const existente = await CarritoDeCompra.findByUsuario(idUsuario);
    if (existente) return res.status(400).json({ mensaje: 'El usuario ya tiene un carrito' });

    const carrito = await CarritoDeCompra.create({ idUsuario });
    res.status(201).json(carrito);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear el carrito', error: err.message });
  }
};

const deleteItemFromCarrito = async (req, res) => {
  const { idUsuario, idProducto } = req.body;
  const carrito = await CarritoDeCompra.findByUsuario(idUsuario);
  try {
    await CarritoDeCompra.deleteItem(carrito.id, idProducto);
    res.json({ mensaje: 'Producto eliminado del carrito' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar producto', error: err.message });
  }
};

const deleteAllItemsFromCarrito = async (req, res) => {
  const { idUsuario } = req.body;
  const carrito = await CarritoDeCompra.findByUsuario(idUsuario);
  try {
    await CarritoDeCompra.deleteAllItems(carrito.id);
    res.json({ mensaje: 'Todos los productos eliminados del carrito' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al eliminar productos', error: err.message });
  }
};

const updateItemFromCarrito = async (req, res) => {
  const { idUsuario, idProducto, cantidad } = req.body;
  const carrito = await CarritoDeCompra.findByUsuario(idUsuario);
  try {
    await CarritoDeCompra.updateItem(carrito.id, idProducto, cantidad);
    res.json({ mensaje: 'Producto actualizado en el carrito' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al actualizar producto', error: err.message });
  }
};

const addItemToCarrito = async (req, res) => {
  const { idUsuario, idProducto, cantidad } = req.body;
  const carrito = await CarritoDeCompra.findByUsuario(idUsuario);
  try {
    await CarritoDeCompra.addItem(carrito.id, idProducto, cantidad);
    res.json({ mensaje: 'Producto agregado al carrito' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al agregar producto', error: err.message });
  }
};

const getItemsFromCarrito = async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const carrito = await CarritoDeCompra.findByUsuario(idUsuario);
    if (!carrito) return res.status(404).json({ mensaje: 'No se encontró carrito para el usuario' });

    const items = await CarritoDeCompra.getItems(carrito.id);
    var productos = [];
    for (const item of items) {
      const producto = await Productos.findWithCategoria(item.idProducto);
      productos.push({
        ...item.get({ plain: true }),  // elimina los dataValues, _options, etc.
        producto
      });
    }
    res.json(productos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener productos del carrito', error: err.message });
  }
};


export default {
  crearCarrito,
  deleteItemFromCarrito,
  deleteAllItemsFromCarrito,
  updateItemFromCarrito,
  addItemToCarrito,
  getItemsFromCarrito
};