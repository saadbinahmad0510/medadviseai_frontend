export interface KLDefinitions {
  '0': string;
  '1': string;
  '2': string;
  '3': string;
  '4': string;
}

export interface DatasetInfo {
  total: number;
  patients: number;
  knees: number;
  train: number;
  val: number;
  test: number;
  test_class_counts: number[];
  split: string;
  image_size: string;
  source: string;
}

export interface HeadlineMetrics {
  accuracy: number;
  macro_f1: number;
  qwk: number;
  macro_auc: number;
  acc_3class: number;
  acc_binary: number;
}

export interface PerModelMetrics {
  model: string;
  accuracy: number;
  macro_f1: number;
  qwk: number;
  macro_auc: number;
  acc_3class: number;
  acc_binary: number;
  val_qwk: number | null;
  minutes: number;
}

export interface PerClassMetrics {
  precision: number;
  recall: number;
  'f1-score': number;
  support: number;
}

export interface TrainingCurve {
  loss: number[];
  val_qwk: number[];
  val_f1: number[];
}

export interface RocCurve {
  fpr: number[];
  tpr: number[];
  auc: number;
}

export interface DeploymentInfo {
  model: string;
  params: string;
  size_mb: number;
  qwk: number;
  accuracy: number;
  acc_binary: number;
  note: string;
}

export interface InputContract {
  shape: number[];
  dtype: string;
  range: string;
  warning: string;
}

export interface Metrics {
  grades: string[];
  kl_definitions: KLDefinitions;
  dataset: DatasetInfo;
  headline: HeadlineMetrics;
  per_model: PerModelMetrics[];
  per_class: Record<string, PerClassMetrics>;
  confusion_matrix: number[][];
  training_curves: Record<string, TrainingCurve>;
  roc: Record<string, RocCurve>;
  deployment: DeploymentInfo;
  input_contract: InputContract;
  limitations: string[];
}
