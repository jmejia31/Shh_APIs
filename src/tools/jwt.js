const jwt = require('jsonwebtoken');
const CustomError = require('../tools/error');

const generarToken = (datos) => {
    if(!datos || typeof datos !== 'object'){
        throw new CustomError('Se esperaba un objeto');
    }

    try {
        return jwt.sign(datos, "palabraSecreta",{ expiresIn: '24h' });
    } catch ({ message }) {
        throw new CustomError(message);
    }
}

const obtenerDatosToken = (token) => {
    try {
        return jwt.verify(token, "palabraSecreta");
    }  catch ({ message }) {
        return null;
    }
}

module.exports = { obtenerDatosToken, generarToken };
