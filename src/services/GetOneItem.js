const db = require("../db");

module.exports = {
  GetOneItem: (sobrevivente_id) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "select s.sobrevivente_id, s.nome, s.Status,i.item from sobreviventes s inner join iventario i on s.sobrevivente_id = i.sobrevivente_id where s.sobrevivente_id = ?",
        [sobrevivente_id],
        (error, results) => {
          if (error) {
            rejeitado(error);
            return;
          }
          if (results.length > 0) {
            aceito(results);
          } else {
            aceito(false);
          }
        }
      );
    });
  },
};
