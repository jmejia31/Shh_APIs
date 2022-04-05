//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');



//TABLA DETALLE PACIENTES SEGUROS MEDICOS
//Consultando todos los datos en la tabla tbl_det_pacientes_seguros_medicos
app.get('/tbl_det_pacientes_seguros_medicos/',validarToken,(req,res)=>{  
    
    let sql = `CALL SELECT_TBL_DET_PACIENTES_SEGUROS_MEDICOS()`;  

    mysqlconnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});


//Consultando datos por ID en la tabla tbl_det_pacientes_seguros_medicos
app.get('/tbl_det_pacientes_seguros_medicos/:PI_COD_PACIENTE_SEGURO_MEDICO',validarToken,(req,res)=>{  

    const {PI_COD_PACIENTE_SEGURO_MEDICO} = req.params;
    let sql = `CALL SELECT_TBL_DET_PACIENTES_SEGUROS_MEDICOS_FILTRO(?)`;    
    
    mysqlconnection.query(sql,[PI_COD_PACIENTE_SEGURO_MEDICO],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});


//Insertando datos en tabla tabla tbl_det_pacientes_seguros_medicos con procedimiento almacenado  
app.post('/tbl_det_pacientes_seguros_medicos',validarToken,(req, res) => {
    let emp = req.body;
    var sql = "SET @PI_COD_PACIENTE = ?;SET @PI_COD_SEGURO_MEDICO = ?; \
               CALL INSERT_TBL_DET_PACIENTES_SEGUROS_MEDICOS(@PI_COD_PACIENTE,@PI_COD_SEGURO_MEDICO);"
    mysqlconnection.query(sql, [emp.PI_COD_PACIENTE, emp.PI_COD_SEGURO_MEDICO], (err, rows, fields) => {
        if (!err)
            res.json("Datos insertados correctamente");
        else
            console.log(err);
    })
});

//Actualizando datos en tabla tabla tbl_det_pacientes_seguros_medicos con procedimiento almacenado 
app.put('/tbl_det_pacientes_seguros_medicos/:PI_COD_PACIENTE_SEGURO_MEDICO',validarToken,(req, res) => {
    const { PI_COD_PACIENTE_SEGURO_MEDICO } = req.params;
    let emp = req.body;
    var sql = "SET @PI_COD_PACIENTE_SEGURO_MEDICO = ?;SET @PI_COD_PACIENTE = ?;SET @PI_COD_SEGURO_MEDICO = ?; \
               CALL UPDATE_TBL_DET_PACIENTES_SEGUROS_MEDICOS(@PI_COD_PACIENTE_SEGURO_MEDICO,@PI_COD_PACIENTE,@PI_COD_SEGURO_MEDICO);"
    mysqlconnection.query(sql, [emp.PI_COD_PACIENTE_SEGURO_MEDICO, emp.PI_COD_PACIENTE, emp.PI_COD_SEGURO_MEDICO], (err, rows, fields) => {
        if (!err)
            res.json("Registro actualizado");
        else
            console.log(err);
    })
});

//Borrando datos de tabla tabla tbl_det_pacientes_seguros_medicos con procedimiento almacenado  
app.delete('/tbl_det_pacientes_seguros_medicos/:PI_COD_PACIENTE_SEGURO_MEDICO',validarToken,(req, res) => {
    const { PI_COD_PACIENTE_SEGURO_MEDICO } = req.params;
    let emp = req.body;
    var sql = "SET @PI_COD_PACIENTE_SEGURO_MEDICO = ?; \
               CALL DELETE_TBL_DET_PACIENTES_SEGUROS_MEDICOS(@PI_COD_PACIENTE_SEGURO_MEDICO);"
    mysqlconnection.query(sql, [emp.PI_COD_PACIENTE_SEGURO_MEDICO], (err, rows, fields) => {
        if (!err)
            res.json("Registro borrado exitosamente");
        else
            console.log(err);

    })
});

module.exports = app;