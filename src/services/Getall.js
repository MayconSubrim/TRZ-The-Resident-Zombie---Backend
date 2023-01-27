const db = require("../db");

module.exports = {
  //coletar todos os dados da tabela sobreviventes
  GetAll: () => {
    return new Promise((aceito, rejeitado) => {
      //query para selecionar todos os sobreviventes
      db.query("select * from sobreviventes", (error, results) => {
        if (error) {
          rejeitado(error);
          return;
        }
        aceito(results);
      });
    });
  },
};
