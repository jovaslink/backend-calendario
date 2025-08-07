/*
RUTAS DE EVENTOS 
localhost:PORT/eventos/
/*/

const {Router} = require('express');
const {check}=require('express-validator');
const {obtenerEventos,crearEvento,actualizarEvento,borrarEvento} = require('../controllers/eventosController');
const {validarJWT}=require('../middlewares/validar-jwt');
const {validarCampos}=require('../middlewares/validar-campos');
const {isDate}=require('../helpers/isDate');

const router=Router();

//Obtener eventos
router.get('/',[validarJWT],obtenerEventos);
//Crear evento
router.post('/crear',
    [
        validarJWT,
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Tiene que ser una fecha valida').custom(isDate),
        check('end','Tiene que ser una fecha valida').custom(isDate),
        validarCampos,
     ],crearEvento);

     //Actualizar evento
router.put('/actualizar/:id',
    [
        validarJWT,
        check('title','El titulo es obligatorio').not().isEmpty(),
        check('start','Tiene que ser una fecha valida').custom(isDate),
        check('end','Tiene que ser una fecha valida').custom(isDate),
        validarCampos,
    
    ],actualizarEvento);
//Borrar evento
router.delete('/borrar/:id',[validarJWT],borrarEvento);

module.exports=router;