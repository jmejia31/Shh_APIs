



//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');


//CONSULTANDO TODOS LOS DATOS DE LA TABLA CON PROCEDIMIENTO ALMACENADO
app.get('/TBL_USUARIOS/',(req,res)=>{ 
    
    let sql = `CALL SELECT_TBL_USUARIOS()`;

    mysqlConnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
})  
});

////CONSULTANDO DATOS POR ID DE LA TABLA CON PROCEDIMIENTO ALMACENADO
app.get('/TBL_USUARIOS/:PI_COD_USR',(req,res)=>{  
    let emp = req.body;  
    var sql = "SET @PI_COD_USR = ?; \
    CALL SELECT_TBL_USUARIOS_FILTRO(@PI_COD_USR);"  
    mysqlconnection.query(sql,[emp.PI_COD_USR],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);  
      
})  
});

//Insertando datos en TABLA USUARIOS con procedimiento almacenado  
app.post('/TBL_USUARIOS',(req,res)=>{  
    let emp = req.body;  
  var sql = "SET @PI_COD_ROL_USR = ?; SET @PE_ESPECIALIDAD = ?; SET @PV_USR_PERS = ?; \
             SET @PV_PASSWD_PERS = ?; SET @PV_VERIFY_PASSWD_PERS = ?; SET @PI_NUMERO_COLEGIATURA = ?; \
             SET @PV_1ER_NOM = ?; SET @PV_2DO_NOM = ?; SET @PV_1ER_APELLIDO = ?; SET @PV_2DO_APELLIDO = ?;\
             SET @PI_NO_IDENTIDAD = ?; SET @PV_DIR = ?; SET @PV_EMAIL = ?; SET @PV_TEL = ?; SET @PV_CELL = ?;\
             SET @PE_GEN = ?; SET @PE_ESTADO_CIVIL = ?; SET @PV_EDAD = ?; SET @PD_FEC_NTO = ?; \
             SET @PE_ESTADO = ?; SET @PV_SALARIO = ?; SET @PE_USR_REG = ?; SET @PV_IP_CONEXION = ?;\
             SET @PV_MAC_CONEXION = ?; SET @PV_RTN = ?; \
             CALL INSERT_TBL_USUARIOS (@PI_COD_ROL_USR, @PE_ESPECIALIDAD, @PV_USR_PERS, @PV_PASSWD_PERS, \
             @PV_VERIFY_PASSWD_PERS, @PI_NUMERO_COLEGIATURA, @PV_1ER_NOM, @PV_2DO_NOM, @PV_1ER_APELLIDO, \
             @PV_2DO_APELLIDO, @PI_NO_IDENTIDAD, @PV_DIR, @PV_EMAIL,@PV_TEL, @PV_CELL, @PE_GEN, \
             @PE_ESTADO_CIVIL, @PV_EDAD, @PD_FEC_NTO, @PE_ESTADO, @PV_SALARIO, @PE_USR_REG,\
             @PV_IP_CONEXION, @PV_MAC_CONEXION, @PV_RTN);"  
      mysqlconnection.query(sql,[emp.PI_COD_ROL_USR, emp.PE_ESPECIALIDAD, emp.PV_USR_PERS, 
        emp.PV_PASSWD_PERS, emp.PV_VERIFY_PASSWD_PERS, emp.PI_NUMERO_COLEGIATURA, emp.PV_1ER_NOM,
        emp.PV_2DO_NOM, emp.PV_1ER_APELLIDO, emp.PV_2DO_APELLIDO, emp.PI_NO_IDENTIDAD,
        emp.PV_DIR, emp.PV_EMAIL, emp.PV_TEL, emp.PV_CELL,emp.PE_GEN, emp.PE_ESTADO_CIVIL, 
        emp.PV_EDAD, emp.PD_FEC_NTO, emp.PE_ESTADO, emp.PV_SALARIO, emp.PE_USR_REG,  
        emp.PV_IP_CONEXION, emp.PV_MAC_CONEXION, emp.PV_RTN],(err,rows,fields)=>{  
  if(!err)   
  res.json("Datos insertados correctamente");  
  else  
      console.log(err);  
})  
});

