//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');



app.get('/TBL_FACTURA/',validarToken,(req,res)=>{ 
    
    let sql = "CALL SELECT_TBL_FACTURA()";

    mysqlconnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
})  
});

//Consultando datos tabla de facturas
app.get('/TBL_FACTURA/:PI_COD_FACTURA',validarToken,(req,res)=>{  
    const {PI_COD_FACTURA} = req.params;
    let emp = req.body;  
    var sql = "SET @PI_COD_FACTURA = ?; \
    CALL FILTRO_TBL_FACTURA(@PI_COD_FACTURA);"  
    mysqlconnection.query(sql,[emp.PI_COD_FACTURA],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});


   
//Insertando datos en tabla tbl_factura con procedimiento almacenado  
app.post('/TBL_FACTURA',validarToken,(req,res)=>{  
    let emp = req.body;  
    var sql = "SET @PI_COD_PACIENTE = ?;SET @PI_COD_SERVICIO = ?;SET @PI_COD_METODO_PAGO = ?;SET @PI_NUMERO_FACTURA = ?;SET @PB_SUB_TOTAL = ?;SET @PB_ISV = ?;SET @PB_DESCUENTO = ?;SET @PB_TOTAL_PAGAR = ?; \
               CALL INSERT_TBL_FACTURA(@PI_COD_PACIENTE,@PI_COD_SERVICIO,@PI_COD_METODO_PAGO,@PI_NUMERO_FACTURA,@PB_SUB_TOTAL,@PB_ISV,@PB_DESCUENTO,@PB_TOTAL_PAGAR);"
        mysqlconnection.query(sql,[emp.PI_COD_PACIENTE,emp.PI_COD_SERVICIO,emp.PI_COD_METODO_PAGO,emp.PI_NUMERO_FACTURA,emp.PB_SUB_TOTAL,emp.PB_ISV,emp.PB_DESCUENTO,emp.PB_TOTAL_PAGAR],(err,rows,fields)=>{  
    if(!err)   
    res.json("Datos insertados correctamente");  
    else  
        console.log(err);  
})  
});  



//Actualizando datos en tabla tbl_factura con procedimiento almacenado 
app.put('/tbl_factura/:PI_COD_FACTURA',validarToken,(req,res)=>{ 
    const {PI_COD_SERVICIO} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_FACTURA = ?;SET @PI_COD_PACIENTE = ?;SET @PI_COD_SERVICIO = ?;SET @PI_COD_METODO_PAGO = ?;SET @PI_NUMERO_FACTURA = ?;SET @PB_SUB_TOTAL = ?;SET @PB_ISV = ?;SET @PB_DESCUENTO = ?;SET @PB_TOTAL_PAGAR = ?; \
    CALL UPDATE_TBL_FACTURA(@PI_COD_FACTURA,@PI_COD_PACIENTE,@PI_COD_SERVICIO,@PI_COD_METODO_PAGO,@PI_NUMERO_FACTURA,@PB_SUB_TOTAL,@PB_ISV,@PB_DESCUENTO,@PB_TOTAL_PAGAR);"  
    mysqlconnection.query(sql,[emp.PI_COD_FACTURA,emp.PI_COD_PACIENTE,emp.PI_COD_SERVICIO,emp.PI_COD_METODO_PAGO,emp.PI_NUMERO_FACTURA,emp.PB_SUB_TOTAL,emp.PB_ISV,emp.PB_DESCUENTO,emp.PB_TOTAL_PAGAR],(err,rows,fields)=>{  
    if(!err)   
    res.json("Registro actualizado");  
    else  
        console.log(err);  
})  
});  

//Borrando datos de tabla tbl_det_servicios con procedimiento almacenado  
app.delete('/tbl_factura/:PI_COD_FACTURA',validarToken,(req,res)=>{  
    const {PI_COD_FACTURA} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_FACTURA = ?; \
    CALL DELETE_TBL_FACTURA(@PI_COD_FACTURA);"  
    mysqlconnection.query(sql,[emp.PI_COD_FACTURA],(err,rows,fields)=>{  
        if(!err)   
    res.json("Registro borrado exitosamente");  
    else  
        console.log(err);  
      
})  
});  









module.exports = app;