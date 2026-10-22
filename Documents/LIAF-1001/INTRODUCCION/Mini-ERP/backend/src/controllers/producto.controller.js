const productoService = require('../services/producto.service');

const getProductos = async (req, res) => {
    try {
        const productos = await productoService.obtenerTodos();
        res.status(200).json({ success: true, data: productos });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const postProducto = async (req, res) => {
    try {
        const nuevoProducto = await productoService.crear(req.body);
        res.status(201).json({ success: true, data: nuevoProducto });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { getProductos, postProducto };