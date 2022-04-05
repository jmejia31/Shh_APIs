//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');

/*-------------------------------------
        TABLA ROLES
---------------------------------------*/

//GET ROLES
//CONSULTANDO TODOS LOS DATOS DE LA TABLA CON PROCEDIMIENTO ALMACENADO
app.get('/tbl_roles_usuarios/',validarToken,(req,res)=>{ 
    
    let sql = `CALL SELECT_TBL_ROLES()`;

    mysqlconnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
    })  
});

//GET ROL POR ID
//CONSULTANDO DATOS POR ID DE LA TABLA CON PROCEDIMIENTO ALMACENADO
app.get('/tbl_roles_usuarios/:COD_ROL_USR',validarToken,(req,res)=>{  
    
    const {COD_ROL_USR} = req.params; 
    let sql = `CALL SELECT_TBL_ROLES_FILTRO(?)`;

    mysqlconnection.query(sql,[COD_ROL_USR],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
    })  
});

//POST ROL
app.post('/tbl_roles_usuarios/',validarToken,(req, res) => {

    const {ROL} = req.body;  
    
    const query =  `CALL INSERT_TBL_ROLES (?);  `;
    
    mysqlconnection.query(query, [ROL], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Rol agregado'})
        } else {
            console.log(err);
        }
    });
});

//PUT ROL
//REEMPLAZA INFORMACION DE LA TABLA
app.put('/tbl_roles_usuarios/:COD_ROL_USR',validarToken,(req,res)=>{

    const {COD_ROL_USR,ROL} = req.body;  
    
    const query =  `CALL UPDATE_TBL_ROLES (?,?);  `;

    mysqlconnection.query(query, [COD_ROL_USR,ROL], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Rol actualizado'})
        } else {
            console.log(err);
        }
    });
});

//DELETE ROL
app.delete('/tbl_roles_usuarios/:COD_ROL_USR',validarToken,(req,res)=>{  
    
    const {COD_ROL_USR} = req.params; 
    let sql = `CALL DELETE_TBL_ROLES(?)`;

    mysqlconnection.query(sql,[COD_ROL_USR],(err,rows,fields)=>{  
    if(!err)   
        res.json({status: 'Rol eliminado'});  
    else  
        res.json({status: 'Rol no encontrado'});
        console.log(err);        
    })  
});


module.exports = app;