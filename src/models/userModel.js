const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Mostrar un mensaje cuando el modelo User esté siendo cargado
console.log('Cargando el modelo de Usuario...');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true, // El nombre de usuario debe ser único
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isEmail: true, // Validación para asegurar que es un formato de correo válido
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false, // La contraseña es requerida
    validate: {
      len: [6, 100], // Longitud mínima de la contraseña (al menos 6 caracteres)
    },
  },
  user_type: { 
    type: DataTypes.ENUM('Cliente', 'Suplidor', 'Administrador'), // Define los roles permitidos
    allowNull: false, // El campo de tipo de usuario es obligatorio
  },
}, {
  tableName: 'users', // Nombre de la tabla en la base de datos
  timestamps: true, // Agregar campos createdAt y updatedAt
  hooks: {
    beforeCreate: (user) => {
      // Mostrar un mensaje con los datos que se están creando
      console.log('Antes de crear el usuario:', user.toJSON());
    },
    afterCreate: (user) => {
      // Mostrar un mensaje una vez que se ha creado el usuario
      console.log('Usuario creado exitosamente:', user.toJSON());
    },
    beforeUpdate: (user) => {
      // Mostrar mensaje antes de actualizar un usuario
      console.log('Antes de actualizar el usuario:', user.toJSON());
    },
    afterUpdate: (user) => {
      // Mostrar mensaje después de actualizar un usuario
      console.log('Usuario actualizado exitosamente:', user.toJSON());
    },
    beforeDestroy: (user) => {
      // Mostrar mensaje antes de eliminar un usuario
      console.log('Antes de eliminar el usuario:', user.toJSON());
    },
    afterDestroy: (user) => {
      // Mostrar mensaje después de eliminar un usuario
      console.log('Usuario eliminado exitosamente:', user.toJSON());
    }
  }
});

// Probar si la conexión al modelo funciona correctamente
User.sync({ alter: true }) // Esto sincroniza los cambios en el modelo con la base de datos
  .then(() => {
    console.log('Modelo User sincronizado correctamente.');
  })
  .catch((err) => {
    console.error('Error al sincronizar el modelo User:', err);
  });

module.exports = User;
