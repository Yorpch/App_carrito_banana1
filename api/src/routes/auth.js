const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const { query } = require('../db');

// register -> uses `usuarios` table (nombre, email, password_hash)
router.post('/register', async (req, res) => {
  const { nombre, email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'missing_fields' });
  try {
    const hashed = await bcrypt.hash(password, 10);
    const result = await query('INSERT INTO usuarios (nombre,email,password_hash) VALUES (?,?,?)', [nombre||'', email, hashed]);
    const rows = await query('SELECT id, nombre, email, creado_en FROM usuarios WHERE id = ?', [result.insertId]);
    return res.json(rows[0]);
  } catch (e) {
    if (e.code === 'ER_DUP_ENTRY') return res.status(409).json({ error: 'email_exists' });
    console.error(e);
    return res.status(500).json({ error: 'server_error' });
  }
});

// login -> check against usuarios.password_hash
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) return res.status(400).json({ error: 'missing_fields' });
  try {
    const rows = await query('SELECT id, nombre, email, password_hash FROM usuarios WHERE email = ?', [email]);
    if (!rows.length) return res.status(401).json({ error: 'invalid_credentials' });
    const user = rows[0];
    const ok = await bcrypt.compare(password, user.password_hash);
    if (!ok) return res.status(401).json({ error: 'invalid_credentials' });
    return res.json({ id: user.id, nombre: user.nombre, email: user.email });
  } catch (e) {
    console.error(e);
    return res.status(500).json({ error: 'server_error' });
  }
});

module.exports = router;
