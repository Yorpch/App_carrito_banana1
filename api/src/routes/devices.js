const express = require('express');
const router = express.Router();
const { query } = require('../db');

// list devices
router.get('/', async (req, res) => {
  try {
    const rows = await query('SELECT * FROM dispositivos ORDER BY id DESC');
    res.json(rows);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

// create device -> map to `dispositivos` (nombre, mac_address, version_firmware)
router.post('/', async (req, res) => {
  const { nombre, mac_address, usuario_id, version_firmware } = req.body;
  try {
    const result = await query('INSERT INTO dispositivos (usuario_id,nombre,mac_address,version_firmware,registrado_en) VALUES (?,?,?,?,NOW())', [usuario_id||1, nombre||'Mi Arduino', mac_address||null, version_firmware||'1.0']);
    // fetch inserted row
    const rows = await query('SELECT * FROM dispositivos WHERE id = ?', [result.insertId]);
    const device = rows[0];
    try {
      const socket = require('../socket').getIO();
      socket.emit('device.created', device);
    } catch (e) {}
    res.json(device);
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: 'server_error' });
  }
});

module.exports = router;
