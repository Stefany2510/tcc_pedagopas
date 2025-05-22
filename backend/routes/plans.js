const express = require('express');
const router = express.Router();
const db = require('../db');

// Criar novo plano
router.post('/', (req, res) => {
  const { user_id, title, description } = req.body;
  db.query(
    'INSERT INTO plans (user_id, title, description) VALUES (?, ?, ?)',
    [user_id, title, description],
    (err, result) => {
      if (err) {
        console.error('Erro ao criar plano:', err);
        return res.status(500).send('Erro ao criar plano');
      }
      res.status(201).json({ message: 'Plano criado com sucesso!' });
    }
  );
});

// Listar todos os planos
router.get('/', (req, res) => {
  db.query('SELECT * FROM plans', (err, results) => {
    if (err) {
      console.error('Erro ao buscar planos:', err);
      return res.status(500).send('Erro ao buscar planos');
    }
    res.json(results);
  });
});

// Atualizar plano
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, description } = req.body;
  db.query(
    'UPDATE plans SET title = ?, description = ? WHERE id = ?',
    [title, description, id],
    (err) => {
      if (err) {
        console.error('Erro ao atualizar plano:', err);
        return res.status(500).send('Erro ao atualizar plano');
      }
      res.json({ message: 'Plano atualizado com sucesso!' });
    }
  );
});

// Deletar plano
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM plans WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Erro ao deletar plano:', err);
      return res.status(500).send('Erro ao deletar plano');
    }
    res.json({ message: 'Plano deletado com sucesso!' });
  });
});

module.exports = router;
