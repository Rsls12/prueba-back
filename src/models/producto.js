import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const model = sequelize.define('producto', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  nombre: {
    type: DataTypes.STRING,
    allowNull: false
  },
  descripcion: {
    type: DataTypes.STRING,
    allowNull: false
  },
  marca: {
    type: DataTypes.STRING,
    allowNull: false
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  precio: {
    type: DataTypes.DECIMAL,
    allowNull: false
  },
  imagen: {
    type: DataTypes.TEXT,
    allowNull: false
  },
  idCategoria: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

export default model;