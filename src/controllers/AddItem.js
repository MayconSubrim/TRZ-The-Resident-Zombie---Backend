const services = require("../services/AddItem");

module.exports = {

    AddItem: async (req, res) => {
        let json = { error: "", result: {} };
        let sobrevivente_id = req.body.sobrevivente_id;
        let item = req.body.item;
        console.log(sobrevivente_id);
        try {
          if (sobrevivente_id && item) {
            await services.AddItem(sobrevivente_id, item);
            json.result = {
              sobrevivente_id,
              item,
            };
          } else {
            console.log(json.result);
            json.error = "campos não enviados, revise os campos!";
            res.status(400).send(json.error);
          }
          res.json(json);
        } catch (error) {
          res.status(400).send({ error: "voce esta infectado" });
        }
      },
}