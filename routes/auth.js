/*
RUTAS DE USUARIO AUTH
localhost:PORT/auth/
/*/

const {Router}=require('express');
const {check}=require('express-validator');

const router=Router();
const {loginUsuario,nuevoUsuario,revalidarToken}=require('../controllers/authController');
const {validarCampos}=require('../middlewares/validar-campos');
const {validarJWT}=require('../middlewares/validar-jwt');


router.post('/',
        [
        check('email','Tiene que ser un email válido').isEmail(),
        check('password','El password tiene que tener por lo menos 6 caracteres').isLength({min:6}),
        validarCampos    
        ], 
        loginUsuario);

router.post('/new',
    [
        check('name','El nombre es obligatorio').not().isEmpty(),
        check('email','Tiene que ser un email válido').isEmail(),
        check('password','El password tiene que tener por lo menos 6 caracteres').isLength({min:6}),
        validarCampos
     ],
    nuevoUsuario);

router.get('/renew',[validarJWT],revalidarToken);

module.exports=router;