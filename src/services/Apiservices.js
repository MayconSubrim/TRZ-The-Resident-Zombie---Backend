const db = require('../db')

module.exports = {
    GetAll: () =>{
        return new Promise((aceito, rejeitado)=>{
            db.query('select * from sobreviventes', (error, results)=>{
                if(error) {rejeitado(error); return }
                aceito(results);
            });
        });
    }
}