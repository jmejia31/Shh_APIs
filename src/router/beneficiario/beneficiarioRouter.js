//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');

//Consultando datos tabla beneficiario
app.get('/tbl_beneficiario/:PI_COD_BENEFICIARIO',validarToken,(req,res)=>{  
    const {PI_COD_BENEFICIARIO} = req.params;
    let emp = req.body;  
    var sql = "SET @PI_COD_BENEFICIARIO = ?; \
    CALL SELECT_TBL_BENEFICIARIO(@PI_COD_BENEFICIARIO);"  
    mysqlconnection.query(sql,[emp.PI_COD_BENEFICIARIO],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});

//Insertando datos en tabla tbl_beneficiario con procedimiento almacenado  
app.post('/TBL_BENEFICIARIO',validarToken,(req,res)=>{  
    let emp = req.body;  
    var sql = "SET @PI_COD_SEGURO_VIDA = ?; SET @PV_PRIMER_NOMBRE = ?; SET @PV_SEGUNDO_NOMBRE = ?; SET @PV_PRIMER_APELLIDO = ?; SET @PV_SEGUNDO_APELLIDO = ?; SET @PV_DIRECCION = ?; SET @PV_TELEFONO = ?; SET @PD_FEC_VALIDEZ_SEGURO = ?; SET @PV_OBSERVACIONES = ?; \
               CALL INSERT_TBL_BENEFICIARIO(@PI_COD_SEGURO_VIDA, @PV_PRIMER_NOMBRE, @PV_SEGUNDO_NOMBRE, @PV_PRIMER_APELLIDO, @PV_SEGUNDO_APELLIDO, @PV_DIRECCION, @PV_TELEFONO, @PD_FEC_VALIDEZ_SEGURO, @PV_OBSERVACIONES);"  
        mysqlconnection.query(sql,[emp.PI_COD_SEGURO_VIDA, emp.PV_PRIMER_NOMBRE, emp.PV_SEGUNDO_NOMBRE, emp.PV_PRIMER_APELLIDO, emp.PV_SEGUNDO_APELLIDO, emp.PV_DIRECCION, emp.PV_TELEFONO, emp.PD_FEC_VALIDEZ_SEGURO, emp.PV_OBSERVACIONES],(err,rows,fields)=>{  
    if(!err)   
    res.json("Datos insertados correctamente");  
    else  
        console.log(err);  
})  
});  

//Actualizando datos en tabla tbl_beneficiario con procedimiento almacenado 
app.put('/TBL_BENEFICIARIO/:PI_COD_BENEFICIARIO',validarToken,(req,res)=>{ 
    const {PI_COD_BENEFICIARIO} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_BENEFICIARIO = ?;SET @PI_COD_SEGURO_VIDA = ?;SET @PV_PRIMER_NOMBRE = ?;SET @PV_SEGUNDO_NOMBRE = ?;SET @PV_PRIMER_APELLIDO = ?;SET @PV_SEGUNDO_APELLIDO = ?;SET @PV_DIRECCION = ?;SET @PV_TELEFONO = ?;SET @PD_FEC_VALIDEZ_SEGURO = ?; SET @PV_OBSERVACIONES = ?;\
    CALL UPDATE_TBL_BENEFICIARIO(@PI_COD_BENEFICIARIO,@PI_COD_SEGURO_VIDA,@PV_PRIMER_NOMBRE,@PV_SEGUNDO_NOMBRE,@PV_PRIMER_APELLIDO,@PV_SEGUNDO_APELLIDO,@PV_DIRECCION,@PV_TELEFONO,@PD_FEC_VALIDEZ_SEGURO,@PV_OBSERVACIONES);"  
    mysqlconnection.query(sql,[emp.PI_COD_BENEFICIARIO,emp.PI_COD_SEGURO_VIDA,emp.PV_PRIMER_NOMBRE,emp.PV_SEGUNDO_NOMBRE,emp.PV_PRIMER_APELLIDO,emp.PV_SEGUNDO_APELLIDO,emp.PV_DIRECCION,emp.PV_TELEFONO,emp.PD_FEC_VALIDEZ_SEGURO,emp.PV_OBSERVACIONES],(err,rows,fields)=>{  
        if(!err)   
        res.json("Registro actualizado");  
        else  
            console.log(err); 
    
})  
});  

//Borrando datos de tabla tbl_beneficiario con procedimiento almacenado  
app.delete('/tbl_beneficiario/:PI_COD_BENEFICIARIO',validarToken,(req,res)=>{  
    const {PI_COD_BENEFICIARIO} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_BENEFICIARIO = ?; \
    CALL DELETE_TBL_BENEFICIARIO(@PI_COD_BENEFICIARIO);"  
    mysqlconnection.query(sql,[emp.PI_COD_BENEFICIARIO],(err,rows,fields)=>{  
        if(!err)   
    res.json("Registro borrado exitosamente");  
    else  
        console.log(err);  
      
})  
});  

module.exports = app;