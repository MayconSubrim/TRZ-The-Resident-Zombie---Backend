const db = require("../db");

module.exports = {
    UpdateLocal: (sobrevivente_id, latitude, longitude) => {
        return new Promise((aceito, rejeitado) => {
          if (isNaN(sobrevivente_id)) {
            console.log(sobrevivente_id);
            db.query(
              "update sobreviventes set  latitude = ?, longitude = ? where sobreviventes.nome like?",
              [latitude, longitude, sobrevivente_id],
              (error, results) => {
                if (error) {
                  rejeitado(error);
                  return;
                }
                aceito(results);
              }
            );
          }
          db.query(
            "update sobreviventes set  latitude = ?, longitude = ? where sobrevivente_id = ?",
            [latitude, longitude, sobrevivente_id],
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
