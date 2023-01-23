//configurando o framework express
const express = require('express');
const router = express.Router();

const index = require('./controllers/index');
//rota para buscar todos sobreviveltes
router.get('/Allsurvivors', index.GetAll);
router.get('/Estoque', index.GetItems);
router.get('/GetSurvivor/:sobrevivente_id', index.GetSurvivor);
router.post('PostSurvivor', index.Insert);

module.exports = router;