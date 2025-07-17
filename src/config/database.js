import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();  // Asegúrate de cargar las variables de entorno

const databaseUrl = process.env.POSTGRES_URL;

if (!databaseUrl) {
  throw new Error('La variable de entorno POSTGRES_URL no está configurada.');
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

// Test the database connection
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos exitosa');
  })
  .catch((err) => {
    console.error('Error de conexión a la base de datos:', err);
  });

export default sequelize;
