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
import ConsultationResult from '@/components/ConsultationResult';
import ImageUploader from '@/components/ImageUploader';
import ChatPanel from '@/components/ChatPanel';
import InfoModal from '@/components/InfoModal';
import FloatingChatbot from '@/components/FloatingChatbot';
import { MOCK_CONSULTATIONS } from '@/lib/mockData';
import { GRADE_LABELS, KLGrade } from '@/types/consultation';

function formatConsultationContext(c: Consultation): string {
  const parts: string[] = [];
  if (c.symptoms) parts.push(`Patient symptoms: ${c.symptoms}`);
  if (c.grade !== null) {
    parts.push(`Predicted KL Grade: ${c.grade} (${GRADE_LABELS[c.grade as KLGrade]})`);
    parts.push(`Confidence: ${((c.confidence ?? 0) * 100).toFixed(0)}%`);
    parts.push(`Expected grade: ${(c.expected_grade ?? 0).toFixed(2)}`);
    if (c.probabilities) {
      parts.push(
        `Probabilities: G0=${(c.probabilities[0] * 100).toFixed(1)}%, G1=${(c.probabilities[1] * 100).toFixed(1)}%, G2=${(c.probabilities[2] * 100).toFixed(1)}%, G3=${(c.probabilities[3] * 100).toFixed(1)}%, G4=${(c.probabilities[4] * 100).toFixed(1)}%`
      );
    }
  }
  return parts.join('\n');
}

export default function ConsultationsPage() {
  const router = useRouter();
  const [consultations, setConsultations] = useState<Consultation[]>([]);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);
  const [loading, setLoading] = useState(true);
  const [infoConsultation, setInfoConsultation] = useState<Consultation | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!getAccessToken()) { router.push('/login'); return; }
    if (process.env.NEXT_PUBLIC_USE_MOCK_DATA === '1') {
      setConsultations(MOCK_CONSULTATIONS);
      setLoading(false);
      return;
    }
    getConsultations().then(setConsultations).catch(() => setError('Failed to load consultations')).finally(() => setLoading(false));
  }, [router]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [selectedId, consultations]);

  const selected = consultations.find((c) => c.id === selectedId) ?? null;

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!symptoms.trim() && !image) return;
    setError(null);
    setSubmitting(true);
    try {
      const created = await createConsultation(symptoms, image);
      setConsultations((prev) => [created, ...prev]);
      setSelectedId(created.id);
      setSymptoms('');
      setImage(null);
    } catch {
      setError('Failed to submit — try again');
    } finally {
      setSubmitting(false);
    }
  }

  function handleNewChat() { setSelectedId(null); setSymptoms(''); setImage(null); setError(null); }
  function handleLogout() { logout(); router.push('/login'); }

  return (
    <>
      <div className="chat-layout">
        <aside className="chat-sidebar">
          <div className="chat-sidebar-header">
            <div style={{ color: '#ececf1', fontWeight: 700, fontSize: '0.85rem', padding: '0.25rem 0.5rem 0.75rem', borderBottom: '1px solid #4d4d4f', marginBottom: '0.5rem' }}>
              🩺 MedAdvise AI
            </div>
            <button className="new-chat-btn" onClick={handleNewChat}>+ New consultation</button>
          </div>
          <div className="chat-sidebar-list">
            {loading ? (
              <p className="sidebar-empty">Loading…</p>
            ) : consultations.length === 0 ? (
              <p className="sidebar-empty">No consultations yet.</p>
            ) : (
              consultations.map((c) => {
                const label = c.symptoms || (c.image ? 'X-ray consultation' : 'Consultation');
                const gradeLabel = c.grade !== null ? ` · G${c.grade}` : '';
                return (
                  <button
                    key={c.id}
                    className={`sidebar-item ${c.id === selectedId ? 'active' : ''}`}
                    onClick={() => setSelectedId(c.id)}
                    title={label}
                  >
                    <span>{c.image ? '🩻' : '💬'}</span>
                    {' '}{label}{gradeLabel}
                  </button>
                );
              })
            )}
          </div>
          <div className="chat-sidebar-footer">
            <button onClick={handleLogout}>🚪 Log out</button>
          </div>
        </aside>

        <main className="chat-main">
          {selected ? (
            <div className="chat-messages">
              <div className="chat-messages-inner">
                {selected.symptoms && (
                  <div className="chat-message user">
                    <div className="role">You</div>
                    <div className="bubble">{selected.symptoms}</div>
                  </div>
                )}
                <div className="chat-message assistant">
                  <div className="role">MedAdvise AI</div>
                  {selected.image ? (
                    <ConsultationResult
                      consultation={selected}
                      onInfoClick={() => setInfoConsultation(selected)}
                    />
                  ) : (
                    <div className="bubble">{selected.ai_response}</div>
                  )}
                  <time dateTime={selected.created_at}>
                    {new Date(selected.created_at).toLocaleString()}
                  </time>
                </div>
                <ChatPanel key={selected.id} consultationId={selected.id} />
                <div ref={messagesEndRef} />
              </div>
            </div>
          ) : (
            <div className="chat-empty">
              <div>
                <div style={{ fontSize: '3rem', marginBottom: '1rem' }}>🩺</div>
                <h1>MedAdvise AI</h1>
                <p className="subtitle">Upload a knee X-ray or describe your symptoms to start a consultation.</p>
              </div>
            </div>
          )}

          <div className="chat-composer">
            <ImageUploader image={image} onChange={setImage} />
            <form onSubmit={handleSubmit}>
              <textarea
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describe your symptoms (optional if you attach an X-ray)…"
                rows={1}
                onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSubmit(e); } }}
              />
              <button type="submit" className="btn btn-primary" disabled={submitting || (!symptoms.trim() && !image)}>
                {submitting ? 'Sending…' : 'Send'}
              </button>
            </form>
            {error && <p className="chat-composer-hint" style={{ color: 'var(--color-danger)' }}>{error}</p>}
            <p className="chat-composer-hint">Research prototype. Not a medical device. Not for clinical decisions.</p>
          </div>
        </main>
      </div>

      <InfoModal
        consultation={infoConsultation}
        isOpen={infoConsultation !== null}
        onClose={() => setInfoConsultation(null)}
      />

      <FloatingChatbot
        consultationContext={selected ? formatConsultationContext(selected) : undefined}
        consultationId={selected?.id}
      />
    </>
  );
}
