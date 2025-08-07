const jwt = require('jsonwebtoken');

const generarJWT = (uid,name)=>{
    return new Promise((resolve,reject)=>{

        const payload={uid,name}
        jwt.sign(payload, process.env.SECRET_JWT_SEMILLA,
            {
                expiresIn:'2h'
            }
            ,(error,token)=>{
                if(error){
                    console.log(error);
                    reject('Error al generar TOKEN, contacte a jovasink@gmail.com');
                }
                resolve(token);

            });


    });
}

module.exports={generarJWT};