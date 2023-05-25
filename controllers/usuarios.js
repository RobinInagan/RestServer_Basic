const{ response,request } = require('express')

const usuariosGet = (req = request, res = response) => { // Se solicita una petición a este path, el server responde
    const {q,nombre = 'No name'} = req.query;

    res.json({
        ok:true,
        msg: 'get API - Controlador',
        query
    });
}

const usuariosPost = (req, res = response) => { // 
    const body = req.body;


    res.json({
        ok:true,
        msg: 'post API - Controlador',
        body
    })
};

const usuariosPut = (req, res = response) => { // 

    const id = req.params.id;

    res.json({
        ok:true,
        msg: 'put API - Controlador',
        id
    })
};

const usuariosPatch = (req, res = response) =>{
    res.json({
        ok:true,
        msg: 'Patch API - Controlador'
    });
};

const usuariosDelete = (req, res = response) => { // 
    res.json({
        ok:true,
        msg: 'delete API - Controlador'
    })
};

module.exports = {
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete
}
