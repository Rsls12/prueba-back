import Usuario from './Usuario.js';
import Orden from './Orden.js';
import CarritoDeCompra from './CarritoDeCompra.js';
import ItemDeCarrito from './ItemDeCarrito.js';
import ItemDeLaOrden from './ItemDeLaOrden.js';
import Producto from './producto.js';
import Categoria from './categoria.js';

Usuario.hasOne(CarritoDeCompra, { foreignKey: 'idUsuario' });
CarritoDeCompra.belongsTo(Usuario, { foreignKey: 'idUsuario' });

// Usuario 1 - N Ordenes
Usuario.hasMany(Orden, { foreignKey: 'idUsuario' });
Orden.belongsTo(Usuario, { foreignKey: 'idUsuario' });

// Carrito N - N Productos (a través de ItemDeCarrito)
CarritoDeCompra.belongsToMany(Producto, { through: ItemDeCarrito, foreignKey: 'idCarrito' });
Producto.belongsToMany(CarritoDeCompra, { through: ItemDeCarrito, foreignKey: 'idProducto' });

// Orden N - N Productos (a través de ItemDeLaOrden)
Orden.belongsToMany(Producto, { through: ItemDeLaOrden, foreignKey: 'idOrden' });
Producto.belongsToMany(Orden, { through: ItemDeLaOrden, foreignKey: 'idProducto' });

// Orden 1 - N
Producto.belongsTo(Categoria, { foreignKey: 'idCategoria' });
Categoria.hasMany(Producto, { foreignKey: 'idCategoria' });

export {
  Producto,
  Usuario,
  CarritoDeCompra,
  Orden,
  ItemDeCarrito,
  ItemDeLaOrden,
  Categoria
};