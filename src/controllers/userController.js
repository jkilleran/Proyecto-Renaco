const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/userModel'); // Modelo de usuario

// Registro de usuario
router.post('/register', async (req, res) => {
    const { username, password, email, user_type } = req.body;
    
    try {
        // Encriptar la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = await User.create({ username, password: hashedPassword, email, user_type });
        res.status(201).json({ message: 'Usuario creado', user });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// Inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    
    try {
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error: 'Contraseña incorrecta' });

        // Generar token JWT
        const token = jwt.sign({ id: user.id, user_type: user.user_type }, 'tu_secreto', { expiresIn: '1h' });
        res.json({ message: 'Inicio de sesión exitoso', token });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
