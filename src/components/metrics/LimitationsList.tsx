export default function LimitationsList({ limitations }: { limitations: string[] }) {
  return (
    <ul className="limitations-list">
      {limitations.map((item) => (
        <li key={item}>{item}</li>
      ))}
    </ul>
  );
}
