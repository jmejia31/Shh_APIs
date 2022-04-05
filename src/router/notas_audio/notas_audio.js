

//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');


//CONSULTANDO TODOS LOS DATOS DE LA TABLA CON PROCEDIMIENTO ALMACENADO
app.get('/TBL_NOTAS_AUDIO/',validarToken,(req,res)=>{ 
    
    let sql = `CALL SELECT_TBL_NOTAS_AUDIO()`;

    mysqlConnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
})  
});

////CONSULTANDO DATOS POR ID DE LA TABLA CON PROCEDIMIENTO ALMACENADO
app.get('/TBL_NOTAS_AUDIO/:PI_COD_NOTAS_AUDIO',validarToken,(req,res)=>{  
    let emp = req.body;  
    var sql = "SET @PI_COD_NOTAS_AUDIO = ?; \
    CALL SELECT_TBL_NOTAS_AUDIO_FILTRO(@PI_COD_NOTAS_AUDIO);"  
    mysqlconnection.query(sql,[emp.PI_COD_NOTAS_AUDIO],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});

//Insertando datos en tabla TBL_NOTAS_AUDIO con procedimiento almacenado  
app.post('/TBL_NOTAS_AUDIO',validarToken,(req,res)=>{  
      let emp = req.body;  
    var sql = "SET @PI_COD_EXPEDIENTE = ?; SET @PI_COD_USR = ?; SET @PL_AUDIO_PACIENTE = ?; \
               CALL INSERT_TBL_NOTAS_AUDIO(@PI_COD_EXPEDIENTE, @PI_COD_USR, @PL_AUDIO_PACIENTE);"  
        mysqlconnection.query(sql,[emp.PI_COD_EXPEDIENTE, emp.PI_COD_USR, emp.PL_AUDIO_PACIENTE],(err,rows,fields)=>{  
    if(!err)   
    res.json("Datos insertados correctamente");  
    else  
        console.log(err);  
})  
});


//Actualizando datos en tabla TBL_NOTAS_AUDIO con procedimiento almacenado 
app.put('/TBL_NOTAS_AUDIO/:PI_COD_NOTAS_AUDIO',validarToken,(req,res)=>{ 
    const {PI_COD_NOTAS_AUDIO} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_NOTAS_AUDIO = ?; SET @PI_COD_EXPEDIENTE = ?; SET @PI_COD_USR = ?; SET @PL_AUDIO_PACIENTE = ?; \
    CALL UPDATE_TBL_NOTAS_AUDIO(@PI_COD_NOTAS_AUDIO, @PI_COD_EXPEDIENTE, @PI_COD_USR, @PL_AUDIO_PACIENTE);"  
    mysqlconnection.query(sql,[emp.PI_COD_NOTAS_AUDIO, emp.PI_COD_EXPEDIENTE, emp.PI_COD_USR, emp.PL_AUDIO_PACIENTE],(err,rows,fields)=>{  
    if(!err)   
    res.json("Registro actualizado");  
    else  
        console.log(err);  
})  
});  

//Borrando datos de tabla tbl_proveedores con procedimiento almacenado  
app.delete('/TBL_NOTAS_AUDIO/:PI_COD_NOTAS_AUDIO',validarToken,(req,res)=>{  
    const {PI_COD_NOTAS_AUDIO} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_NOTAS_AUDIO = ?; \
    CALL DELETE_TBL_NOTAS_AUDIO(@PI_COD_NOTAS_AUDIO);"  
    mysqlconnection.query(sql,[emp.PI_COD_NOTAS_AUDIO],(err,rows,fields)=>{  
        if(!err)   
    res.json("Registro borrado exitosamente");  
    else  
        console.log(err);  
      
})  
});  

module.exports = app;