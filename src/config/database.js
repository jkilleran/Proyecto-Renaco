const { Sequelize } = require('sequelize');

// Configuración de la base de datos para Render
const sequelize = new Sequelize('renaco_db', 'renaco_db_user', 'ufakjM8gL3pcQffUVphA7KCMEe14OX1Y', {
  host: 'dpg-crs0titds78s73dv35ug-a.oregon-postgres.render.com',
  dialect: 'postgres',
  port: 5432, // Puerto por defecto de PostgreSQL
  logging: console.log, // Habilitar logging para depurar consultas SQL si es necesario (puedes desactivarlo en producción)
  dialectOptions: {
    ssl: {
      require: true, // Render requiere conexión SSL
      rejectUnauthorized: false // Aceptar certificados no verificados (Render usa certificados autofirmados)
    }
  },
  pool: {
    max: 5, // Máximo número de conexiones en el pool
    min: 0, // Mínimo número de conexiones
    acquire: 30000, // Tiempo máximo en milisegundos para adquirir una conexión
    idle: 10000 // Tiempo máximo en milisegundos que una conexión puede estar inactiva antes de ser liberada
  }
});

// Probar la conexión a la base de datos
sequelize.authenticate()
  .then(() => {
    console.log('Conexión a la base de datos establecida exitosamente.');
  })
  .catch((err) => {
    console.error('Error al conectar con la base de datos:', err);
  });

module.exports = sequelize;
