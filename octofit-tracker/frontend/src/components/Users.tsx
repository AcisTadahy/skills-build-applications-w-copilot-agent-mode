import { useEffect, useState } from 'react';
import { apiBase, normalizeListResponse, type ListResponse } from '../api';

interface User {
  id?: string;
  name?: string;
  email?: string;
  role?: string;
  joinedAt?: string;
  [key: string]: unknown;
}

export default function Users() {
  const [items, setItems] = useState<User[]>([]);
  const [pagination, setPagination] = useState<{ page: number; totalPages: number; totalItems: number } | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiBase}/users`)
      .then((res) => res.json())
      .then((payload) => {
        const { items, pagination } = normalizeListResponse<User>(payload as ListResponse<User>);
        setItems(items);
        setPagination(pagination);
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, []);

  const columns = items.length > 0 ? Object.keys(items[0]) : ['name', 'email', 'role', 'joinedAt'];

  return (
    <section className="mt-4">
      <h2>Users</h2>
      <p>Fetching from <code>{`${apiBase}/users`}</code></p>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-muted">Loading users...</div>
      ) : items.length === 0 ? (
        <div className="alert alert-info">No users found.</div>
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
