const db = require('../db');

exports.getAllTasks = (req, res) => {
    db.query('SELECT * FROM tareas', (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json(results);
    });
}; 

exports.createTask = (req, res) => {
    const { title, description } = req.body;
    db.query('INSERT INTO tareas (titulo, descripcion) VALUES (?, ?)', 
[title, description], (err, results) => {
        if (err) {
            //error 500 error interno del servidor
            return res.status(500).json({ error: err.message });
        }
        res.status(201).json({ id: results.insertId, title, description 
});
    });
};

exports.updateTask = (req, res) => {
    const { id } = req.params;
    const { title, description, completed } = req.body;
    db.query('UPDATE tareas SET titulo = ?, descripcion = ? , estado = ? WHERE id = ?', 
[title, description, completed, id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.json({ id, title, description, completed });
    });
};

exports.deleteTask = (req, res) => {
    const { id } = req.params;
    db.query('DELETE FROM tareas WHERE id = ?', [id], (err, results) => {
        if (err) {
            return res.status(500).json({ error: err.message });
        }
        res.status(204).send();
    });
};
