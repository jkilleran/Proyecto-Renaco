const { Sequelize } = require('sequelize');

// Configuración de la base de datos
const sequelize = new Sequelize('suppliers_db', null, null, {
  host: 'localhost',
  dialect: 'postgres',
  port: 5432, // Puerto por defecto de PostgreSQL
});

module.exports = sequelize;
