const db = require('../config/db');
const registrarVenta = async (venta) => {
    const { clienteId, productos } = venta;
    const [cliente] = await db.query('SELECT * FROM clientes WHERE id = ?', [clienteId]);
    if (cliente.length === 0) throw new Error('Cliente no existe');

    let total = 0;
    for (let item of productos) {
        const [prod] = await db.query('SELECT * FROM productos WHERE id = ?', [item.productoId]);
        if (prod.length === 0) throw new Error(`Producto ID ${item.productoId} no existe`);
        if (prod[0].stock < item.cantidad) {
            throw { status: 400, message: "Stock insuficiente", producto: prod[0].nombre, stockDisponible: prod[0].stock, cantidadSolicitada: item.cantidad };
        }
        total += prod[0].precio * item.cantidad;
    }

    const [resultVenta] = await db.query('INSERT INTO ventas (cliente_id, fecha, total) VALUES (?, CURDATE(), ?)', [clienteId, total]);
    const ventaId = resultVenta.insertId;

    for (let item of productos) {
        await db.query('INSERT INTO venta_detalles (venta_id, producto_id, cantidad) VALUES (?, ?, ?)', [ventaId, item.productoId, item.cantidad]);
        await db.query('UPDATE productos SET stock = stock - ? WHERE id = ?', [item.cantidad, item.productoId]);
    }
    return { success: true, message: "Venta registrada", total };
};
module.exports = { registrarVenta };