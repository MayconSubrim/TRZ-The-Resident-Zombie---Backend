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
        catch(err){
            res.status(500).send(err.message)
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
                res.status(500).send(err.message)
            }
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

    
}