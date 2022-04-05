//constante para el paquete Express
const express = require('express');

//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');



//CONSULTANDO TODOS LOS DATOS DE LA TABLA TBL_CATEG_PRODUCTOS CON PROCEDIMIENTO ALMACENADO
app.get('/TBL_CATEG_PRODUCTOS/',(req,res)=>{ 
    
    let sql = "CALL SELECT_TBL_CATEG_PRODUCTO()";

    mysqlconnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
})  
});


//CONSULTANDO DATOS POR ID DE LA TABLA TBL_CATEG_PRODUCTOS CON PROCEDIMIENTO ALMACENADO
app.get('/TBL_CATEG_PRODUCTOS/:PI_COD_CATEGORIA',validarToken,(req,res)=>{  
    const {PI_COD_CATEGORIA} = req.params;
    let emp = req.body;  
    var sql = "SET @PI_COD_CATEGORIA = ?; \
    CALL SELECT_TBL_CATEG_PRODUCTO_FILTRO(@PI_COD_CATEGORIA)" ;
    mysqlconnection.query(sql,[emp.PI_COD_CATEGORIA],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});



   
//Insertando datos en tabla tbl_categ_producto con procedimiento almacenado  
app.post('/TBL_CATEG_PRODUCTOS',validarToken,(req,res)=>{  
    let emp = req.body;  
    var sql = "SET @PV_DESC_CATEGORIA= ?; \
               CALL INSERT_TBL_CATEG_PRODUCTO(@PV_DESC_CATEGORIA);"  
        mysqlconnection.query(sql,[emp.PV_DESC_CATEGORIA],(err,rows,fields)=>{  
    if(!err)   
    res.json("Datos insertados correctamente");  
    else  
        console.log(err);  
})  
});  

//Actualizando datos en tabla tbl_categ_producto con procedimiento almacenado 
app.put('/TBL_CATEG_PRODUCTOS/:PI_COD_CATEGORIA',validarToken,(req,res)=>{ 
    const {PI_COD_CATEGORIA} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_CATEGORIA= ?;SET @PV_DESC_CATEGORIA = ?; \
    CALL UPDATE_TBL_CATEG_PRODUCTO(@PI_COD_CATEGORIA,@PV_DESC_CATEGORIA);"  
    mysqlconnection.query(sql,[emp.PI_COD_CATEGORIA,emp.PV_DESC_CATEGORIA],(err,rows,fields)=>{  
    if(!err)   
    res.json("Registro actualizado");  
    else  
        console.log(err);  
})  
});  

//Borrando datos de tabla tbl_categ_productos con procedimiento almacenado  
app.delete('/TBL_CATEG_PRODUCTOS/:PI_COD_CATEGORIA',validarToken,(req,res)=>{  
    const {PI_COD_CATEGORIA} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_CATEGORIA = ?; \
    CALL DELETE_TBL_CATEG_PRODUCTO(@PI_COD_CATEGORIA);"  
    mysqlconnection.query(sql,[emp.PI_COD_CATEGORIA],(err,rows,fields)=>{  
        if(!err)   
    res.json("Registro borrado exitosamente");  
    else  
        console.log(err);  
      
})  
});  


module.exports = app;