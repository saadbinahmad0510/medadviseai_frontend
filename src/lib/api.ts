const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export interface Consultation {
  id: number;
  symptoms: string;
  ai_response: string;
  created_at: string;
}

export function getAccessToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem('accessToken');
}

export async function register(username: string, email: string, password: string) {
  const res = await fetch(`${API_URL}/api/auth/register/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, email, password }),
  });
  if (!res.ok) throw new Error('Registration failed');
  return res.json();
}

export async function login(username: string, password: string) {
  const res = await fetch(`${API_URL}/api/token/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ username, password }),
  });
  if (!res.ok) throw new Error('Invalid username or password');
  const data = await res.json();
  localStorage.setItem('accessToken', data.access);
  localStorage.setItem('refreshToken', data.refresh);
  return data;
}

export function logout() {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
}

function authHeaders(): HeadersInit {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export async function getConsultations(): Promise<Consultation[]> {
  const res = await fetch(`${API_URL}/api/consultations/`, {
    headers: authHeaders(),
    cache: 'no-store',
  });
  if (!res.ok) throw new Error('Failed to fetch consultations');
  return res.json();
}

export async function createConsultation(symptoms: string): Promise<Consultation> {
  const res = await fetch(`${API_URL}/api/consultations/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', ...authHeaders() },
    body: JSON.stringify({ symptoms }),
  });
  if (!res.ok) throw new Error('Failed to create consultation');
  return res.json();
}
