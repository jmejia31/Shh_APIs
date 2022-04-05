//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');

/*-------------------------------------
        TABLA CITAS MEDICAS
---------------------------------------*/

//CONSULTANDO TODOS LOS DATOS DE LA TABLA CON PROCEDIMIENTO ALMACENADO
app.get('/tbl_citas_medicas/',validarToken,(req,res)=>{ 
    
    let sql = `CALL SELECT_TBL_CITAS_MEDICAS()`;

    mysqlconnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
})  
});

//CONSULTANDO DATOS POR ID DE LA TABLA CON PROCEDIMIENTO ALMACENADO
app.get('/tbl_citas_medicas/:cod_cita',validarToken,(req,res)=>{  
    
    const {cod_cita} = req.params; 
    let sql = `CALL SELECT_TBL_CITAS_MEDICAS_FILTRO(?)`;
    
    mysqlconnection.query(sql,[cod_cita],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
    })  
});


// INSERTANDO EN LA TABLA CITAS MEDICAS
app.post('/tbl_citas_medicas/',validarToken,(req, res) => {

    
    const {COD_PACIENTE,ESPECIALIDAD_REQUERIDA,NOMBRE_MEDICO,CUBICULO,FEC_ATENCION,ESTADO,USR_REGISTRO,OBSERVACIONES} = req.body;
    
    
    //MUESTRA EN CONSOLA LOS VALORES QUE ESTAN EN VARIABLES
    const query =  `CALL INSERT_TBL_CITAS_MEDICAS (?,?,?,?,?,?,?,?);  `;
    
    mysqlconnection.query(query, [COD_PACIENTE, ESPECIALIDAD_REQUERIDA, NOMBRE_MEDICO, CUBICULO, FEC_ATENCION,ESTADO,USR_REGISTRO,OBSERVACIONES], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'cita agregada'})
        } else {
            console.log(err);
        }
    });
});

//PUT CITA MEDICA
app.put('/tbl_citas_medicas/:cod_cita',validarToken, (req,res)=>{

    const {COD_CITA,COD_PACIENTE,ESPECIALIDAD_REQUERIDA,NOMBRE_MEDICO,CUBICULO,FEC_ATENCION,ESTADO,USR_REGISTRO,OBSERVACIONES} = req.body;
  
    //console.log(COD_PACIENTE, ESPECIALIDAD_REQUERIDA, NOMBRE_MEDICO, CUBICULO, FEC_ATENCION,ESTADO,USR_REGISTRO,OBSERVACIONES);
    const query =  `CALL UPDATE_TBL_CITAS_MEDICAS (?,?,?,?,?,?,?,?,?);  `;

    mysqlconnection.query(query, [COD_CITA,COD_PACIENTE, ESPECIALIDAD_REQUERIDA, NOMBRE_MEDICO, CUBICULO, FEC_ATENCION,ESTADO,USR_REGISTRO,OBSERVACIONES], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'cita actualizada'})
        } else {
            console.log(err);
        }
    });
});

//ELIMINAR DE CITAS MEDICAS
app.delete('/tbl_citas_medicas/:cod_cita',validarToken,(req,res)=>{  
    
    const {cod_cita} = req.params; 
    let sql = `CALL DELETE_TBL_CITAS_MEDICAS(?)`;

    mysqlconnection.query(sql,[cod_cita],(err,rows,fields)=>{  
    if(!err)   
        res.json({status: 'cita eliminada'});  
    else  
        console.log(err);        
    })  
});

module.exports = app;