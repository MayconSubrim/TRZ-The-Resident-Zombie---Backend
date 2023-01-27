const services = require("../services/Getall");
const db = require("../db");

module.exports = {

GetAll: async (req, res) => {
    try {
      let json = { error: "", result: [] };
      let sobreviventes = await services.GetAll();
      //coletando todos os dados da tabela sobreviventes
      for (let i in sobreviventes) {
        json.result.push({
          sobrevivente_id: sobreviventes[i].sobrevivente_id,
          nome: sobreviventes[i].nome,
          idade: sobreviventes[i].idade,
          genero: sobreviventes[i].genero,
          latitude: sobreviventes[i].latitude,
          longitude: sobreviventes[i].longitude,
          Status: sobreviventes[i].Status,
        });
      }
      res.json(json);
    } catch (error) {
      res.status(500).send(error.message);
    }
  }

}