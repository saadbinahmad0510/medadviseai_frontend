import { resolveImageUrl } from '@/lib/api';
import {
  Consultation,
  hasOsteoarthritis,
  isLowReliabilityGrade,
  KL_DEFINITIONS,
} from '@/types/consultation';
import GradeBadge from './GradeBadge';
import ProbabilityBars from './ProbabilityBars';

interface ConsultationResultProps {
  consultation: Consultation;
  onInfoClick?: () => void;
}

export default function ConsultationResult({ consultation, onInfoClick }: ConsultationResultProps) {
  const { image, grade, confidence, expected_grade, probabilities, ai_response } = consultation;
  const imageUrl = resolveImageUrl(image);
  const failed = image !== null && grade === null;

  return (
    <div className="result-card">
      {onInfoClick && grade !== null && (
        <button
          className="info-icon-btn"
          onClick={onInfoClick}
          aria-label="View detailed analysis"
          title="View detailed analysis, probability charts, and clinical information"
        >
          ⓘ
        </button>
      )}

      {imageUrl && (
        // eslint-disable-next-line @next/next/no-img-element
        <img src={imageUrl} alt="Uploaded X-ray" className="result-xray" />
      )}

      {failed ? (
        <p className="result-error">{ai_response}</p>
      ) : (
        grade !== null && (
          <>
            <div className={`oa-badge ${hasOsteoarthritis(grade) ? 'oa-badge-positive' : 'oa-badge-negative'}`}>
              {hasOsteoarthritis(grade) ? 'Osteoarthritis Detected' : 'No Osteoarthritis Detected'}
            </div>

            <div className="result-grade-row">
              <GradeBadge grade={grade} />
            </div>
            <p className="result-kl-definition">{KL_DEFINITIONS[grade]}</p>

            <div className="result-stats">
              <div>
                <span className="result-stat-label">Confidence</span>
                <span className="result-stat-value">{((confidence ?? 0) * 100).toFixed(0)}%</span>
              </div>
              <div>
                <span className="result-stat-label">Expected grade</span>
                <span className="result-stat-value">{(expected_grade ?? 0).toFixed(1)}</span>
              </div>
            </div>

            {probabilities && <ProbabilityBars probabilities={probabilities} />}

            {isLowReliabilityGrade(grade) && (
              <div className="reliability-warning">
                Lower reliability: Grades 1-2 are the hardest for this model to distinguish
                (Grade 1 F1 score is only 0.38). Treat this confidence value cautiously.
              </div>
            )}
          </>
        )
      )}

      <p className="result-disclaimer">
        Research prototype. Not a medical device. Not for clinical decisions.{' '}
        {grade !== null && onInfoClick && (
          <button onClick={onInfoClick} style={{ background: 'none', border: 'none', color: 'var(--color-primary)', cursor: 'pointer', fontSize: 'inherit', textDecoration: 'underline', padding: 0 }}>
            Click ⓘ for detailed analysis
          </button>
        )}
      </p>
    </div>
  );
}
