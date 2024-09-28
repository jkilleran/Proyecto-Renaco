const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const router = express.Router();
const User = require('../models/userModel');

// Ruta para el inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log('Intento de inicio de sesión con usuario:', username);

    try {
        // Buscar el usuario por nombre de usuario
        const user = await User.findOne({ where: { username } });
        
        // Verificar si el usuario existe
        if (!user) return res.status(404).json({ error: 'Usuario no encontrado' });

        // Comparar la contraseña
        const isValid = await bcrypt.compare(password, user.password);
        if (!isValid) return res.status(401).json({ error: 'Contraseña incorrecta' });

        // Si la contraseña es válida, generar el token con el tipo de usuario
        const token = jwt.sign(
            { id: user.id, user_type: user.user_type }, // Asegurarse de incluir el user_type en el token
            'tu_secreto', 
            { expiresIn: '1h' }
        );
        
        console.log('Token generado:', token);
        
        // Devolver el token y el tipo de usuario
        res.json({ message: 'Inicio de sesión exitoso', token, user_type: user.user_type });
        
    } catch (error) {
        console.error('Error en el inicio de sesión:', error.message);
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
