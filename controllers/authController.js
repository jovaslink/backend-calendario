const {response}=require('express'); // para tener tipado se iguala a res
const bcrypt = require('bcryptjs');
const Usuario =require('../models/UsuarioModel');
const {generarJWT} =require('../helpers/jwt');



const loginUsuario= async (req,res = response)=>{
    console.log("LOGIN /");
    const {email,password}=req.body;
    try{
        
        //verificar si existe el email
        const usuario = await Usuario.findOne({email});
        if(!usuario){
        res.status(400).json({
            ok:false,
            msg:'El email no existe en la BD'
            });
        };
      
        //verificar password
        const validPass = bcrypt.compareSync(password,usuario.password);
        if(!validPass){
            res.status(400).json({
                ok:false,
                msg:'La contraseña es incorrecta'
            });
        }

        //JWT
        const token=await generarJWT(usuario.id,usuario.name);
        //regresamos respuesta 200 ok!
        res.status(200).json({
            ok:true,
            usuario:usuario.id,
            name:usuario.name,
            token
        });
    
    }
    catch(error){
        console.log(error);
        res.status(500).json({
            ok:false,
            msg:'Contacte a jovaslink@gmail.com'

        });
    }
    
    
}


const nuevoUsuario= async (req,res = response)=>{
    console.log("NUEVO USUARIO /new");
 try{
    const {email,password}=req.body;

    let usuario = await Usuario.findOne({email});

   if(usuario){
    res.status(400).json({
        ok:false,
        msg:'El email ya está en uso'
        });
    };
    
        usuario = new Usuario(req.body); //sobreescribimos
        
        //Encriptar password
        const salt = bcrypt.genSaltSync();
        usuario.password= bcrypt.hashSync(password, salt);
        await usuario.save();

        //JWT
        const token= await generarJWT(usuario.id,usuario.name);
        res.status(201).json({
            ok: true,
            uid:usuario._id,
            name:usuario.name,
            email:usuario.email,
            token
        })


    }
    catch(error) {
        
        res.status(500).json({
            ok: false,
            msg: "Pongase en contacto con jovaslink@gmail.com",
        })
        console.log(error);
        throw new Error('Pongase en contacto con jovaslink@gmail.com');
        
    }

    
}

const revalidarToken= async (req,res = response) => { 
    console.log("Renovar Login /renew");
        //Renovar TOKEN
        const token = await generarJWT(req.uid,req.name);
        //regresamos respuesta 200 ok!
        res.status(200).json({
            ok:true,
            token
        });


}

module.exports={loginUsuario,nuevoUsuario,revalidarToken};