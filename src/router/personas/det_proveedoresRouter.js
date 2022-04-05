//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');



//CONSULTANDO TODOS LOS DATOS DE LA TABLA TBL_PROVEEDORES CON PROCEDIMIENTO ALMACENADO
app.get('/TBL_PROVEEDORES/',validarToken,(req,res)=>{ 
    
    let sql = "CALL SELECT_TBL_PROVEEDORES();"

    mysqlconnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
})  
});


//CONSULTANDO DATOS POR ID DE LA TABLA TBL_PROVEEDORES CON PROCEDIMIENTO ALMACENADO
app.get('/TBL_PROVEEDORES/:PI_COD_PROVEEDOR',validarToken,(req,res)=>{  
    const {PI_COD_PROVEEDOR} = req.params;
    let emp = req.body;  
    var sql = "SET @PI_COD_PROVEEDOR = ?; \
    CALL SELECT_TBL_PROVEEDORES_FILTRO(@PI_COD_PROVEEDOR);"  
    mysqlconnection.query(sql,[emp.PI_COD_PROVEEDOR],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});

   
//INSERTANDO DATOS EN TABLA TBL_PROVEEDORES CON PROCEDIMIENTO ALMACENADO   
app.post('/TBL_PROVEEDORES',validarToken,(req,res)=>{  
    let emp = req.body;  
    var sql = "SET @PV_NOMBRE_PROV = ?;SET @PV_CAI = ?;SET @PV_NUMERO_FIJO = ?;SET @PV_NUMERO_CELULAR = ?;SET @PV_CORREO = ?;SET @PV_RTN = ?;SET @PV_SITIO_WEB = ?;SET @PV_USR_REGISTRO = ?; \
               CALL INSERT_TBL_PROVEEDORES(@PV_NOMBRE_PROV,@PV_CAI,@PV_NUMERO_FIJO,@PV_NUMERO_CELULAR,@PV_CORREO,@PV_RTN,@PV_SITIO_WEB,@PV_USR_REGISTRO);"  
        mysqlconnection.query(sql,[emp.PV_NOMBRE_PROV,emp.PV_CAI,emp.PV_NUMERO_FIJO,emp.PV_NUMERO_CELULAR,emp.PV_CORREO,emp.PV_RTN,emp.PV_SITIO_WEB,emp.PV_USR_REGISTRO],(err,rows,fields)=>{  
    if(!err)   
    res.json("Datos insertados correctamente");  
    else  
        console.log(err);  
})  
});  

//ACTUALIZANDO DATOS EN TABLA TBL_PROVEEDORES CON PROCEDIMIENTO ALMACENADO
app.put('/TBL_PROVEEDORES/:PI_COD_PROVEEDOR',validarToken,(req,res)=>{ 
    const {PI_COD_PROVEEDOR} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_PROVEEDOR = ?;SET @PV_NOMBRE_PROV = ?;SET @PV_CAI = ?;SET @PV_NUMERO_FIJO = ?;SET @PV_NUMERO_CELULAR = ?;SET @PV_CORREO = ?;SET @PV_RTN = ?;SET @PV_SITIO_WEB = ?;SET @PV_USR_REGISTRO = ?; \
    CALL UPDATE_TBL_PROVEEDORES(@PI_COD_PROVEEDOR,@PV_NOMBRE_PROV,@PV_CAI,@PV_NUMERO_FIJO,@PV_NUMERO_CELULAR,@PV_CORREO,@PV_RTN,@PV_SITIO_WEB,@PV_USR_REGISTRO);"  
    mysqlconnection.query(sql,[emp.PI_COD_PROVEEDOR,emp.PV_NOMBRE_PROV,emp.PV_CAI,emp.PV_NUMERO_FIJO,emp.PV_NUMERO_CELULAR,emp.PV_CORREO,emp.PV_RTN,emp.PV_SITIO_WEB,emp.PV_USR_REGISTRO],(err,rows,fields)=>{  
    if(!err)   
    res.json("Registro actualizado");  
    else  
        console.log(err);  
})  
});  

//BORRANDO DATOS DE TABLA TBL_PROVEEDORES CON PROCEDIMIENTO ALMACENADO  
app.delete('/TBL_PROVEEDORES/:PI_COD_PROVEEDOR',validarToken,(req,res)=>{  
    const {PI_COD_PROVEEDOR} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_PROVEEDOR = ?; \
    CALL DELETE_TBL_PROVEEDORES(@PI_COD_PROVEEDOR);"  
    mysqlconnection.query(sql,[emp.PI_COD_PROVEEDOR],(err,rows,fields)=>{  
        if(!err)   
    res.json("Registro borrado exitosamente");  
    else  
        console.log(err);  
      
})  
}); 

module.exports = app;