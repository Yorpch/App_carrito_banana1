# App_1 — Ionic Angular starter

Proyecto inicial de Ionic (Angular) preparado para comenzar a agregar pantallas en `src/pages`.

Requisitos locales
- Node.js 22.x (recomendado usar nvm o nvm-windows)
- JDK 17 instalado y configurado en `JAVA_HOME` (necesario para compilar Android)
- Android Studio con Android SDK 15 instalado

Instalación y ejecución (desde `c:\xampp\htdocs\app_1`)

```powershell
nvm install 22
nvm use 22
npm install -g @ionic/cli @capacitor/cli
npm install
npm run start
```

Generar build y preparar Android (después de `npm run build`):

```powershell
npm run build
npx cap add android
npx cap sync
npm run android
```

Notas
- Si usas Windows, instala OpenJDK 17 y ajusta la variable de entorno `JAVA_HOME`.
- La app usa `src/pages` para las pantallas y el menú lateral del shell principal.
- Para Android Studio, abre el proyecto generado en `android/` después de ejecutar `npx cap add android`.
