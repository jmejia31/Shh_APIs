//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');



app.get('/TBL_VENTAS/',validarToken,(req,res)=>{ 
    
    let sql = "CALL SELECT_TBL_VENTAS()";

    mysqlconnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
})  
});



//Consultando datos tabla de facturas
app.get('/TBL_VENTAS/:PI_COD_VENTAS',validarToken,(req,res)=>{  
    const {PI_COD_FACTURA} = req.params;
    let emp = req.body;  
    var sql = "SET @PI_COD_VENTAS = ?; \
    CALL FILTRO_TBL_VENTAS(@PI_COD_VENTAS);"  
    mysqlconnection.query(sql,[emp.PI_COD_FACTURA],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});
   
//Insertando datos en tabla tbl_det_servicios con procedimiento almacenado  
app.post('/TBL_VENTAS',validarToken,(req,res)=>{  
    let emp = req.body;  
    var sql = "SET @PI_COD_INVENTARIO = ?;SET @PI_COD_PRODUCTO = ?;SET @PI_NUM_VENTA = ?; \
               CALL INSERT_TBL_VENTAS(@PI_COD_INVENTARIO,@PI_COD_PRODUCTO,@PI_NUM_VENTA);"  
        mysqlconnection.query(sql,[emp.PI_COD_INVENTARIO,emp.PI_COD_PRODUCTO,emp.PI_NUM_VENTA],(err,rows,fields)=>{  
    if(!err)   
    res.json("Datos insertados correctamente");  
    else  
        console.log(err);  
})  
});  


//Actualizando datos en tabla tbl_proveedores con procedimiento almacenado 
app.put('/TBL_VENTAS/:PI_COD_VENTAS',validarToken,(req,res)=>{ 
    const {PI_COD_SERVICIO} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_VENTAS = ?;SET @PI_COD_INVENTARIO = ?;SET @PI_COD_PRODUCTO = ?;SET @PI_NUM_VENTA = ?; \
    CALL UPDATE_TBL_VENTAS(@PI_COD_VENTAS,@PI_COD_INVENTARIO,@PI_COD_PRODUCTO,@PI_NUM_VENTA);"  
    mysqlconnection.query(sql,[emp.PI_COD_VENTAS,emp.PI_COD_INVENTARIO,emp.PI_COD_PRODUCTO,emp.PI_NUM_VENTA],(err,rows,fields)=>{  
    if(!err)   
    res.send("Registro actualizado");  
    else  
        console.log(err);  
})  
});  



//Borrando datos de tabla tbl_det_servicios con procedimiento almacenado  
app.delete('/TBL_VENTAS/:PI_COD_VENTAS',validarToken,(req,res)=>{  
    const {PI_COD_FACTURA} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_VENTAS = ?; \
    CALL DELETE_TBL_VENTAS(@PI_COD_VENTAS);"  
    mysqlconnection.query(sql,[emp.PI_COD_VENTAS],(err,rows,fields)=>{  
        if(!err)   
    res.json("Registro borrado exitosamente");  
    else  
        console.log(err);  
      
})  
});  








module.exports = app;