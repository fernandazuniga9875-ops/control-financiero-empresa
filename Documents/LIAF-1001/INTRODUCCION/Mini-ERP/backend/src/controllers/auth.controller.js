const login = (req, res) => {
    const { usuario, password } = req.body;

    // Validación simple como pide la práctica
    if (usuario === 'admin' && password === '123456') {
        res.status(200).json({ 
            success: true, 
            message: "Login exitoso",
            token: "Bearer mi-token-secreto" 
        });
    } else {
        res.status(401).json({ 
            success: false, 
            error: "Credenciales incorrectas" 
        });
    }
};

module.exports = { login };