const express = require('express');
const router = express.Router();
const productoController = require('../controllers/producto.controller');
const validarProducto = require('../middlewares/validarProducto'); // Importar

// Agregar validarProducto en medio de la ruta y el controlador:
router.post('/', validarProducto, productoController.postProducto);
router.get('/', productoController.getProductos);

module.exports = router;