const express = require('express');
const validationMiddleware = require('../middlewares/validationMiddleware');
const ItemComtroler = require('../controllers/ItemController')
const models = require("../models")
const ItemRouter = express.Router();


ItemRouter.delete("/DeletarItem", validationMiddleware(models.DellItemModel), ItemComtroler.DellItem);
ItemRouter.post("/AddItem", validationMiddleware(models.AddItemModel), ItemComtroler.AddItem)
ItemRouter.get("/LostItem", ItemComtroler.LostItem)
ItemRouter.get("/SurvivorItens", ItemComtroler.SurvivorItens)




module.exports = ItemRouter;