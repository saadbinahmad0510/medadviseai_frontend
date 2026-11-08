// Free Google Gemini 1.5 Flash API client
// Get your free key at: https://aistudio.google.com/app/apikey
// Add to frontend/.env.local: NEXT_PUBLIC_GEMINI_API_KEY=AIza...
// Free tier: 15 requests/min, 1 million tokens/day — no credit card needed

const GEMINI_URL =
  'https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent';

const SYSTEM_PROMPT = `You are MedAdvise AI's medical assistant, specialized in knee osteoarthritis (KOA) and the Kellgren-Lawrence (KL) grading system.

The KL scale:
- Grade 0 (Normal): No radiographic features
- Grade 1 (Doubtful): Possible osteophytic lipping
- Grade 2 (Mild): Definite osteophytes, possible joint space narrowing
- Grade 3 (Moderate): Multiple osteophytes, definite narrowing, sclerosis
- Grade 4 (Severe): Large osteophytes, marked narrowing, severe sclerosis

This AI system uses MobileNetV2 to grade knee X-rays with 86.7% binary accuracy and QWK of 0.820.

IMPORTANT: Always remind users this is a research prototype only — not for clinical decisions. Recommend consulting an orthopedic specialist.
Keep responses concise, compassionate, and accurate. Use plain language.`;

export interface GeminiMessage {
  role: 'user' | 'model';
  parts: Array<{ text: string }>;
}

export async function chatWithGemini(
  userMessage: string,
  conversationHistory: GeminiMessage[] = [],
  consultationContext?: string
): Promise<string> {
  const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error('NO_API_KEY');
  }

  const contextNote = consultationContext
    ? `\n\nCurrent patient consultation context:\n${consultationContext}`
    : '';

  const contents: GeminiMessage[] = [
    { role: 'user', parts: [{ text: SYSTEM_PROMPT + contextNote }] },
    { role: 'model', parts: [{ text: "Understood. I'm ready to help with questions about knee osteoarthritis and this patient's analysis." }] },
    ...conversationHistory,
    { role: 'user', parts: [{ text: userMessage }] },
  ];

  const response = await fetch(`${GEMINI_URL}?key=${apiKey}`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents,
      generationConfig: {
        maxOutputTokens: 500,
        temperature: 0.3,
      },
    }),
  });

  if (!response.ok) {
    const err = await response.json().catch(() => ({}));
    if (response.status === 429) throw new Error('RATE_LIMIT');
    throw new Error((err as { error?: { message?: string } })?.error?.message ?? `HTTP ${response.status}`);
  }

  const data = await response.json();
  return (data as { candidates?: Array<{ content?: { parts?: Array<{ text?: string }> } }> }).candidates?.[0]?.content?.parts?.[0]?.text ?? 'Sorry, I could not generate a response.';
}
