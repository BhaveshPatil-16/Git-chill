# hireX

> A premium professional networking & hiring platform for verified, experienced professionals (3+ years). Built with React + Vite on the frontend and Fastify on the backend.

---

## 🏗 Project Structure

```
git-chill/
├── backend/          # Fastify API server (Node.js)
│   ├── src/
│   │   ├── routes/       # API route handlers
│   │   ├── plugins/      # Fastify plugins (auth, rbac)
│   │   ├── services/     # Business logic (userRepository)
│   │   ├── firebase.js   # Firebase Admin SDK init
│   │   └── server.js     # Entry point
│   └── package.json
│
├── frontend/         # React + Vite SPA
│   ├── src/
│   │   ├── components/   # UI components (Header, Sidebar, Main…)
│   │   ├── pages/        # Route-level pages (SignIn, Signup)
│   │   ├── action/       # Redux actions
│   │   ├── reducers/     # Redux reducers
│   │   ├── firebase/     # Firebase client SDK config
│   │   └── index.jsx     # Entry point
│   └── package.json
│
├── package.json      # Root — runs both with one command
└── .env              # Environment variables (never committed)
```

---

## ⚡ Quick Start

### 1. Clone the repo

```bash
git clone https://github.com/BhaveshPatil-16/Git-chill.git
cd Git-chill
```

### 2. Set up environment variables

Create a `.env` file in the project root:

```bash
cp .env.example .env   # or copy manually — see section below
```

> See **Environment Variables** section for all required keys.

### 3. Install all dependencies — one command

```bash
npm install
```

This automatically installs deps for **all three packages** (root, backend, frontend) via the `postinstall` hook. No need to `cd` into subdirectories.

### 4. Start the full stack — one command

```bash
npm run dev
```

| Service | URL |
|---|---|
| Frontend (Vite) | http://localhost:3000 |
| Backend (Fastify) | http://localhost:3001 |

Output is colour-coded: **[BACKEND]** in cyan, **[FRONTEND]** in magenta.

---

## 📦 Available Scripts

Run all of these from the **project root**:

| Command | Description |
|---|---|
| `npm run dev` | Start frontend + backend concurrently |
| `npm run frontend` | Start only the Vite dev server |
| `npm run backend` | Start only the Fastify server |
| `npm run build` | Build the frontend for production |

---

## 🔑 Environment Variables

Create a `.env` file in the **project root** (it is `.gitignore`-d — never commit it).

### Firebase Client SDK (used by frontend)

```env
REACT_APP_FIREBASE_API_KEY=
REACT_APP_FIREBASE_AUTH_DOMAIN=
REACT_APP_FIREBASE_PROJECT_ID=
REACT_APP_FIREBASE_STORAGE_BUCKET=
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=
REACT_APP_FIREBASE_APP_ID=
```

### Firebase Admin SDK — Service Account (backend only)

```env
FIREBASE_SA_TYPE=service_account
FIREBASE_SA_PROJECT_ID=
FIREBASE_SA_PRIVATE_KEY_ID=
FIREBASE_SA_PRIVATE_KEY="-----BEGIN PRIVATE KEY-----\n...\n-----END PRIVATE KEY-----\n"
FIREBASE_SA_CLIENT_EMAIL=
FIREBASE_SA_CLIENT_ID=
FIREBASE_SA_AUTH_URI=https://accounts.google.com/o/oauth2/auth
FIREBASE_SA_TOKEN_URI=https://oauth2.googleapis.com/token
FIREBASE_SA_AUTH_PROVIDER_CERT_URL=https://www.googleapis.com/oauth2/v1/certs
FIREBASE_SA_CLIENT_CERT_URL=
FIREBASE_SA_UNIVERSE_DOMAIN=googleapis.com
```

> **Private key**: Must be on one line with literal `\n` for newlines (copy exactly from Firebase Console → Project Settings → Service Accounts → Generate new key).

---

## 🔐 Authentication Flow

| Method | Flow |
|---|---|
| Email/Password signup | Firebase Auth → 3-step wizard (credentials → face verification → role) |
| Google / GitHub signup | Firebase popup OAuth → if new user → verification wizard |
| Sign in | Email/Password or OAuth → `/feed` |

---

## 🚀 Tech Stack

| Layer | Technology |
|---|---|
| Frontend | React 19, Vite 5, Tailwind CSS v3, Redux |
| Backend | Fastify, Firebase Admin SDK |
| Auth | Firebase Authentication |
| Database | Cloud Firestore |
| Storage | Firebase Storage |
| Routing | React Router v7 |

---

## 📝 Notes for Contributors

- **Three `node_modules`** exist — root, `frontend/`, `backend/`. This is normal for a monorepo. A single `npm install` at the root installs all three automatically.
- **Never commit `.env`** — it is in `.gitignore`. The `serviceAccount.json` is a reference template with placeholder variable names only; real secrets live in `.env`.
- **Active branch**: `develop`
