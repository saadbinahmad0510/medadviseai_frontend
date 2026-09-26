export type KLGrade = 0 | 1 | 2 | 3 | 4;

export interface Consultation {
  id: number;
  symptoms: string;
  image: string | null;
  ai_response: string;
  grade: KLGrade | null;
  confidence: number | null;
  expected_grade: number | null;
  probabilities: number[] | null;
  created_at: string;
}

export const GRADE_LABELS: Record<KLGrade, string> = {
  0: 'Normal',
  1: 'Doubtful',
  2: 'Mild',
  3: 'Moderate',
  4: 'Severe',
};

export const KL_DEFINITIONS: Record<KLGrade, string> = {
  0: 'No radiographic features of osteoarthritis',
  1: 'Doubtful joint space narrowing, possible osteophytic lipping',
  2: 'Definite osteophytes, possible joint space narrowing',
  3: 'Moderate multiple osteophytes, definite narrowing, some sclerosis',
  4: 'Large osteophytes, marked narrowing, severe sclerosis, bone deformity',
};

export const GRADE_COLORS: Record<KLGrade, string> = {
  0: 'var(--grade-0)',
  1: 'var(--grade-1)',
  2: 'var(--grade-2)',
  3: 'var(--grade-3)',
  4: 'var(--grade-4)',
};

export function hasOsteoarthritis(grade: KLGrade | null): boolean {
  return grade !== null && grade >= 2;
}

export function isLowReliabilityGrade(grade: KLGrade | null): boolean {
  return grade === 1 || grade === 2;
}
