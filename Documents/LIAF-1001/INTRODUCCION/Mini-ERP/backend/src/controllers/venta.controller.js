const ventaService = require('../services/venta.service');
const postVenta = async (req, res) => {
    try {
        const resultado = await ventaService.registrarVenta(req.body);
        res.status(201).json(resultado);
    } catch (error) {
        if (error.message === "Stock insuficiente") {
            return res.status(400).json({ success: false, ...error });
        }
        res.status(500).json({ success: false, message: error.message });
    }
};
module.exports = { postVenta };