const auth = (req, res, next) => {
    const token = req.header('Authorization');

    // Validamos que manden el token y que sea exactamente "Bearer mi-token-secreto"
    if (token !== 'Bearer mi-token-secreto') {
        return res.status(401).json({ 
            success: false, 
            error: "No autorizado. Token inválido o ausente." 
        });
    }

    next(); // Si el token es correcto, pasa al controlador
};

module.exports = auth;