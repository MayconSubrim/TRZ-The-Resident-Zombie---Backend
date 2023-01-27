const express = require('express');
const Getall = require('./controllers/Getall');
const GetItens = require('./controllers/GetItens');
const GetOneItem = require('./controllers/GetOneItem');
const Insert = require('./controllers/Insert');
const GetSurvivor = require('./controllers/GetSurvivor');
const Update = require('./controllers/Update');
const Delete = require('./controllers/Delete');
const UpdateLocal = require('./controllers/UpdateLocal');
const Denunciar = require('./controllers/Denunciar');
const AddItem = require('./controllers/AddItem');
const DellItem = require('./controllers/DellItem');
const GetLives = require('./controllers/GetLives');
const GetInfectados = require('./controllers/GetInfectados');
const SurvivorItens = require('./controllers/SurvivorItens');
const LostItem = require('./controllers/LostItem');
const router = express.Router();

//rota para buscar todos sobreviveltes
router.get('/Allsurvivors', Getall.GetAll);
router.get('/Estoque', GetItens.GetItens);
router.get('/Estoque/:sobrevivente_id', GetOneItem.GetOneItem);
router.get('/GetSurvivor/:sobrevivente_id', GetSurvivor.GetSurvivor);
router.post('/PostSurvivor', Insert.Insert);
router.put('/Atualizar/:sobrevivente_id', Update.Update);
router.delete('/DeleteSurvivor/:sobrevivente_id', Delete.Delete);
router.put('/AtualizarLocal', UpdateLocal.UpdateLocal);
router.post('/Denunciar', Denunciar.Denunciar);
router.post('/AddItem', AddItem.AddItem);
router.delete('/DellItem', DellItem.DellItem);
router.get('/Vivos', GetLives.GetLives);
router.get('/Infectados', GetInfectados.GetInfectados);
router.get('/SurvivorItens', SurvivorItens.SurvivorItens)
router.get('/LostItem', LostItem.LostItem)


module.exports = router;