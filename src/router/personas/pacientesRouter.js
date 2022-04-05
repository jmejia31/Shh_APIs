//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');



//TABLA PACIENTES
//Consultando todos los datos en la tabla tbl_pacientes
app.get('/tbl_pacientes/', validarToken, (req, res) => {

    let sql = `CALL SELECT_TBL_PACIENTES()`;

    mysqlconnection.query(sql, (err, rows, fields) => {
        if (!err){
            res.json(rows);
        }
        else{
            console.log(err);
        }
    })
});


//Consultando datos por ID en la tabla tbl_pacientes
app.get('/tbl_pacientes/:PI_COD_PACIENTE', validarToken, (req, res) => {

    const { PI_COD_PACIENTE } = req.params;
    let sql = `CALL SELECT_TBL_PACIENTES_FILTRO(?)`;

    mysqlconnection.query(sql, [PI_COD_PACIENTE], (err, rows, fields) => {
        if (!err) {
            res.json(rows);
        }
        else {
            console.log(err);
        }
    })
});


//Insertando datos en tabla tbl_pacientes con procedimiento almacenado  
app.post('/tbl_pacientes', validarToken, (req, res) => {
    let emp = req.body;
    var sql = "SET @PI_COD_USR = ?;SET @PV_PRIMER_NOMBRE = ?;SET @PV_SEGUNDO_NOMBRE = ?;SET @PV_PRIMER_APELLIDO = ?;SET @PV_SEGUNDO_APELLIDO = ?;SET @PV_DNI = ?;SET @PD_FEC_NACIMIENTO = ?;SET @PE_GENERO = ?;SET @PV_EMAIL = ?;SET @PV_TELEFONO = ?;SET @PV_CELULAR = ?;SET @PV_DIRECCION = ?; \
               CALL INSERT_TBL_PACIENTES(@PI_COD_USR,@PV_PRIMER_NOMBRE,@PV_SEGUNDO_NOMBRE,@PV_PRIMER_APELLIDO,@PV_SEGUNDO_APELLIDO,@PV_DNI,@PD_FEC_NACIMIENTO,@PE_GENERO,@PV_EMAIL,@PV_TELEFONO,@PV_CELULAR,@PV_DIRECCION);"
    mysqlconnection.query(sql, [emp.PI_COD_USR, emp.PV_PRIMER_NOMBRE, emp.PV_SEGUNDO_NOMBRE, emp.PV_PRIMER_APELLIDO, emp.PV_SEGUNDO_APELLIDO, emp.PV_DNI, emp.PD_FEC_NACIMIENTO, emp.PE_GENERO, emp.PV_EMAIL, emp.PV_TELEFONO, emp.PV_CELULAR, emp.PV_DIRECCION], (err, rows, fields) => {
        if (!err){
            res.json("Datos insertados correctamente");
        }
        else{
            console.log(err);
        }
    })
});

//Actualizando datos en tabla tbl_pacientes con procedimiento almacenado 
app.put('/tbl_pacientes/:PI_COD_PACIENTE', validarToken, (req, res) => {
    const { PI_COD_PACIENTE } = req.params;
    let emp = req.body;
    var sql = "SET @PI_COD_PACIENTE = ?;SET @PI_COD_USR = ?;SET @PV_PRIMER_NOMBRE = ?;SET @PV_SEGUNDO_NOMBRE = ?;SET @PV_PRIMER_APELLIDO = ?;SET @PV_SEGUNDO_APELLIDO = ?;SET @PV_DNI = ?;SET @PD_FEC_NACIMIENTO = ?;SET @PE_GENERO = ?;SET @PV_EMAIL = ?;SET @PV_TELEFONO = ?;SET @PV_CELULAR = ?;SET @PV_DIRECCION = ?; \
               CALL UPDATE_TBL_PACIENTES(@PI_COD_PACIENTE,@PI_COD_USR,@PV_PRIMER_NOMBRE,@PV_SEGUNDO_NOMBRE,@PV_PRIMER_APELLIDO,@PV_SEGUNDO_APELLIDO,@PV_DNI,@PD_FEC_NACIMIENTO,@PE_GENERO,@PV_EMAIL,@PV_TELEFONO,@PV_CELULAR,@PV_DIRECCION);"
    mysqlconnection.query(sql, [emp.PI_COD_PACIENTE, emp.PI_COD_USR, emp.PV_PRIMER_NOMBRE, emp.PV_SEGUNDO_NOMBRE, emp.PV_PRIMER_APELLIDO, emp.PV_SEGUNDO_APELLIDO, emp.PV_DNI, emp.PD_FEC_NACIMIENTO, emp.PE_GENERO, emp.PV_EMAIL, emp.PV_TELEFONO, emp.PV_CELULAR, emp.PV_DIRECCION], (err, rows, fields) => {
        if (!err){
            res.json("Registro actualizado");
        }
        else{
            console.log(err);
        }
    })
});

//Borrando datos de tabla tbl_pacientes con procedimiento almacenado  
app.delete('/tbl_pacientes/:PI_COD_PACIENTE', validarToken, (req, res) => {
    const { PI_COD_PACIENTE } = req.params;
    let emp = req.body;
    var sql = "SET @PI_COD_PACIENTE = ?; \
               CALL DELETE_TBL_PACIENTES(@PI_COD_PACIENTE);"
    mysqlconnection.query(sql, [emp.PI_COD_PACIENTE], (err, rows, fields) => {
        if (!err){
            res.json("Registro borrado exitosamente");
        }
        else{
            console.log(err);
        }
    })
});

module.exports = app;