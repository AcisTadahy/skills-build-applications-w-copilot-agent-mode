import express from 'express';
import cors from 'cors';

export const app = express();

app.use(cors());
app.use(express.json());

const sampleActivities = [
  { id: '1', user: 'Alice', description: 'Morning run', duration: 40, date: '2026-05-23' },
  { id: '2', user: 'Carlos', description: 'Cycling session', duration: 55, date: '2026-05-22' },
];

const sampleLeaderboard = [
  { id: '1', rank: 1, user: 'Alice', score: 980 },
  { id: '2', rank: 2, user: 'Carlos', score: 870 },
];

const sampleTeams = [
  { id: '1', name: 'Team Alpha', members: 12, createdAt: '2026-01-01' },
  { id: '2', name: 'Team Omega', members: 9, createdAt: '2026-02-15' },
];

const sampleUsers = [
  { id: '1', name: 'Alice', email: 'alice@example.com', role: 'member', joinedAt: '2025-11-10' },
  { id: '2', name: 'Carlos', email: 'carlos@example.com', role: 'coach', joinedAt: '2025-12-04' },
];

const sampleWorkouts = [
  { id: '1', name: 'Interval Training', category: 'cardio', duration: 45, intensity: 'high' },
  { id: '2', name: 'Strength Circuit', category: 'strength', duration: 50, intensity: 'medium' },
];

function pageResponse(data: unknown[]) {
  return {
    data,
    pagination: {
      page: 1,
      totalPages: 1,
      totalItems: data.length,
    },
  };
}

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', environment: 'octofit-tracker backend' });
});

app.get('/api/activities', (_req, res) => {
  res.json(pageResponse(sampleActivities));
});

app.get('/api/leaderboard', (_req, res) => {
  res.json(pageResponse(sampleLeaderboard));
});

app.get('/api/teams', (_req, res) => {
  res.json(pageResponse(sampleTeams));
});

app.get('/api/users', (_req, res) => {
  res.json(pageResponse(sampleUsers));
});

app.get('/api/workouts', (_req, res) => {
  res.json(pageResponse(sampleWorkouts));
});
