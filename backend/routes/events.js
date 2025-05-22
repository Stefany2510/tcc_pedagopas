const express = require('express');
const router = express.Router();
const db = require('../db');

// Criar novo evento
router.post('/', (req, res) => {
  const { user_id, title, date, location, description } = req.body;
  db.query(
    'INSERT INTO events (user_id, title, date, location, description) VALUES (?, ?, ?, ?, ?)',
    [user_id, title, date, location, description],
    (err, result) => {
      if (err) {
        console.error('Erro ao criar evento:', err);
        return res.status(500).send('Erro ao criar evento');
      }
      res.status(201).json({ message: 'Evento criado com sucesso!' });
    }
  );
});

// Listar todos os eventos
router.get('/', (req, res) => {
  db.query('SELECT * FROM events', (err, results) => {
    if (err) {
      console.error('Erro ao buscar eventos:', err);
      return res.status(500).send('Erro ao buscar eventos');
    }
    res.json(results);
  });
});

// Atualizar evento
router.put('/:id', (req, res) => {
  const { id } = req.params;
  const { title, date, location, description } = req.body;
  db.query(
    'UPDATE events SET title = ?, date = ?, location = ?, description = ? WHERE id = ?',
    [title, date, location, description, id],
    (err) => {
      if (err) {
        console.error('Erro ao atualizar evento:', err);
        return res.status(500).send('Erro ao atualizar evento');
      }
      res.json({ message: 'Evento atualizado com sucesso!' });
    }
  );
});

// Deletar evento
router.delete('/:id', (req, res) => {
  const { id } = req.params;
  db.query('DELETE FROM events WHERE id = ?', [id], (err) => {
    if (err) {
      console.error('Erro ao deletar evento:', err);
      return res.status(500).send('Erro ao deletar evento');
    }
    res.json({ message: 'Evento deletado com sucesso!' });
  });
});

module.exports = router;
