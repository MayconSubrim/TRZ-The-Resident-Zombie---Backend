const db = require("../db");

module.exports = {
  SurvivorItens: () => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        `select count(iventario_id) as total from iventario i inner join sobreviventes s 
        on i.sobrevivente_id = s.sobrevivente_id where s.Status = "sobrevivente"`,
        (error, results) => {
          if (error) {
            rejeitado(error);
          }
          let lives = results[0].total;
          console.log(lives);
          aceito(lives);
        }
      );
    });
  },
};
