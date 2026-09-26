import { HeadlineMetrics } from '@/types/metrics';

const PCT_FIELDS: { key: keyof HeadlineMetrics; label: string }[] = [
  { key: 'accuracy', label: '5-Class Accuracy' },
  { key: 'macro_f1', label: 'Macro F1' },
  { key: 'qwk', label: 'Quadratic Weighted Kappa' },
  { key: 'macro_auc', label: 'Macro AUC' },
  { key: 'acc_3class', label: '3-Class Accuracy' },
  { key: 'acc_binary', label: 'Binary (Healthy vs OA)' },
];

export default function HeadlineCards({ headline }: { headline: HeadlineMetrics }) {
  return (
    <div className="stat-grid">
      {PCT_FIELDS.map(({ key, label }) => (
        <div className="stat-tile" key={key}>
          <span className="stat-tile-label">{label}</span>
          <span className="stat-tile-value">
            {key === 'qwk' ? headline[key].toFixed(3) : `${(headline[key] * 100).toFixed(1)}%`}
          </span>
        </div>
      ))}
    </div>
  );
}
