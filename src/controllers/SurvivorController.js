const services = require("../services/SurvivorServices");


async function denunciar(req, res) {
  try {
    const body = req.body;
    await services.denunciar(body.id_denuciante, body.id_denunciado);

    res.send({ message: "Suvivor denuncied" });
  } catch (error) {
    if (error?.name === "BadRequestError") {
      return res.status(400).send({ message: error.message });
    }
    if (error?.name === "NotFoundError") {
      return res.status(404).send({ message: error.message });
    }

    throw new Error();
  }
}

async function Insert(req, res) {
  try {
    const body = req.body;
    await services.Insert(body);
    res.send({ message: "Survivor Created" });
  } catch (error) {
    if (error?.name === "BadRequestError") {
      return res.status(400).send({ message: error.message });
    }
    if (error?.name === "NotFoundError") {
      return res.status(404).send({ message: error.message });
    }

    throw new Error();
  }
}

async function UpdateSurvivor(req, res) {
  try {
    const body = req.body;
    await services.UpdateSurvivor(body);
    res.send({ message: "successfully updated" });
  } catch (error) {
    if (error?.name === "BadRequestError") {
      return res.status(400).send({ message: error.message });
    }
    if (error?.name === "NotFoundError") {
      return res.status(404).send({ message: error.message });
    }

    throw new Error();
  }
}

async function UpdateLocal(req, res) {
  try {
    const body = req.body;
    await services.UpdateLocal(body);
    res.send({ message: "successfully updated" });
  } catch (error) {
    if (error?.name === "BadRequestError") {
      return res.status(400).send({ message: error.message });
    }
    if (error?.name === "NotFoundError") {
      return res.status(404).send({ message: error.message });
    }

    throw new Error();
  }
}

async function DeleteSurvivor(req, res) {
  try {
    const body = req.body;
    await services.DeleteSurvivor(body);
    res.send({ result: "successfully deleted user" });
  } catch (error) {
    if (error?.name === "BadRequestError") {
      return res.status(400).send({ message: error.message });
    }
    if (error?.name === "NotFoundError") {
      return res.status(404).send({ message: error.message });
    }

    throw new Error();
  }
}

async function Getall(req, res) {
  try {
    res.send(await services.Getall());
  } catch (error) {
    if (error?.name === "BadRequestError") {
      return res.status(400).send({ message: error.message });
    }
    if (error?.name === "NotFoundError") {
      return res.status(404).send({ message: error.message });
    }

    throw new Error();
  }
}

async function GetInfectados(req, res) {
  try {
    const porcentagem = await services.GetInfectados();
    res.send({ "Quantidade de infectados em Porcentagem": porcentagem });
  } catch (error) {
    if (error?.name === "BadRequestError") {
      return res.status(400).send({ message: error.message });
    }
    if (error?.name === "NotFoundError") {
      return res.status(404).send({ message: error.message });
    }

    throw new Error();
  }
}

async function GetSurvivors(req, res) {
  try {
    const porcentagem = await services.GetSurvivors();
    res.send({ "Quantidade de sobreviventes em Porcentagem": porcentagem });
  } catch (error) {
    if (error?.name === "BadRequestError") {
      return res.status(400).send({ message: error.message });
    }
    if (error?.name === "NotFoundError") {
      return res.status(404).send({ message: error.message });
    }

    throw new Error();
  }
}

async function GetOneSurvivor(req, res) {
  try {
    let sobrevivente_id = req.params.sobrevivente_id;
    res.send(await services.GetOneSurvivor(sobrevivente_id))
  } catch (error) {
    if (error?.name === "BadRequestError") {
      return res.status(400).send({ message: error.message });
    }
    if (error?.name === "NotFoundError") {
      return res.status(404).send({ message: error.message });
    }

    throw new Error();
  }
}



module.exports = {
  denunciar,
  Insert,
  UpdateSurvivor,
  UpdateLocal,
  DeleteSurvivor,
  Getall,
  GetInfectados,
  GetSurvivors,
  GetOneSurvivor
};
