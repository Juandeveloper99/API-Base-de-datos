const mysql = require('mysql2'); //usar la libreria4

//configurar la base de datos
const config = mysql.createConnection({
    host: '127.0.0.1',
    user: 'root',
    password: '6012',
    database: 'proyectos',
});

module.exports = config; // exportar la config