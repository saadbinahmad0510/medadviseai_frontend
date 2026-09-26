import { GRADE_LABELS, KLGrade } from '@/types/consultation';

export default function ProbabilityBars({ probabilities }: { probabilities: number[] }) {
  return (
    <div className="probability-bars">
      {probabilities.map((p, grade) => (
        <div className="probability-row" key={grade}>
          <span className="probability-label">{GRADE_LABELS[grade as KLGrade]}</span>
          <div className="probability-track">
            <div className="probability-fill" style={{ width: `${p * 100}%` }} />
          </div>
          <span className="probability-value">{(p * 100).toFixed(0)}%</span>
        </div>
      ))}
    </div>
  );
}
