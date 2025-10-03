const mysql2 = require('mysql2');

const conexao = mysql2.createConnection({
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'Petshop'
});

module.exports = conexao.promise();