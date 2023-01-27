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

  GetLives: () => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        'SELECT count(Status) as sobreviventes from sobreviventes where Status = "sobrevivente";',
        (error, results) => {
          if (error) {
            rejeitado(error);
          }
          let lives = results[0].sobreviventes
          console.log(lives)
          db.query(
            "SELECT count(Status) as total from sobreviventes",
            (error, results) => {
              if (error) {
                rejeitado(error);
              }
              let total = results[0].total
              console.log(total)
              var porcent = (lives / total)*100
              console.log(Math.round(porcent));
              aceito(Math.round(porcent));
            }
          );
        })
        
    });
  },

  SurvivorItens: () => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        `select count(iventario_id) as total from iventario i inner join sobreviventes s 
        on i.sobrevivente_id = s.sobrevivente_id where s.Status = "sobrevivente"`,
        (error, results) => {
          if (error) {
            rejeitado(error);
          }
          let lives = results[0].total
          console.log(lives)
          aceito(lives)
        });
    });
  },

  LostItem: () => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        `select count(iventario_id) as total from iventario i inner join sobreviventes s 
        on i.sobrevivente_id = s.sobrevivente_id where s.Status = "infectado"`,
        (error, results) => {
          if (error) {
            rejeitado(error);
          }
          let lives = results[0].total
          console.log(lives)
          aceito(lives)
        });
    });
  },

  GetInfectados: () => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        'SELECT count(Status) as sobreviventes from sobreviventes where Status = "infectado";',
        (error, results) => {
          if (error) {
            rejeitado(error);
          }
          let lives = results[0].sobreviventes
          console.log(lives)
          db.query(
            "SELECT count(Status) as total from sobreviventes",
            (error, results) => {
              if (error) {
                rejeitado(error);
              }
              let total = results[0].total
              console.log(total)
              var porcent = (lives / total)*100
              console.log(Math.round(porcent));
              aceito(Math.round(porcent));
            }
          );
        })
        
    });
  },

  GetItems: () => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "select s.sobrevivente_id, s.nome, s.Status,i.item from sobreviventes s inner join iventario i on s.sobrevivente_id = i.sobrevivente_id;",
        (error, results) => {
          if (error) {
            rejeitado(error);
            console.log(error)
            return;
          }
          console.log(results)
          aceito(results);
        }
      );
    });
  },

  GetOneItem: (sobrevivente_id) => {
    return new Promise((aceito, rejeitado) => {
      db.query(
        "select s.sobrevivente_id, s.nome, s.Status,i.item from sobreviventes s inner join iventario i on s.sobrevivente_id = i.sobrevivente_id where s.sobrevivente_id = ?",
        [sobrevivente_id],
        (error, results) => {
          if (error) {
            rejeitado(error);
            return;
          }
          if (results.length > 0) {
            aceito(results);
          } else {
            aceito(false);
          }
        }
      );
    });
  },

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
