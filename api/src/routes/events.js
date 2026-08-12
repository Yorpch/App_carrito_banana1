const express = require('express');
const router = express.Router();
const { query } = require('../db');

// list events
router.get('/', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM alertas ORDER BY id DESC LIMIT 500');
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

// create alert/event -> map to `alertas` (sesion_id, tipo, descripcion)
router.post('/', async (req, res) => {
  const { sesion_id, tipo, descripcion } = req.body;
  try {
    const result = await query('INSERT INTO alertas (sesion_id,tipo,descripcion,momento) VALUES (?,?,?,NOW())', [sesion_id||null, tipo||'otro', descripcion||'']);
    const rows = await query('SELECT * FROM alertas WHERE id = ?', [result.insertId]);
    const alert = rows[0];
    try {
      const socket = require('../socket').getIO();
      socket.emit('alerta.created', alert);
    } catch (e) {}
    res.json(alert);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

module.exports = router;
