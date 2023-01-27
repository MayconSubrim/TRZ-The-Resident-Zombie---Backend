const services = require("../services/DellItem");

module.exports = {

    DellItem: async (req, res) => {
        let json = { error: "", result: {} };
    
        let item = req.body.item;
        let sobrevivente_id = req.body.sobrevivente_id;
        if (item && sobrevivente_id) {
          await services.DellItem(item, sobrevivente_id);
          json.result = {
            item,
            sobrevivente_id,
          };
        } else {
          console.log(json.result);
          json.error = "campos não enviados, revise os campos!";
          res.status(400).send(json.error);
        }
    
        res.json(json);
      },
}