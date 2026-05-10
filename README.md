# Weeble

A daily-style animanga character guessing game inspired by Wordle. You have **6 attempts** to identify a secret character from anime and manga by reading the clues each guess gives you.

**Live deployment:** [https://weeble.onrender.com/](https://weeble.onrender.com/)

---

## How It Works

Type any animanga character name into the search field and select one from the autocomplete dropdown. After each guess, the game compares your pick against the secret character across 8 attributes:

| Attribute       | Description                                                                                                                                |
| --------------- | ------------------------------------------------------------------------------------------------------------------------------------------ |
| **Name**        | The character's name                                                                                                                       |
| **Gender**      | Male, Female, etc.                                                                                                                         |
| **Age Group**   | Ordered category (Child → Teen → Young Adult → Adult → Older → Ageless). An arrow (↑/↓) indicates which direction the secret character is. |
| **Series**      | The anime/manga they appear in                                                                                                             |
| **Genre**       | The demographic/genre of the series (Shonen, Seinen, Shojo, etc.)                                                                          |
| **Released In** | The decade the series debuted. An arrow (↑/↓) tells you if the secret series is older or newer.                                            |
| **Role**        | Protagonist, Antagonist, Supporting, etc.                                                                                                  |
| **Hair Color**  | The character's hair color                                                                                                                 |

Attributes highlighted in **green** are an exact match. Use the directional arrows on ordinal fields to narrow down your answer. You get 6 guesses total — use them wisely.

Your progress is saved in `localStorage`, so refreshing the page restores your current game.

---

## Tech Stack

### Frontend — `client/`

Built as a single-page application with:

- **[React 19](https://react.dev/)** — UI library. The entire game interface is built with functional components and hooks.
- **[React Router DOM v7](https://reactrouter.com/)** — Client-side routing between the loading screen (`/`) and the game (`/home`).
- **[Vite 8](https://vitejs.dev/)** — Build tool and dev server. Extremely fast HMR during development; produces an optimized static bundle for production.
- **[Axios](https://axios-http.com/)** — HTTP client used in `charsApi.js` to fetch the character list from the backend API.
- **[Lucide React](https://lucide.dev/)** — Icon library, used for the help button (CircleAlert) in the navbar.
- **Custom CSS** — No UI framework. All styles are hand-written in `App.css` and `global.css`.

### Backend — `server/`

A REST API built with:

- **[Node.js](https://nodejs.org/)** — JavaScript runtime.
- **[Express 5](https://expressjs.com/)** — Web framework. Handles API routes and also serves the built React SPA as static files (so the same process serves both the API and the frontend in production).
- **[Mongoose 9](https://mongoosejs.com/)** — MongoDB ODM. Defines the `Character` schema and handles all database queries.
- **[MongoDB](https://www.mongodb.com/)** — The database that stores all animanga character data.
- **[Helmet](https://helmetjs.github.io/)** — Sets security-related HTTP response headers automatically.
- **[CORS](https://github.com/expressjs/cors)** — Restricts cross-origin requests to the configured frontend URL.
- **[dotenv](https://github.com/motdotla/dotenv)** — Loads environment variables (`MONGODB_URI`, `PORT`, `FRONTEND_URL`) from a `.env` file.
- **[Nodemon](https://nodemon.io/)** — Dev-only: auto-restarts the server on file changes.

---

## Project Structure

```
Weeble/
├── client/                     # React frontend
│   ├── public/
│   │   └── images/background.webp
│   └── src/
│       ├── components/
│       │   ├── CharacterCard.jsx       # Dropdown suggestion item
│       │   ├── CharacterResponse.jsx   # Renders one guess row with color-coded attributes
│       │   ├── InputCharacter.jsx      # Main game UI: search input, dropdown, guess history
│       │   ├── NavBar.jsx              # Top bar with title and "How to Play" modal
│       │   └── ResetModal.jsx          # Reusable modal overlay (win/lose/help)
│       ├── hooks/
│       │   ├── useGameState.js         # Core game logic: secret selection, guesses, win/lose, localStorage
│       │   └── enumComparisons.js      # Helpers for ordinal direction arrows (age group, decade)
│       ├── lib/
│       │   └── ParticleEngine.js       # Canvas-based particle system for the loading screen
│       ├── pages/
│       │   ├── Loading.jsx             # Splash/loading screen with particle animation
│       │   └── Home.jsx                # Main game page
│       ├── services/
│       │   └── charsApi.js             # Axios wrapper for the /api/characters endpoint
│       ├── styles/
│       │   ├── App.css
│       │   └── global.css
│       ├── App.jsx                     # Root component: fetches characters, sets up routes
│       └── main.jsx                    # React DOM entry point
│
└── server/                     # Express backend
    ├── config/
    │   └── db.js               # Mongoose connection setup
    ├── models/
    │   └── Character.js        # Mongoose schema: name, gender, age_group, series, role, hair_color, etc.
    ├── routes/
    │   └── characters.js       # GET /api/characters and GET /api/characters/:id
    └── server.js               # Express app entry point
```

---

## Architecture

The project is a **full-stack monorepo** where the Express server handles two responsibilities:

1. **API** — serves character data from MongoDB at `/api/characters`.
2. **Static file hosting** — in production, it serves the Vite-built React bundle from `client/dist`, so a single Render service runs the entire app.

The game runs entirely on the client. `useGameState` picks a random secret character on startup, tracks guesses in React state, persists them in `localStorage` (so a page refresh doesn't reset the game), and opens a modal on win or loss after 6 guesses.

---

## Running Locally

**Backend**

```bash
cd server
npm install
# Create a .env file with MONGODB_URI and FRONTEND_URL
npm run dev
```

**Frontend**

```bash
cd client
npm install
npm run dev
```

The Vite dev server runs on `http://localhost:5173` and the Express API on `http://localhost:5000`.

---

## Deployment

Deployed on **[Render](https://render.com/)**.[https://weeble.onrender.com/](https://weeble.onrender.com/).
