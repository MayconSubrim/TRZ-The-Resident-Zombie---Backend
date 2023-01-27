const db = require("../db");

module.exports = {
    Update: (
        sobrevivente_id,
        nome,
        idade,
        genero,
        latitude,
        longitude,
        Status
      ) => {
        return new Promise((aceito, rejeitado) => {
          db.query(
            "update sobreviventes set nome = ?, idade = ?, genero = ?, latitude = ?, longitude = ?, Status = ? where sobrevivente_id = ?",
            [nome, idade, genero, latitude, longitude, Status, sobrevivente_id],
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
