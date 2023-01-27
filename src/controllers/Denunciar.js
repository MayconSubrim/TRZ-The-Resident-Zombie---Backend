const services = require("../services/Denunciar");

module.exports = {
  Denunciar: async (req, res) => {
    let json = { error: "", result: {} };

    let id_denuciante = req.body.id_denuciante;
    let id_denunciado = req.body.id_denunciado;

    if (id_denuciante && id_denunciado) {
      await services.Denunciar(id_denuciante, id_denunciado);
      json.result = {
        id_denuciante,
        id_denunciado,
      };
    } else {
      console.log(json.result);
      json.error = "campos não enviados, revise os campos!";
      res.status(400).send(json.error);
    }

    res.json(json);
  },
};
