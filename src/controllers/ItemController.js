const services = require("../services/ItemServices");


async function DellItem(req, res) {
  try {
    const body = req.body;
    await services.DellItem(body);
    res.send({ message: "The item is deleted of successfully" });
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

async function AddItem(req, res) {
  try {
    const body = req.body;
    await services.AddItem(body);
    res.send({ message: "Item Add of successfully" });
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

async function LostItem(req, res) {
  try {
    const item = await services.LostItem()
    res.send({"Itens lost by infected" : item});
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

async function SurvivorItens(req, res) {
  try {
    const item = await services.SurvivorItens()
    res.send({"survivors' total items" : item});
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

async function Iventory(req,res) {
  try{
    const body = req.body
    const Iventory = await services.Iventory(body.sobrevivente_id)
    res.send(Iventory)
  }catch(error){
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
  DellItem,
  AddItem,
  LostItem,
  SurvivorItens,
  Iventory,
};
