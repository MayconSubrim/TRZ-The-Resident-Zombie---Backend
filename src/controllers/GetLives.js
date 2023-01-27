const services = require('../services/GetLives')

module.exports = {
    GetLives: async (req, res) => {
        let json = { error: "", result: {} };
        let survivor = await services.GetLives();
    
        if (survivor) {
          json.result = {
            "total de vivos em porecentagem": survivor
          }
        }
    
        res.json(json);
      },
    
};
