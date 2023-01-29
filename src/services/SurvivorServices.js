const repository = require("../repositories/SurvivorRepository");
const notFound = require("../errors/notFoundError");
const badRequest = require("../errors/badRequestError");

async function denunciar(id_denuciante, id_denunciado) {
  const check = (await repository.getSurvivorStatus(id_denunciado))[0]?.Status;
  const checkdenunciate = (await repository.getSurvivorStatus(id_denuciante))[0]
    ?.Status;
  if (!check) throw notFound("survivor not found");

  if (check == "infectado")
    throw badRequest("survivor already considered infected");

  if (checkdenunciate == "infectado")
    throw badRequest("you are infected, therefore could not report");

  if (!checkdenunciate) throw notFound("survivor not found");

  const alreadyReported = (
    await repository.getIfDenunciatorAlreadyReported(
      id_denuciante,
      id_denunciado
    )
  )[0].Denuncia;

  if (alreadyReported >= 1) {
    throw badRequest("ja foi denunciado por voce");
  } else {
    await repository.insertReport(id_denuciante, id_denunciado);
  }

  const count = (await repository.numberOfTimesReported(id_denunciado))[0]
    .count;
  if (count >= 5) {
    await repository.setSurvivorInfected(id_denunciado);
  }
}

async function Insert(body) {
  const teste = await repository.InsertSurvivor(body);
  await repository.InsertItens(body.item, teste[0].insertId);
}

async function UpdateSurvivor(body) {
  const check = (await repository.CheckIfIDExist(body))[0]?.sobrevivente_id;
  if (!check) {
    throw notFound("Sobrevivente_ID fail");
  }
  await repository.UpdateSurvivor(body);
}

async function UpdateLocal(body) {
  const check = (await repository.getSurvivorStatus(body.sobrevivente_id))[0]
    ?.Status;

  if (!check) throw notFound("survivor not found");

  if (check == "infectado") throw badRequest("survivor is infected");

  await repository.UpdateLocal(body);
}

async function DeleteSurvivor(body) {
  await repository.DeleteSurvivor(body);
}

async function Getall() {
  const all = await repository.Getall();
  return all[0];
}

async function GetInfectados() {
  const total = (await repository.TotalSurvivors())[0].total;
  const infectados = (await repository.GetInfectados())[0].sobreviventes;
  const porcentagem = Math.round((infectados / total) * 100);
  return porcentagem;
}

async function GetSurvivors() {
  const total = (await repository.TotalSurvivors())[0].total;
  const sobreviventes = (await repository.GetSurvivors())[0].sobreviventes;
  const porcentagem = Math.round((sobreviventes / total) * 100);
  return porcentagem;
}

async function GetOneSurvivor(sobrevivente_id) {
  const check = (await repository.CheckIfIDExistParams(sobrevivente_id))[0]
    ?.sobrevivente_id;
  if (!check) {
    throw notFound("this survivor not exist");
  }
  const survivor = (await repository.GetOneSurvivor(sobrevivente_id))[0];
  return survivor;
}

module.exports = {
  denunciar,
  Insert,
  UpdateSurvivor,
  UpdateLocal,
  DeleteSurvivor,
  Getall,
  GetInfectados,
  GetSurvivors,
  GetOneSurvivor,
};
