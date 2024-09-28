const express = require('express');
const router = express.Router();
const Supplier = require('../models/supplierModel');

// Ruta para obtener todos los proveedores
router.get('/', async (req, res) => {
  try {
    const suppliers = await Supplier.findAll();
    res.json(suppliers);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proveedores.' });
  }
});

// Ruta para obtener un proveedor por ID
router.get('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ error: 'Proveedor no encontrado.' });
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: 'Error al obtener proveedor.' });
  }
});

// Ruta para agregar un nuevo proveedor
router.post('/', async (req, res) => {
  try {
    const supplier = await Supplier.create(req.body);
    res.status(201).json(supplier);
  } catch (error) {
    res.status(500).json({ error: 'Error al agregar proveedor.' });
  }
});

// Ruta para editar un proveedor
router.put('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ error: 'Proveedor no encontrado.' });

    await supplier.update(req.body);
    res.json(supplier);
  } catch (error) {
    res.status(500).json({ error: 'Error al actualizar proveedor.' });
  }
});

// Ruta para eliminar un proveedor
router.delete('/:id', async (req, res) => {
  try {
    const supplier = await Supplier.findByPk(req.params.id);
    if (!supplier) return res.status(404).json({ error: 'Proveedor no encontrado.' });

    await supplier.destroy();
    res.json({ message: 'Proveedor eliminado correctamente.' });
  } catch (error) {
    res.status(500).json({ error: 'Error al eliminar proveedor.' });
  }
});

module.exports = router;
