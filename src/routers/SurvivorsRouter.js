const express = require('express');
const validationMiddleware = require('../middlewares/validationMiddleware');
const SurvivorController = require('../controllers/SurvivorController')
const models = require("../models")
const survivorRouter = express.Router();

survivorRouter.post('/Denunciar', validationMiddleware(models.DenunciarModel), SurvivorController.denunciar);
survivorRouter.post('/CreateSurvivor', validationMiddleware(models.InsertModel), SurvivorController.Insert);
survivorRouter.put('/UpdateSurvivor', validationMiddleware(models.UpdateModel), SurvivorController.UpdateSurvivor);
survivorRouter.put('/UpdateLocal', validationMiddleware(models.UpdateLocal), SurvivorController.UpdateLocal);
survivorRouter.delete('/DeleteSurvivor', validationMiddleware(models.DeleteSurvivorModel), SurvivorController.DeleteSurvivor)
survivorRouter.get('/Getall', SurvivorController.Getall)
survivorRouter.get('/GetInfectados', SurvivorController.GetInfectados)
survivorRouter.get('/GetSobreviventes', SurvivorController.GetSurvivors)
survivorRouter.get('/GetOneSurvivor/:sobrevivente_id', SurvivorController.GetOneSurvivor)
module.exports = survivorRouter;

