export const codespaceName = import.meta.env.VITE_CODESPACE_NAME;
export const apiBase = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev/api`
  : 'http://localhost:8000/api';

export interface Pagination {
  page: number;
  totalPages: number;
  totalItems: number;
}

export type ListResponse<T> = T[] | { data: T[]; pagination?: Pagination };

export function normalizeListResponse<T>(payload: ListResponse<T>) {
  if (Array.isArray(payload)) {
    return { items: payload, pagination: undefined };
  }

  return {
    items: payload.data ?? [],
    pagination: payload.pagination,
  };
}
