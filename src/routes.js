//configurando o framework express
const express = require('express');
const router = express.Router();

const index = require('./controllers/index')
//rota para buscar todos sobreviveltes
router.get('/Allsurvivors', index.GetAll)


module.exports = router;