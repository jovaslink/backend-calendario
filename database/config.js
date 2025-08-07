const mongoose = require('mongoose');

const configDB = async()=>{

    try {
        
        await mongoose.connect(process.env.DB,
            {useNewUrlParser: true,
             useUnifiedTopology : true  
            }
        );
        console.log('CONECTADO A LA BASE DE DATOS')

    }
    catch(error) {
        console.log(error);
        throw new Error ('ERROR AL CONECTARSE A LA BASE DE DATOS');
    }


}

module.exports={configDB}; 



