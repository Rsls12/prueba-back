import { where } from 'sequelize';
import Orden from '../repositories/Orden.js';
import Categorias from '../repositories/categoria.js';
import productos from '../repositories/producto.js';

const crearOrden = async (req, res) => {
  const { idUsuario, total, subTotal, metodoDeEntrega, nroTarjeta, tipoTarjeta } = req.body;
  try {
    const nuevaOrden = await Orden.create({ idUsuario, total, subTotal, metodoDeEntrega, nroTarjeta, tipoTarjeta });
    res.status(201).json(nuevaOrden);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al crear la orden', error: err.message });
  }
};

const addItemToOrden = async (req, res) => {
  const { idOrden, idProducto, cantidad } = req.body;
  try {
    await Orden.addProducto(idOrden, idProducto, cantidad);
    res.json({ mensaje: 'Producto agregado a la orden' });
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al agregar producto a la orden', error: err.message });
  }
};

const findAllOrdenes = async (req, res) => {
  try {
    const ordenes = await Orden.findAll();
    res.json(ordenes);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener las órdenes', error: err.message });
  }
};

const getItemsFromOrden = async (req, res) => {
  const { idUsuario } = req.params;

  try {
    const ordenes = await Orden.findAllByUsuario(idUsuario);
    const ordenesConProductos = [];

    for (const orden of ordenes) {
      const itemsDeOrden = await Orden.getProductosByOrden(orden.id);

      const productosFormateados = [];

      for (const item of itemsDeOrden) {
        const producto = await productos.findWithCategoria(item.idProducto);

        productosFormateados.push({
          cantidad: item.cantidad,
          producto: {
            id: producto.id,
            nombre: producto.nombre,
            precio: producto.precio,
            imagen: producto.imagen,
            categoria: producto.categoria?.nombre ?? null
          }
        });
      }

      ordenesConProductos.push({
        ...orden.get({ plain: true }),
        productos: productosFormateados
      });
    }

    res.json(ordenesConProductos);
  } catch (err) {
    res.status(500).json({ mensaje: 'Error al obtener productos de la orden', error: err.message });
  }
};


export default { crearOrden, addItemToOrden, getItemsFromOrden, findAllOrdenes };