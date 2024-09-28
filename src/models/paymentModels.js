const { DataTypes } = require('sequelize');
const sequelize = require('../config/database');

const Payment = sequelize.define('Payment', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  amount: {
    type: DataTypes.FLOAT,
    allowNull: false,
  },
  supplierId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'suppliers',  // Relaciona con el modelo Supplier
      key: 'id',
    },
  },
  userId: {
    type: DataTypes.INTEGER,
    allowNull: false,  // Suponemos que los usuarios están registrados
  },
  status: {
    type: DataTypes.ENUM('pending', 'completed'),
    defaultValue: 'pending',  // Todos los pagos comienzan como 'pendiente'
  },
}, {
  tableName: 'payments',
  timestamps: true,  // Timestamps para createdAt y updatedAt
});

module.exports = Payment;
