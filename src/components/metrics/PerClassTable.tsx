import { PerClassMetrics } from '@/types/metrics';

export default function PerClassTable({ perClass }: { perClass: Record<string, PerClassMetrics> }) {
  return (
    <table className="metrics-table">
      <thead>
        <tr>
          <th>Grade</th>
          <th>Precision</th>
          <th>Recall</th>
          <th>F1</th>
          <th>Support</th>
        </tr>
      </thead>
      <tbody>
        {Object.entries(perClass).map(([grade, m]) => (
          <tr key={grade}>
            <td>{grade}</td>
            <td>{m.precision.toFixed(2)}</td>
            <td>{m.recall.toFixed(2)}</td>
            <td>{m['f1-score'].toFixed(2)}</td>
            <td>{m.support}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
