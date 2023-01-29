//configurando dependencias que serão usadas
require("dotenv").config();
const express = require("express");
require("express-async-errors");
const cors = require("cors");

//declarando rotas
const router = require("./routers");

//configurando servidor local
const server = express();
server
  .use(cors())
  .use(express.json())
  .use(router)
  .use((error, req, res, next) => {
    return res.sendStatus(500);
  });

server.listen(process.env.PORT, () => {
  console.log(`server rodando em : http://localhost:${process.env.PORT}`);
});
