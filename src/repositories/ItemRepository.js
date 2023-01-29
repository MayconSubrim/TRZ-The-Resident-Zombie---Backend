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
async function CheckIfIDExist(id) {
  return (
    await db.query(
      "select iventario_id from iventario where iventario_id = ?",
      [id]
    )
  )[0];
}

async function CheckIfOwnerItem(sobrevivente_id, iventario_id) {
  return (
    await db.query(
      "select iventario_id, sobrevivente_id from iventario where sobrevivente_id = ? and iventario_id = ?",
      [sobrevivente_id, iventario_id]
    )
  )[0];
}

async function DellItem(body) {
  await db.query(
    "delete from iventario where iventario_id = ? and sobrevivente_id = ?;",
    [body.iventario_id, body.sobrevivente_id]
  );
}

async function AddItem(sobrevivente_id, item) {
  item.forEach((itens) => {
    db.query(`insert into iventario (item, sobrevivente_id) values (?, ?)`, [
      itens,
      sobrevivente_id,
    ]);
  });
}

async function LostItem() {
  return (await db.query(`select count(iventario_id) as total from iventario i inner join sobreviventes s 
        on i.sobrevivente_id = s.sobrevivente_id where s.Status = "infectado"`
  ))[0];
}


async function SurvivorItens() {
    return (await db.query(`select count(iventario_id) as total from iventario i inner join sobreviventes s 
    on i.sobrevivente_id = s.sobrevivente_id where s.Status = "sobrevivente"`
    ))[0];
  }

async function Iventory(id) {
  return (await db.query("select s.sobrevivente_id,i.item, i.iventario_id from sobreviventes s inner join iventario i on s.sobrevivente_id = i.sobrevivente_id where s.sobrevivente_id = ?", [id]))[0]
}


module.exports = {
  DellItem,
  CheckIfIDExist,
  getIfDenunciatorAlreadyReported,
  getSurvivorStatus,
  CheckIfOwnerItem,
  AddItem,
  LostItem,
  SurvivorItens,
  Iventory
};
