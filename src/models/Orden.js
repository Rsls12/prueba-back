import sequelize from '../config/database.js';
import { DataTypes } from 'sequelize';

const Orden = sequelize.define('orden', {
  id: {
    type: DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  idUsuario: {
    type: DataTypes.INTEGER,
    allowNull: false
  },
  fecha: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  },
  total: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  subTotal: {
    type: DataTypes.INTEGER,
    allowNull: false,
    defaultValue: 0
  },
  metodoDeEntrega: {
    type: DataTypes.STRING,
    allowNull: false
  },
  nroTarjeta: {
    type: DataTypes.STRING,
    allowNull: false
  },
  tipoTarjeta: {
    type: DataTypes.STRING,
    allowNull: false
  }
});

export default Orden;
