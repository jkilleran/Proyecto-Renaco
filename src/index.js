const express = require('express');
const path = require('path');
const app = express();
const bodyParser = require('body-parser');
const supplierRoutes = require('./routes/suppliers');
const userRoutes = require('./routes/users');
const sequelize = require('./config/database');

// Middleware para analizar JSON
app.use(bodyParser.json());

// Middleware para servir archivos estáticos desde la carpeta "public"
app.use(express.static(path.join(__dirname, 'public')));

// Rutas para manejar solicitudes relacionadas con proveedores
app.use('/api/suppliers', supplierRoutes);

// Rutas para manejar solicitudes relacionadas con usuarios
app.use('/api/users', userRoutes);

// Ruta para manejar el acceso al dashboard basado en el tipo de usuario
app.get('/dashboard', (req, res) => {
    console.log('Mostrando el dashboard');
    res.sendFile(path.join(__dirname, 'public', 'dashboard.html')); // Servir el archivo HTML del dashboard
});


// Ruta para servir el login
app.get('/login', (req, res) => {
    console.log('Mostrando la página de login');
    res.sendFile(path.join(__dirname, 'public', 'login.html'));
});

// Ruta para servir el archivo HTML principal
app.get('/', (req, res) => {
    console.log('Mostrando la página principal');
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Probar la conexión a la base de datos antes de iniciar el servidor
sequelize.authenticate()
    .then(() => {
        console.log('Conexión a la base de datos establecida exitosamente.');
        
        // Sincronizar la base de datos (crear tablas, etc.)
        return sequelize.sync();
    })
    .then(() => {
        console.log('Sincronización de la base de datos completada.');
        
        // Iniciar el servidor
        app.listen(3000, () => {
            console.log('Servidor escuchando en http://localhost:3000');
        });
    })
    .catch(err => {
        console.error('Error durante la conexión o sincronización de la base de datos:', err);
    });
