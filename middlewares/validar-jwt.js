const {response}= require('express');
const jwt = require('jsonwebtoken');
const validarJWT = (req, res=response, next)=>{
    const token= req.header('x-token');

    if(!token){
        return res.status(401).json({
            ok:false,
            msg:'No existe Token en la petición',
        });
    }
    try{

        const payload = jwt.verify(token, process.env.SECRET_JWT_SEMILLA);
        req.uid=payload.uid;
        req.name=payload.name;


    }catch(err){
        console.log(err);
        return res.status(401).json({
            ok:false,
            msg:'No se revalidó el token'
        });
    }
    next();
}

module.exports={validarJWT};