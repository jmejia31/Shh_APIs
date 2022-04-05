//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();
const { mysqlconnection } = require('../database/mysql');
const { generarToken } = require('../tools/jwt')

app.post('/ingreso', (req, res) => {
  const { username, password } = req.body;

  //consultar BD y validar que existen tanto username como password


  try {

    let sql = `CALL SELECT_LOGIN(?)`;

    mysqlconnection.query(sql, [username], (err, rows, fields) => {
      if (!err) {
        var datos = rows
        const user = { username: datos[0][0]["USR_PERS"] };

        if (password != datos[0][0]["PASSWD_PERS"]) { return res.status(401).send("Acceso Denegado"); }
        const token = generarToken(user);

        return res.status(200).send({ datos: datos, token: token }
        );
      }
      else {
        console.log(err);
      }


    })

  } catch ({ message }) {
    return res.status(400).send(message);
  }

});

module.exports = app;