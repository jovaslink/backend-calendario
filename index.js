const express = require('express');
const cors = require('cors');
require('dotenv').config();
const {configDB} = require('./database/config');

const app = express();
configDB();

//CORS
app.use(cors());
//Directorio público
app.use(express.static('public')); 
//Parseo y lectura del body
app.use(express.json());
//Rutas de usuario
app.use('/api/auth', require('./routes/auth'));
//Rutas de eventos
app.use('/api/eventos', require('./routes/eventos'));

//Servidor escuchando
app.listen(process.env.PORT,() => {
    console.log(`SERVIDOR ESCUCHANDO EN EL PUERTO ${process.env.PORT}`);
}); 
