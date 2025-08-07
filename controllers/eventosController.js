const {response}=require('express');
const Evento = require('../models/EventoModel');

const obtenerEventos= async (req,res=response)=>{

    const eventos= await Evento.find().populate('user','name');

    res.status(200).json({
        ok:true,
        eventos

    });
}

const crearEvento= async (req,res=response)=>{
    
    const evento = new Evento(req.body); //Instanciamos el modelo

    try{
        evento.user=req.uid; //agregamos el uid que nos faltaba para completar el modelo
        const eventoBD= await evento.save();
        res.status(200).json({
            ok:true,
            eventoBD
        });

    }
    catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            msg:'Contacte a jovaslink@gmail.com'

        });
    }



}

const actualizarEvento= async (req,res=response)=>{

    const eventoId=req.params.id;
    const {uid}=req;
    

    try{
        const evento=await Evento.findById(eventoId);
        if(!evento){
            res.status(402).json({
                ok:false,
                msg:'Id de la nota no existe'
            })
        }

        if(evento.user.toString() !== uid ){

            return res.status(500).json({
                ok:false,
                msg:'No tiene privilegios para actualizar esta nota'
            })
        }

        const nuevoEvento = {
            ...req.body,
            user:uid
        }

        const eventoActualizado = await Evento.findByIdAndUpdate(eventoId,nuevoEvento,{new:true});
        res.status(200).json({
            ok:true,
            eventoActualizado
        })

    }
    
    catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            msg:'contacte con jovaslink@gmail.com'
        });

    }

}


const borrarEvento= async (req,res=response)=>{

    const eventoId=req.params.id;
    const {uid}=req;
    

    try{
        const evento=await Evento.findById(eventoId);
        if(!evento){
            res.status(402).json({
                ok:false,
                msg:'Id de la nota no existe'
            })
        }

        if(evento.user.toString() !== uid ){

            return res.status(500).json({
                ok:false,
                msg:'No tiene privilegios para borrar esta nota'
            })
        }

       

        await Evento.findByIdAndDelete(eventoId);
        res.status(200).json({
            ok:true,
            msg:'Nota borrada'
        })

    }
    
    catch(err){
        console.log(err);
        res.status(500).json({
            ok:false,
            msg:'contacte con jovaslink@gmail.com'
        });

    }



   
}


module.exports={obtenerEventos,crearEvento,actualizarEvento,borrarEvento}