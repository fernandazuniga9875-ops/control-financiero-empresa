const express = require('express');
const cors = require('cors');
const db = require('./config/db');
require('dotenv').config();

const app = express();

// 1. Middlewares Globales
app.use(cors());
app.use(express.json());

const logger = require('./middlewares/logger');
app.use(logger);

const authMiddleware = require('./middlewares/auth');

// 2. Rutas de Autenticación (Pública)
const authRoutes = require('./routes/auth.routes');
app.use('/api/auth', authRoutes);

// 3. Rutas Protegidas (Requieren Token)
const productoRoutes = require('./routes/producto.routes');
app.use('/api/productos', authMiddleware, productoRoutes);

const clienteRoutes = require('./routes/cliente.routes');
app.use('/api/clientes', authMiddleware, clienteRoutes);

const ventaRoutes = require('./routes/venta.routes');
app.use('/api/ventas', authMiddleware, ventaRoutes);

// 4. Ruta de prueba
app.get('/', (req, res) => {
    res.json({ message: "API del Mini ERP funcionando" });
});

// 5. Encender el servidor
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});