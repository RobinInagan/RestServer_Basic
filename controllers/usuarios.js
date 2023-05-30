const { response, request } = require('express')
const Usuario = require('../models/usuario');
const bcryptjs = require('bcryptjs');

const usuariosGet = async (req = request, res = response) => { // Se solicita una petición a este path, el server responde

    const { limite = 5, desde = 0 } = req.query; // Se debe castear si lo que se necesita es un número, debido a que lo que se extrae de la query es un string

    // const usuarios = await Usuario.find({ estado: true })
    //     .skip(Number(desde))
    //     .limit(Number(limite));

    // const total = await Usuario.countDocuments({ estado: true });

    const [total, usuarios] = await Promise.all([
        Usuario.countDocuments({ estado: true }),
        Usuario.find({ estado: true })
            .skip(Number(desde))
            .limit(Number(limite))
    ]);

res.json({
    total,
    usuarios
});
}

const usuariosPost = async (req, res = response) => { // 

    const { nombre, correo, password, rol } = req.body;
    const usuario = new Usuario({ nombre, correo, password, rol }); // modelo de mmongo

    //Encriptar Contraseña
    const salt = bcryptjs.genSaltSync();//Numero de vueltas para hacer mas complicado el proceso de desencriptado
    usuario.password = bcryptjs.hashSync(password, salt);

    //Guardar en BD
    await usuario.save();

    res.json({
        ok: true,
        msg: 'post API - Controlador',
        usuario
    })
};

const usuariosPut = async (req, res = response) => { // 

    const id = req.params.id;
    const { _id, password, google, correo, ...resto } = req.body;

    //TODO validar contra base de datos.
    if (password) {
        //Encriptar Contraseña
        const salt = bcryptjs.genSaltSync();//Numero de vueltas para hacer mas complicado el proceso de desencriptado
        resto.password = bcryptjs.hashSync(password, salt);
    }

    const usuario = await Usuario.findByIdAndUpdate(id, resto);

    res.json(usuario);
};

const usuariosPatch = (req, res = response) => {
    res.json({
        ok: true,
        msg: 'Patch API - Controlador'
    });
};

const usuariosDelete = async (req, res = response) => { // 
    const { id } = req.params;

    //Borrado Fisico de la BD 
    // const usuario = await Usuario.findByIdAndDelete(id);  Esto no se recomienda porque peude perderse la informacion

    // Borrado con cambio de estado (Ocultar User)

    const usuario = await Usuario.findByIdAndUpdate(id,{estado: false });


    res.json({
        usuario
    })
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
