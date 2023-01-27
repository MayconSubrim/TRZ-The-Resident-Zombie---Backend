const services = require("../services/GetInfectados");

module.exports = {
  GetInfectados: async (req, res) => {
    let json = { error: "", result: {} };
    let survivor = await services.GetInfectados();

    if (survivor) {
      json.result = {
        "total de infectados em porcetagens": survivor,
      };
    }

    res.json(json);
  },
};
