const db = require("../db");

module.exports = {
  Delete: (sobrevivente_id) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "delete from sobreviventes where sobrevivente_id = ?",
        [sobrevivente_id],
        (error, results) => {
          if (error) {
            rejeitado(error);
            return;
          }
          aceito(results);
        }
      );
    });
  },
};
