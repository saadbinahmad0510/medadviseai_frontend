import { GRADE_COLORS, GRADE_LABELS, KLGrade } from '@/types/consultation';

export default function GradeBadge({ grade }: { grade: KLGrade | null }) {
  if (grade === null) {
    return <span className="grade-badge grade-badge-unknown">Analysis failed</span>;
  }

  return (
    <span className="grade-badge" style={{ background: GRADE_COLORS[grade] }}>
      Grade {grade} — {GRADE_LABELS[grade]}
    </span>
  );
}
