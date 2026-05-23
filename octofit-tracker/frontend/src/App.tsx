import 'bootstrap/dist/css/bootstrap.min.css';

function App() {
  return (
    <div className="container py-5">
      <header className="mb-4">
        <h1 className="display-5">OctoFit Tracker</h1>
        <p className="lead">Modern multi-tier fitness tracking with React, Vite, Node, Express, and MongoDB.</p>
      </header>

      <section>
        <div className="card">
          <div className="card-body">
            <h2 className="card-title">Welcome</h2>
            <p className="card-text">
              The frontend is configured to run on port <strong>5173</strong>.
            </p>
          </div>
        </div>
      </section>
    </div>
  );
}

export default App;
