
//constante para el paquete Express
const express = require('express');
//variable para los metodos de express.
var app = express();
//constante para el paquete de bodparser.
const bp = require('body-parser');

const { mysqlconnection } = require('./src/database/mysql');
const cors =require('cors');

//Enviando los datos JSON a NodeJS API
app.use(bp.json());

// Middlewares
app.use(express.json());
app.use(cors());

// Route
app.get('/', (req, res) => {
    res.send('Bienvenido al SHH');

});
// Módulos de Alejandro
app.use(require('./src/router/personas/pacientesRouter'));
app.use(require('./src/router/personas/seguros_medicosRouter'));
app.use(require('./src/router/personas/det_pacientes_seguros_medicosRouter'));
app.use(require('./src/router/personas/det_usuarios_seguros_medicosRouter'));
// Módulos de Julio
app.use(require('./src/router/expediente_medico/det_expediente_medicosRouter'));
app.use(require('./src/router/personas/det_proveedoresRouter'));
app.use(require('./src/router/personas/det_contact_proveedorRouter'));
// Módulos de Alex
app.use(require('./src/router/inventario/categ_productoRouter'));
app.use(require('./src/router/inventario/productosRouter'));
app.use(require('./src/router/inventario/comprasRouter'));
app.use(require('./src/router/inventario/inventarioRouter'));
// Módulos de Daniel
app.use(require('./src/router/modulo_ventas/ventasRouter'));
app.use(require('./src/router/modulo_ventas/facturaRouter'));
app.use(require('./src/router/modulo_ventas/det_serviciosRouter'));
app.use(require('./src/router/modulo_ventas/det_facturasRouter'));
// Módulos de Josue
app.use(require('./src/router/beneficiario/beneficiarioRouter'));
app.use(require('./src/router/beneficiario/seguro_vidaRouter'));
// Módulos de Javier
app.use(require('./src/router/notas_audio/notas_audio'));
app.use(require('./src/router/personas/usuarios'));
// Módulos de Estuardo
app.use(require('./src/router/citas_medicas/citas_medicasRouter'));
app.use(require('./src/router/modulo_ventas/metodo_pagoRouter'));
app.use(require('./src/router/seguridad/permisosRouter'));
app.use(require('./src/router/seguridad/rolesRouter'));

app.use(require('./src/router/login'));



//Test de conexion de base datos
mysqlconnection.connect((err) => {
    if (!err) {
        console.log('Conexion Exitosa');
    } else {

        console.log('Error al conectar a la DB');
    }
});

// Ejecutar el server en un puerto especificio

app.listen(3000, () => console.log('Server Running puerto: 3000'));