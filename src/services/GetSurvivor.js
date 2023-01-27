const db = require("../db");

module.exports = {
    GetSurvivor: (sobrevivente_id) => {
        return new Promise((aceito, rejeitado) => {
          db.query(
            "select * from sobreviventes where sobrevivente_id = ?",
            [sobrevivente_id],
            (error, results) => {
              if (error) {
                rejeitado(error);
                return;
              }
              if (results.length > 0) {
                aceito(results[0]);
              } else {
                aceito(false);
              }
            }
          );
        });
      },
};
