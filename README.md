# Weeble

Un juego de adivinanza de personajes de anime y manga, de estilo diario, inspirado en Wordle. Tienes **6 intentos** para identificar al personaje secreto usando las pistas que te da cada intento.

**Deployment:** [https://weeble.onrender.com/](https://weeble.onrender.com/)

---

## Cómo se juega

Escribe el nombre de cualquier personaje de animanga en el campo de búsqueda y selecciónalo del desplegable. Tras cada intento, el juego compara tu elección con el personaje secreto en 8 atributos:

| Atributo            | Descripción                                                                                                                                              |
| ------------------- | -------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Nombre**          | El nombre del personaje                                                                                                                                  |
| **Género**          | Masculino, Femenino, etc.                                                                                                                                |
| **Grupo de edad**   | Categoría ordenada (Niño → Adolescente → Adulto Joven → Adulto → Mayor → Atemporal). Una flecha (↑/↓) indica en qué dirección está el personaje secreto. |
| **Serie**           | El anime o manga en el que aparece                                                                                                                       |
| **Género de serie** | El demographic/género de la serie (Shonen, Seinen, Shojo, etc.)                                                                                          |
| **Publicado en**    | La década en que debutó la serie. Una flecha (↑/↓) indica si la serie secreta es más antigua o más reciente.                                             |
| **Rol**             | Protagonista, Antagonista, Secundario, etc.                                                                                                              |
| **Color de pelo**   | El color de cabello del personaje                                                                                                                        |

Los atributos resaltados en **verde** son una coincidencia exacta. Usa las flechas en los campos ordinales para afinar tu respuesta. Tienes 6 intentos en total — úsalos con cuidado.

Tu progreso se guarda en `localStorage`, por lo que recargar la página restaura la partida actual.

---

## Stack tecnológico

### Frontend — `client/`

Construido como una Single Page Application (SPA) con:

- **[React 19](https://react.dev/)** — Biblioteca de UI. Toda la interfaz del juego está construida con componentes funcionales y hooks.
- **[React Router DOM v7](https://reactrouter.com/)** — Enrutamiento del lado del cliente entre la pantalla de carga (`/`) y el juego (`/home`).
- **[Vite 8](https://vitejs.dev/)** — Herramienta de build y servidor de desarrollo. HMR extremadamente rápido en desarrollo; genera un bundle optimizado para producción.
- **[Axios](https://axios-http.com/)** — Cliente HTTP usado en `charsApi.js` para obtener la lista de personajes desde la API del backend.
- **[Lucide React](https://lucide.dev/)** — Biblioteca de íconos, usada para el botón de ayuda (CircleAlert) en la barra de navegación.
- **CSS personalizado** — Sin framework de UI. Todos los estilos están escritos a mano en `App.css` y `global.css`.

### Backend — `server/`

Una API REST construida con:

- **[Node.js](https://nodejs.org/)** — Entorno de ejecución de JavaScript.
- **[Express 5](https://expressjs.com/)** — Framework web. Maneja las rutas de la API y también sirve la SPA de React como archivos estáticos (un solo proceso sirve tanto la API como el frontend en producción).
- **[Mongoose 9](https://mongoosejs.com/)** — ODM para MongoDB. Define el esquema `Character` y gestiona todas las consultas a la base de datos.
- **[MongoDB](https://www.mongodb.com/)** — La base de datos que almacena todos los personajes de animanga.
- **[Helmet](https://helmetjs.github.io/)** — Configura automáticamente las cabeceras HTTP relacionadas con seguridad.
- **[CORS](https://github.com/expressjs/cors)** — Restringe las peticiones de origen cruzado a la URL del frontend configurada.
- **[dotenv](https://github.com/motdotla/dotenv)** — Carga variables de entorno (`MONGODB_URI`, `PORT`, `FRONTEND_URL`) desde un archivo `.env`.
- **[Nodemon](https://nodemon.io/)** — Solo en desarrollo: reinicia el servidor automáticamente ante cambios en los archivos.

---

## Estructura del proyecto

```
Weeble/
├── client/                     # Frontend en React
│   ├── public/
│   │   └── images/background.webp
│   └── src/
│       ├── components/
│       │   ├── CharacterCard.jsx       # Ítem del desplegable de sugerencias
│       │   ├── CharacterResponse.jsx   # Renderiza una fila de intento con atributos coloreados
│       │   ├── InputCharacter.jsx      # UI principal: input, desplegable, historial de intentos
│       │   ├── NavBar.jsx              # Barra superior con título y modal "Cómo jugar"
│       │   └── ResetModal.jsx          # Modal reutilizable (victoria/derrota/ayuda)
│       ├── hooks/
│       │   ├── useGameState.js         # Lógica central: personaje secreto, intentos, victoria/derrota, localStorage
│       │   └── enumComparisons.js      # Helpers para las flechas de dirección en campos ordinales
│       ├── lib/
│       │   └── ParticleEngine.js       # Sistema de partículas en canvas para la pantalla de carga
│       ├── pages/
│       │   ├── Loading.jsx             # Pantalla de carga con animación de partículas
│       │   └── Home.jsx                # Página principal del juego
│       ├── services/
│       │   └── charsApi.js             # Wrapper de Axios para el endpoint /api/characters
│       ├── styles/
│       │   ├── App.css
│       │   └── global.css
│       ├── App.jsx                     # Componente raíz: obtiene personajes y configura las rutas
│       └── main.jsx                    # Punto de entrada de React DOM
│
└── server/                     # Backend en Express
    ├── config/
    │   └── db.js               # Configuración de la conexión con Mongoose
    ├── models/
    │   └── Character.js        # Esquema Mongoose: name, gender, age_group, series, role, hair_color, etc.
    ├── routes/
    │   └── characters.js       # GET /api/characters y GET /api/characters/:id
    └── server.js               # Punto de entrada de la aplicación Express
```

---

## Arquitectura

El proyecto es un **monorepo full-stack** donde el servidor Express cumple dos responsabilidades:

1. **API** — sirve los datos de personajes desde MongoDB en `/api/characters`.
2. **Archivos estáticos** — en producción, sirve el bundle de React generado por Vite desde `client/dist`, de modo que un único servicio de Render ejecuta toda la aplicación.

El juego corre completamente en el cliente. `useGameState` elige un personaje secreto aleatorio al iniciar, registra los intentos en el estado de React, los persiste en `localStorage` (para que recargar la página no reinicie la partida) y abre un modal al ganar o perder tras 6 intentos.

---

## Correr localmente

**Backend**

```bash
cd server
npm install
# Crear un archivo .env con MONGODB_URI y FRONTEND_URL
npm run dev
```

**Frontend**

```bash
cd client
npm install
npm run dev
```

El servidor de desarrollo de Vite corre en `http://localhost:5173` y la API de Express en `http://localhost:5000`.

---

## Deployment

Desplegado en **[Render](https://render.com/)**. El comando de build ejecuta `vite build` dentro de `client/`, y el servidor Express arranca con `node server.js`, sirviendo tanto la API como la app de React compilada desde el mismo origen en [https://weeble.onrender.com/](https://weeble.onrender.com/).
