'use client';

import { Legend, Line, LineChart, ResponsiveContainer, XAxis, YAxis } from 'recharts';
import { RocCurve } from '@/types/metrics';

const COLORS = ['#15803d', '#ca8a04', '#ea580c', '#dc2626', '#7f1d1d'];
const DIAGONAL = [
  { x: 0, y: 0 },
  { x: 1, y: 1 },
];

export default function RocCurves({ roc }: { roc: Record<string, RocCurve> }) {
  const entries = Object.entries(roc);

  return (
    <div className="chart-container">
      <ResponsiveContainer width="100%" height={340}>
        <LineChart margin={{ top: 10, right: 20, left: 0, bottom: 10 }}>
          <XAxis
            dataKey="x"
            type="number"
            domain={[0, 1]}
            tick={{ fontSize: 12 }}
            label={{ value: 'False Positive Rate', position: 'insideBottom', offset: -5, fontSize: 12 }}
          />
          <YAxis
            dataKey="y"
            type="number"
            domain={[0, 1]}
            tick={{ fontSize: 12 }}
            label={{ value: 'True Positive Rate', angle: -90, position: 'insideLeft', fontSize: 12 }}
          />
          <Legend />
          <Line
            data={DIAGONAL}
            dataKey="y"
            name="Random baseline"
            stroke="#cbd5e1"
            strokeDasharray="4 4"
            dot={false}
            isAnimationActive={false}
          />
          {entries.map(([grade, curve], i) => (
            <Line
              key={grade}
              data={curve.fpr.map((fpr, idx) => ({ x: fpr, y: curve.tpr[idx] }))}
              dataKey="y"
              name={`${grade} (AUC ${curve.auc.toFixed(3)})`}
              stroke={COLORS[i % COLORS.length]}
              dot={false}
              isAnimationActive={false}
            />
          ))}
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
