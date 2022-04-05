//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');



//TABLA SEGUROS MEDICOS
//Consultando todos los datos en la tabla tbl_seguros_medicos
app.get('/tbl_seguros_medicos/',validarToken,(req,res)=>{  
    
    let sql = `CALL SELECT_TBL_SEGUROS_MEDICOS()`;  

    mysqlconnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});


//Consultando datos por ID en la tabla tbl_seguros_medicos
app.get('/tbl_seguros_medicos/:PI_COD_SEGURO_MEDICO',validarToken,(req,res)=>{  

    const {PI_COD_SEGURO_MEDICO} = req.params;
    let sql = `CALL SELECT_TBL_SEGUROS_MEDICOS_FILTRO(?)`;    
    
    mysqlconnection.query(sql,[PI_COD_SEGURO_MEDICO],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});


//Insertando datos en tabla tbl_seguros_medicos con procedimiento almacenado  
app.post('/tbl_seguros_medicos',validarToken,(req, res) => {
    let emp = req.body;
    var sql = "SET @PV_TELEFONO = ?;SET @PI_NUM_HISTORIAL_CLINICO = ?;SET @PV_NOMBRE_COMPAÑIA_SEGURO = ?;SET @PD_FEC_VALIDEZ_SEGURO = ?;SET @PV_OBSERVACIONES = ?; \
               CALL INSERT_TBL_SEGUROS_MEDICOS(@PV_TELEFONO,@PI_NUM_HISTORIAL_CLINICO,@PV_NOMBRE_COMPAÑIA_SEGURO,@PD_FEC_VALIDEZ_SEGURO,@PV_OBSERVACIONES);"
    mysqlconnection.query(sql, [emp.PV_TELEFONO, emp.PI_NUM_HISTORIAL_CLINICO, emp.PV_NOMBRE_COMPAÑIA_SEGURO, emp.PD_FEC_VALIDEZ_SEGURO, emp.PV_OBSERVACIONES], (err, rows, fields) => {
        if (!err)
            res.json("Datos insertados correctamente");
        else
            console.log(err);
    })
});

//Actualizando datos en tabla tbl_seguros_medicos con procedimiento almacenado 
app.put('/tbl_seguros_medicos/:PI_COD_SEGURO_MEDICO',validarToken,(req, res) => {
    const { PI_COD_SEGURO_MEDICO } = req.params;
    let emp = req.body;
    var sql = "SET @PI_COD_SEGURO_MEDICO = ?;SET @PV_TELEFONO = ?;SET @PI_NUM_HISTORIAL_CLINICO = ?;SET @PV_NOMBRE_COMPAÑIA_SEGURO = ?;SET @PD_FEC_VALIDEZ_SEGURO = ?;SET @PV_OBSERVACIONES = ?; \
               CALL UPDATE_TBL_SEGUROS_MEDICOS(@PI_COD_SEGURO_MEDICO,@PV_TELEFONO,@PI_NUM_HISTORIAL_CLINICO,@PV_NOMBRE_COMPAÑIA_SEGURO,@PD_FEC_VALIDEZ_SEGURO,@PV_OBSERVACIONES);"
    mysqlconnection.query(sql, [emp.PI_COD_SEGURO_MEDICO, emp.PV_TELEFONO, emp.PI_NUM_HISTORIAL_CLINICO, emp.PV_NOMBRE_COMPAÑIA_SEGURO, emp.PD_FEC_VALIDEZ_SEGURO, emp.PV_OBSERVACIONES], (err, rows, fields) => {
        if (!err)
            res.json("Registro actualizado");
        else
            console.log(err);
    })
});

//Borrando datos de tabla tbl_seguros_medicos con procedimiento almacenado  
app.delete('/tbl_seguros_medicos/:PI_COD_SEGURO_MEDICO',validarToken,(req, res) => {
    const { PI_COD_SEGURO_MEDICO } = req.params;
    let emp = req.body;
    var sql = "SET @PI_COD_SEGURO_MEDICO = ?; \
               CALL DELETE_TBL_SEGUROS_MEDICOS(@PI_COD_SEGURO_MEDICO);"
    mysqlconnection.query(sql, [emp.PI_COD_SEGURO_MEDICO], (err, rows, fields) => {
        if (!err)
            res.json("Registro borrado exitosamente");
        else
            console.log(err);

    })
});

module.exports = app;