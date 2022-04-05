//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');



// API PARA TABLA DE PRODUCTOS


//CONSULTANDO TODOS LOS DATOS DE LA TABLA TBL_PRODUCTOS CON PROCEDIMIENTO ALMACENADO
app.get('/TBL_PRODUCTOS/',validarToken,(req,res)=>{ 
    
    let sql = "CALL SELECT_TBL_PRODUCTO()";

    mysqlconnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
})  
});


//CONSULTANDO DATOS POR ID DE LA TABLA TBL_PRODUCTOS CON PROCEDIMIENTO ALMACENADO
app.get('/TBL_PRODUCTOS/:PI_COD_PRODUCTO',validarToken,(req,res)=>{  
    const {PI_COD_PRODUCTO} = req.params;
    let emp = req.body;  
    var sql = "SET @PI_COD_PRODUCTO= ?; \
    CALL SELECT_TBL_PRODUCTO_FILTRO(@PI_COD_PRODUCTO)" ;
    mysqlconnection.query(sql,[emp.PI_COD_PRODUCTO],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});



//Insertando datos en tabla tbl_producto con procedimiento almacenado  
app.post('/TBL_PRODUCTOS',validarToken,(req,res)=>{  
    let emp = req.body;  
    var sql = "SET @PI_COD_CATEGORIA=?; SET @PI_COD_PROVEEDOR=?; SET @PV_NOMBRE_PRODUCTO=?;\
     SET @PV_MARCA=?; SET @PV_NOMBRE_COMERCIAL=?; SET @PV_NOMBRE_GENERICO=?; SET @PI_CANTIDAD_UNITARIA=?; \
     SET @PD_PRECIO_UNITARIA=?; SET @PD_PRECIO_VENTA=?; SET @PV_CONTENIDO_NETO=?; SET @PV_TIPO_EMPAQUE=?;\
      SET @PV_CODIGO_BARRAS=?; SET @PD_ISV=?; SET @PV_ESTADO=?; SET @PV_IMAGEN=?; \
               CALL INSERT_TBL_PRODUCTO(@PI_COD_CATEGORIA,@PI_COD_PROVEEDOR,@PV_NOMBRE_PRODUCTO,\
                @PV_MARCA,@PV_NOMBRE_COMERCIAL,@PV_NOMBRE_GENERICO,@PI_CANTIDAD_UNITARIA,\
                @PD_PRECIO_UNITARIA,@PD_PRECIO_VENTA,@PV_CONTENIDO_NETO,@PV_TIPO_EMPAQUE,@PV_CODIGO_BARRAS,@PD_ISV,@PV_ESTADO,@PV_IMAGEN);"  
        mysqlconnection.query(sql,[emp.PI_COD_CATEGORIA,emp.PI_COD_PROVEEDOR,emp.PV_NOMBRE_PRODUCTO,emp.PV_MARCA,emp.PV_NOMBRE_COMERCIAL,emp.PV_NOMBRE_GENERICO,emp.PI_CANTIDAD_UNITARIA,emp.PD_PRECIO_UNITARIO,
            emp.PD_PRECIO_VENTA,emp.PV_CONTENIDO_NETO,emp.PV_TIPO_EMPAQUE,emp.PV_CODIGO_BARRAS,emp.PD_ISV,emp.PV_ESTADO,emp.PV_IMAGEN],(err,rows,fields)=>{  
    if(!err)   
    res.json("Datos insertados correctamente");  
    else  
        console.log(err);  
})  
});  


//Actualizando datos en tabla tbl_producto con procedimiento almacenado 
app.put('/TBL_PRODUCTOS/:PI_COD_PRODUCTO',validarToken,(req,res)=>{ 
    const {PI_COD_PRODUCTO} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_PRODUCTO=?; SET @PI_COD_CATEGORIA=?; SET @PI_COD_PROVEEDOR=?; SET @PV_NOMBRE_PRODUCTO=?;\
    SET @PV_MARCA=?; SET @PV_NOMBRE_COMERCIAL=?; SET @PV_NOMBRE_GENERICO=?; SET @PI_CANTIDAD_UNITARIA=?; \
    SET @PD_PRECIO_UNITARIA=?; SET @PD_PRECIO_VENTA=?; SET @PV_CONTENIDO_NETO=?; SET @PV_TIPO_EMPAQUE=?;\
     SET @PV_CODIGO_BARRAS=?; SET @PD_ISV=?; SET @PV_ESTADO=?; SET @PV_IMAGEN=?; \
              CALL UPDATE_TBL_PRODUCTO(@PI_COD_PRODUCTO,@PI_COD_CATEGORIA,@PI_COD_PROVEEDOR,@PV_NOMBRE_PRODUCTO,\
               @PV_MARCA,@PV_NOMBRE_COMERCIAL,@PV_NOMBRE_GENERICO,@PI_CANTIDAD_UNITARIA,\
               @PD_PRECIO_UNITARIA,@PD_PRECIO_VENTA,@PV_CONTENIDO_NETO,@PV_TIPO_EMPAQUE,@PV_CODIGO_BARRAS,@PD_ISV,@PV_ESTADO,@PV_IMAGEN);"  
       mysqlconnection.query(sql,[emp.PI_COD_PRODUCTO,emp.PI_COD_CATEGORIA,emp.PI_COD_PROVEEDOR,emp.PV_NOMBRE_PRODUCTO,emp.PV_MARCA,emp.PV_NOMBRE_COMERCIAL,emp.PV_NOMBRE_GENERICO,emp.PI_CANTIDAD_UNITARIA,emp.PD_PRECIO_UNITARIO,
           emp.PD_PRECIO_VENTA,emp.PV_CONTENIDO_NETO,emp.PV_TIPO_EMPAQUE,emp.PV_CODIGO_BARRAS,emp.PD_ISV,emp.PV_ESTADO,emp.PV_IMAGEN],(err,rows,fields)=>{  
    if(!err)   
    res.json("Registro actualizado");  
    else  
        console.log(err);  
})  
});  


//Borrando datos de tabla tbl_productos con procedimiento almacenado  
app.delete('/TBL_PRODUCTOS/:PI_COD_PRODUCTO',validarToken,(req,res)=>{  
    const {PI_COD_PRODUCTO} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_PRODUCTO = ?; \
    CALL DELETE_TBL_PRODUCTO(@PI_COD_PRODUCTO);"  
    mysqlconnection.query(sql,[emp.PI_COD_PRODUCTO],(err,rows,fields)=>{  
        if(!err)   
    res.json("Registro borrado exitosamente");  
    else  
        console.log(err);  
        
})  
});  







module.exports = app;