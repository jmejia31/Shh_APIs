//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');




//CONSULTANDO TODOS LOS DATOS DE LA TABLA TBL_INVENTARIO CON PROCEDIMIENTO ALMACENADO
app.get('/TBL_DET_SERVICIOS/',validarToken,(req,res)=>{ 
    
    let sql = "CALL SELECT_TBL_DET_SERVICIOS()";

    mysqlconnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
})  
});

//Consultando datos tabla detalle de servicio
app.get('/tbl_det_servicios/:PI_COD_SERVICIO',validarToken,(req,res)=>{  
    const {PI_COD_servicio} = req.params;
    let emp = req.body;  
    var sql = "SET @PI_COD_SERVICIO = ?; \
    CALL FILTRO_TBL_DET_SERVICIOS(@PI_COD_SERVICIO);"  
    mysqlconnection.query(sql,[emp.PI_COD_SERVICIO],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});



   
//Insertando datos en tabla tbl_det_servicios con procedimiento almacenado  
app.post('/TBL_DET_SERVICIOS',validarToken,(req,res)=>{  
    let emp = req.body;  
    var sql = "SET @PV_TIP_SERVICIO = ?;SET @PB_PRECIO_SERVICIO = ?; \
               CALL INSERT_TBL_DET_SERVICIOS(@PV_TIP_SERVICIO,@PB_PRECIO_SERVICIO);"  
        mysqlconnection.query(sql,[emp.PV_TIP_SERVICIO,emp.PB_PRECIO_SERVICIO],(err,rows,fields)=>{  
    if(!err)   
    res.json("Datos insertados correctamente");  
    else  
        console.log(err);  
})  
});  

//Actualizando datos en tabla tbl_proveedores con procedimiento almacenado 
app.put('/TBL_DET_SERVICIOS/:PI_COD_SERVICIO',validarToken,(req,res)=>{ 
    const {PI_COD_SERVICIO} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_SERVICIO = ?;SET @PV_TIP_SERVICIO = ?;SET @PB_PRECIO_SERVICIO = ?; \
    CALL UPDATE_TBL_DET_SERVICIOS(@PI_COD_SERVICIO,@PV_TIP_SERVICIO,@PB_PRECIO_SERVICIO);"  
    mysqlconnection.query(sql,[emp.PI_COD_SERVICIO,emp.PV_TIP_SERVICIO,emp.PB_PRECIO_SERVICIO],(err,rows,fields)=>{  
    if(!err)   
    res.send("Registro actualizado");  
    else  
        console.log(err);  
})  
});  

   


//Borrando datos de tabla tbl_det_servicios con procedimiento almacenado  

app.delete('/TBL_DET_SERVICIOS/:PI_COD_SERVICIO',validarToken,(req,res)=>{  
    const {PI_COD_SERVICIO} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_SERVICIO = ?; \
    CALL DELETE_TBL_DET_SERVICIOS(@PI_COD_SERVICIO);"  
    mysqlconnection.query(sql,[emp.PI_COD_SERVICIO],(err,rows,fields)=>{  
        if(!err)   
    res.json("Registro borrado exitosamente");  
    else  
        console.log(err);  
      
})  
});  






module.exports = app;