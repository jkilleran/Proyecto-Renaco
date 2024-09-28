const express = require('express');
const { register, login } = require('../controllers/userController');
const router = express.Router();

// Ruta de registro
router.post('/register', register);

// Ruta de login
router.post('/login', login);

module.exports = router;
