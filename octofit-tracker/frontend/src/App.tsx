import 'bootstrap/dist/css/bootstrap.min.css';
import { NavLink, Route, Routes } from 'react-router-dom';
import Activities from './components/Activities';
import Leaderboard from './components/Leaderboard';
import Teams from './components/Teams';
import Users from './components/Users';
import Workouts from './components/Workouts';

const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

function Home() {
  return (
    <section>
      <div className="card mb-4">
        <div className="card-body">
          <h2 className="card-title">OctoFit Tracker</h2>
          <p className="card-text">
            This React frontend uses environment-aware API routing for Codespaces.
          </p>
          <p>
            API base URL: <code>{apiBase}</code>
          </p>
          <p>
            In a Codespace, set <code>VITE_CODESPACE_NAME</code> in <code>.env.local</code> so the app can resolve:
          </p>
          <pre className="bg-light p-3">VITE_CODESPACE_NAME=my-codespace-name</pre>
          <p>
            When running inside GitHub Codespaces preview, the frontend can also infer the app host from the preview URL. If the env var is unset, it still falls back to <code>http://localhost:8000/api</code>.
          </p>
        </div>
      </div>
    </section>
  );
}

export default function App() {
  return (
    <div className="container py-5">
      <header className="mb-4">
        <h1 className="display-5">OctoFit Tracker</h1>
        <p className="lead">React 19 presentation tier with router-aware navigation and Codespaces API support.</p>
      </header>

      { !codespaceName && (
        <div className="alert alert-warning">
          <strong>Warning:</strong> <code>VITE_CODESPACE_NAME</code> is not set. Using localhost fallback for API requests.
        </div>
      ) }

      <nav className="nav nav-pills flex-column flex-sm-row mb-4">
        <NavLink to="/" end className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Home
        </NavLink>
        <NavLink to="/activities" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Activities
        </NavLink>
        <NavLink to="/leaderboard" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Leaderboard
        </NavLink>
        <NavLink to="/teams" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Teams
        </NavLink>
        <NavLink to="/users" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Users
        </NavLink>
        <NavLink to="/workouts" className={({ isActive }) => `nav-link ${isActive ? 'active' : ''}`}>
          Workouts
        </NavLink>
      </nav>

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/activities" element={<Activities />} />
        <Route path="/leaderboard" element={<Leaderboard />} />
        <Route path="/teams" element={<Teams />} />
        <Route path="/users" element={<Users />} />
        <Route path="/workouts" element={<Workouts />} />
      </Routes>
    </div>
  );
}
