import { DatasetInfo } from '@/types/metrics';

export default function DatasetSummary({
  dataset,
  grades,
}: {
  dataset: DatasetInfo;
  grades: string[];
}) {
  return (
    <div>
      <div className="stat-grid">
        <div className="stat-tile">
          <span className="stat-tile-label">Total images</span>
          <span className="stat-tile-value">{dataset.total.toLocaleString()}</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile-label">Patients</span>
          <span className="stat-tile-value">{dataset.patients.toLocaleString()}</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile-label">Knees</span>
          <span className="stat-tile-value">{dataset.knees.toLocaleString()}</span>
        </div>
        <div className="stat-tile">
          <span className="stat-tile-label">Train / Val / Test</span>
          <span className="stat-tile-value">
            {dataset.train.toLocaleString()} / {dataset.val.toLocaleString()} /{' '}
            {dataset.test.toLocaleString()}
          </span>
        </div>
      </div>

      <table className="metrics-table">
        <thead>
          <tr>
            {grades.map((g) => (
              <th key={g}>{g}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          <tr>
            {dataset.test_class_counts.map((count, i) => (
              <td key={grades[i]}>{count}</td>
            ))}
          </tr>
        </tbody>
      </table>
      <p className="chart-caption">Test-set image counts per grade.</p>

      <p>
        <strong>Split:</strong> {dataset.split}
      </p>
      <p>
        <strong>Image format:</strong> {dataset.image_size}
      </p>
      <p>
        <strong>Source:</strong> {dataset.source}
      </p>
    </div>
  );
}
