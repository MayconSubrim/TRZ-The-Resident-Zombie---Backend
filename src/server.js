//configurando dependencias que serão usadas
require('dotenv').config({path:'variaveis.env'});
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');

//declarando rotas
const routes = require('./routes');

//configurando servidor local
const server = express();
server.use(cors());
server.use(bodyParser.urlencoded({extended: false}));
server.use('/api', routes);

server.listen(process.env.PORT, ()=>{
    console.log(`server rodando em : http://localhost:${process.env.PORT}`);
})
