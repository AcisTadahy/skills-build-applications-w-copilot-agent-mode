import { useEffect, useState } from 'react';
import { apiBase, normalizeListResponse, type ListResponse } from '../api';

interface Activity {
  id?: string;
  user?: string;
  description?: string;
  duration?: number;
  date?: string;
  [key: string]: unknown;
}

function renderRow(item: Activity, keys: string[]) {
  return keys.map((key) => (
    <td key={key}>{String(item[key] ?? '')}</td>
  ));
}

export default function Activities() {
  const [items, setItems] = useState<Activity[]>([]);
  const [pagination, setPagination] = useState<{ page: number; totalPages: number; totalItems: number } | undefined>();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiBase}/activities`)
      .then((res) => res.json())
      .then((payload) => {
        const { items, pagination } = normalizeListResponse<Activity>(payload as ListResponse<Activity>);
        setItems(items);
        setPagination(pagination);
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, []);

  const columns = items.length > 0 ? Object.keys(items[0]) : ['id', 'user', 'description', 'duration', 'date'];

  return (
    <section className="mt-4">
      <h2>Activities</h2>
      <p>Fetching from <code>{`${apiBase}/activities`}</code></p>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-muted">Loading activities...</div>
      ) : items.length === 0 ? (
        <div className="alert alert-info">No activities found.</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-sm">
            <thead>
              <tr>{columns.map((key) => <th key={key}>{key}</th>)}</tr>
            </thead>
            <tbody>{items.map((item, index) => (
              <tr key={item.id ?? index}>{renderRow(item, columns)}</tr>
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
