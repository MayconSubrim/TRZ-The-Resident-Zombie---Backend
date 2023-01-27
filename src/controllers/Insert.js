const services = require('../services/Insert');
const db = require('../db');
module.exports = {
    Insert: async (req, res) => {
        let json = { error: "", result: {} };
        //body.itens.forEach(x => insert into values(x))
    
        let nome = req.body.nome;
        let idade = req.body.idade;
        let genero = req.body.genero;
        let latitude = req.body.latitude;
        let longitude = req.body.longitude;
        let Status = req.body.Status;
        let item = req.body.item;
    
        if (nome && idade && genero && latitude && longitude && Status && item) {
          let survivors = await services.Insert(
            nome,
            idade,
            genero,
            latitude,
            longitude,
            Status,
            item
          );
          console.log(item);
          item.forEach((itens) => {
            db.query(
              `insert into iventario (item, sobrevivente_id) values (?, ?)`,
              [itens, survivors.insertId]
            );
          });
    
          json.result = {
            nome,
            idade,
            genero,
            latitude,
            longitude,
            Status,
            item,
          };
        } else {
          console.log(json.result);
          json.error = "campos não enviados, revise os campos!";
          res.status(400).send(json.error);
        }
    
        res.json(json);
      },
};
