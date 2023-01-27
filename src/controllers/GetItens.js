const services = require('../services/GetItens')

module.exports = {
  GetItens: async (req, res) => {
    var json = { error: "", result: [] };
    try {
      let sobreviventes = await services.GetItens();
      //coletando todos os dados da tabela inventario mais seus nomes
      for (let i in sobreviventes) {
        json.result.push({
          sobrevivente_id: sobreviventes[i].sobrevivente_id,
          nome: sobreviventes[i].nome,
          Status: sobreviventes[i].Status,
          item: sobreviventes[i].item,
        });
      }
    } catch (error) {
      json.error = "consulta não realizada";
      res.status(400).send(json.error);
    }
    res.json(json);
  }
};
