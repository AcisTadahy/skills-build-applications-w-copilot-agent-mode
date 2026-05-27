/// <reference types="vite/client" />

function deriveCodespaceNameFromHost(): string | undefined {
  const candidate = typeof globalThis !== 'undefined' ? globalThis : undefined;
  const host = candidate && typeof (candidate as any).location === 'object'
    ? (candidate as any).location.host
    : undefined;

  if (!host) {
    return undefined;
  }

  const match = host.match(/^(.+)-\d+\.app\.github\.dev$/);
  return match ? match[1] : undefined;
}

export const codespaceName = import.meta.env.VITE_CODESPACE_NAME ?? deriveCodespaceNameFromHost();
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
