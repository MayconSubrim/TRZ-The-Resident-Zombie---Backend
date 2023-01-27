//configurando o framework express
const { Router } = require('express');
const express = require('express');
const router = express.Router();

const index = require('./controllers/index');
//rota para buscar todos sobreviveltes
router.get('/Allsurvivors', index.GetAll);
router.get('/Estoque', index.GetItems);
router.get('/Estoque/:sobrevivente_id', index.GetOneItem);
router.get('/GetSurvivor/:sobrevivente_id', index.GetSurvivor);
router.post('/PostSurvivor', index.Insert);
router.put('/Atualizar/:sobrevivente_id', index.Update);
router.delete('/DeleteSurvivor/:sobrevivente_id', index.Delete);
router.put('/AtualizarLocal', index.UpdateLocal);
router.post('/Denunciar', index.Denunciar);
router.post('/AddItem', index.AddItem);
router.delete('/DellItem', index.DellItem);
router.get('/Vivos', index.GetLives);
router.get('/Infectados', index.GetInfectados);
router.get('/SurvivorItens', index.SurvivorItens)
router.get('/LostItem', index.LostItem)


module.exports = router;