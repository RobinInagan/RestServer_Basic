const Role = require('../models/rol');
const Usuario = require('../models/usuario');

const rolValido = async (rol = '') => {
    const existerol = await Role.findOne({ rol });
    if (!existerol) {
        throw new Error(`El rol ${rol} no esta registrado en la BD `);
    }
};


const emailexiste = async (correo = '') => {
    const existeEmail = await Usuario.findOne({ correo });
    if (existeEmail) {
        throw new Error('El correo ya esta registrado en la aplicacion');
    }
};

const existeUsuarioID = async (id) => {
    const existeUsuario = await Usuario.findById(id);
    if (!existeUsuario) {
        throw new Error('El id no esta registrado en la Base de de Datos');
    }
};

module.exports = {
    rolValido,
    emailexiste,
    existeUsuarioID
}