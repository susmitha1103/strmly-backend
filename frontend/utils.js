export function getToken() {
  return localStorage.getItem('token') || 'token not found';
}

export async function fetchWithAuth(url, options = {}) {
  const token = getToken();
  const headers = {
    ...(options.headers || {}),
    Authorization: token ? `Bearer ${token}` : ''
  };
  const res = await fetch(url, { ...options, headers });
  return res.json();
}