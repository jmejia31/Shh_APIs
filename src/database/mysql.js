//constante para el paquete de MySQL
const mysql = require('mysql');

//conectar a la base de datos (MySQL)
var mysqlconnection = mysql.createConnection({

    host: '212.1.208.51',
    user: 'u983168220_shh',
    password: 'Shh.1234567',
    database: 'u983168220_shh',
    multipleStatements: true

});

module.exports = { mysqlconnection }