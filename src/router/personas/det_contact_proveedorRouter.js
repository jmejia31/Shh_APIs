//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');



//CONSULTANDO TODOS LOS DATOS DE LA TABLA TBL_CONTAC_PROVEEDOR CON PROCEDIMIENTO ALMACENADO
app.get('/TBL_CONTAC_PROVEEDOR/',validarToken,(req,res)=>{ 
    
    let sql = "CALL SELECT_TBL_CONTAC_PROVEEDOR();"

    mysqlconnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
})  
});

//CONSULTANDO DATOS POR ID DE LA TABLA TBL_CONTAC_PROVEEDOR CON PROCEDIMIENTO ALMACENADO 
app.get('/TBL_CONTAC_PROVEEDOR/:PI_COD_CONTAC_PROVEEDOR',validarToken,(req,res)=>{  
    const {PI_COD_CONTAC_PROVEEDOR} = req.params;
    let emp = req.body;  
    var sql = "SET @PI_COD_CONTAC_PROVEEDOR = ?; \
    CALL SELECT_TBL_CONTAC_PROVEEDOR_FILTRO(@PI_COD_CONTAC_PROVEEDOR);"  
    mysqlconnection.query(sql,[emp.PI_COD_CONTAC_PROVEEDOR],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});


//INSERTANDO DATOS EN TABLA TBL_CONTAC_PROVEEDOR CON PROCEDIMIENTO ALMACENADO  
app.post('/TBL_CONTAC_PROVEEDOR',validarToken,(req,res)=>{  
    let emp = req.body;  
    var sql = "SET @PI_COD_PROVEEDOR = ?;SET @PV_PRIMER_NOMBRE = ?;SET @PV_SEGUNDO_NOMBRE = ?;SET @PV_PRIMER_APELLIDO = ?;SET @PV_SEGUNDO_APELLIDO = ?;SET @PV_IDENTIDAD = ?;SET @PV_NUMERO_CELULAR = ?;SET @PV_CORREO = ?;SET @PV_DIRECCION = ?; \
               CALL INSERT_TBL_CONTAC_PROVEEDOR(@PI_COD_PROVEEDOR,@PV_PRIMER_NOMBRE,@PV_SEGUNDO_NOMBRE,@PV_PRIMER_APELLIDO,@PV_SEGUNDO_APELLIDO,@PV_IDENTIDAD,@PV_NUMERO_CELULAR,@PV_CORREO,@PV_DIRECCION);"  
        mysqlconnection.query(sql,[emp.PI_COD_PROVEEDOR,emp.PV_PRIMER_NOMBRE,emp.PV_SEGUNDO_NOMBRE,emp.PV_PRIMER_APELLIDO,emp.PV_SEGUNDO_APELLIDO,emp.PV_IDENTIDAD,emp.PV_NUMERO_CELULAR,emp.PV_CORREO,emp.PV_DIRECCION],(err,rows,fields)=>{  
    if(!err)   
    res.json("Datos insertados correctamente");  
    else  
        console.log(err);  
})  
});  


//ACTUALIZANDO DATOS EN TABLA TBL_CONTAC_PROVEEDOR CON PROCEDIMIENTO ALMACENADO
app.put('/TBL_CONTAC_PROVEEDOR/:PI_COD_CONTAC_PROVEEDOR',validarToken,(req,res)=>{ 
    const {PI_COD_CONTAC_PROVEEDOR} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_CONTAC_PROVEEDOR = ?;SET @PI_COD_PROVEEDOR = ?;SET @PV_PRIMER_NOMBRE = ?;SET @PV_SEGUNDO_NOMBRE = ?;SET @PV_PRIMER_APELLIDO = ?;SET @PV_SEGUNDO_APELLIDO = ?;SET @PV_IDENTIDAD = ?;SET @PV_NUMERO_CELULAR = ?;SET @PV_CORREO = ?;SET @PV_DIRECCION = ?; \
    CALL UPDATE_TBL_CONTAC_PROVEEDOR(@PI_COD_CONTAC_PROVEEDOR,@PI_COD_PROVEEDOR,@PV_PRIMER_NOMBRE,@PV_SEGUNDO_NOMBRE,@PV_PRIMER_APELLIDO,@PV_SEGUNDO_APELLIDO,@PV_IDENTIDAD,@PV_NUMERO_CELULAR,@PV_CORREO,@PV_DIRECCION);"  
    mysqlconnection.query(sql,[emp.PI_COD_CONTAC_PROVEEDOR,emp.PI_COD_PROVEEDOR,emp.PV_PRIMER_NOMBRE,emp.PV_SEGUNDO_NOMBRE,emp.PV_PRIMER_APELLIDO,emp.PV_SEGUNDO_APELLIDO,emp.PV_IDENTIDAD,emp.PV_NUMERO_CELULAR,emp.PV_CORREO,emp.PV_DIRECCION],(err,rows,fields)=>{  
    if(!err)   
    res.json("Registro actualizado");  
    else  
        console.log(err);  
})  
});  

//BORRANDO DATOS DE TABLA TBL_CONTAC_PROVEEDOR CON PROCEDIMIENTO ALMACENADO 
app.delete('/TBL_CONTAC_PROVEEDOR/:PI_COD_CONTAC_PROVEEDOR',validarToken,(req,res)=>{  
    const {PI_COD_CONTAC_PROVEEDOR} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_CONTAC_PROVEEDOR = ?; \
    CALL DELETE_TBL_CONTAC_PROVEEDOR(@PI_COD_CONTAC_PROVEEDOR);"  
    mysqlconnection.query(sql,[emp.PI_COD_CONTAC_PROVEEDOR],(err,rows,fields)=>{  
        if(!err)   
    res.json("Registro borrado exitosamente");  
    else  
        console.log(err);  
      
})  
}); 

module.exports = app;
