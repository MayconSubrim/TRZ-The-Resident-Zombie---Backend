const services = require('../services/Update');
module.exports = {
    Update: async (req, res) => {
        let json = { error: "", result: {} };
    
        let sobrevivente_id = req.params.sobrevivente_id;
        let nome = req.body.nome;
        let idade = req.body.idade;
        let genero = req.body.genero;
        let latitude = req.body.latitude;
        let longitude = req.body.longitude;
        let Status = req.body.Status;
    
        if (
          sobrevivente_id &&
          nome &&
          idade &&
          genero &&
          latitude &&
          longitude &&
          Status
        ) {
          await services.Update(
            sobrevivente_id,
            nome,
            idade,
            genero,
            latitude,
            longitude,
            Status
          );
          json.result = {
            nome,
            idade,
            genero,
            latitude,
            longitude,
            Status,
          };
        } else {
          console.log(json.result);
          json.error = "campos não enviados, revise os campos!";
          res.status(400).send(json.error);
        }
    
        res.json(json);
      },
};
