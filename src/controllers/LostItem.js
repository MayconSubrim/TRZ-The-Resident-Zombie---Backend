const services = require('../services/LostItem');

module.exports = {
    LostItem: async (req, res) => {
        let json = { error: "", result: {} };
        let survivor = await services.LostItem();
    
        if (survivor) {
          json.result = {
            "Total de equipamento perdido" : survivor 
          }
        }
    
        res.json(json);
      },
};
