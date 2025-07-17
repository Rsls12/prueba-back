import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const ItemDeLaOrden = sequelize.define('itemDeLaOrden', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idOrden: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  idProducto: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  cantidad: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 1
  }
});

export default ItemDeLaOrden;
