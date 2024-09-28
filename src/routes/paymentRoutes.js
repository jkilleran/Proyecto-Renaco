const express = require('express');
const router = express.Router();
const Payment = require('../models/paymentModel');
const Supplier = require('../models/supplierModel');

// Crear un pago (simulado)
router.post('/', async (req, res) => {
  const { amount, supplierId, userId } = req.body;

  try {
    const supplier = await Supplier.findByPk(supplierId);
    if (!supplier) {
      return res.status(404).json({ error: 'Proveedor no encontrado' });
    }

    const payment = await Payment.create({
      amount,
      supplierId,
      userId,
      status: 'pending',  // El pago empieza como pendiente
    });

    res.status(201).json({
      message: 'Pago creado correctamente',
      payment,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al crear el pago' });
  }
});

// Obtener todos los pagos
router.get('/', async (req, res) => {
  try {
    const payments = await Payment.findAll();
    res.json(payments);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener los pagos' });
  }
});

// Obtener un pago por ID
router.get('/:id', async (req, res) => {
  const { id } = req.params;

  try {
    const payment = await Payment.findByPk(id);
    if (!payment) {
      return res.status(404).json({ error: 'Pago no encontrado' });
    }

    res.json(payment);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Error al obtener el pago' });
  }
});

module.exports = router;
