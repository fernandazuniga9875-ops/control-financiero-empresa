const clienteService = require('../services/cliente.service');

const getClientes = async (req, res) => {
    try {
        const clientes = await clienteService.obtenerTodos();
        res.status(200).json({ success: true, data: clientes });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

const postCliente = async (req, res) => {
    try {
        const nuevo = await clienteService.crear(req.body);
        res.status(201).json({ success: true, data: nuevo });
    } catch (error) {
        res.status(500).json({ success: false, error: error.message });
    }
};

module.exports = { getClientes, postCliente };