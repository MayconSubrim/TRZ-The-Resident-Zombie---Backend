const db = require('../db')

module.exports = {
    //coletar todos os dados da tabela sobreviventes
    GetAll: () =>{
        return new Promise((aceito, rejeitado)=>{
            //query para selecionar todos os sobreviventes
            db.query('select * from sobreviventes', (error, results)=>{
                if(error) {rejeitado(error); return}
                aceito(results);
            });
        });
    },

    GetItems: () =>{
        return new Promise((aceito, rejeitado)=>{
            //query para selecionar todos os sobreviventes
            db.query('select s.sobrevivente_id, s.nome, s.Status,i.item from sobreviventes s inner join iventario i on s.sobrevivente_id = i.sobrevivente;', (error, results)=>{
                if(error) {rejeitado(error); return}
                aceito(results);
            });
        });
    },

    GetOneItem : (sobrevivente_id)=>{
        return new Promise((aceito, rejeitado)=>{

            db.query('select s.sobrevivente_id, s.nome, s.Status,i.item from sobreviventes s inner join iventario i on s.sobrevivente_id = i.sobrevivente where s.sobrevivente_id = ?', [sobrevivente_id], (error, results)=>{
            if(error) {rejeitado(error); return}
            if(results.length > 0){
                aceito(results);
            }else{
                aceito(false);
            }
            });
        });

    },

    GetSurvivor: (sobrevivente_id)=>{
        return new Promise((aceito, rejeitado)=>{

            db.query('select * from sobreviventes where sobrevivente_id = ?', [sobrevivente_id], (error, results)=>{
            if(error) {rejeitado(error); return}
            if(results.length > 0){
                aceito(results[0]);
            }else{
                aceito(false);
            }
            });
        });
    },

    Insert: (
        nome,
        idade, 
        genero,
        latitude,
        longitude,
        Status
        
        )=>{
        return new Promise((aceito, rejeitado)=>{

            db.query('insert into sobreviventes (nome, idade, genero, latitude, longitude, Status ) values (?, ? , ? , ? , ? , ?)', [nome, idade, genero, latitude, longitude, Status ],
            (error, results)=>{
            if(error) {rejeitado(error); return}
            aceito(results)
            });
        });
    },


    Update: (
        sobrevivente_id,
        nome,
        idade, 
        genero,
        latitude,
        longitude,
        Status
        
        )=>{
        return new Promise((aceito, rejeitado)=>{

            db.query('update sobreviventes set nome = ?, idade = ?, genero = ?, latitude = ?, longitude = ?, Status = ? where sobrevivente_id = ?', [nome, idade, genero, latitude, longitude, Status, sobrevivente_id ],
            (error, results)=>{
            if(error) {rejeitado(error); return}
            aceito(results)
            });
        });
    },

    Delete: (sobrevivente_id) =>{
        return new Promise((aceito, rejeitado)=>{
            //query para selecionar todos os sobreviventes
            db.query('delete from sobreviventes where sobrevivente_id = ?',[sobrevivente_id],
             (error, results)=>{
                if(error) {rejeitado(error); return}
                aceito(results);
            });
        });
    }
};