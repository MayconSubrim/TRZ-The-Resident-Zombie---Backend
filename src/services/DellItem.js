const db = require("../db");

module.exports = {
    DellItem: (item, sobrevivente_id) => {
        var iventario_id = 0;
        var check = "";
        return new Promise((aceito, rejeitado) => {
          db.query(
            `select iventario_id from iventario where item like"%${item}%" and sobrevivente_id = ${sobrevivente_id}`,
            (error, results) => {
              if (error) {
                rejeitado(error);
              }
              iventario_id = results[0].iventario_id;
              console.log(iventario_id);
              db.query(
                "select Status from sobreviventes where sobrevivente_id = ?",
                [sobrevivente_id],
                (error, results) => {
                  if (error) {
                    rejeitado(error);
                  }
                  aceito(results);
                  console.log(results);
                  check = results[0].Status;
                  if (check != "infectado") {
                    db.query(
                      "delete from iventario where iventario_id = ? and sobrevivente_id = ?;",
                      [iventario_id, sobrevivente_id]
                    );
                  } else {
                    console.log("não foi desta vez");
                  }
                }
              );
              aceito(results);
            }
          );
        });
      },
};
