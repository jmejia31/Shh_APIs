const { obtenerDatosToken } = require("./tools/jwt");
var validarToken = (req, res, next) => {
    var mensaje = "";

    try {
        const { headers } = req;

        const token = headers['Authorization'] || headers['authorization'];

        if (!token) {
            mensaje = "token es requerido";
            return res.status(401).send(mensaje);
        }

        const datosUsuario = obtenerDatosToken(token);

        if (!datosUsuario) {
            mensaje = "Sus credenciales expirarón";
            return res.status(401).send(mensaje);
        }
        next();

    } catch ({ message }) {
        mensaje = "Ocurrio un error interno" + message;
        return res.status(500).send(mensaje);;
    }
}

module.exports = { validarToken };
