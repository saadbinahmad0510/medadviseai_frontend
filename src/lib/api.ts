import { Consultation } from '@/types/consultation';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

export type { Consultation };

export function resolveImageUrl(image: string | null): string | null {
  if (!image) return null;
  return image.startsWith('http') ? image : `${API_URL}${image}`;
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

async function refreshAccessToken(): Promise<boolean> {
  const refreshToken = typeof window !== 'undefined' ? localStorage.getItem('refreshToken') : null;
  if (!refreshToken) return false;

  const res = await fetch(`${API_URL}/api/token/refresh/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ refresh: refreshToken }),
  });
  if (!res.ok) return false;

  const data = await res.json();
  localStorage.setItem('accessToken', data.access);
  return true;
}

// Wraps fetch for authenticated requests: on a 401, tries a token refresh
// once and retries; if the refresh fails, logs out and redirects to /login
// instead of surfacing the raw expired-token error to the caller.
async function fetchWithAuth(url: string, options: RequestInit = {}): Promise<Response> {
  const doFetch = () => fetch(url, { ...options, headers: { ...options.headers, ...authHeaders() } });

  let res = await doFetch();
  if (res.status === 401) {
    const refreshed = await refreshAccessToken();
    if (refreshed) {
      res = await doFetch();
    } else {
      logout();
      if (typeof window !== 'undefined') window.location.href = '/login';
    }
  }
  return res;
}

export async function getConsultations(): Promise<Consultation[]> {
  const res = await fetchWithAuth(`${API_URL}/api/consultations/`, { cache: 'no-store' });
  if (!res.ok) throw new Error('Failed to fetch consultations');
  return res.json();
}

export async function createConsultation(
  symptoms: string,
  image?: File | null
): Promise<Consultation> {
  const formData = new FormData();
  if (symptoms) formData.append('symptoms', symptoms);
  if (image) formData.append('image', image);

  const res = await fetchWithAuth(`${API_URL}/api/consultations/`, {
    method: 'POST',
    body: formData,
  });
  if (!res.ok) throw new Error('Failed to create consultation');
  return res.json();
}

export interface ChatResponse {
  reply: string;
  intent: string;
}

export async function sendChatMessage(
  message: string,
  consultationId?: number
): Promise<ChatResponse> {
  const res = await fetchWithAuth(`${API_URL}/api/chat/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ message, consultation_id: consultationId ?? null }),
  });
  if (!res.ok) throw new Error('Failed to send message');
  return res.json();
}
