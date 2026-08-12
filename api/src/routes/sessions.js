const express = require('express');
const router = express.Router();
const { query } = require('../db');

// list sessions
router.get('/', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM sesiones ORDER BY id DESC LIMIT 200');
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

// create session -> map to `sesiones`
router.post('/', async (req, res) => {
  const { dispositivo_id, distancia_total_cm, decisiones_tomadas, precision_pct } = req.body;
  try {
    const result = await query('INSERT INTO sesiones (dispositivo_id, inicio, fin, distancia_total_cm, decisiones_tomadas, precision_pct) VALUES (?,?,NULL,?,?,?)', [dispositivo_id||1, new Date(), distancia_total_cm||0, decisiones_tomadas||0, precision_pct||null]);
    // fetch inserted row
    const rows = await query('SELECT * FROM sesiones WHERE id = ?', [result.insertId]);
    const session = rows[0];
    try {
      const socket = require('../socket').getIO();
      socket.emit('session.created', session);
    } catch (e) {}
    res.json(session);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

module.exports = router;
