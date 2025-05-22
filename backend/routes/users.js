const express = require('express');
const router = express.Router();
const db = require('../db');

// Criar novo usuário
router.post('/register', (req, res) => {
  const { name, email, password } = req.body;
  db.query(
    'INSERT INTO users (name, email, password) VALUES (?, ?, ?)',
    [name, email, password],
    (err, result) => {
      if (err) {
        console.error('Erro ao registrar usuário:', err);
        return res.status(500).send('Erro ao registrar usuário');
      }
      res.status(201).json({ message: 'Usuário registrado com sucesso!' });
    }
  );
});

// Listar todos os usuários
router.get('/', (req, res) => {
  db.query('SELECT id, name, email FROM users', (err, results) => {
    if (err) {
      console.error('Erro ao buscar usuários:', err);
      return res.status(500).send('Erro ao buscar usuários');
    }
    res.json(results);
  });
});

module.exports = router;
