//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');



//CONSULTANDO TODOS LOS DATOS DE LA TABLA TBL_EXPEDIENTE_MEDICO CON PROCEDIMIENTO ALMACENADO
app.get('/TBL_EXPEDIENTE_MEDICO/',validarToken,(req,res)=>{ 
    
    let sql = "CALL SELECT_TBL_EXPEDIENTE_MEDICO();"

    mysqlconnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
})  
});

//CONSULTADO DATOS POR ID DE LA TABLA TBL_EXPEDIENTE_MEDICO CON PROCEDIMIENTO ALMACENADO 
app.get('/TBL_EXPEDIENTE_MEDICO/:PI_COD_EXPEDIENTE',validarToken,(req,res)=>{  
    const {PI_COD_EXPEDIENTE} = req.params;
    let emp = req.body;  
    var sql = "SET @PI_COD_EXPEDIENTE = ?; \
    CALL SELECT_TBL_EXPEDIENTE_MEDICO_FILTRO(@PI_COD_EXPEDIENTE);"  
    mysqlconnection.query(sql,[emp.PI_COD_EXPEDIENTE],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});


//INSERTANDO DATOS EN TABLA TBL_EXPEDIENTE_MEDICO CON PROCEDIMIENTO ALMACENADO 
app.post('/TBL_EXPEDIENTE_MEDICO',validarToken,(req,res)=>{  
    let emp = req.body;  
    var sql = "SET @PI_COD_PACIENTE = ?;SET @PI_NUMERO_EXPEDIENTE = ?;SET @PV_TEMPERATURA = ?;SET @PV_PRESION = ?;SET @PV_DIAGNOSTICO_MEDICO = ?;SET @PV_RECETA_MEDICA = ?;SET @PI_NUMERO_PLANTA = ?;SET @PI_NUMERO_CAMA = ?;SET @PV_NOMBRE_MEDICO = ?;SET @PV_USR_REGISTRO = ?;SET @PV_OBSERVACIONES = ?; \
               CALL INSERT_TBL_EXPEDIENTE_MEDICO(@PI_COD_PACIENTE,@PI_NUMERO_EXPEDIENTE,@PV_TEMPERATURA,@PV_PRESION,@PV_DIAGNOSTICO_MEDICO,@PV_RECETA_MEDICA,@PI_NUMERO_PLANTA,@PI_NUMERO_CAMA,@PV_NOMBRE_MEDICO,@PV_USR_REGISTRO,@PV_OBSERVACIONES);"  
        mysqlconnection.query(sql,[emp.PI_COD_PACIENTE,emp.PI_NUMERO_EXPEDIENTE,emp.PV_TEMPERATURA,emp.PV_PRESION,emp.PV_DIAGNOSTICO_MEDICO,emp.PV_RECETA_MEDICA,emp.PI_NUMERO_PLANTA,emp.PI_NUMERO_CAMA,emp.PV_NOMBRE_MEDICO,emp.PV_USR_REGISTRO,emp.PV_OBSERVACIONES],(err,rows,fields)=>{  
    if(!err)   
    res.json("Datos insertados correctamente");  
    else  
        console.log(err);  
})  
});  

//ACTUALIZANDO DATOS EN TABLA TBL_EXPEDIENTE_MEDICO CON PROCEDIMIENTO ALMACENADO 
app.put('/TBL_EXPEDIENTE_MEDICO/:PI_COD_EXPEDIENTE',validarToken,(req,res)=>{ 
    const {PI_COD_EXPEDIENTE} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_EXPEDIENTE = ?;SET @PI_COD_PACIENTE = ?;SET @PI_NUMERO_EXPEDIENTE = ?;SET @PV_TEMPERATURA = ?;SET @PV_PRESION = ?;SET @PV_DIAGNOSTICO_MEDICO = ?;SET @PV_RECETA_MEDICA = ?;SET @PI_NUMERO_PLANTA = ?;SET @PI_NUMERO_CAMA = ?;SET @PV_NOMBRE_MEDICO = ?;SET @PV_USR_REGISTRO = ?;SET @PV_OBSERVACIONES = ?; \
    CALL UPDATE_TBL_EXPEDIENTE_MEDICO(@PI_COD_EXPEDIENTE,@PI_COD_PACIENTE,@PI_NUMERO_EXPEDIENTE,@PV_TEMPERATURA,@PV_PRESION,@PV_DIAGNOSTICO_MEDICO,@PV_RECETA_MEDICA,@PI_NUMERO_PLANTA,@PI_NUMERO_CAMA,@PV_NOMBRE_MEDICO,@PV_USR_REGISTRO,@PV_OBSERVACIONES);"  
    mysqlconnection.query(sql,[emp.PI_COD_EXPEDIENTE,emp.PI_COD_PACIENTE,emp.PI_NUMERO_EXPEDIENTE,emp.PV_TEMPERATURA,emp.PV_PRESION,emp.PV_DIAGNOSTICO_MEDICO,emp.PV_RECETA_MEDICA,emp.PI_NUMERO_PLANTA,emp.PI_NUMERO_CAMA,emp.PV_NOMBRE_MEDICO,emp.PV_USR_REGISTRO,emp.PV_OBSERVACIONES],(err,rows,fields)=>{  
    if(!err)   
    res.json("Registro actualizado");  
    else  
        console.log(err);  
})  
});  

//BORRANDO DATOS DE TABLA TBL_EXPEDIENTE_MEDICO CON PROCEDIMIENTO ALMACENADO 
app.delete('/TBL_EXPEDIENTE_MEDICO/:PI_NUMERO_EXPEDIENTE',validarToken,(req,res)=>{  
    const {PI_COD_EXPEDIENTE} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_EXPEDIENTE = ?; \
    CALL DELETE_TBL_EXPEDIENTE_MEDICO(@PI_COD_EXPEDIENTE);"  
    mysqlconnection.query(sql,[emp.PI_COD_EXPEDIENTE],(err,rows,fields)=>{  
        if(!err)   
    res.json("Registro borrado exitosamente");  
    else  
        console.log(err);  
      
})  
}); 


module.exports = app;