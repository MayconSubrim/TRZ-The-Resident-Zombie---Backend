
const db = require("../db");

module.exports = {
  GetItens: () => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "select s.sobrevivente_id, s.nome, s.Status,i.item from sobreviventes s inner join iventario i on s.sobrevivente_id = i.sobrevivente_id;",
        (error, results) => {
          if (error) {
            rejeitado(error);
            console.log(error);
            return;
          }
          console.log(results);
          aceito(results);
        }
      );
    });
  }
};
