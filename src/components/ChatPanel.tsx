'use client';

import { useState } from 'react';
import { sendChatMessage } from '@/lib/api';

const SUGGESTIONS = [
  'What does this result mean?',
  'How accurate is this model?',
  'How does the model work?',
  'Where does the training data come from?',
];

interface ChatMessage {
  role: 'user' | 'assistant';
  text: string;
}

export default function ChatPanel({ consultationId }: { consultationId: number }) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [sending, setSending] = useState(false);

  async function ask(message: string) {
    if (!message.trim() || sending) return;
    setMessages((prev) => [...prev, { role: 'user', text: message }]);
    setInput('');
    setSending(true);
    try {
      const { reply } = await sendChatMessage(message, consultationId);
      setMessages((prev) => [...prev, { role: 'assistant', text: reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: 'assistant', text: 'Sorry, something went wrong sending that.' },
      ]);
    } finally {
      setSending(false);
    }
  }

  return (
    <div className="chat-panel">
      {messages.length > 0 && (
        <div className="chat-panel-messages">
          {messages.map((m, i) => (
            <div key={i} className={`chat-panel-message chat-panel-message-${m.role}`}>
              {m.text}
            </div>
          ))}
        </div>
      )}

      <div className="chat-panel-chips">
        {SUGGESTIONS.map((s) => (
          <button
            type="button"
            key={s}
            className="btn btn-secondary chat-chip"
            onClick={() => ask(s)}
            disabled={sending}
          >
            {s}
          </button>
        ))}
      </div>

      <form
        className="chat-panel-input-row"
        onSubmit={(e) => {
          e.preventDefault();
          ask(input);
        }}
      >
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Ask about this result…"
        />
        <button type="submit" className="btn btn-primary" disabled={sending || !input.trim()}>
          {sending ? 'Asking…' : 'Ask'}
        </button>
      </form>
    </div>
  );
}
