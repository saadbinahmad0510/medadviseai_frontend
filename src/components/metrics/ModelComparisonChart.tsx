'use client';

import {
  Bar,
  BarChart,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';
import { PerModelMetrics } from '@/types/metrics';

export default function ModelComparisonChart({ perModel }: { perModel: PerModelMetrics[] }) {
  const data = perModel.map((m) => ({ model: m.model, qwk: m.qwk }));

  return (
    <div>
      <div className="chart-container">
        <ResponsiveContainer width="100%" height={280}>
          <BarChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
            <XAxis dataKey="model" tick={{ fontSize: 12 }} />
            <YAxis domain={[0, 1]} tick={{ fontSize: 12 }} />
            <Tooltip formatter={(value: number) => value.toFixed(4)} />
            <Bar dataKey="qwk" radius={[4, 4, 0, 0]}>
              {data.map((entry) => (
                <Cell
                  key={entry.model}
                  fill={entry.model === 'MobileNetV2' ? 'var(--color-primary)' : '#94a3b8'}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </div>
      <p className="chart-caption">
        Quadratic Weighted Kappa (QWK) — the primary metric here because this is an ordinal
        5-class scale: mistaking Grade 2 for Grade 3 is a smaller error than mistaking Grade 2
        for Grade 0, and QWK is the only metric above that accounts for that. MobileNetV2
        (highlighted) is the model actually deployed in this app.
      </p>
    </div>
  );
}
