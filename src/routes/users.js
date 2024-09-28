const express = require('express');
const bcrypt = require('bcryptjs'); // Asegurándonos de usar bcryptjs
const router = express.Router();
const User = require('../models/userModel');
const sequelize = require('../config/database'); // Asegúrate de importar sequelize para las transacciones

// Ruta para el inicio de sesión
router.post('/login', async (req, res) => {
    const { username, password } = req.body;
    console.log(`Intento de inicio de sesión con usuario: ${username}, Contraseña: ${password}`);

    try {
        console.log('Buscando usuario en la base de datos...');
        
        // Buscar el usuario por nombre de usuario
        const user = await User.findOne({ where: { username } });
        
        if (!user) {
            console.error('Usuario no encontrado');
            return res.status(404).json({ error: 'Usuario no encontrado' });
        }

        console.log(`Usuario encontrado: ${user.username}, Verificando contraseña...`);
        
        // Comparar la contraseña usando bcryptjs
        const isValid = await bcrypt.compare(password, user.password);
        
        console.log(`Resultado de la verificación de contraseña: ${isValid}`);
        
        if (!isValid) {
            console.error('Contraseña incorrecta');
            return res.status(401).json({ error: 'Contraseña incorrecta' });
        }

        console.log('Contraseña correcta, devolviendo respuesta exitosa.');
        
        // No generamos token aquí, simplemente retornamos el éxito de inicio de sesión
        return res.json({ 
            message: 'Inicio de sesión exitoso', 
            user_type: user.user_type 
        });
        
    } catch (error) {
        console.error('Error en el inicio de sesión:', error.message);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});

router.post('/register', async (req, res) => {
    const { username, email, password, user_type } = req.body;
    
    // Verifica qué datos llegan
    console.log('Datos recibidos en la solicitud:', { username, email, password, user_type });

    if (!username || !email || !password || !user_type) {
        return res.status(400).json({ error: 'Faltan valores requeridos para el registro.' });
    }

    try {
        // Verifica si el usuario ya existe
        const existingUser = await User.findOne({ where: { username } });
        if (existingUser) {
            return res.status(409).json({ error: 'El usuario ya existe.' });
        }

        // Hashear la contraseña antes de guardarla
        const hashedPassword = await bcrypt.hash(password, 10);

        // Crear el nuevo usuario
        const newUser = await User.create({
            username,
            email,
            password: hashedPassword,
            user_type,
        });

        res.status(201).json({ message: 'Usuario registrado exitosamente', user: newUser });
    } catch (error) {
        console.error('Error en el registro del usuario:', error);
        return res.status(500).json({ error: 'Error interno del servidor' });
    }
});


module.exports = router;
