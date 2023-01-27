const db = require("../db");

module.exports = {
  AddItem: (sobrevivente_id, item) => {
    console.log(sobrevivente_id);
    return new Promise((aceito, rejeitado) => {
      db.query(
        "select Status from sobreviventes where sobrevivente_id = ?",
        [sobrevivente_id],
        (error, results) => {
          if (error) {
            rejeitado(error);
          }
          let check = results[0].Status;
          console.log(check);
          if (check != "infectado") {
            item.forEach((itens) => {
              db.query(
                "insert into iventario (item, sobrevivente_id) values (?, ?)",
                [itens, sobrevivente_id]
              );
            });
          } else {
            rejeitado(error);
          }
          aceito(results);
        }
      );
    });
  },
};
