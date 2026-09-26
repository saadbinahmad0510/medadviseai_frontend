# MedAdvise AI - Frontend

Next.js 14 + TypeScript app. Talks to the Django backend for auth (JWT),
X-ray-based knee osteoarthritis grading, the model performance dashboard,
and an offline rule-based chat.

**Research prototype — not a medical device, not for clinical decisions.**

## Setup

1. Install [Node.js](https://nodejs.org/) (LTS) if you haven't already.
2. Install dependencies and run the dev server:

```bash
npm install
copy .env.local.example .env.local   # Windows
# cp .env.local.example .env.local   # macOS/Linux
npm run dev
```

3. Open [http://localhost:3000](http://localhost:3000) — start the backend
   first (see `../backend/README.md`).

## Pages

- `/` — home, shows backend health status
- `/register`, `/login` — auth (JWT stored in localStorage; expired access
  tokens are refreshed automatically once, then redirect to `/login` if
  that fails)
- `/consultations` — upload an X-ray (drag-drop, file picker, or a built-in
  sample) and get a Kellgren-Lawrence grade with confidence, expected
  grade, a 5-class probability breakdown, and a reliability warning on
  Grades 1-2; ask the offline chat questions about the result
- `/metrics` — the model's real training/evaluation numbers (accuracy,
  QWK, confusion matrix, ROC curves, training curves, dataset composition,
  limitations) — every number is fetched from `public/metrics.json` at
  runtime, not hardcoded

## Tests

```bash
npm test
```

## Docker

Requires Docker Desktop. From the project root (one level up):

```bash
docker compose up --build
```
