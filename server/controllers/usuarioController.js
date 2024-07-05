const bcrypt = require('bcrypt');
const db = require('../db'); 


exports.registro = async (req, res) => {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query('INSERT INTO usuario (usuario, password) VALUES (?, ?)', [username, hashedPassword], (err, results) => {
    if (err) {
        return res.status(500).json({ error: err.message });
    }
    res.status(201).json({ message: 'Usuario registraado' });
    });
};

exports.login = (req, res, next) => {
    const { username, password } = req.body;

    db.query('SELECT * FROM usuario WHERE usuario = ?', [username], async (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        if (results.length === 0) {
            return res.status(400).json({ error: 'Usuario no encontrado' });
        }

        const user = results[0];
        const match = await bcrypt.compare(password, user.password);

        if (!match) {
            return res.status(400).json({ error: 'Contraseña incorrecta' });
        }

        res.json({ message: 'Inicio de sesión exitoso', user });
    });
};



