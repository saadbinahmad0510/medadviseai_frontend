'use client';

import { useEffect, useState } from 'react';
import { Metrics } from '@/types/metrics';
import HeadlineCards from '@/components/metrics/HeadlineCards';
import DeploymentNote from '@/components/metrics/DeploymentNote';
import ModelComparisonChart from '@/components/metrics/ModelComparisonChart';
import ConfusionMatrix from '@/components/metrics/ConfusionMatrix';
import PerClassTable from '@/components/metrics/PerClassTable';
import RocCurves from '@/components/metrics/RocCurves';
import TrainingCurves from '@/components/metrics/TrainingCurves';
import DatasetSummary from '@/components/metrics/DatasetSummary';
import LimitationsList from '@/components/metrics/LimitationsList';

export default function MetricsPage() {
  const [metrics, setMetrics] = useState<Metrics | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    fetch('/metrics.json')
      .then((res) => {
        if (!res.ok) throw new Error('Failed to load metrics');
        return res.json();
      })
      .then(setMetrics)
      .catch(() => setError('Failed to load metrics.json'));
  }, []);

  if (error) {
    return (
      <div className="page">
        <p className="alert alert-error">{error}</p>
      </div>
    );
  }

  if (!metrics) {
    return (
      <div className="page">
        <p className="subtitle">Loading metrics…</p>
      </div>
    );
  }

  return (
    <div className="page metrics-page">
      <h1>Model Performance</h1>
      <p className="subtitle">
        Real evaluation results from the training run behind this app — every number below comes
        straight from the evaluation report, not hand-typed.
      </p>

      <HeadlineCards headline={metrics.headline} />

      <section className="metrics-section">
        <DeploymentNote deployment={metrics.deployment} />
      </section>

      <section className="metrics-section">
        <h2>Model comparison</h2>
        <ModelComparisonChart perModel={metrics.per_model} />
      </section>

      <section className="metrics-section">
        <h2>Confusion matrix</h2>
        <ConfusionMatrix matrix={metrics.confusion_matrix} grades={metrics.grades} />
      </section>

      <section className="metrics-section">
        <h2>Per-class precision / recall / F1</h2>
        <PerClassTable perClass={metrics.per_class} />
      </section>

      <section className="metrics-section">
        <h2>ROC curves</h2>
        <RocCurves roc={metrics.roc} />
      </section>

      <section className="metrics-section">
        <h2>Training curves</h2>
        <TrainingCurves curves={metrics.training_curves} />
      </section>

      <section className="metrics-section">
        <h2>Dataset</h2>
        <DatasetSummary dataset={metrics.dataset} grades={metrics.grades} />
      </section>

      <section className="metrics-section">
        <h2>Limitations</h2>
        <LimitationsList limitations={metrics.limitations} />
      </section>
    </div>
  );
}
