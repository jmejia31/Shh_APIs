//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');


// APIS DE TABLA COMPRA
//===

//CONSULTANDO TODOS LOS DATOS DE LA TABLA TBL_COMPRAS CON PROCEDIMIENTO ALMACENADO
app.get('/TBL_COMPRAS/',validarToken,(req,res)=>{ 
    
    let sql = "CALL SELECT_TBL_COMPRA()";

    mysqlconnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
})  
});


//CONSULTANDO DATOS POR ID DE LA TABLA TBL_COMPRAS CON PROCEDIMIENTO ALMACENADO
app.get('/TBL_COMPRAS/:PI_COD_COMPRA',validarToken,(req,res)=>{  
    const {PI_COD_COMPRA} = req.params;
    let emp = req.body;  
    var sql = "SET @PI_COD_COMPRA= ?; \
    CALL SELECT_TBL_COMPRA_FILTRO(@PI_COD_COMPRA)" ;
    mysqlconnection.query(sql,[emp.PI_COD_COMPRA],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});



//Insertando datos en tabla tbl_compras con procedimiento almacenado  
app.post('/TBL_COMPRAS',validarToken,(req,res)=>{  
    let emp = req.body;  
    var sql = "SET @PI_COD_PRODUCTO=?; SET @PI_CANTIDAD_COMPRA=?; SET @PD_COSTO_TOTAL=?;\
                    CALL INSERT_TBL_COMPRA(@PI_COD_PRODUCTO,@PI_CANTIDAD_COMPRA,@PD_COSTO_TOTAL);"  
        mysqlconnection.query(sql,[emp.PI_COD_PRODUCTO,emp.PI_CANTIDAD_COMPRA,emp.PD_COSTO_TOTAL],(err,rows,fields)=>{  
    if(!err)   
    res.json("Datos insertados correctamente");  
    else  
        console.log(err);  
})  
});  


//Actualizando datos en tabla tbl_compras con procedimiento almacenado 
app.put('/TBL_COMPRAS/:PI_COD_COMPRA',validarToken,(req,res)=>{ 
    const {PI_COD_COMPRA} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_COMPRA=?; SET @PI_COD_PRODUCTO=?; SET @PI_CANTIDAD_COMPRA=?; SET @PD_COSTO_TOTAL=?;\
              CALL UPDATE_TBL_COMPRA(@PI_COD_COMPRA,@PI_COD_PRODUCTO,@PI_CANTIDAD_COMPRA,@PD_COSTO_TOTAL);"  
       mysqlconnection.query(sql,[emp.PI_COD_COMPRA,emp.PI_COD_PRODUCTO,emp.PI_CANTIDAD_COMPRA,emp.PD_COSTO_TOTAL],(err,rows,fields)=>{  
    if(!err)   
    res.json("Registro actualizado");  
    else  
        console.log(err);  
})  
});  


//Borrando datos de tabla tbl_COMPRAS con procedimiento almacenado  
app.delete('/TBL_COMPRAS/:PI_COD_COMPRA',validarToken,(req,res)=>{  
    const {PI_COD_COMPRA} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_COMPRA = ?; \
    CALL DELETE_TBL_COMPRA(@PI_COD_COMPRA);"  
    mysqlconnection.query(sql,[emp.PI_COD_COMPRA],(err,rows,fields)=>{  
        if(!err)   
    res.json("Registro borrado exitosamente");  
    else  
        console.log(err);  
        
})  
}); 






module.exports = app;