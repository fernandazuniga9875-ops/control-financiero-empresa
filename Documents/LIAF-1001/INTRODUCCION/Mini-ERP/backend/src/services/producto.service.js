const db = require('../config/db');

const obtenerTodos = async () => {
    const [rows] = await db.query('SELECT * FROM productos');
    return rows;
};

const crear = async (producto) => {
    const { nombre, codigo, precio, stock, categoria } = producto;
    const [result] = await db.query(
        'INSERT INTO productos (nombre, codigo, precio, stock, categoria) VALUES (?, ?, ?, ?, ?)',
        [nombre, codigo, precio, stock, categoria]
    );
    return { id: result.insertId, ...producto };
};

module.exports = { obtenerTodos, crear };