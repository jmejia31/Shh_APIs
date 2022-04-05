//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');


// API TABLA INVENTARIO
//====


//CONSULTANDO TODOS LOS DATOS DE LA TABLA TBL_INVENTARIO CON PROCEDIMIENTO ALMACENADO
app.get('/TBL_INVENTARIO/',validarToken,(req,res)=>{ 
    
    let sql = "CALL SELECT_TBL_INVENTARIO()";

    mysqlconnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
})  
});


//CONSULTANDO DATOS POR ID DE LA TABLA TBL_INVENTARIO CON PROCEDIMIENTO ALMACENADO
app.get('/TBL_INVENTARIO/:PI_COD_INVENTARIO',validarToken,(req,res)=>{  
    const {PI_COD_INVENTARIO} = req.params;
    let emp = req.body;  
    var sql = "SET @PI_COD_INVENTARIO= ?; \
    CALL SELECT_TBL_INVENTARIO_FILTRO(@PI_COD_INVENTARIO)" ;
    mysqlconnection.query(sql,[emp.PI_COD_INVENTARIO],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});



//Insertando datos en tabla tbl_inventario con procedimiento almacenado  
app.post('/TBL_INVENTARIO',validarToken,(req,res)=>{  
    let emp = req.body;  
    var sql = " SET @PI_COD_USR=?; SET @PI_COD_COMPRA=?; SET @PI_CANTIDAD_ENTRADA_PRODUCTO=?; SET @PI_CANTIDAD_SALIDA_PRODUCTO=?;\
                    CALL INSERT_TBL_INVENTARIO(@PI_COD_USR,@PI_COD_COMPRA,@PI_CANTIDAD_ENTRADA_PRODUCTO,@PI_CANTIDAD_SALIDA_PRODUCTO);"  
        mysqlconnection.query(sql,[emp.PI_COD_USR,emp.PI_COD_COMPRA,emp.PI_CANTIDAD_ENTRADA_PRODUCTO,emp.PI_CANTIDAD_SALIDA_PRODUCTO],(err,rows,fields)=>{  
    if(!err)   
    res.json("Datos insertados correctamente");  
    else  
        console.log(err);  
})  
});  


//Actualizando datos en tabla tbl_inventario con procedimiento almacenado 
app.put('/TBL_INVENTARIO/:PI_COD_INVENTARIO',validarToken,(req,res)=>{ 
    const {PI_COD_INVENTARIO} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_INVENTARIO=?; SET @PI_COD_USR=?; SET @PI_COD_COMPRA=?; SET @PI_CANTIDAD_ENTRADA_PRODUCTO=?; SET @PI_CANTIDAD_SALIDA_PRODUCTO=?;\
              CALL UPDATE_TBL_INVENTARIO(@PI_COD_INVENTARIO,@PI_COD_USR,@PI_COD_COMPRA,@PI_CANTIDAD_ENTRADA_PRODUCTO,@PI_CANTIDAD_SALIDA_PRODUCTO);"  
       mysqlconnection.query(sql,[emp.PI_COD_INVENTARIO,emp.PI_COD_USR,emp.PI_COD_COMPRA,emp.PI_CANTIDAD_ENTRADA_PRODUCTO,emp.PI_CANTIDAD_SALIDA_PRODUCTO],(err,rows,fields)=>{  
    if(!err)   
    res.json("Registro actualizado");  
    else  
        console.log(err);  
})  
});  


//Borrando datos de tabla tbl_inventario con procedimiento almacenado  
app.delete('/TBL_INVENTARIO/:PI_COD_INVENTARIO',validarToken,(req,res)=>{  
    const {PI_COD_INVENTARIO }= req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_INVENTARIO = ?; \
    CALL DELETE_TBL_INVENTARIO(@PI_COD_INVENTARIO);"  
    mysqlconnection.query(sql,[emp.PI_COD_INVENTARIO],(err,rows,fields)=>{  
        if(!err)   
    res.json("Registro borrado exitosamente");  
    else  
        console.log(err);  
        
})  
}); 






module.exports = app;