'use client';

import { useEffect, useRef, useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Consultation,
  createConsultation,
  getAccessToken,
  getConsultations,
  logout,
} from '@/lib/api';

export default function ConsultationsPage() {
  const router = useRouter();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!getAccessToken()) {
      router.push('/login');
      return;
    }
    getConsultations()
      .then(setConsultations)
      .catch(() => setError('Failed to load consultations'))
      .finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedId, consultations]);

  const selected = consultations.find((c) => c.id === selectedId) ?? null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!symptoms.trim()) return;
    setError(null);
    setSubmitting(true);
    try {
      const created = await createConsultation(symptoms);
      setConsultations((prev) => [created, ...prev]);
      setSelectedId(created.id);
      setSymptoms('');
    } catch {
      setError('Failed to submit — try again');
    } finally {
      setSubmitting(false);
    }
  }

  function handleNewChat() {
    setSelectedId(null);
    setSymptoms('');
    setError(null);
  }

  function handleLogout() {
    logout();
    router.push('/login');
  }

  return (
    <div className="chat-layout">
      <aside className="chat-sidebar">
        <div className="chat-sidebar-header">
          <button className="new-chat-btn" onClick={handleNewChat}>
            + New consultation
          </button>
        </div>

        <div className="chat-sidebar-list">
          {loading ? (
            <p className="sidebar-empty">Loading…</p>
          ) : consultations.length === 0 ? (
            <p className="sidebar-empty">No consultations yet.</p>
          ) : (
            consultations.map((c) => (
              <button
                key={c.id}
                className={`sidebar-item ${c.id === selectedId ? 'active' : ''}`}
                onClick={() => setSelectedId(c.id)}
                title={c.symptoms}
              >
                {c.symptoms}
              </button>
            ))
          )}
        </div>

        <div className="chat-sidebar-footer">
          <button onClick={handleLogout}>Log out</button>
        </div>
      </aside>

      <main className="chat-main">
        {selected ? (
          <div className="chat-messages">
            <div className="chat-messages-inner">
              <div className="chat-message user">
                <div className="role">You</div>
                <div className="bubble">{selected.symptoms}</div>
              </div>
              <div className="chat-message assistant">
                <div className="role">MedAdvise AI</div>
                <div className="bubble">{selected.ai_response}</div>
                <time dateTime={selected.created_at}>
                  {new Date(selected.created_at).toLocaleString()}
                </time>
              </div>
              <div ref={messagesEndRef} />
            </div>
          </div>
        ) : (
          <div className="chat-empty">
            <div>
              <h1>MedAdvise AI</h1>
              <p className="subtitle">Describe your symptoms below to start a consultation.</p>
            </div>
          </div>
        )}

        <div className="chat-composer">
          <form onSubmit={handleSubmit}>
            <textarea
              value={symptoms}
              onChange={(e) => setSymptoms(e.target.value)}
              placeholder="Describe your symptoms…"
              rows={1}
              required
              onKeyDown={(e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                  e.preventDefault();
                  handleSubmit(e);
                }
              }}
            />
            <button type="submit" className="btn btn-primary" disabled={submitting}>
              {submitting ? 'Sending…' : 'Send'}
            </button>
          </form>
          {error && (
            <p className="chat-composer-hint" style={{ color: 'var(--color-danger)' }}>
              {error}
            </p>
          )}
          <p className="chat-composer-hint">
            Placeholder AI response for demo purposes — not real medical advice.
          </p>
        </div>
      </main>
    </div>
  );
}
