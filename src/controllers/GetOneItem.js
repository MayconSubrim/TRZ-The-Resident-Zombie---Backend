const services = require('../services/GetOneItem')

module.exports = {
    GetOneItem: async (req, res) => {
        let json = { error: "", result: {} };
        let sobrevivente_id = req.params.sobrevivente_id;
        let survivor = await services.GetOneItem(sobrevivente_id);
    
        if (survivor) {
          json.result = survivor;
        }
    
        res.json(json);
      }
};
