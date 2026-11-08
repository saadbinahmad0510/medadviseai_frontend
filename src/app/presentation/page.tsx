'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import {
  BoneIcon,
  ExclamationTriangleIcon,
  CheckCircleIcon,
  ChartBarIcon,
  ArrowRightIcon,
  StethoscopeIcon,
  AcademicCapIcon,
  ArrowsPointingOutIcon,
} from '@/components/Icons';

const GRADE_COLORS: Record<number, string> = {
  0: '#15803d', 1: '#ca8a04', 2: '#ea580c', 3: '#dc2626', 4: '#7f1d1d',
};

const GRADE_LABELS: Record<number, string> = {
  0: 'Normal', 1: 'Doubtful', 2: 'Mild', 3: 'Moderate', 4: 'Severe',
};

const KL_DEFS: Record<number, string> = {
  0: 'No radiographic features of OA.',
  1: 'Doubtful joint space narrowing with possible osteophytic lipping.',
  2: 'Definite osteophytes and possible joint space narrowing.',
  3: 'Multiple osteophytes, definite narrowing, some sclerosis and deformity.',
  4: 'Large osteophytes, marked narrowing, severe sclerosis and definite deformity.',
};

type SlideTheme = 'title' | 'content' | 'dark';

interface Slide {
  id: number;
  theme: SlideTheme;
  render: () => React.ReactNode;
}

function themeClass(theme: SlideTheme): string {
  if (theme === 'title') return 'slide-title-theme';
  if (theme === 'dark') return 'slide-dark-theme';
  return 'slide-content-theme';
}

// Slide 1: Title
function Slide1() {
  return (
    <div className="slide-title-theme" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100%', textAlign: 'center', padding: '3rem 4rem' }}>
      <div style={{ marginBottom: '1.5rem' }}><BoneIcon size={64} color="white" /></div>
      <h1 style={{ fontSize: 'clamp(2rem,5vw,3.5rem)', fontWeight: 800, marginBottom: '1rem', color: 'white' }}>MedAdvise AI</h1>
      <div className="slide-subtitle" style={{ fontSize: '1.2rem', opacity: 0.85, maxWidth: 600, margin: '0 auto 2rem' }}>
        Automated Knee Osteoarthritis Grading Using Deep Learning
      </div>
      <div className="slide-meta" style={{ fontSize: '0.9rem', opacity: 0.7 }}>
        B.Sc. Thesis Project · 2026 · Computer Science
      </div>
      <div style={{ marginTop: '2.5rem', display: 'flex', gap: '1rem', justifyContent: 'center' }}>
        <span style={{ padding: '0.4rem 1rem', borderRadius: '999px', background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '0.85rem' }}>MobileNetV2</span>
        <span style={{ padding: '0.4rem 1rem', borderRadius: '999px', background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '0.85rem' }}>KL Grading Scale</span>
        <span style={{ padding: '0.4rem 1rem', borderRadius: '999px', background: 'rgba(255,255,255,0.15)', color: 'white', fontSize: '0.85rem' }}>QWK = 0.843</span>
      </div>
    </div>
  );
}

