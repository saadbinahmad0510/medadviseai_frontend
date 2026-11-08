'use client';

import { useEffect, useCallback, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer, Cell } from 'recharts';
import {
  Consultation,
  KL_DEFINITIONS,
  GRADE_LABELS,
  hasOsteoarthritis,
  isLowReliabilityGrade,
  KLGrade,
} from '@/types/consultation';

interface InfoModalProps {
  consultation: Consultation | null;
  isOpen: boolean;
  onClose: () => void;
}

// Hex colors for recharts (SVG fill doesn't resolve CSS variables)
const GRADE_HEX: Record<KLGrade, string> = {
  0: '#15803d', 1: '#ca8a04', 2: '#ea580c', 3: '#dc2626', 4: '#7f1d1d',
};

const CLINICAL_ADVICE: Record<KLGrade, string[]> = {
  0: [
    'No osteoarthritis detected at this time.',
    'Maintain healthy weight and regular low-impact exercise.',
    'Annual monitoring if you have risk factors.',
    'Consult your doctor if symptoms develop.',
  ],
  1: [
    'Doubtful OA — findings are borderline.',
    'Consider follow-up X-ray in 12 months.',
    'Physical therapy to strengthen surrounding muscles.',
    'Monitor for symptom progression.',
    'Note: Grade 1 has lower model reliability (F1 = 0.39).',
  ],
  2: [
    'Mild OA detected.',
    'Consult an orthopedic specialist for evaluation.',
    'Weight management can significantly slow progression.',
    'Physical therapy and strengthening exercises.',
    'NSAIDs may help manage inflammation (doctor guidance).',
    'Note: Grade 2 has lower model reliability (F1 = 0.47).',
  ],
  3: [
    'Moderate OA — specialist evaluation recommended.',
    'Orthopedic assessment is important.',
    'Consider knee bracing for support.',
    'Corticosteroid injection may help pain management.',
    'Hyaluronic acid injections may be considered.',
    'Activity modification to reduce joint stress.',
  ],
  4: [
    'Severe OA — surgical consultation warranted.',
    'Total knee replacement (TKR) may be indicated.',
    'Consult an orthopedic surgeon promptly.',
    'Pain management is a priority.',
    'Assistive devices (cane, walker) may help mobility.',
  ],
};

function ConfidenceGauge({ value }: { value: number }) {
  const pct = Math.min(100, Math.max(0, value * 100));
  const radius = 70;
  const stroke = 12;
  const normalizedRadius = radius - stroke / 2;
  const circumference = normalizedRadius * Math.PI; // half circle
  const offset = circumference - (pct / 100) * circumference;
  const color = pct >= 80 ? '#15803d' : pct >= 50 ? '#ca8a04' : '#dc2626';

  return (
    <div className="confidence-gauge-wrap">
      <svg width={radius * 2 + 20} height={radius + 20} style={{ overflow: 'visible' }}>
        {/* Background arc */}
        <path
          d={`M ${stroke / 2 + 10} ${radius + 10} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 + 10 - stroke / 2} ${radius + 10}`}
          fill="none"
          stroke="#e2e8f0"
          strokeWidth={stroke}
          strokeLinecap="round"
        />
        {/* Value arc */}
        <path
          d={`M ${stroke / 2 + 10} ${radius + 10} A ${normalizedRadius} ${normalizedRadius} 0 0 1 ${radius * 2 + 10 - stroke / 2} ${radius + 10}`}
          fill="none"
          stroke={color}
          strokeWidth={stroke}
          strokeLinecap="round"
          strokeDasharray={`${circumference}`}
          strokeDashoffset={offset}
          style={{ transition: 'stroke-dashoffset 0.6s ease' }}
        />
      </svg>
      <div className="confidence-gauge-label" style={{ color }}>
        {pct.toFixed(0)}%
      </div>
      <div className="confidence-gauge-sub">
        {pct >= 80 ? 'High confidence' : pct >= 50 ? 'Moderate confidence' : 'Low confidence'}
      </div>
    </div>
  );
}

