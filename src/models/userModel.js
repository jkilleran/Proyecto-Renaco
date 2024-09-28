const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // El nombre de usuario debe ser único
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false, // El correo ya no es único
    validate: {
      isEmail: true, // Validación para asegurar que es un formato de correo válido
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // La contraseña es requerida
  },
  user_type: { 
    type: DataTypes.ENUM('Cliente', 'Suplidor', 'Administrador'), // Define los roles permitidos
    allowNull: false, // El campo de tipo de usuario es obligatorio
  },
}, {
  tableName: 'users', // Nombre de la tabla en la base de datos
  timestamps: true, // Agregar campos createdAt y updatedAt
});

module.exports = User;
