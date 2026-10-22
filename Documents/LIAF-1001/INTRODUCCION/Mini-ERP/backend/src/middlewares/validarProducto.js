const validarProducto = (req, res, next) => {
    const { nombre, codigo, precio, stock } = req.body;

    if (!nombre || !codigo) {
        return res.status(400).json({ success: false, error: "Nombre y código son obligatorios" });
    }
    if (precio <= 0) {
        return res.status(400).json({ success: false, error: "El precio debe ser mayor a 0" });
    }
    if (stock < 0) {
        return res.status(400).json({ success: false, error: "El stock no puede ser negativo" });
    }

    next();
};

module.exports = validarProducto;