//requesições

const services = require("../services/Apiservices");
const db = require("../db");

module.exports = {
  //controler para fazer a requisão do service GetALL
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
  },

  GetLives: async (req, res) => {
    let json = { error: "", result: {} };
    let survivor = await services.GetLives();

    if (survivor) {
      json.result = {
        "total de vivos em porecentagem": survivor
      }
    }

    res.json(json);
  },

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

  GetInfectados: async (req, res) => {
    let json = { error: "", result: {} };
    let survivor = await services.GetInfectados();

    if (survivor) {
      json.result = {
        "total de infectados em porcetagens" : survivor
      }
    }

    res.json(json);
  },

  GetItems: async (req, res) => {
    var json = { error: "", result: [] };
    try {
      let sobreviventes = await services.GetItems();
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
  },

  GetOneItem: async (req, res) => {
    let json = { error: "", result: {} };
    let sobrevivente_id = req.params.sobrevivente_id;
    let survivor = await services.GetOneItem(sobrevivente_id);

    if (survivor) {
      json.result = survivor;
    }

    res.json(json);
  },

  GetSurvivor: async (req, res) => {
    let json = { error: "", result: {} };
    let sobrevivente_id = req.params.sobrevivente_id;
    let survivor = await services.GetSurvivor(sobrevivente_id);

    if (survivor) {
      json.result = survivor;
    }

    res.json(json);
  },

  Insert: async (req, res) => {
    let json = { error: "", result: {} };
    //body.itens.forEach(x => insert into values(x))

    let nome = req.body.nome;
    let idade = req.body.idade;
    let genero = req.body.genero;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let Status = req.body.Status;
    let item = req.body.item;

    if (nome && idade && genero && latitude && longitude && Status && item) {
      let survivors = await services.Insert(
        nome,
        idade,
        genero,
        latitude,
        longitude,
        Status,
        item
      );
      console.log(item);
      item.forEach((itens) => {
        db.query(
          `insert into iventario (item, sobrevivente_id) values (?, ?)`,
          [itens, survivors.insertId]
        );
      });

      json.result = {
        nome,
        idade,
        genero,
        latitude,
        longitude,
        Status,
        item,
      };
    } else {
      console.log(json.result);
      json.error = "campos não enviados, revise os campos!";
      res.status(400).send(json.error);
    }

    res.json(json);
  },

  Update: async (req, res) => {
    let json = { error: "", result: {} };

    let sobrevivente_id = req.params.sobrevivente_id;
    let nome = req.body.nome;
    let idade = req.body.idade;
    let genero = req.body.genero;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;
    let Status = req.body.Status;

    if (
      sobrevivente_id &&
      nome &&
      idade &&
      genero &&
      latitude &&
      longitude &&
      Status
    ) {
      await services.Update(
        sobrevivente_id,
        nome,
        idade,
        genero,
        latitude,
        longitude,
        Status
      );
      json.result = {
        nome,
        idade,
        genero,
        latitude,
        longitude,
        Status,
      };
    } else {
      console.log(json.result);
      json.error = "campos não enviados, revise os campos!";
      res.status(400).send(json.error);
    }

    res.json(json);
  },

  UpdateLocal: async (req, res) => {
    let json = { error: "", result: {} };

    let sobrevivente_id = req.body.sobrevivente_id;
    let latitude = req.body.latitude;
    let longitude = req.body.longitude;

    if (sobrevivente_id && latitude && longitude) {
      await services.UpdateLocal(sobrevivente_id, latitude, longitude);
      json.result = {
        sobrevivente_id,
        latitude,
        longitude,
      };
    } else {
      console.log(json.result);
      json.error = "campos não enviados, revise os campos!";
      res.status(400).send(json.error);
    }

    res.json(json);
  },

  Delete: async (req, res) => {
    let json = { error: "", result: {} };
    await services.Delete(req.params.sobrevivente_id);
    res.json("excluido com sucesso");
  },

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
