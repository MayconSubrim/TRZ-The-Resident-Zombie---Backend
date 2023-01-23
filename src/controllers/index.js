const services = require("../services/Apiservices")


module.exports = {
    GetAll : async (req, res)=>{

        let json = {error:'',result:[]};
        let sobreviventes = await services.GetAll();

        for(let i in sobreviventes){
            json.result.push({
                sobrevivente_id: sobreviventes[i].sobrevivente_id,
                nome : sobreviventes[i].nome
            })
        }
        res.json(json);
    }
}