//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');




//CONSULTANDO TODOS LOS DATOS DE LA TABLA TBL_INVENTARIO CON PROCEDIMIENTO ALMACENADO

app.get('/TBL_DET_FACTURAS/',validarToken,(req,res)=>{ 
    
    let sql = "CALL SELECT_TBL_DET_FACTURAS()";

    mysqlconnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
})  
});


//Consultando datos tabla de facturas
app.get('/TBL_DET_FACTURAS/:PI_COD_DETALLE',validarToken,(req,res)=>{  
    const {PI_COD_FACTURA} = req.params;
    let emp = req.body;  
    var sql = "SET @PI_COD_DETALLE = ?; \
    CALL FILTRO_TBL_DET_FACTURAS(@PI_COD_DETALLE);"  
    mysqlconnection.query(sql,[emp.PI_COD_DETALLE],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});

   
//Insertando datos en tabla tbl_det_servicios con procedimiento almacenado  
app.post('/TBL_DET_FACTURAS',validarToken,(req,res)=>{  
    let emp = req.body;  
    var sql = "SET @PI_COD_FACTURA = ?;SET @PI_COD_VENTA = ?;SET @PB_PRECIO_TOTAL = ?;SET @PI_CANTIDAD = ?; \
               CALL INSERT_TBL_DET_FACTURAS(@PI_COD_FACTURA,@PI_COD_VENTA,@PB_PRECIO_TOTAL,@PI_CANTIDAD);"  
        mysqlconnection.query(sql,[emp.PI_COD_FACTURA,emp.PI_COD_VENTA,emp.PB_PRECIO_TOTAL,emp.PI_CANTIDAD],(err,rows,fields)=>{  
    if(!err)   
    res.json("Datos insertados correctamente");  
    else  
        console.log(err);  
})  
});  


//Actualizando datos en tabla tbl_proveedores con procedimiento almacenado 
app.put('/TBL_DET_FACTURAS/:PI_COD_DETALLE',validarToken,(req,res)=>{ 
    const {PI_COD_DETALLE} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_DETALLE = ?;SET @PI_COD_FACTURA = ?;SET @PI_COD_VENTA = ?;SET @PB_PRECIO_TOTAL = ?;SET @PI_CANTIDAD = ?; \
    CALL UPDATE_TBL_DET_FACTURAS(@PI_COD_DETALLE,@PI_COD_FACTURA,@PI_COD_VENTA,@PB_PRECIO_TOTAL,@PI_CANTIDAD);"  
    mysqlconnection.query(sql,[emp.PI_COD_DETALLE,emp.PI_COD_FACTURA,emp.PI_COD_VENTA,emp.PB_PRECIO_TOTAL,emp.PI_CANTIDAD],(err,rows,fields)=>{  
    if(!err)   
    res.send("Registro actualizado");  
    else  
        console.log(err);  
})  
});  


//Borrando datos de tabla tbl_det_servicios con procedimiento almacenado  
app.delete('/TBL_DET_FACTURAS/:PI_COD_DETALLE',validarToken,(req,res)=>{  
    const {PI_COD_DETALLE} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_DETALLE = ?; \
    CALL DELETE_TBL_DET_FACTURAS(@PI_COD_DETALLE);"  
    mysqlconnection.query(sql,[emp.PI_COD_DETALLE],(err,rows,fields)=>{  
        if(!err)   
    res.json("Registro borrado exitosamente");  
    else  
        console.log(err);  
      
})  
});  






module.exports = app;