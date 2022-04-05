//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');

//Consultando datos tbl_seguro_vida
app.get('/TBL_SEGURO_VIDA/:PI_COD_SEGURO_VIDA',validarToken,(req,res)=>{  
    let emp = req.body;  
    var sql = "SET @PI_COD_SEGURO_VIDA = ?; \
    CALL SELECT_TBL_SEGURO_VIDA(@PI_COD_SEGURO_VIDA);"  
    mysqlconnection.query(sql,[emp.PI_COD_SEGURO_VIDA],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});

//Insertando datos en tabla TBL_SEGURO_VIDA con procedimiento almacenado  
app.post('/TBL_SEGURO_VIDA',validarToken,(req,res)=>{  
    let emp = req.body;  
    var sql = "SET @PI_COD_USR = ?; SET @PI_NUM_HISTORIAL_CLINICO = ?; SET @PV_NOMBRE_COMPANIA_SEGURO = ?; SET @PD_FEC_VALIDEZ_SEGURO = ?; SET @PV_OBSERVACIONES = ?; \
               CALL INSERT_TBL_SEGURO_VIDA(@PI_COD_USR, @PI_NUM_HISTORIAL_CLINICO, @PV_NOMBRE_COMPANIA_SEGURO, @PD_FEC_VALIDEZ_SEGURO, @PV_OBSERVACIONES);"  
        mysqlconnection.query(sql,[emp.PI_COD_USR, emp.PI_NUM_HISTORIAL_CLINICO, emp.PV_NOMBRE_COMPANIA_SEGURO, emp.PD_FEC_VALIDEZ_SEGURO, emp.PV_OBSERVACIONES],(err,rows,fields)=>{  
    if(!err)   
    res.json("Datos insertados correctamente");  
    else  
        console.log(err);  
})  
});  

//Actualizando datos en tabla TBL_SEGURO_VIDA con procedimiento almacenado 
app.put('/TBL_SEGURO_VIDA/:PI_COD_SEGURO_VIDA',validarToken,(req,res)=>{ 
    const {PI_COD_SEGURO_VIDA} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_SEGURO_VIDA = ?; SET @PI_COD_USR = ?; SET @PI_NUM_HISTORIAL_CLINICO = ?; SET @PV_NOMBRE_COMPANIA_SEGURO = ?; SET @PD_FEC_VALIDEZ_SEGURO = ?; SET @PV_OBSERVACIONES = ?; \
    CALL UPDATE_TBL_SEGURO_VIDA(@PI_COD_SEGURO_VIDA, @PI_COD_USR, @PI_NUM_HISTORIAL_CLINICO, @PV_NOMBRE_COMPANIA_SEGURO, @PD_FEC_VALIDEZ_SEGURO, @PV_OBSERVACIONES);"  
    mysqlconnection.query(sql,[emp.PI_COD_SEGURO_VIDA,emp.PI_COD_USR,emp.PI_NUM_HISTORIAL_CLINICO,emp.PV_NOMBRE_COMPANIA_SEGURO,emp.PD_FEC_VALIDEZ_SEGURO,emp.PV_OBSERVACIONES],(err,rows,fields)=>{  
        if(!err)   
        res.json("Registro actualizado");  
        else  
            console.log(err); 
        
})  
});  

//Borrando datos de tabla tbl_seguro_vida con procedimiento almacenado  
app.delete('/TBL_SEGURO_VIDA/:PI_COD_SEGURO_VIDA',validarToken,(req,res)=>{  
    const {PI_COD_SEGURO_VIDA} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_SEGURO_VIDA = ?; \
    CALL DELETE_TBL_SEGURO_VIDA(@PI_COD_SEGURO_VIDA);"  
    mysqlconnection.query(sql,[emp.PI_COD_SEGURO_VIDA],(err,rows,fields)=>{  
        if(!err)   
    res.json("Registro borrado exitosamente");  
    else  
        console.log(err);  
      
})  
});  
module.exports = app;