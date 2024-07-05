const mysql = require('mysql2');

const connection = mysql.createConnection({
    host:'localhost',
    user: 'root',
    password: '',
    database: 'gestion_tareas'
});

connection.connect((err) => {
    if (err){
        cconsole.error('Error al conectar a la base de datos', err);
        return;
    }
    console.log('Coonexion exitosa');
});
    
module.exports = connection;
