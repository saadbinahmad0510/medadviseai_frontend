'use client';

import { useState, useEffect, useRef } from 'react';
import { chatWithGemini, GeminiMessage } from '@/lib/gemini';
import { sendChatMessage } from '@/lib/api';

interface FloatingChatbotProps {
  consultationContext?: string;
  consultationId?: number;
}

interface Message {
  role: 'user' | 'ai';
  text: string;
}

const SUGGESTIONS = [
  'What does KL Grade 2 mean?',
  'How is knee OA treated?',
  'Is this result reliable?',
  'When should I see a doctor?',
];

export default function FloatingChatbot({ consultationContext, consultationId }: FloatingChatbotProps) {
  const [mounted, setMounted] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'ai', text: "Hi! I'm your MedAdvise AI assistant. I can answer questions about knee osteoarthritis, the Kellgren-Lawrence scale, and your analysis results." },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const historyRef = useRef<GeminiMessage[]>([]);

  useEffect(() => { setMounted(true); }, []);

  useEffect(() => {
    if (isOpen) messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isOpen]);

  if (!mounted) return null;

  async function handleSend(text?: string) {
    const msg = (text ?? input).trim();
    if (!msg || loading) return;
    setInput('');
    setMessages((prev) => [...prev, { role: 'user', text: msg }]);
    setLoading(true);

    try {
      let reply: string;
      const hasGeminiKey = !!process.env.NEXT_PUBLIC_GEMINI_API_KEY;

      if (hasGeminiKey) {
        reply = await chatWithGemini(msg, historyRef.current, consultationContext);
        historyRef.current = [
          ...historyRef.current,
          { role: 'user', parts: [{ text: msg }] },
          { role: 'model', parts: [{ text: reply }] },
        ];
      } else if (consultationId) {
        // sendChatMessage(message, consultationId?)
        const data = await sendChatMessage(msg, consultationId);
        reply = data.reply ?? 'No response.';
      } else {
        reply = "I need a Gemini API key or an active consultation to answer questions. Please set NEXT_PUBLIC_GEMINI_API_KEY in your .env.local file.";
      }
      setMessages((prev) => [...prev, { role: 'ai', text: reply }]);
    } catch (err: unknown) {
      const error = err as Error;
      const errMsg = error?.message === 'RATE_LIMIT'
        ? 'Rate limit reached. Please wait a moment before sending another message.'
        : 'Failed to get a response. Please try again.';
      setMessages((prev) => [...prev, { role: 'ai', text: errMsg }]);
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      {isOpen && (
        <div className="floating-chat-panel">
          <div className="floating-chat-header">
            <div className="floating-chat-header-title">
              🤖 MedAdvise AI Assistant
            </div>
            <button className="floating-chat-header-close" onClick={() => setIsOpen(false)}>✕</button>
          </div>

          <div className="floating-chat-messages">
            {messages.map((m, i) => (
              <div key={i} className={`floating-msg ${m.role === 'user' ? 'floating-msg-user' : 'floating-msg-ai'}`}>
                {m.text}
              </div>
            ))}
            {loading && <div className="floating-msg-typing">···</div>}
            <div ref={messagesEndRef} />
          </div>

          {messages.length === 1 && (
            <div style={{ padding: '0 0.75rem 0.5rem', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
              {SUGGESTIONS.map((s) => (
                <button
                  key={s}
                  onClick={() => handleSend(s)}
                  style={{ padding: '0.3rem 0.6rem', fontSize: '0.75rem', background: 'var(--color-bg)', border: '1px solid var(--color-border)', borderRadius: '999px', cursor: 'pointer', color: 'var(--color-text-muted)' }}
                >
                  {s}
                </button>
              ))}
            </div>
          )}

          <div className="floating-chat-input-row">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => { if (e.key === 'Enter' && !e.shiftKey) { e.preventDefault(); handleSend(); } }}
              placeholder="Ask about knee OA..."
              disabled={loading}
            />
            <button
              className="floating-chat-send"
              onClick={() => handleSend()}
              disabled={loading || !input.trim()}
              aria-label="Send"
            >
              ➤
            </button>
          </div>
          <div className="floating-chat-powered">
            Powered by Google Gemini 1.5 Flash (free tier)
          </div>
        </div>
      )}

      <button className="floating-chat-btn" onClick={() => setIsOpen((o) => !o)} aria-label="Open AI chat assistant">
        {isOpen ? '✕' : '💬'}
      </button>
    </>
  );
}
