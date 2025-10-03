export function getApiBaseUrl() {
  const env = (process.env.NEXT_PUBLIC_BASE_URL || "http://127.0.0.1:3007").trim();
  if (env.startsWith("http")) return env;
  return `http://${env}`;
}

export function authHeaders(token?: string | null): HeadersInit {
  const headers: Record<string, string> = {};
  if (token) headers.Authorization = `Bearer ${token}`;
  return headers;
}


