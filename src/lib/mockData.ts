// MOCK MODE — for previewing the result UI before the backend has been run.
// Delete this whole file (and the one guarded block in
// src/app/consultations/page.tsx that references it) once Phases 1-2 are
// verified against the real API.

import { Consultation } from '@/types/consultation';

// Sample images live in frontend/public/samples/, served by the Next.js dev
// server itself — NOT by the Django backend. resolveImageUrl() prefixes any
// non-absolute image value with the backend's origin (correct for real API
// responses), so these mock entries must already be absolute URLs pointing
// at the frontend's own origin, or the thumbnails 404 against the backend.
const FRONTEND_ORIGIN =
  typeof window !== 'undefined' ? window.location.origin : 'http://localhost:3000';

export const MOCK_CONSULTATIONS: Consultation[] = [
  {
    id: 1,
    symptoms: '',
    image: `${FRONTEND_ORIGIN}/samples/grade0_0.png`,
    ai_response:
      'X-ray analysis: Kellgren-Lawrence Grade 0 (Normal). Confidence: 91%. Expected grade: 0.2. ' +
      'No significant osteoarthritis signs detected. Research prototype. Not a medical device. ' +
      'Not for clinical decisions. Please consult a clinician.',
    grade: 0,
    confidence: 0.91,
    expected_grade: 0.2,
    probabilities: [0.91, 0.07, 0.02, 0.0, 0.0],
    created_at: '2026-09-18T09:12:00Z',
  },
  {
    id: 2,
    symptoms: 'occasional stiffness in the morning',
    image: `${FRONTEND_ORIGIN}/samples/grade1_0.png`,
    ai_response:
      'X-ray analysis: Kellgren-Lawrence Grade 1 (Doubtful). Confidence: 47%. Expected grade: 1.4. ' +
      'No significant osteoarthritis signs detected. Research prototype. Not a medical device. ' +
      'Not for clinical decisions. Please consult a clinician.',
    grade: 1,
    confidence: 0.47,
    expected_grade: 1.4,
    probabilities: [0.18, 0.47, 0.31, 0.04, 0.0],
    created_at: '2026-09-18T10:05:00Z',
  },
  {
    id: 3,
    symptoms: 'mild aching after walking',
    image: `${FRONTEND_ORIGIN}/samples/grade2_0.png`,
    ai_response:
      'X-ray analysis: Kellgren-Lawrence Grade 2 (Mild). Confidence: 58%. Expected grade: 2.1. ' +
      'Signs of osteoarthritis detected. Research prototype. Not a medical device. ' +
      'Not for clinical decisions. Please consult a clinician.',
    grade: 2,
    confidence: 0.58,
    expected_grade: 2.1,
    probabilities: [0.03, 0.21, 0.58, 0.16, 0.02],
    created_at: '2026-09-18T11:20:00Z',
  },
  {
    id: 4,
    symptoms: '',
    image: `${FRONTEND_ORIGIN}/samples/grade4_0.png`,
    ai_response:
      'X-ray analysis: Kellgren-Lawrence Grade 4 (Severe). Confidence: 96%. Expected grade: 3.9. ' +
      'Signs of osteoarthritis detected. Research prototype. Not a medical device. ' +
      'Not for clinical decisions. Please consult a clinician.',
    grade: 4,
    confidence: 0.96,
    expected_grade: 3.9,
    probabilities: [0.0, 0.0, 0.01, 0.03, 0.96],
    created_at: '2026-09-18T12:40:00Z',
  },
  {
    id: 5,
    symptoms: '',
    image: `${FRONTEND_ORIGIN}/samples/grade3_1.png`,
    ai_response: 'Image analysis failed — please try again or contact support.',
    grade: null,
    confidence: null,
    expected_grade: null,
    probabilities: null,
    created_at: '2026-09-18T13:02:00Z',
  },
  {
    id: 6,
    symptoms: 'headache and mild fever',
    image: null,
    ai_response:
      'Thanks for sharing your symptoms: "headache and mild fever". ' +
      'This is a placeholder response — real AI integration is future work.',
    grade: null,
    confidence: null,
    expected_grade: null,
    probabilities: null,
    created_at: '2026-09-18T08:00:00Z',
  },
];
