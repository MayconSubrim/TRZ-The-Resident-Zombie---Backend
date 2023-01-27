const services = require('../services/UpdateLocal');
module.exports = {
    UpdateLocal: async (req, res) => {
        let json = { error: "", result: {} };
    
        let sobrevivente_id = req.body.sobrevivente_id;
        let latitude = req.body.latitude;
        let longitude = req.body.longitude;
    
        if (sobrevivente_id && latitude && longitude) {
          await services.UpdateLocal(sobrevivente_id, latitude, longitude);
          json.result = {
            sobrevivente_id,
            latitude,
            longitude,
          };
        } else {
          console.log(json.result);
          json.error = "campos não enviados, revise os campos!";
          res.status(400).send(json.error);
        }
    
        res.json(json);
      },
};
