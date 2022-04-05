//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');

/*-------------------------------------
        TABLA PERMISOS
---------------------------------------*/

//GET PERMISOS
//CONSULTANDO TODOS LOS DATOS DE LA TABLA CON PROCEDIMIENTO ALMACENADO
app.get('/tbl_permisos/',validarToken,(req,res)=>{ 
    
    let sql = `CALL SELECT_TBL_PERMISOS()`;

    mysqlconnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
    })  
});

//GET PERMISO POR ID
//CONSULTANDO DATOS POR ID DE LA TABLA CON PROCEDIMIENTO ALMACENADO
app.get('/tbl_permisos/:COD_PERMISO',validarToken,(req,res)=>{  
    
    const {COD_PERMISO} = req.params; 
    let sql = `CALL SELECT_TBL_PERMISOS_FILTRO(?)`;

    mysqlconnection.query(sql,[COD_PERMISO],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
    })  
});

//POST PERMISO
// INSERTANDO EN LA TABLA PERMISOS
app.post('/tbl_permisos/',validarToken,(req, res) => {

    const {COD_ROL_USR,ELIMINAR,EDITAR,INGRESAR,CONSULTAR} = req.body;
  
    console.log(COD_ROL_USR,ELIMINAR,EDITAR,INGRESAR,CONSULTAR);
    const query =  `CALL INSERT_TBL_PERMISOS (?,?,?,?,?);  `;
    
    mysqlconnection.query(query, [COD_ROL_USR,ELIMINAR,EDITAR,INGRESAR,CONSULTAR], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Permiso agregado'})
        } else {
            console.log(err);
        }
    });
});

//PUT PERMISO
//REEMPLAZANDO DATOS EN TABLA PERMISOS
app.put('/tbl_permisos/:COD_PERMISO',validarToken,(req,res)=>{

    const {COD_PERMISO ,COD_ROL_USR,ELIMINAR,EDITAR,INGRESAR,CONSULTAR} = req.body;
  
    console.log(COD_ROL_USR,ELIMINAR,EDITAR,INGRESAR,CONSULTAR);
    const query =  `CALL UPDATE_TBL_PERMISOS (?,?,?,?,?,?);  `;

    mysqlconnection.query(query, [COD_PERMISO ,COD_ROL_USR,ELIMINAR,EDITAR,INGRESAR,CONSULTAR], (err, rows, fields) => {
        if (!err) {
            res.json({status:'Permiso actualizado'})
        } else {
            console.log(err);
        }
    });
});

//DELETE PERMISO
app.delete('/tbl_permisos/:COD_PERMISO',validarToken,(req,res)=>{  
    
    const {COD_PERMISO } = req.params; 
    let sql = `CALL DELETE_TBL_PERMISOS(?)`;

    mysqlconnection.query(sql,[COD_PERMISO ],(err,rows,fields)=>{  
    if(!err)   
        res.json({status: 'Rol eliminado'});  
    else  
      
        console.log(err);        
    })  
});



module.exports = app;