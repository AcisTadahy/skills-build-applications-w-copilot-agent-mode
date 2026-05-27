import React, { useEffect, useState } from 'react';
import { apiBase, normalizeListResponse } from '../api';

export default function Workouts() {
  const [items, setItems] = useState([]);
  const [pagination, setPagination] = useState(undefined);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(`${apiBase}/workouts`)
      .then((res) => res.json())
      .then((payload) => {
        const { items, pagination } = normalizeListResponse(payload);
        setItems(items);
        setPagination(pagination);
      })
      .catch((err) => setError(String(err)))
      .finally(() => setLoading(false));
  }, []);

  const columns = items.length > 0 ? Object.keys(items[0]) : ['name', 'category', 'duration', 'intensity'];

  return (
    <section className="mt-4">
      <h2>Workouts</h2>
      <p>Fetching from <code>{`${apiBase}/workouts`}</code></p>
      {error && <div className="alert alert-danger">{error}</div>}
      {loading ? (
        <div className="text-muted">Loading workouts...</div>
      ) : items.length === 0 ? (
        <div className="alert alert-info">No workouts found.</div>
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
