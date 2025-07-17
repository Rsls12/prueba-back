import app from './app.js';
import sequelize from './src/config/database.js';

async function main() {
  try {
    const init = process.argv[2];

    // Sincronizar los modelos con la base de datos
    if (init) {
      await sequelize.sync({ force: true }); // Borra y vuelve a crear las tablas
      console.log(' Base de datos actualizada (force:true)');
    } else {
      await sequelize.sync({ force: false }); // Mantiene los datos existentes
      console.log(' Base de datos actualizada (force:false)');
    }

    app.listen(3001, () => {
      console.log(' Servidor corriendo en puerto 3001');
    });

  } catch (error) {
    console.error('Error al conectar o iniciar el servidor:', error);
  }
}

main();