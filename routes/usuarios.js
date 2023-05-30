const { Router } = require('express');
const { check } = require('express-validator');
const {validarCampos} = require('../middlewares/validar-campos');
const { rolValido, 
        emailexiste,
        existeUsuarioID} = require('../Helpers/db-validators');
const {     
    usuariosGet,
    usuariosPost,
    usuariosPut,
    usuariosPatch,
    usuariosDelete} = require('../controllers/usuarios');

const router = Router();

router.get('/', usuariosGet );

router.post('/',[
    check('nombre','El nombre es obligatorio').not().isEmpty(),
    check('password','El password debe de ser más de 6 letras').isLength({min: 6}),
    check('correo','El correo no es valido').isEmail(),
    check('correo').custom( emailexiste ),   
    // check('rol','No es un rol valido').isIn(['ADMIN_ROLE','USER_ROLE']),
    check('rol').custom( rolValido),
    validarCampos 
] ,usuariosPost);

router.put('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioID),
    check('rol').custom( rolValido),
    validarCampos
], usuariosPut);

router.patch('/', usuariosPatch)

router.delete('/:id',[
    check('id','No es un id valido').isMongoId(),
    check('id').custom(existeUsuarioID),
    validarCampos 
], usuariosDelete);


module.exports = router;