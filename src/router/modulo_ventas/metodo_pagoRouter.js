//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();

const { mysqlconnection } = require('../../database/mysql');
var { validarToken } = require('../../token');

/*-------------------------------------
        TABLA METODOS DE PAGO
---------------------------------------*/

//GET METODOS DE PAGO
//CONSULTANDO TODOS LOS DATOS DE LA TABLA CON PROCEDIMIENTO ALMACENADO
app.get('/tbl_metodo_pago/',validarToken,(req,res)=>{ 
    
    let sql = `CALL SELECT_TBL_METODO_PAGO()`;

    mysqlconnection.query(sql,(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
    })  
});

//GET METODO DE PAGO POR ID
//CONSULTANDO DATOS POR ID DE LA TABLA CON PROCEDIMIENTO ALMACENADO
app.get('/tbl_metodo_pago/:COD_METODO_PAGO',validarToken,(req,res)=>{  
    
    const {COD_METODO_PAGO } = req.params; 
    let sql = `CALL SELECT_TBL_METODO_PAGO_FILTRO(?)`;

    mysqlconnection.query(sql,[COD_METODO_PAGO ],(err,rows,fields)=>{  
        if(!err)   
    res.json(rows);  
    else  
        console.log(err);        
    })  
});

//POST METODO DE PAGO
//AGREGA INFORMACION A LA TABLA
app.post('/tbl_metodo_pago/',validarToken,(req, res) => {

    const {TIPO_PAGO,DETALLES} = req.body;
   
    const query =  `CALL INSERT_TBL_METODO_PAGO (?,?);  `;
    
    mysqlconnection.query(query, [TIPO_PAGO,DETALLES], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Procedimiento agregado'})
        } else {
            console.log(err);
        }
    });
});

//PUT METODO DE PAGO
//REEMPLAZA INFORMACION DE LA TABLA
app.put('/tbl_metodo_pago/:COD_METODO_PAGO',validarToken,(req,res)=>{

    const {COD_METODO_PAGO,TIPO_PAGO,DETALLES} = req.body; 

    const query =  `CALL UPDATE_TBL_METODO_PAGO (?,?,?);  `;

    mysqlconnection.query(query, [COD_METODO_PAGO,TIPO_PAGO,DETALLES], (err, rows, fields) => {
        if (!err) {
            res.json({status: 'Metodo de pago actualizado'})
        } else {
            console.log(err);
        }
    });
});

//DELETE METODO DE PAGO
app.delete('/tbl_metodo_pago/:COD_METODO_PAGO',validarToken,(req,res)=>{  
    
    const {COD_METODO_PAGO} = req.params; 
    let sql = `CALL DELETE_TBL_METODO_PAGO(?)`;

    mysqlconnection.query(sql,[COD_METODO_PAGO],(err,rows,fields)=>{  
    if(!err)   
        res.json({status: 'Rol eliminado'});  
    else  
        console.log(err);        
    })  
});



module.exports = app;