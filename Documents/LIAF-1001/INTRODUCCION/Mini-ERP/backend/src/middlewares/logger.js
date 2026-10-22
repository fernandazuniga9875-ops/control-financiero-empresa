const logger = (req, res, next) => {
    const hora = new Date().toLocaleTimeString();
    console.log(`[${hora}] ${req.method} ${req.url}`);
    next(); // Muy importante para que la petición siga su curso
};

module.exports = logger;