'use client';

import { useState } from 'react';
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from 'recharts';
import { TrainingCurve } from '@/types/metrics';

export default function TrainingCurves({ curves }: { curves: Record<string, TrainingCurve> }) {
  const models = Object.keys(curves);
  const [selected, setSelected] = useState(models[0]);
  const curve = curves[selected];
  const data = curve.loss.map((loss, i) => ({
    epoch: i + 1,
    loss,
    val_qwk: curve.val_qwk[i],
  }));

  return (
    <div>
      <div className="training-curve-tabs">
        {models.map((m) => (
          <button
            key={m}
            type="button"
            className={`btn btn-secondary ${m === selected ? 'active' : ''}`}
            onClick={() => setSelected(m)}
          >
            {m}
          </button>
        ))}
      </div>

      <div className="training-curve-charts">
        <div className="chart-container">
          <p className="chart-subtitle">Training loss</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="epoch" tick={{ fontSize: 11 }} />
              <YAxis tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="loss" stroke="#dc2626" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>

        <div className="chart-container">
          <p className="chart-subtitle">Validation QWK</p>
          <ResponsiveContainer width="100%" height={220}>
            <LineChart data={data} margin={{ top: 10, right: 10, left: 0, bottom: 0 }}>
              <XAxis dataKey="epoch" tick={{ fontSize: 11 }} />
              <YAxis domain={[0, 1]} tick={{ fontSize: 11 }} />
              <Tooltip />
              <Line type="monotone" dataKey="val_qwk" stroke="var(--color-primary)" dot={false} />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}
