import { Sequelize } from 'sequelize';

// Verifica que la variable de entorno se esté leyendo correctamente
const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) {
  throw new Error('La variable de entorno DATABASE_URL no está configurada.');
}

const sequelize = new Sequelize(databaseUrl, {
  dialect: 'postgres',
  dialectOptions: {
    ssl: {
      require: true,
      rejectUnauthorized: false,
    },
  },
});

export default sequelize;
