# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey AcisTadahy!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/AcisTadahy/skills-build-applications-w-copilot-agent-mode/issues/1)

## OctoFit Tracker Project

A new `octofit-tracker/` multi-tier application has been initialized with:

- `frontend/` — React 19 + Vite + TypeScript + Bootstrap
- `backend/` — Node.js + Express + TypeScript + Mongoose
- MongoDB configured for `mongodb://localhost:27017/octofit`

## Resume Work

To continue working on the OctoFit Tracker project:

1. Open the repository root in VS Code.
2. Select the `octofit-tracker/` folder tree.
3. Work in:
   - `octofit-tracker/frontend/` for the presentation tier
   - `octofit-tracker/backend/` for the logic/data tier

## Launch the App

### Frontend

```bash
cd octofit-tracker/frontend
npm install
npm run dev
```

The frontend runs on `http://localhost:5173`.

### Backend

```bash
cd octofit-tracker/backend
npm install
npm run dev
```

The backend runs on `http://localhost:8000`.

### MongoDB

Start MongoDB locally and ensure it listens on port `27017`.

### Health Check

After launching the backend, verify it with:

```bash
curl http://localhost:8000/api/health
```

If everything is running, you should get a JSON response from the backend.

