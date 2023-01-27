
const db = require("../db");

module.exports = {
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
};
