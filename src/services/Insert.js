const db = require("../db");

module.exports = {
    Insert: (
        nome,
        idade,
        genero,
        latitude,
        longitude,
        Status
        // item
      ) => {
        return new Promise((aceito, rejeitado) => {
          db.query(
            "insert into sobreviventes (nome, idade, genero, latitude, longitude, Status ) values (?, ? , ? , ? , ? , ?)",
            [nome, idade, genero, latitude, longitude, Status],
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
