const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dotenv = require('dotenv');
dotenv.config();

const authRoutes = require('./routes/auth');
const sessionsRoutes = require('./routes/sessions');
const eventsRoutes = require('./routes/events');
const devicesRoutes = require('./routes/devices');
const { ping } = require('./db');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());
app.use('/api/auth', authRoutes);
app.use('/api/sessions', sessionsRoutes);
app.use('/api/events', eventsRoutes);
app.use('/api/devices', devicesRoutes);

app.get('/api/health', (req, res) => res.json({ ok: true }));

app.get('/api/db-check', async (req, res) => {
	try {
		const ok = await ping();
		res.json({ ok, db: process.env.DB_NAME || 'arduino_ia', host: process.env.DB_HOST || '127.0.0.1' });
	} catch (error) {
		console.error('DB check failed:', error);
		res.status(500).json({ ok: false, error: 'db_unreachable', message: error.message });
	}
});

// Start HTTP server and initialize Socket.IO
const http = require('http');
const server = http.createServer(app);
const socket = require('./socket');
socket.init(server);

server.listen(port, () => console.log(`API + Socket running on http://localhost:${port}`));
