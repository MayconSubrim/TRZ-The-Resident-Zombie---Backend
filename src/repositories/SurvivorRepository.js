const { func } = require("joi");
const db = require("../db");

async function getSurvivorStatus(id) {
  return (
    await db.query(
      "select Status from sobreviventes where sobrevivente_id = ?",
      [id]
    )
  )[0];
}

async function getIfDenunciatorAlreadyReported(id_denuciante, id_denunciado) {
  return (
    await db.query(
      "select count(denuncia_id) as Denuncia from denuncias where id_denuciante = ? and id_denunciado = ? ",
      [id_denuciante, id_denunciado]
    )
  )[0];
}

async function insertReport(id_denuciante, id_denunciado) {
  await db.query(
    "insert into denuncias (id_denuciante, id_denunciado) values (?, ?)",
    [id_denuciante, id_denunciado]
  );
}

async function numberOfTimesReported(id_denunciado) {
  return (
    await db.query(
      "SELECT count(id_denunciado) as count FROM denuncias where id_denunciado = ?",
      [id_denunciado]
    )
  )[0];
}

async function setSurvivorInfected(id_denunciado) {
  await db.query(
    `update sobreviventes set Status = "infectado" where sobrevivente_id = ?`,
    [id_denunciado]
  );
}

async function InsertSurvivor(body) {
  return await db.query(
    "insert into sobreviventes (nome, idade, genero, latitude, longitude, Status ) values (?, ? , ? , ? , ? , ?)",
    [
      body.nome,
      body.idade,
      body.genero,
      body.latitude,
      body.longitude,
      body.Status,
    ]
  );
}

async function InsertItens(item, survivorId) {
  item.forEach((itens) => {
    db.query(`insert into iventario (item, sobrevivente_id) values (?, ?)`, [
      itens,
      survivorId,
    ]);
  });
}

async function CheckIfIDExist(body) {
  return (
    await db.query(
      "select sobrevivente_id from sobreviventes where sobrevivente_id = ?",
      [body.sobrevivente_id]
    )
  )[0];
}

async function UpdateSurvivor(body) {
  await db.query(
    `update sobreviventes set nome = ?, idade = ?, genero = ?, latitude = ?, longitude = ?, Status = ? where sobrevivente_id = ?`,
    [
      body.nome,
      body.idade,
      body.genero,
      body.latitude,
      body.longitude,
      body.Status,
      body.sobrevivente_id,
    ]
  );
}

async function UpdateLocal(body) {
  await db.query(
    "update sobreviventes set  latitude = ?, longitude = ? where sobrevivente_id = ?",
    [body.latitude, body.longitude, body.sobrevivente_id]
  );
}

async function DeleteSurvivor(body) {
  await db.query("delete from sobreviventes where sobrevivente_id = ?", [
    body.sobrevivente_id,
  ]);
}

async function Getall() {
  return await db.query("select * from sobreviventes");
}

async function TotalSurvivors() {
  return (
    await db.query("SELECT count(Status) as total from sobreviventes")
  )[0];
}

async function GetInfectados() {
  return (
    await db.query(
      "SELECT count(Status) as sobreviventes from sobreviventes where Status = 'infectado' "
    )
  )[0];
}

async function GetSurvivors() {
  return (
    await db.query(
      "SELECT count(Status) as sobreviventes from sobreviventes where Status = 'sobrevivente' "
    )
  )[0];
}

async function GetOneSurvivor(sobrevivente_id) {
  return (
    await db.query("select * from sobreviventes as sobrevivente where sobrevivente_id = ?", [
      sobrevivente_id,
    ])
  )[0];
}

async function CheckIfIDExistParams(sobrevivente_id) {
  return (
    await db.query(
      "select sobrevivente_id from sobreviventes where sobrevivente_id = ?",
      [sobrevivente_id]
    )
  )[0];
}

module.exports = {
  getSurvivorStatus,
  getIfDenunciatorAlreadyReported,
  insertReport,
  numberOfTimesReported,
  setSurvivorInfected,
  InsertSurvivor,
  InsertItens,
  UpdateSurvivor,
  CheckIfIDExist,
  UpdateLocal,
  DeleteSurvivor,
  Getall,
  TotalSurvivors,
  GetInfectados,
  GetSurvivors,
  GetOneSurvivor,
  CheckIfIDExistParams
};
