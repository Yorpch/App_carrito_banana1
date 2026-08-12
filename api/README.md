API backend minimal para App_1

Requisitos:
- Node.js 18+ (recomendado)
- MySQL (XAMPP) corriendo en localhost

Instalación:
1. Copia `.env.example` a `.env` y ajusta credenciales.
2. Instala dependencias:
   npm install
3. Crea la base de datos e importa esquema:
   - Desde phpMyAdmin crea la base `DB_NAME` o ejecuta el SQL en `init.sql`.
   - O desde terminal: mysql -u root -p < init.sql
4. Ejecuta la API:
   npm run dev

Rutas principales:
- POST /api/auth/register  { name, email, password }
- POST /api/auth/login     { email, password }
- GET  /api/sessions
- POST /api/sessions      { device_id, duration, distance }
- GET  /api/events
- POST /api/events        { type, message, meta }
- GET  /api/devices
- POST /api/devices       { name, mac }

Notas:
- Esta es una plantilla mínima; adapta validaciones y seguridad para producción.
