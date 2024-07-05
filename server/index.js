const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');
const taskRoutes = require('./routes/tasks');
const usuarioRoutes = require('./routes/usuario');
const session = require('express-session');
const app = express();


app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use('/api/tasks', taskRoutes);
app.use('/api/usuario',usuarioRoutes);
app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

app.use(session({
    secret: 'secreto',
    resave: false,
    saveUninitialized: false
    }));

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Servidor escuchando en el puerto ${PORT}`);
});


