const { json } = require("body-parser");
const services = require("../services/Apiservices")


module.exports = {
    //controler para fazer a requisão do service GetALL
    GetAll : async (req, res)=>{

        try{
        let json = {error:'',result:[]};
        let sobreviventes = await services.GetAll();
    //coletando todos os dados da tabela sobreviventes
        for(let i in sobreviventes){
            json.result.push({
                sobrevivente_id: sobreviventes[i].sobrevivente_id,
                nome : sobreviventes[i].nome,
                idade : sobreviventes[i].idade,
                genero : sobreviventes[i].genero,
                latitude : sobreviventes[i].latitude,
                longitude : sobreviventes[i].longitude,
                Status : sobreviventes[i].Status
            })
        }
        res.json(json);}
        catch(error){
            res.status(500).send(error.message)
        }
    },

    GetItems : async(req, res)=>{
        try{
            let json = {error:'',result:[]};
            let sobreviventes = await services.GetItems();
        //coletando todos os dados da tabela inventario mais seus nomes
            for(let i in sobreviventes){
                json.result.push({
                    sobrevivente_id: sobreviventes[i].sobrevivente_id,
                    nome: sobreviventes[i].nome,
                    Status: sobreviventes[i].Status,
                    item: sobreviventes[i].item
                })
            }
            res.json(json);}
            catch(err){
                json.error = "consulta não realizada"
                res.status(400).send(json.error)
            }
    },

    GetOneItem : async (req,res)=>{

        let json = {error:'',result:{}};
        let sobrevivente_id = req.params.sobrevivente_id;
        let survivor = await services.GetOneItem(sobrevivente_id);

        if (survivor) {
            json.result = survivor
        }

        res.json(json);

    },

    GetSurvivor : async (req,res)=>{
        let json = {error:'',result:{}};
        let sobrevivente_id = req.params.sobrevivente_id;
        let survivor = await services.GetSurvivor(sobrevivente_id);

        if (survivor) {
            json.result = survivor
        }

        res.json(json);

    },

    Insert : async (req,res)=>{
        let json = {error:'',result:{}};


        let nome = req.body.nome;
        let idade = req.body.idade;
        let genero = req.body.genero;
        let latitude = req.body.latitude;
        let longitude = req.body.longitude;
        let Status = req.body.Status;
        
        
        if (
            nome &&
            idade &&
            genero &&
            latitude &&
            longitude &&
            Status
            ) {
            await services.Insert(nome, idade, genero, latitude, longitude, Status);
            json.result = {

                nome,
                idade, 
                genero,
                latitude,
                longitude,
                Status
                
            };

        }else{
            console.log(json.result)
            json.error = "campos não enviados, revise os campos!"
            res.status(400).send(json.error)
        }

        res.json(json);

    },

    Update : async (req,res)=>{
        let json = {error:'',result:{}};

        let sobrevivente_id = req.params.sobrevivente_id;
        let nome = req.body.nome;
        let idade = req.body.idade;
        let genero = req.body.genero;
        let latitude = req.body.latitude;
        let longitude = req.body.longitude;
        let Status = req.body.Status;
        
        
        if (
            sobrevivente_id&&
            nome &&
            idade &&
            genero &&
            latitude &&
            longitude &&
            Status
            ) {
            await services.Update(sobrevivente_id, nome, idade, genero, latitude, longitude, Status);
            json.result = {

                nome,
                idade, 
                genero,
                latitude,
                longitude,
                Status
                
            };

        }else{
            console.log(json.result)
            json.error = "campos não enviados, revise os campos!"
            res.status(400).send(json.error)
        }

        res.json(json);

    },

    Delete: async(req, res)=>{
        let json = {error:'',result:{}};
        await services.Delete(req.params.sobrevivente_id);
        res.json("excluido com sucesso");
    }
}