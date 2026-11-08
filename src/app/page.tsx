import Link from 'next/link';
import StatusBadge from '@/components/StatusBadge';

const API_URL = process.env.NEXT_PUBLIC_API_URL ?? 'http://localhost:8000';

async function getHealth(): Promise<{ status: string } | null> {
  try {
    const res = await fetch(`${API_URL}/api/health/`, { cache: 'no-store' });
    if (!res.ok) return null;
    return res.json();
  } catch {
    return null;
  }
}

const KL_GRADES = [
  { grade: 0, label: 'Normal', color: '#15803d', definition: 'No radiographic features of osteoarthritis.' },
  { grade: 1, label: 'Doubtful', color: '#ca8a04', definition: 'Doubtful joint space narrowing with possible osteophytic lipping.' },
  { grade: 2, label: 'Mild', color: '#ea580c', definition: 'Definite osteophytes and possible joint space narrowing.' },
  { grade: 3, label: 'Moderate', color: '#dc2626', definition: 'Multiple osteophytes, definite narrowing, some sclerosis.' },
  { grade: 4, label: 'Severe', color: '#7f1d1d', definition: 'Large osteophytes, marked narrowing, severe sclerosis and deformity.' },
];

const FEATURES = [
  { icon: '🦴', title: 'KL Grade Analysis', desc: 'Automated Kellgren-Lawrence grading (0–4) from knee X-ray images using MobileNetV2.' },
  { icon: '⚡', title: 'Instant Results', desc: 'Get AI-powered severity classification in seconds with probability distributions.' },
  { icon: '🤖', title: 'AI Medical Chat', desc: 'Ask follow-up questions powered by Google Gemini 1.5 Flash — free, fast, and contextual.' },
  { icon: '📊', title: 'Research Grade', desc: 'QWK of 0.843 ensemble, 86.7% binary accuracy. Full model performance dashboard included.' },
];

const STEPS = [
  { num: '1', title: 'Upload X-ray', desc: 'Drag and drop a knee X-ray image, or choose from our sample images for instant testing.' },
  { num: '2', title: 'AI Analysis', desc: 'MobileNetV2 processes your image and predicts the KL grade with confidence scores.' },
  { num: '3', title: 'View Results', desc: 'See your grade, probability distribution, clinical details, and recommendations.' },
];