// Slide 2: Problem Statement
function Slide2() {
  const bullets = [
    { num: '1', text: 'KOA affects 300M+ people globally (WHO, 2022), making it one of the most common musculoskeletal conditions.' },
    { num: '2', text: 'Manual Kellgren-Lawrence grading has high inter-rater variability (κ ≈ 0.5–0.6), limiting diagnostic consistency.' },
    { num: '3', text: 'Radiologist shortage in developing nations creates barriers to consistent, timely diagnosis.' },
    { num: '4', text: 'Need for consistent, scalable, automated grading tools to support clinical decision-making.' },
  ];
  return (
    <div style={{ padding: '3rem 4rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid #0f766e', display: 'inline-block' }}>Problem Statement</h2>
      <div className="slide-bullets">
        {bullets.map((b) => (
          <div key={b.num} className="slide-bullet">
            <span className="slide-bullet-num">{b.num}</span>
            <span className="slide-bullet-text">{b.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

// Slide 3: Research Objectives
function Slide3() {
  const objectives = [
    { num: '01', title: 'Develop CNN-Based System', desc: 'Build an automatic KL grading system for knee X-rays using convolutional neural network architectures.' },
    { num: '02', title: 'Compare Architectures', desc: 'Evaluate and compare performance of DenseNet201, EfficientNetV2S, MobileNetV2, and Xception.' },
    { num: '03', title: 'Build Web Interface', desc: 'Create an accessible, full-stack web platform for clinical research and educational demonstration.' },
  ];
  return (
    <div style={{ padding: '3rem 4rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid #0f766e', display: 'inline-block' }}>Research Objectives</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.5rem' }}>
        {objectives.map((o) => (
          <div key={o.num} style={{ background: '#f8fafc', borderRadius: 12, padding: '1.5rem', border: '1px solid #e2e8f0', borderTop: '4px solid #0f766e' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#0f766e', marginBottom: '0.75rem' }}>{o.num}</div>
            <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '0.5rem' }}>{o.title}</div>
            <div style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.6 }}>{o.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Slide 4: Literature Review
function Slide4() {
  const rows = [
    { author: 'Tiulpin et al.', year: 2018, method: 'Siamese CNN + ResNet', qwk: '0.83' },
    { author: 'Chen et al.', year: 2019, method: 'Attention CNN', qwk: '0.85' },
    { author: 'Leung et al.', year: 2020, method: 'EfficientNet', qwk: '0.81' },
    { author: 'Our Work', year: 2026, method: 'CNN Ensemble (4 models)', qwk: '0.843', highlight: true },
  ];
  return (
    <div style={{ padding: '3rem 4rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid #0f766e', display: 'inline-block' }}>Literature Review</h2>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>Comparison with state-of-the-art automated KL grading approaches</p>
      <table className="slide-table">
        <thead>
          <tr>
            <th>Author</th>
            <th>Year</th>
            <th>Method</th>
            <th>QWK</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.author} className={r.highlight ? 'slide-highlight-row' : ''}>
              <td>{r.author}</td>
              <td>{r.year}</td>
              <td>{r.method}</td>
              <td style={{ fontWeight: 700, color: r.highlight ? '#0f766e' : 'inherit' }}>{r.qwk}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// Slide 5: Dataset
function Slide5() {
  const dist = [
    { grade: 'G0 (Normal)', count: 4247 },
    { grade: 'G1 (Doubtful)', count: 1406 },
    { grade: 'G2 (Mild)', count: 2217 },
    { grade: 'G3 (Moderate)', count: 1428 },
    { grade: 'G4 (Severe)', count: 488 },
  ];
  const total = dist.reduce((a, b) => a + b.count, 0);
  return (
    <div style={{ padding: '3rem 4rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid #0f766e', display: 'inline-block' }}>Dataset</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
        <div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {[
              ['Total Images', '9,786 X-ray images'],
              ['Unique Patients', '4,130 (zero data leakage)'],
              ['Source', 'OAI via Mendeley (Chen 2018)'],
              ['Input', '224×224 grayscale PNG'],
              ['Train Split', '6,851 images'],
              ['Validation Split', '1,467 images'],
              ['Test Split', '1,468 images'],
              ['Split Strategy', 'Patient-level (no leakage)'],
            ].map(([k, v]) => (
              <div key={k} style={{ display: 'flex', gap: '1rem', fontSize: '0.875rem', borderBottom: '1px solid #e2e8f0', paddingBottom: '0.4rem' }}>
                <span style={{ fontWeight: 600, color: '#64748b', minWidth: '130px', flexShrink: 0 }}>{k}</span>
                <span>{v}</span>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: '1rem', fontSize: '0.95rem' }}>Class Distribution</div>
          {dist.map((d, i) => (
            <div key={d.grade} style={{ marginBottom: '0.75rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', marginBottom: '0.3rem' }}>
                <span style={{ color: Object.values(GRADE_COLORS)[i], fontWeight: 600 }}>{d.grade}</span>
                <span style={{ color: '#64748b' }}>{d.count} ({((d.count / total) * 100).toFixed(0)}%)</span>
              </div>
              <div style={{ height: 8, background: '#e2e8f0', borderRadius: 999, overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${(d.count / total) * 100}%`, background: Object.values(GRADE_COLORS)[i], borderRadius: 999 }} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Slide 6: KL Scale
function Slide6() {
  return (
    <div style={{ padding: '3rem 4rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, marginBottom: '0.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid #0f766e', display: 'inline-block' }}>Kellgren-Lawrence Scale</h2>
      <p style={{ color: '#64748b', fontSize: '0.9rem', marginBottom: '1.5rem' }}>The international standard for radiographic knee OA severity (Grade ≥ 2 = OA Detected)</p>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: '1rem' }}>
        {[0, 1, 2, 3, 4].map((g) => (
          <div key={g} style={{ background: 'white', borderRadius: 12, padding: '1.25rem 1rem', border: '1px solid #e2e8f0', borderTop: `4px solid ${GRADE_COLORS[g]}`, textAlign: 'center', boxShadow: '0 1px 3px rgba(16,24,32,0.08)' }}>
            <div style={{ fontSize: '1.75rem', fontWeight: 800, color: GRADE_COLORS[g] }}>G{g}</div>
            <div style={{ fontWeight: 700, fontSize: '0.85rem', color: GRADE_COLORS[g], marginBottom: '0.5rem' }}>{GRADE_LABELS[g]}</div>
            <div style={{ fontSize: '0.75rem', color: '#64748b', lineHeight: 1.5 }}>{KL_DEFS[g]}</div>
            {g >= 2 && (
              <div style={{ marginTop: '0.75rem', padding: '0.2rem 0.5rem', borderRadius: 999, background: '#fef2f2', color: '#b91c1c', fontSize: '0.7rem', fontWeight: 600 }}>OA</div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

// Slide 7: Methodology
function Slide7() {
  const models = [
    { name: 'DenseNet201', params: '18M', note: 'Dense connections' },
    { name: 'EfficientNetV2S', params: '20M', note: 'Compound scaling' },
    { name: 'MobileNetV2', params: '3.5M', note: 'Deployed model' },
    { name: 'Xception', params: '22M', note: 'Depthwise separable' },
  ];
  return (
    <div style={{ padding: '3rem 4rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid #0f766e', display: 'inline-block' }}>Methodology — Model Architecture</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
        <div>
          <div style={{ fontWeight: 700, marginBottom: '1rem' }}>Architecture Pipeline</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {['224×224 Grayscale Input', 'ImageNet Pretrained Backbone', 'Global Average Pooling', 'Dense(256, ReLU) + Dropout(0.5)', 'Output: Softmax(5 classes)'].map((step, i) => (
              <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                <div style={{ width: 28, height: 28, borderRadius: '50%', background: '#0f766e', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '0.75rem', fontWeight: 700, flexShrink: 0 }}>{i + 1}</div>
                <div style={{ padding: '0.5rem 0.75rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', flex: 1, fontSize: '0.875rem' }}>{step}</div>
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: '1rem' }}>Ensemble Members</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {models.map((m) => (
              <div key={m.name} style={{ padding: '0.75rem 1rem', background: m.name === 'MobileNetV2' ? 'rgba(15,118,110,0.08)' : '#f8fafc', borderRadius: 8, border: `1px solid ${m.name === 'MobileNetV2' ? '#0f766e' : '#e2e8f0'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <span style={{ fontWeight: 700, fontSize: '0.9rem', color: m.name === 'MobileNetV2' ? '#0f766e' : 'inherit' }}>{m.name}</span>
                  {m.name === 'MobileNetV2' && <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', background: '#0f766e', color: 'white', padding: '0.1rem 0.4rem', borderRadius: 999 }}>Deployed</span>}
                  <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '0.1rem' }}>{m.note}</div>
                </div>
                <span style={{ fontSize: '0.85rem', color: '#64748b', fontWeight: 600 }}>{m.params} params</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Slide 8: Training Strategy
function Slide8() {
  const items = [
    { icon: '⇌', title: 'Data Split', desc: 'Patient-level train/val/test split — zero data leakage between sets' },
    { icon: '↻', title: 'Augmentation', desc: 'Horizontal flip, rotation ±10°, brightness/contrast variation' },
    { icon: '↘', title: 'Loss Function', desc: 'Categorical cross-entropy with class weights for imbalance' },
    { icon: '◎', title: 'Optimizer', desc: 'Adam with cosine learning rate decay schedule' },
    { icon: '■', title: 'Early Stopping', desc: 'Monitor validation QWK — stop when no improvement in 10 epochs' },
    { icon: '★', title: 'Best Model', desc: 'Save checkpoint with highest validation QWK score' },
  ];
  return (
    <div style={{ padding: '3rem 4rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid #0f766e', display: 'inline-block' }}>Training Strategy</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
        {items.map((item) => (
          <div key={item.title} style={{ background: '#f8fafc', borderRadius: 12, padding: '1.25rem', border: '1px solid #e2e8f0' }}>
            <div style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>{item.icon}</div>
            <div style={{ fontWeight: 700, fontSize: '0.9rem', marginBottom: '0.4rem' }}>{item.title}</div>
            <div style={{ fontSize: '0.8rem', color: '#64748b', lineHeight: 1.5 }}>{item.desc}</div>
          </div>
        ))}
      </div>
    </div>
  );
}

// Slide 9: Performance Results
function Slide9() {
  const rows = [
    { model: 'Ensemble', acc: '66.7%', f1: '69.0%', qwk: '0.843', bin: '86.7%', deployed: false, highlight: true },
    { model: 'DenseNet201', acc: '64.1%', f1: '65.9%', qwk: '0.816', bin: '84.8%', deployed: false, highlight: false },
    { model: 'MobileNetV2', acc: '62.9%', f1: '65.6%', qwk: '0.820', bin: '84.4%', deployed: true, highlight: false },
    { model: 'EfficientNetV2S', acc: '61.6%', f1: '65.1%', qwk: '0.802', bin: '84.2%', deployed: false, highlight: false },
    { model: 'Xception', acc: '60.8%', f1: '62.3%', qwk: '0.797', bin: '83.9%', deployed: false, highlight: false },
  ];
  return (
    <div style={{ padding: '3rem 4rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, marginBottom: '0.75rem', paddingBottom: '0.75rem', borderBottom: '3px solid #0f766e', display: 'inline-block' }}>Performance Results</h2>
      <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.25rem' }}>Evaluated on 1,468 held-out test images (patient-level split, zero leakage)</p>
      <table className="slide-table">
        <thead>
          <tr>
            <th>Model</th>
            <th>5-Class Acc</th>
            <th>Macro F1</th>
            <th>QWK</th>
            <th>Binary Acc</th>
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.model} className={r.highlight ? 'slide-highlight-row' : ''}>
              <td style={{ fontWeight: r.highlight || r.deployed ? 700 : 400 }}>
                {r.model}
                {r.deployed && <span style={{ marginLeft: '0.5rem', fontSize: '0.7rem', background: '#0f766e', color: 'white', padding: '0.1rem 0.4rem', borderRadius: 999 }}>Deployed</span>}
              </td>
              <td>{r.acc}</td>
              <td>{r.f1}</td>
              <td style={{ color: r.highlight ? '#0f766e' : 'inherit', fontWeight: r.highlight ? 700 : 400 }}>{r.qwk}</td>
              <td style={{ color: r.highlight ? '#0f766e' : 'inherit', fontWeight: r.highlight ? 700 : 400 }}>{r.bin}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div style={{ marginTop: '1.25rem', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
        <div style={{ background: 'rgba(15,118,110,0.07)', borderRadius: 8, padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
          <strong style={{ color: '#0f766e' }}>QWK = 0.843</strong> — Substantial agreement with radiologist grades
        </div>
        <div style={{ background: 'rgba(15,118,110,0.07)', borderRadius: 8, padding: '0.6rem 1rem', fontSize: '0.85rem' }}>
          <strong style={{ color: '#0f766e' }}>86.7% Binary</strong> — OA vs. No OA detection accuracy
        </div>
      </div>
    </div>
  );
}

// Slide 10: Per-Class Analysis
function Slide10() {
  const f1Scores = [
    { grade: 0, label: 'G0 Normal', f1: 0.766 },
    { grade: 1, label: 'G1 Doubtful', f1: 0.392 },
    { grade: 2, label: 'G2 Mild', f1: 0.474 },
    { grade: 3, label: 'G3 Moderate', f1: 0.709 },
    { grade: 4, label: 'G4 Severe', f1: 0.927 },
  ];
  return (
    <div style={{ padding: '3rem 4rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid #0f766e', display: 'inline-block' }}>Per-Class Analysis</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2.5rem', alignItems: 'start' }}>
        <div>
          <div style={{ fontWeight: 700, marginBottom: '1rem' }}>F1 Score by Grade (Ensemble)</div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
            {f1Scores.map((item) => (
              <div key={item.grade}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', marginBottom: '0.3rem' }}>
                  <span style={{ color: GRADE_COLORS[item.grade], fontWeight: 600 }}>{item.label}</span>
                  <span style={{ fontWeight: 700 }}>{item.f1.toFixed(3)}</span>
                </div>
                <div style={{ height: 10, background: '#e2e8f0', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ height: '100%', width: `${item.f1 * 100}%`, background: GRADE_COLORS[item.grade], borderRadius: 999, transition: 'width 0.5s ease' }} />
                </div>
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div style={{ background: '#fff7ed', border: '1px solid #fed7aa', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ fontWeight: 700, color: '#9a3412', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><ExclamationTriangleIcon size={16} color="#9a3412" /> Grade 1 Challenge</div>
            <div style={{ fontSize: '0.875rem', color: '#7c2d12', lineHeight: 1.6 }}>
              Grade 1 (Doubtful) has the lowest F1 score (0.392) due to high clinical ambiguity —
              borderline cases overlap significantly with both Grade 0 and Grade 2.
            </div>
          </div>
          <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ fontWeight: 700, color: '#15803d', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><CheckCircleIcon size={16} color="#15803d" /> Grade 4 Strength</div>
            <div style={{ fontSize: '0.875rem', color: '#14532d', lineHeight: 1.6 }}>
              Severe OA (Grade 4) achieves the highest F1 (0.927) — distinctive radiographic features
              make it the easiest class to identify correctly.
            </div>
          </div>
          <div style={{ background: '#eff6ff', border: '1px solid #bfdbfe', borderRadius: 12, padding: '1.25rem' }}>
            <div style={{ fontWeight: 700, color: '#1d4ed8', marginBottom: '0.5rem', display: 'flex', alignItems: 'center', gap: '0.4rem' }}><ChartBarIcon size={16} color="#1d4ed8" /> Macro Average F1</div>
            <div style={{ fontSize: '0.875rem', color: '#1e3a8a', lineHeight: 1.6 }}>
              Ensemble macro F1 = 0.690, weighted by class frequency. Binary OA detection F1 = 0.867.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

// Slide 11: Confusion Matrix
function Slide11() {
  const matrix = [
    [582, 55, 30, 4, 0],
    [107, 133, 133, 27, 0],
    [21, 86, 319, 80, 11],
    [1, 10, 88, 218, 45],
    [0, 0, 5, 32, 101],
  ];
  const maxVal = Math.max(...matrix.flat());
  function cellBg(val: number, isDiag: boolean): string {
    if (isDiag) return `rgba(15,118,110,${0.15 + (val / maxVal) * 0.65})`;
    return val === 0 ? '#f8fafc' : `rgba(220,38,38,${(val / maxVal) * 0.4})`;
  }
  return (
    <div style={{ padding: '3rem 4rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, marginBottom: '0.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid #0f766e', display: 'inline-block' }}>Confusion Matrix</h2>
      <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.25rem' }}>Ensemble model on 1,468 test images · Rows = Actual, Columns = Predicted</p>
      <div style={{ overflowX: 'auto' }}>
        <table style={{ borderCollapse: 'collapse', fontSize: '0.85rem' }}>
          <thead>
            <tr>
              <th style={{ padding: '0.5rem 0.75rem', background: '#0f766e', color: 'white', textAlign: 'center' }}>A\P</th>
              {[0, 1, 2, 3, 4].map((g) => (
                <th key={g} style={{ padding: '0.5rem 0.75rem', background: '#0f766e', color: 'white', textAlign: 'center' }}>G{g}</th>
              ))}
              <th style={{ padding: '0.5rem 0.75rem', background: '#0f766e', color: 'white', textAlign: 'center' }}>Total</th>
            </tr>
          </thead>
          <tbody>
            {matrix.map((row, i) => (
              <tr key={i}>
                <td style={{ padding: '0.5rem 0.75rem', fontWeight: 700, color: GRADE_COLORS[i], background: '#f8fafc', textAlign: 'center' }}>G{i}</td>
                {row.map((val, j) => (
                  <td key={j} style={{ padding: '0.5rem 0.75rem', textAlign: 'center', background: cellBg(val, i === j), fontWeight: i === j ? 700 : 400, border: '1px solid #e2e8f0' }}>
                    {val}
                  </td>
                ))}
                <td style={{ padding: '0.5rem 0.75rem', textAlign: 'center', color: '#64748b', fontSize: '0.8rem', fontStyle: 'italic' }}>{row.reduce((a, b) => a + b, 0)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div style={{ marginTop: '1rem', display: 'flex', gap: '1.5rem', fontSize: '0.8rem', color: '#64748b' }}>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: 12, height: 12, background: 'rgba(15,118,110,0.6)', borderRadius: 2, display: 'inline-block' }}/>
          Correct predictions (diagonal)
        </span>
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: 12, height: 12, background: 'rgba(220,38,38,0.3)', borderRadius: 2, display: 'inline-block' }}/>
          Misclassifications
        </span>
      </div>
    </div>
  );
}

// Slide 12: ROC AUC
function Slide12() {
  const aucs = [
    { grade: 0, label: 'Grade 0 — Normal', auc: 0.9012 },
    { grade: 1, label: 'Grade 1 — Doubtful', auc: 0.7457 },
    { grade: 2, label: 'Grade 2 — Mild', auc: 0.8846 },
    { grade: 3, label: 'Grade 3 — Moderate', auc: 0.9720 },
    { grade: 4, label: 'Grade 4 — Severe', auc: 0.9984 },
  ];
  return (
    <div style={{ padding: '3rem 4rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, marginBottom: '0.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid #0f766e', display: 'inline-block' }}>ROC Curves — AUC per Class</h2>
      <p style={{ color: '#64748b', fontSize: '0.875rem', marginBottom: '1.5rem' }}>Area Under the Curve (AUC) for one-vs-rest classification — Ensemble model</p>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
        {aucs.map((item) => (
          <div key={item.grade}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.4rem' }}>
              <span style={{ fontWeight: 600, fontSize: '0.9rem', color: GRADE_COLORS[item.grade] }}>{item.label}</span>
              <span style={{ fontWeight: 800, fontSize: '1rem', color: GRADE_COLORS[item.grade] }}>AUC = {item.auc.toFixed(4)}</span>
            </div>
            <div style={{ height: 16, background: '#e2e8f0', borderRadius: 999, overflow: 'hidden', position: 'relative' }}>
              <div style={{ height: '100%', width: `${item.auc * 100}%`, background: GRADE_COLORS[item.grade], borderRadius: 999, transition: 'width 0.6s ease' }}>
                <span style={{ position: 'absolute', right: `${(1 - item.auc) * 100 + 1}%`, top: '50%', transform: 'translateY(-50%)', fontSize: '0.7rem', color: 'white', fontWeight: 700 }}>
                  {(item.auc * 100).toFixed(1)}%
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
      <div style={{ marginTop: '1.25rem', background: 'rgba(15,118,110,0.07)', borderRadius: 8, padding: '0.75rem 1rem', fontSize: '0.875rem' }}>
        <strong style={{ color: '#0f766e' }}>Macro Average AUC = 0.9004</strong> — Excellent discriminative ability across all grades
      </div>
    </div>
  );
}

// Slide 13: System Architecture & Demo
function Slide13() {
  const pipeline = ['Knee X-ray Upload', 'Django REST API', 'MobileNetV2 Inference', 'KL Grade + Probabilities', 'Next.js UI Display'];
  const features = [
    'JWT-based authentication', 'Drag-and-drop image upload', 'Real-time AI analysis',
    'AI chatbot (Gemini 1.5)', 'Metrics dashboard', 'Presentation mode',
  ];
  return (
    <div style={{ padding: '3rem 4rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid #0f766e', display: 'inline-block' }}>System Architecture &amp; Demo</h2>
      <div>
        <div style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Analysis Pipeline</div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '2rem' }}>
          {pipeline.map((step, i) => (
            <div key={step} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <div style={{ padding: '0.5rem 0.9rem', background: i === pipeline.length - 1 ? '#0f766e' : '#f8fafc', color: i === pipeline.length - 1 ? 'white' : 'inherit', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.8rem', fontWeight: 600, whiteSpace: 'nowrap' }}>{step}</div>
              {i < pipeline.length - 1 && <span style={{ color: '#94a3b8', fontSize: '1.2rem', flexShrink: 0 }}>→</span>}
            </div>
          ))}
        </div>
      </div>
      <div>
        <div style={{ fontWeight: 700, marginBottom: '0.75rem' }}>Platform Features</div>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '0.75rem' }}>
          {features.map((f) => (
            <div key={f} style={{ padding: '0.6rem 0.9rem', background: '#f8fafc', borderRadius: 8, border: '1px solid #e2e8f0', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
              <CheckCircleIcon size={14} color="#0f766e" style={{ flexShrink: 0 }} />
              {f}
            </div>
          ))}
        </div>
      </div>
      <div style={{ marginTop: '1.5rem', padding: '0.75rem 1rem', background: 'rgba(15,118,110,0.07)', borderRadius: 8, fontSize: '0.875rem' }}>
        <strong>Stack:</strong> Django REST Framework + Next.js 14 (App Router) + TensorFlow/Keras · Deployed: MobileNetV2 (9.6 MB)
      </div>
    </div>
  );
}

// Slide 14: Limitations & Future Work
function Slide14() {
  const limitations = [
    'Grade 1 reliability issue (F1 = 0.39)',
    'Research dataset only (not clinical data)',
    'Single-view AP X-ray only',
    'No prospective clinical validation',
    'Dataset bias (predominantly US patients)',
    'No DICOM/PACS integration',
  ];
  const future = [
    'Prospective clinical trial validation',
    'Multi-view X-ray analysis (AP + lateral)',
    'Integration with hospital PACS systems',
    'Longitudinal OA progression tracking',
    'Real-time mobile deployment (TFLite)',
    'Explainability maps (Grad-CAM)',
  ];
  return (
    <div style={{ padding: '3rem 4rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid #0f766e', display: 'inline-block' }}>Limitations &amp; Future Work</h2>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '2rem' }}>
        <div>
          <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#b91c1c', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ExclamationTriangleIcon size={16} color="#b91c1c" /> Current Limitations
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {limitations.map((l) => (
              <div key={l} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.5rem 0.75rem', background: '#fef2f2', borderRadius: 8, fontSize: '0.875rem' }}>
                <ExclamationTriangleIcon size={13} color="#b91c1c" style={{ flexShrink: 0, marginTop: '0.1rem' }} />
                {l}
              </div>
            ))}
          </div>
        </div>
        <div>
          <div style={{ fontWeight: 700, marginBottom: '0.75rem', color: '#15803d', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <ArrowRightIcon size={16} color="#15803d" /> Future Work
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {future.map((f) => (
              <div key={f} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.6rem', padding: '0.5rem 0.75rem', background: '#f0fdf4', borderRadius: 8, fontSize: '0.875rem' }}>
                <span style={{ color: '#15803d', flexShrink: 0 }}>→</span>
                {f}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

// Slide 15: Conclusion
function Slide15() {
  const takeaways = [
    'Deep learning can automate KL grading with QWK = 0.843 — substantial radiologist agreement',
    'Binary OA detection (Grade ≥ 2) achieves 86.7% accuracy — clinically relevant',
    'MobileNetV2 offers the best size/performance tradeoff (9.6 MB, QWK 0.820)',
    'System demonstrates research viability; prospective clinical validation is the next step',
    'Full web platform built for accessible research use and educational demonstration',
  ];
  const refs = [
    'Tiulpin A, et al. (2018). Automatic grading of KL from knee radiographs. Scientific Reports.',
    'Chen P, et al. (2019). Fully automatic knee OA severity grading. Medical Image Analysis.',
    'Leung K, et al. (2020). Prediction of total knee replacement and diagnosis. Nature Comms.',
    'Kellgren JH, Lawrence JS. (1957). Radiological assessment of osteo-arthrosis. Ann Rheum Dis.',
    'WHO. (2022). Osteoarthritis. World Health Organization fact sheet.',
  ];
  return (
    <div style={{ padding: '3rem 4rem', height: '100%', display: 'flex', flexDirection: 'column', justifyContent: 'center', background: 'linear-gradient(135deg, #0f766e 0%, #0369a1 60%, #1e40af 100%)', color: 'white' }}>
      <h2 style={{ fontSize: 'clamp(1.5rem,3vw,2rem)', fontWeight: 800, marginBottom: '1.5rem', paddingBottom: '0.75rem', borderBottom: '3px solid rgba(255,255,255,0.4)', display: 'inline-block' }}>Key Takeaways</h2>
      <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '2rem' }}>
        {takeaways.map((t, i) => (
          <div key={i} style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', background: 'rgba(255,255,255,0.1)', borderRadius: 8, padding: '0.75rem 1rem', fontSize: '0.9rem' }}>
            <span style={{ fontWeight: 800, fontSize: '1.1rem', flexShrink: 0 }}>{i + 1}.</span>
            {t}
          </div>
        ))}
      </div>
      <div style={{ background: 'rgba(255,255,255,0.08)', borderRadius: 12, padding: '1rem 1.25rem', marginBottom: '1.5rem' }}>
        <div style={{ fontWeight: 700, fontSize: '0.85rem', opacity: 0.8, marginBottom: '0.75rem', textTransform: 'uppercase', letterSpacing: '0.05em' }}>References</div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
          {refs.map((r, i) => (
            <div key={i} style={{ fontSize: '0.75rem', opacity: 0.75, lineHeight: 1.4 }}>[{i + 1}] {r}</div>
          ))}
        </div>
      </div>
      <div style={{ textAlign: 'center', paddingTop: '0.5rem', borderTop: '1px solid rgba(255,255,255,0.2)' }}>
        <div style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '0.25rem', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '0.5rem' }}><AcademicCapIcon size={22} color="white" /> Thank You</div>
        <div style={{ fontSize: '0.85rem', opacity: 0.8 }}>MedAdvise AI · B.Sc. Thesis 2026 · Computer Science</div>
      </div>
    </div>
  );
}

const SLIDES: Array<{ id: number; theme: SlideTheme; label: string; component: React.FC }> = [
  { id: 1, theme: 'title', label: 'Title', component: Slide1 },
  { id: 2, theme: 'content', label: 'Problem', component: Slide2 },
  { id: 3, theme: 'content', label: 'Objectives', component: Slide3 },
  { id: 4, theme: 'content', label: 'Literature', component: Slide4 },
  { id: 5, theme: 'content', label: 'Dataset', component: Slide5 },
  { id: 6, theme: 'content', label: 'KL Scale', component: Slide6 },
  { id: 7, theme: 'content', label: 'Architecture', component: Slide7 },
  { id: 8, theme: 'content', label: 'Training', component: Slide8 },
  { id: 9, theme: 'content', label: 'Results', component: Slide9 },
  { id: 10, theme: 'content', label: 'Per-Class', component: Slide10 },
  { id: 11, theme: 'content', label: 'Confusion', component: Slide11 },
  { id: 12, theme: 'content', label: 'ROC AUC', component: Slide12 },
  { id: 13, theme: 'content', label: 'System', component: Slide13 },
  { id: 14, theme: 'content', label: 'Limits', component: Slide14 },
  { id: 15, theme: 'dark', label: 'Conclusion', component: Slide15 },
];

export default function PresentationPage() {
  const [current, setCurrent] = useState(0);
  const [animating, setAnimating] = useState(false);
  const [direction, setDirection] = useState<'forward' | 'back'>('forward');

  function navigate(next: number) {
    if (next < 0 || next >= SLIDES.length || animating) return;
    setDirection(next > current ? 'forward' : 'back');
    setAnimating(true);
    setTimeout(() => {
      setCurrent(next);
      setAnimating(false);
    }, 350);
  }

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      if (e.key === 'ArrowRight' || e.key === 'ArrowDown' || e.key === ' ') navigate(current + 1);
      if (e.key === 'ArrowLeft' || e.key === 'ArrowUp') navigate(current - 1);
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [current, animating]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  function toggleFullscreen() {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  const slide = SLIDES[current];
  const SlideComponent = slide.component;

  return (
    <div className="slide-app">
      {/* Nav bar */}
      <div className="slide-nav">
        <div className="slide-nav-title" style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <StethoscopeIcon size={16} color="rgba(255,255,255,0.8)" /> MedAdvise AI — Thesis Presentation
        </div>
        <div className="slide-nav-controls">
          <button className="slide-nav-btn" onClick={() => navigate(current - 1)} disabled={current === 0}>
            ← Prev
          </button>
          <span className="slide-counter">{current + 1} / {SLIDES.length}</span>
          <button className="slide-nav-btn" onClick={() => navigate(current + 1)} disabled={current === SLIDES.length - 1}>
            Next →
          </button>
          <button className="slide-fullscreen-btn" onClick={toggleFullscreen} title="Toggle fullscreen">
            <ArrowsPointingOutIcon size={16} color="white" />
          </button>
          <Link href="/" style={{ color: 'rgba(255,255,255,0.5)', fontSize: '0.8rem', marginLeft: '0.5rem' }}>
            ← Exit
          </Link>
        </div>
      </div>

      {/* Slide viewport */}
      <div className="slide-viewport">
        <div
          className={`slide ${
            animating
              ? direction === 'forward' ? 'slide-exit' : 'slide-enter'
              : 'slide-active'
          }`}
        >
          <SlideComponent />
        </div>
      </div>

      {/* Progress dots */}
      <div className="slide-progress">
        {SLIDES.map((s, i) => (
          <div
            key={s.id}
            className={`slide-dot ${i === current ? 'active' : ''}`}
            onClick={() => navigate(i)}
            title={s.label}
          />
        ))}
      </div>
    </div>
  );
}
