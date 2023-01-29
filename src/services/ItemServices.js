const repository = require("../repositories/ItemRepository");
const notFound = require("../errors/notFoundError");
const badRequest = require("../errors/badRequestError");
const badRequestError = require("../errors/badRequestError");


async function DellItem(body) {
  const checkSobrevivente = (await repository.getSurvivorStatus(body.sobrevivente_id))[0]?.Status;
  const checkItem = (await repository.CheckIfIDExist(body.iventario_id))[0]?.iventario_id;
  const checkowner = (await repository.CheckIfOwnerItem(body.sobrevivente_id, body.iventario_id))[0]

  if (!checkItem) throw notFound("Item not found!")
  if (!checkowner) throw badRequestError("You are not the owner of this item!")
  if (!checkSobrevivente) throw notFound("survivor not found!");

  if (checkSobrevivente == "infectado")
    throw badRequest("this survivor it is infected");
  
  await repository.DellItem(body);
}

async function AddItem(body){
  const checkSobrevivente = (await repository.getSurvivorStatus(body.sobrevivente_id))[0]?.Status;
  if (!checkSobrevivente) throw notFound("survivor not found!");
  if (checkSobrevivente == "infectado") throw badRequest("this survivor it is infected");

  await repository.AddItem(body.sobrevivente_id, body.item);

}

async function LostItem(){
  const item = (await repository.LostItem())[0].total;
  console.log(item)
  return item 
}

async function SurvivorItens(){
  const item = (await repository.SurvivorItens())[0].total;
  console.log(item)
  return item 
}

async function Iventory(id) {
  const checkSobrevivente = (await repository.getSurvivorStatus(id))[0]?.Status;
  if (!checkSobrevivente) throw notFound("survivor not found!");
  const iventory = (await repository.Iventory(id))
  return iventory
}


module.exports = {
  DellItem,
  AddItem,
  LostItem,
  SurvivorItens,
  Iventory
}