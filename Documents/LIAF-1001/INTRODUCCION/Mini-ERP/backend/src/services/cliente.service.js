const db = require('../config/db');

const obtenerTodos = async () => {
    const [rows] = await db.query('SELECT * FROM clientes');
    return rows;
};

const crear = async (cliente) => {
    const { nombre, rfc, telefono, correo } = cliente;
    const [result] = await db.query(
        'INSERT INTO clientes (nombre, rfc, telefono, correo) VALUES (?, ?, ?, ?)',
        [nombre, rfc, telefono, correo]
    );
    return { id: result.insertId, ...cliente };
};

module.exports = { obtenerTodos, crear };