export default function InfoModal({ consultation, isOpen, onClose }: InfoModalProps) {
  const [activeTab, setActiveTab] = useState(0);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    },
    [onClose]
  );

  useEffect(() => {
    if (isOpen) {
      document.addEventListener('keydown', handleKeyDown);
      document.body.style.overflow = 'hidden';
      setActiveTab(0);
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
    };
  }, [isOpen, handleKeyDown]);

  if (!isOpen || !consultation || consultation.grade === null) return null;

  const { grade, confidence, expected_grade, probabilities } = consultation;
  const gradeColor = GRADE_HEX[grade];
  const isOA = hasOsteoarthritis(grade);
  const lowReliability = isLowReliabilityGrade(grade);

  const chartData = probabilities
    ? [0, 1, 2, 3, 4].map((g) => ({
        name: `G${g}`,
        value: parseFloat(((probabilities[g] ?? 0) * 100).toFixed(1)),
        grade: g,
      }))
    : [];

  const tabs = ['Overview', 'Probability', 'Gauge', 'Clinical', 'Model Info'];

  const gradeName = grade === 0 ? 'Normal' : grade === 1 ? 'Doubtful' : grade === 2 ? 'Mild' : grade === 3 ? 'Moderate' : 'Severe';

  return (
    <div className="info-modal-backdrop" onClick={onClose}>
      <div className="info-modal" onClick={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label="Detailed Analysis">
        {/* Header */}
        <div className="info-modal-header">
          <div className="info-modal-title">
            <span style={{ fontSize: '1.25rem' }}>🔬</span>
            Detailed Analysis — {GRADE_LABELS[grade]}
          </div>
          <button className="info-modal-close" onClick={onClose} aria-label="Close">✕</button>
        </div>

        {/* Tabs */}
        <div className="info-modal-tabs">
          {tabs.map((tab, i) => (
            <button
              key={tab}
              className={`info-tab-btn ${activeTab === i ? 'active' : ''}`}
              onClick={() => setActiveTab(i)}
            >
              {tab}
            </button>
          ))}
        </div>

        {/* Body */}
        <div className="info-modal-body">
          {/* Tab 0: Overview */}
          {activeTab === 0 && (
            <div>
              <div style={{ display: 'flex', gap: '0.75rem', marginBottom: '1.25rem', flexWrap: 'wrap' }}>
                <span
                  style={{
                    padding: '0.4rem 1rem',
                    borderRadius: '999px',
                    fontWeight: 700,
                    fontSize: '0.9rem',
                    background: isOA ? '#fef2f2' : '#f0fdf4',
                    color: isOA ? '#b91c1c' : '#15803d',
                  }}
                >
                  {isOA ? '⚠️ Osteoarthritis Detected' : '✅ No Osteoarthritis Detected'}
                </span>
                {lowReliability && (
                  <span style={{ padding: '0.4rem 1rem', borderRadius: '999px', fontWeight: 600, fontSize: '0.85rem', background: '#fff7ed', color: '#9a3412' }}>
                    ⚡ Lower Reliability
                  </span>
                )}
              </div>
              <div className="info-overview-grid">
                <div className="info-stat-box">
                  <div className="info-stat-box-label">KL Grade</div>
                  <div className="info-stat-box-value" style={{ color: gradeColor }}>Grade {grade}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--color-text-muted)', marginTop: '0.25rem' }}>
                    {gradeName}
                  </div>
                </div>
                <div className="info-stat-box">
                  <div className="info-stat-box-label">Confidence</div>
                  <div className="info-stat-box-value" style={{ color: (confidence ?? 0) >= 0.8 ? '#15803d' : (confidence ?? 0) >= 0.5 ? '#ca8a04' : '#dc2626' }}>
                    {((confidence ?? 0) * 100).toFixed(0)}%
                  </div>
                </div>
                <div className="info-stat-box">
                  <div className="info-stat-box-label">Expected Grade</div>
                  <div className="info-stat-box-value">{(expected_grade ?? 0).toFixed(2)}</div>
                </div>
                <div className="info-stat-box">
                  <div className="info-stat-box-label">OA Status</div>
                  <div className="info-stat-box-value" style={{ fontSize: '1rem', color: isOA ? '#b91c1c' : '#15803d' }}>
                    {isOA ? 'Detected' : 'Not Detected'}
                  </div>
                </div>
              </div>
              <div style={{ background: 'var(--color-bg)', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.4rem', fontSize: '0.9rem' }}>Radiographic Definition</div>
                <div style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', lineHeight: 1.6 }}>{KL_DEFINITIONS[grade]}</div>
              </div>
              {lowReliability && (
                <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#9a3412' }}>
                  ⚠️ <strong>Lower reliability warning:</strong> Grades 1 and 2 are the most challenging for the model to distinguish.
                  Grade 1 F1 score = 0.39, Grade 2 F1 = 0.47. Treat this result with caution and confirm with a specialist.
                </div>
              )}
            </div>
          )}

          {/* Tab 1: Probability Distribution */}
          {activeTab === 1 && (
            <div>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.25rem' }}>
                Probability distribution across all 5 KL grades from the MobileNetV2 model.
              </p>
              <div className="chart-wrapper">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={chartData} layout="vertical" margin={{ left: 20, right: 30 }}>
                    <XAxis type="number" domain={[0, 100]} tickFormatter={(v: number) => `${v}%`} fontSize={11} />
                    <YAxis type="category" dataKey="name" width={30} fontSize={12} />
                    <Tooltip formatter={(v: number) => [`${v.toFixed(1)}%`, 'Probability']} />
                    <Bar dataKey="value" radius={[0, 4, 4, 0]}>
                      {chartData.map((entry) => (
                        <Cell key={`cell-${entry.grade}`} fill={GRADE_HEX[entry.grade as KLGrade]} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
              <div style={{ marginTop: '1rem', display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                {chartData.map((d) => (
                  <div key={d.grade} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontSize: '0.8rem' }}>
                    <span style={{ width: 12, height: 12, borderRadius: 3, background: GRADE_HEX[d.grade as KLGrade], display: 'inline-block' }} />
                    <span>G{d.grade}: {d.value}%</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 2: Confidence Gauge */}
          {activeTab === 2 && (
            <div style={{ textAlign: 'center' }}>
              <p style={{ color: 'var(--color-text-muted)', fontSize: '0.9rem', marginBottom: '1.5rem' }}>
                Model confidence for the predicted grade.
              </p>
              <ConfidenceGauge value={confidence ?? 0} />
              <div style={{ maxWidth: 400, margin: '1.5rem auto 0', textAlign: 'left', background: 'var(--color-bg)', borderRadius: '8px', padding: '1rem 1.25rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9rem' }}>Confidence Interpretation</div>
                {[
                  { range: '≥ 80%', label: 'High', color: '#15803d', note: 'Model is highly confident in this prediction' },
                  { range: '50–79%', label: 'Moderate', color: '#ca8a04', note: 'Some uncertainty; specialist review recommended' },
                  { range: '< 50%', label: 'Low', color: '#dc2626', note: 'High uncertainty; this result should not be relied upon' },
                ].map((item) => (
                  <div key={item.range} style={{ display: 'flex', gap: '0.75rem', marginBottom: '0.6rem', fontSize: '0.85rem' }}>
                    <span style={{ color: item.color, fontWeight: 700, minWidth: '65px' }}>{item.range}</span>
                    <span style={{ fontWeight: 600, minWidth: '75px', color: item.color }}>{item.label}</span>
                    <span style={{ color: 'var(--color-text-muted)' }}>{item.note}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tab 3: Clinical Details */}
          {activeTab === 3 && (
            <div>
              <div className="clinical-advice">
                <h4>Recommended Actions for Grade {grade} ({gradeName})</h4>
                <ul>
                  {CLINICAL_ADVICE[grade].map((advice, i) => (
                    <li key={i}>{advice}</li>
                  ))}
                </ul>
              </div>
              <div style={{ background: 'var(--color-bg)', borderRadius: '8px', padding: '1rem 1.25rem', marginBottom: '1rem' }}>
                <div style={{ fontWeight: 600, marginBottom: '0.75rem', fontSize: '0.9rem' }}>Radiographic Features</div>
                <div style={{ fontSize: '0.9rem', color: 'var(--color-text-muted)', lineHeight: 1.7 }}>
                  {grade === 0 && 'No joint space narrowing. No osteophytes. Normal cartilage appearance.'}
                  {grade === 1 && 'Questionable narrowing of joint space. Possible osteophytic lipping at margins.'}
                  {grade === 2 && 'Definite osteophytes with possible joint space narrowing on the radiograph.'}
                  {grade === 3 && 'Moderate multiple osteophytes. Definite joint space narrowing. Some sclerosis and possible deformity.'}
                  {grade === 4 && 'Large osteophytes. Marked joint space narrowing. Severe sclerosis. Definite bony deformity.'}
                </div>
              </div>
              <div style={{ background: '#fef2f2', border: '1px solid #fecaca', borderRadius: '8px', padding: '0.75rem 1rem', fontSize: '0.85rem', color: '#7f1d1d' }}>
                ⚕️ <strong>Disclaimer:</strong> This is a research prototype only. All clinical decisions must be made by a qualified orthopedic specialist based on full clinical assessment.
              </div>
            </div>
          )}

          {/* Tab 4: Model Info */}
          {activeTab === 4 && (
            <div>
              <table className="model-info-table">
                <tbody>
                  <tr><td>Deployed Model</td><td>MobileNetV2 (Keras)</td></tr>
                  <tr><td>Parameters</td><td>3.5 million</td></tr>
                  <tr><td>Model Size</td><td>9.6 MB</td></tr>
                  <tr><td>Input Shape</td><td>224×224 grayscale (float32)</td></tr>
                  <tr><td>Quadratic Weighted Kappa</td><td>0.820 (0.843 ensemble)</td></tr>
                  <tr><td>Binary Accuracy</td><td>86.7% (OA vs. No OA)</td></tr>
                  <tr><td>5-class Accuracy</td><td>66.7%</td></tr>
                  <tr><td>Training Dataset</td><td>9,786 X-ray images</td></tr>
                  <tr><td>Patients</td><td>4,130 (patient-level split)</td></tr>
                  <tr><td>Data Source</td><td>OAI via Mendeley (Chen 2018)</td></tr>
                  <tr><td>Ensemble Models</td><td>DenseNet201, EfficientNetV2S, MobileNetV2, Xception</td></tr>
                </tbody>
              </table>
              <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: '8px', padding: '0.75rem 1rem', marginTop: '1rem', fontSize: '0.85rem', color: '#9a3412' }}>
                ⚠️ <strong>Research prototype only.</strong> Not validated for clinical use. Not a medical device.
                Grade 1 reliability is especially low (F1 = 0.39). Always confirm with a qualified radiologist or orthopedic specialist.
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
