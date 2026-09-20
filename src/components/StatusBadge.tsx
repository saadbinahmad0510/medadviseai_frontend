export default function StatusBadge({ status }: { status: string }) {
  const isOk = status === 'ok';
  return (
    <span className={`badge ${isOk ? 'badge-ok' : 'badge-error'}`}>
      <span className="badge-dot" />
      {status}
    </span>
  );
}
