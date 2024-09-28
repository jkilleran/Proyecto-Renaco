const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

// Definir el modelo de proveedor
const Supplier = sequelize.define('Supplier', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  code: {
    type: DataTypes.STRING,
    unique: true,
    allowNull: false,
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  phone: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  connected_users: {
    type: DataTypes.INTEGER,
    defaultValue: 0,
  },
}, {
  tableName: 'suppliers',
  timestamps: false,
});

module.exports = Supplier;
