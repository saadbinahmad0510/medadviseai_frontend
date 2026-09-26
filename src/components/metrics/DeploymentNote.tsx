import { DeploymentInfo } from '@/types/metrics';

export default function DeploymentNote({ deployment }: { deployment: DeploymentInfo }) {
  return (
    <div className="deployment-note">
      <h3>Deployed model: {deployment.model}</h3>
      <p className="deployment-note-stats">
        {deployment.params} params &middot; {deployment.size_mb}MB &middot; QWK{' '}
        {deployment.qwk.toFixed(3)} &middot; Accuracy {(deployment.accuracy * 100).toFixed(1)}% &middot;
        Binary accuracy {(deployment.acc_binary * 100).toFixed(1)}%
      </p>
      <p>{deployment.note}</p>
    </div>
  );
}
