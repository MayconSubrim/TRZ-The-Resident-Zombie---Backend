const services = require("../services/Delete");
const db = require("../db");

module.exports = {

    Delete: async (req, res) => {
        let json = { error: "", result: {} };
        await services.Delete(req.params.sobrevivente_id);
        res.json("excluido com sucesso");
      },
}