export default async function Home() {
  const health = await getHealth();

  return (
    <>
      {/* Hero */}
      <section className="landing-hero">
        <div className="landing-hero-content">
          <div style={{ marginBottom: '1.5rem' }}>
            <StatusBadge status={health ? health.status : 'backend unreachable'} />
          </div>
          <h1>AI-Powered Knee OA<br />Severity Analysis</h1>
          <p>
            Upload a knee X-ray and receive instant Kellgren-Lawrence grade classification
            (0–4) with confidence scores, probability distributions, and clinical insights.
            Built as an academic thesis prototype.
          </p>
          <div className="landing-hero-actions">
            <Link href="/register" className="btn btn-hero-primary">Get Started Free</Link>
            <Link href="/presentation" className="btn btn-hero-outline">View Presentation</Link>
          </div>
        </div>
        {/* Visual decoration */}
        <div className="landing-hero-visual" aria-hidden="true">
          <svg width="420" height="420" viewBox="0 0 420 420" fill="white">
            <circle cx="210" cy="210" r="200" fill="none" stroke="white" strokeWidth="1" opacity="0.3"/>
            <circle cx="210" cy="210" r="150" fill="none" stroke="white" strokeWidth="1" opacity="0.2"/>
            <circle cx="210" cy="210" r="100" fill="none" stroke="white" strokeWidth="1" opacity="0.15"/>
            <ellipse cx="210" cy="130" rx="55" ry="90" fill="white" opacity="0.2"/>
            <ellipse cx="210" cy="260" rx="45" ry="85" fill="white" opacity="0.2"/>
            <ellipse cx="210" cy="210" rx="70" ry="40" fill="white" opacity="0.25"/>
          </svg>
        </div>
      </section>

      {/* Stats bar */}
      <div className="landing-stats">
        <div className="landing-stat">
          <div className="landing-stat-value">86.7%</div>
          <div className="landing-stat-label">Binary Accuracy (OA vs. No OA)</div>
        </div>
        <div className="landing-stat">
          <div className="landing-stat-value">0.843</div>
          <div className="landing-stat-label">Quadratic Weighted Kappa</div>
        </div>
        <div className="landing-stat">
          <div className="landing-stat-value">9,786</div>
          <div className="landing-stat-label">Training X-rays</div>
        </div>
        <div className="landing-stat">
          <div className="landing-stat-value">4</div>
          <div className="landing-stat-label">Models in Ensemble</div>
        </div>
      </div>

      {/* How it works */}
      <section className="landing-section landing-section-center">
        <h2>How It Works</h2>
        <p className="landing-section-subtitle">Three simple steps to AI-powered knee OA analysis</p>
        <div className="landing-steps">
          {STEPS.map((s) => (
            <div key={s.num} className="landing-step">
              <div className="landing-step-number">{s.num}</div>
              <h3>{s.title}</h3>
              <p>{s.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Features */}
      <div style={{ background: '#f8fafc', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <section className="landing-section">
          <h2>Key Features</h2>
          <p className="landing-section-subtitle">Everything you need for knee OA analysis and research</p>
          <div className="landing-features">
            {FEATURES.map((f) => (
              <div key={f.title} className="landing-feature-card">
                <div className="landing-feature-icon">{f.icon}</div>
                <h3>{f.title}</h3>
                <p>{f.desc}</p>
              </div>
            ))}
          </div>
        </section>
      </div>

      {/* KL Grade Scale */}
      <section className="landing-section landing-section-center">
        <h2>Kellgren-Lawrence Grading Scale</h2>
        <p className="landing-section-subtitle">The international standard for radiographic knee OA severity classification</p>
        <div className="kl-scale">
          {KL_GRADES.map((g) => (
            <div key={g.grade} className="kl-grade-card" style={{ color: g.color, borderTopColor: g.color }}>
              <div className="kl-grade-num">G{g.grade}</div>
              <div className="kl-grade-label">{g.label}</div>
              <div className="kl-grade-def">{g.definition}</div>
            </div>
          ))}
        </div>
      </section>

      {/* Performance Metrics */}
      <div style={{ background: '#f8fafc', borderTop: '1px solid var(--color-border)', borderBottom: '1px solid var(--color-border)' }}>
        <section className="landing-section landing-section-center">
          <h2>Model Performance</h2>
          <p className="landing-section-subtitle">Evaluated on 1,468 held-out test images with patient-level data splits</p>
          <div className="landing-metrics">
            {[
              { value: '66.7%', label: '5-Class Accuracy' },
              { value: '86.7%', label: 'Binary Accuracy' },
              { value: '0.843', label: 'Quadratic Weighted Kappa' },
              { value: '0.900', label: 'Macro AUC (ROC)' },
              { value: '4,130', label: 'Unique Patients' },
              { value: '9,786', label: 'Training Images' },
            ].map((m) => (
              <div key={m.label} className="landing-metric-card">
                <div className="landing-metric-value">{m.value}</div>
                <div className="landing-metric-label">{m.label}</div>
              </div>
            ))}
          </div>
          <div style={{ marginTop: '2rem' }}>
            <Link href="/metrics" className="btn btn-secondary">View Full Metrics Dashboard →</Link>
          </div>
        </section>
      </div>

      {/* About / Thesis Info */}
      <section className="landing-section">
        <div className="landing-about">
          <div className="landing-about-text">
            <h2>About This Research</h2>
            <p>
              MedAdvise AI is a thesis project investigating the application of deep learning
              for automated Kellgren-Lawrence grading of knee osteoarthritis from plain radiographs.
            </p>
            <p>
              The system uses an ensemble of four convolutional neural networks
              (DenseNet201, EfficientNetV2S, MobileNetV2, Xception) trained on 9,786 knee X-rays
              from the Osteoarthritis Initiative dataset.
            </p>
            <p>
              The deployed model (MobileNetV2) achieves a Quadratic Weighted Kappa of 0.820,
              with the full ensemble reaching 0.843 — indicating substantial agreement with
              radiologist-assigned grades.
            </p>
          </div>
          <div className="landing-about-box">
            <h3>🎓 Thesis Details</h3>
            {[
              { label: 'Project', value: 'MedAdvise AI' },
              { label: 'Focus', value: 'Knee OA Severity Grading' },
              { label: 'Method', value: 'Deep Learning (CNN Ensemble)' },
              { label: 'Dataset', value: 'OAI / Mendeley (Chen 2018)' },
              { label: 'Deployed Model', value: 'MobileNetV2 (9.6 MB)' },
              { label: 'Stack', value: 'Django REST + Next.js + TF' },
              { label: 'Status', value: '⚠️ Research Prototype Only' },
            ].map((r) => (
              <div key={r.label} className="landing-about-row">
                <span style={{ fontWeight: 600, color: 'var(--color-text-muted)' }}>{r.label}</span>
                <span>{r.value}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="landing-cta">
        <h2>Start Your Analysis</h2>
        <p>Upload a knee X-ray and get an instant AI-powered KL grade assessment. Free to use.</p>
        <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center', flexWrap: 'wrap' }}>
          <Link href="/register" className="btn btn-hero-primary">Create Account</Link>
          <Link href="/login" className="btn btn-hero-outline">Log In</Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer-inner">
          <div className="landing-footer-top">
            <div>
              <div className="landing-footer-brand">🩺 MedAdvise AI</div>
              <div className="landing-footer-desc">
                AI-powered knee osteoarthritis severity grading using the Kellgren-Lawrence scale.
                Built as a thesis research project. Not for clinical use.
              </div>
            </div>
            <div className="landing-footer-col">
              <h4>Navigation</h4>
              <Link href="/">Home</Link>
              <Link href="/login">Log In</Link>
              <Link href="/register">Register</Link>
              <Link href="/metrics">Metrics</Link>
              <Link href="/presentation">Presentation</Link>
            </div>
            <div className="landing-footer-col">
              <h4>Research</h4>
              <span style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>OAI Dataset (Mendeley)</span>
              <span style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>MobileNetV2 Architecture</span>
              <span style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8', marginBottom: '0.4rem' }}>KL Grading Scale</span>
              <span style={{ display: 'block', fontSize: '0.85rem', color: '#94a3b8' }}>Django + Next.js Stack</span>
            </div>
          </div>
          <div className="landing-footer-bottom">
            <span>© 2026 MedAdvise AI — Thesis Research Project</span>
            <span className="landing-footer-disclaimer">
              ⚠️ Research prototype only. Not a medical device. Not validated for clinical use.
              All results should be confirmed by a qualified orthopedic specialist.
            </span>
          </div>
        </div>
      </footer>
    </>
  );
}
