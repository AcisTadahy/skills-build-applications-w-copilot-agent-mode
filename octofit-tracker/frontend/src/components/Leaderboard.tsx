import { useEffect, useState } from 'react';
import { apiBase, normalizeListResponse, type ListResponse } from '../api';

interface LeaderboardEntry {
  id?: string;
  rank?: number;
  user?: string;
  score?: number;
  [key: string]: unknown;
}

export default function Leaderboard() {
  const [items, setItems] = useState<LeaderboardEntry[]>([]);
  const [pagination, setPagination] = useState<{ page: number; totalPages: number; totalItems: number } | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiBase}/leaderboard`)
      .then((res) => res.json())
      .then((payload) => {
        const { items, pagination } = normalizeListResponse<LeaderboardEntry>(payload as ListResponse<LeaderboardEntry>);
        setItems(items);
        setPagination(pagination);
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, []);

  const columns = items.length > 0 ? Object.keys(items[0]) : ['rank', 'user', 'score'];

  return (
    <section className="mt-4">
      <h2>Leaderboard</h2>
      <p>Fetching from <code>{`${apiBase}/leaderboard`}</code></p>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-muted">Loading leaderboard...</div>
      ) : items.length === 0 ? (
        <div className="alert alert-info">No leaderboard entries found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>{columns.map((key) => <th key={key}>{key}</th>)}</tr>
            </thead>
            <tbody>{items.map((item, index) => (
              <tr key={item.id ?? index}>{columns.map((col) => <td key={col}>{String(item[col] ?? '')}</td>)}</tr>
            ))}</tbody>
          </table>
        </div>
      )}
      {pagination && (
        <div className="mt-3">
          <small className="text-muted">
            Page {pagination.page} of {pagination.totalPages} · {pagination.totalItems} items
          </small>
        </div>
      )}
    </section>
  );
}
