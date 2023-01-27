const services = require('../services/SurvivorItens');

module.exports = {
    SurvivorItens: async (req, res) => {
        let json = { error: "", result: {} };
        let survivor = await services.SurvivorItens();
    
        if (survivor) {
          json.result = {
            "total de equipamentos" : survivor 
          }
        }
    
        res.json(json);
      },
};
