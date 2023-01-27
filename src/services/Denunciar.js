const db = require("../db");

module.exports = {
    Denunciar: (id_denuciante, id_denunciado) => {
        return new Promise((aceito, rejeitado) => {
          db.query(
            "insert into denuncias (id_denuciante, id_denunciado) values (?, ?)",
            [id_denuciante, id_denunciado],
            (error, results) => {
              if (error) {
                rejeitado(error);
                return;
              }
              aceito(results);
            }
          );
          db.query(
            "SELECT count(id_denunciado) as count FROM denuncias where id_denunciado = ?",
            [id_denunciado],
            (error, results) => {
              if (error) {
                rejeitado(error);
                return;
              }
    
              aceito(results);
              let count = results[0].count;
              if (count >= 5) {
                db.query(
                  `update sobreviventes set Status = "infectado" where sobrevivente_id = ${id_denunciado}`
                );
              }
            }
          );
        });
      },    
};
