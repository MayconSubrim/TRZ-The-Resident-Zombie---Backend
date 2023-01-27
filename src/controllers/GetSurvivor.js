const services = require('../services/GetSurvivor')

module.exports = {
    GetSurvivor: async (req, res) => {
        let json = { error: "", result: {} };
        let sobrevivente_id = req.params.sobrevivente_id;
        let survivor = await services.GetSurvivor(sobrevivente_id);
    
        if (survivor) {
          json.result = survivor;
        }
    
        res.json(json);
      },
};
