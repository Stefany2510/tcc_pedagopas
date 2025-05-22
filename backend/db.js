const mysql = require('mysql2');

const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',            // ou o nome do seu usuário MySQL
  password: '',            // senha do seu MySQL (deixe vazio se estiver usando XAMPP padrão)
  database: 'pedagogopass' // o nome do seu banco criado no phpMyAdmin
});

connection.connect(err => {
  if (err) {
    console.error('Erro ao conectar ao MySQL:', err);
    return;
  }
  console.log('Conectado ao banco de dados MySQL!');
});

module.exports = connection;
