# MedAdvise AI - Frontend

Next.js 14 + TypeScript app. Talks to the Django backend for health check, auth (JWT), and consultations.

## Setup

1. Install [Node.js](https://nodejs.org/) (LTS) if you haven't already.
2. Install dependencies and run the dev server:

```bash
npm install
copy .env.local.example .env.local   # Windows
# cp .env.local.example .env.local   # macOS/Linux
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) — it should show the backend's health status (start the backend first; see `../backend/README.md`).

## Pages

- `/` — home, shows backend health status
- `/register` — create an account
- `/login` — log in (stores JWT in localStorage)
- `/consultations` — submit symptoms and view your past consultations (requires login)

## Tests

```bash
npm test
```

## Docker

Requires Docker Desktop. From the project root (one level up):

```bash
docker compose up --build
```
