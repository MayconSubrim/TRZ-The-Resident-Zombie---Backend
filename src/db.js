const mysql = require('mysql');

const con = mysql.createConnection({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    password: process.env.DB_PASS,
    database: process.env.DB_NAME
});

con.connect((error) =>{
    if(error) throw error;
    console.log(`conectado ao db: ${process.env.DB_NAME}`)
});

module.exports = con;