const express = require('express');
const router = express.Router();
const ventaController = require('../controllers/venta.controller');
router.post('/', ventaController.postVenta);
module.exports = router;