//Actualizando datos en tabla TBL_NOTAS_AUDIO con procedimiento almacenado 
app.put('/TBL_USUARIOS/:PI_COD_USR',(req,res)=>{  
    const {PI_COD_USR} = req.params;
    let emp = req.body;  
  var sql = "SET @PI_COD_USR = ?; SET @PI_COD_ROL_USR = ?; SET @PE_ESPECIALIDAD = ?; SET @PV_USR_PERS = ?; \
             SET @PV_PASSWD_PERS = ?; SET @PV_VERIFY_PASSWD_PERS = ?; SET @PI_NUMERO_COLEGIATURA = ?; \
             SET @PV_1ER_NOM = ?; SET @PV_2DO_NOM = ?; SET @PV_1ER_APELLIDO = ?; SET @PV_2DO_APELLIDO = ?;\
             SET @PI_NO_IDENTIDAD = ?; SET @PV_DIR = ?; SET @PV_EMAIL = ?; SET @PV_TEL = ?; SET @PV_CELL = ?;\
             SET @PE_GEN = ?; SET @PE_ESTADO_CIVIL = ?; SET @PV_EDAD = ?; SET @PD_FEC_NTO = ?; \
             SET @PE_ESTADO = ?; SET @PV_SALARIO = ?; SET @PE_USR_REG = ?; SET @PV_IP_CONEXION = ?;\
             SET @PV_MAC_CONEXION = ?; SET @PV_RTN = ?; \
             CALL UPDATE_TBL_USUARIOS (@PI_COD_USR, @PI_COD_ROL_USR, @PE_ESPECIALIDAD, @PV_USR_PERS, @PV_PASSWD_PERS, \
             @PV_VERIFY_PASSWD_PERS, @PI_NUMERO_COLEGIATURA, @PV_1ER_NOM, @PV_2DO_NOM, @PV_1ER_APELLIDO, \
             @PV_2DO_APELLIDO, @PI_NO_IDENTIDAD, @PV_DIR, @PV_EMAIL,@PV_TEL, @PV_CELL, @PE_GEN, \
             @PE_ESTADO_CIVIL, @PV_EDAD, @PD_FEC_NTO, @PE_ESTADO, @PV_SALARIO, @PE_USR_REG,\
             @PV_IP_CONEXION, @PV_MAC_CONEXION, @PV_RTN);"  
      mysqlconnection.query(sql,[emp.PI_COD_USR, emp.PI_COD_ROL_USR, emp.PE_ESPECIALIDAD, emp.PV_USR_PERS, 
        emp.PV_PASSWD_PERS, emp.PV_VERIFY_PASSWD_PERS, emp.PI_NUMERO_COLEGIATURA, emp.PV_1ER_NOM,
        emp.PV_2DO_NOM, emp.PV_1ER_APELLIDO, emp.PV_2DO_APELLIDO, emp.PI_NO_IDENTIDAD,
        emp.PV_DIR, emp.PV_EMAIL, emp.PV_TEL, emp.PV_CELL,emp.PE_GEN, emp.PE_ESTADO_CIVIL, 
        emp.PV_EDAD, emp.PD_FEC_NTO, emp.PE_ESTADO, emp.PV_SALARIO, emp.PE_USR_REG,  
        emp.PV_IP_CONEXION, emp.PV_MAC_CONEXION, emp.PV_RTN],(err,rows,fields)=>{  
  if(!err)   
  res.json("Datos insertados correctamente");  
  else  
      console.log(err);  
})  
});

//Borrando datos de tabla tbl_proveedores con procedimiento almacenado  
app.delete('/TBL_USUARIOS/:PI_COD_USR',(req,res)=>{  
    const {PI_COD_USR} = req.params;   
    let emp = req.body;  
    var sql = "SET @PI_COD_USR = ?; \
    CALL DELETE_TBL_USUARIOS(@PI_COD_USR);"  
    mysqlconnection.query(sql,[emp.PI_COD_USR],(err,rows,fields)=>{  
        if(!err)   
    res.json("Registro borrado exitosamente");  
    else  
        console.log(err);  
      
})  
});   

module.exports = app;