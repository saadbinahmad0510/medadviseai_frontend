export default function ConfusionMatrix({
  matrix,
  grades,
}: {
  matrix: number[][];
  grades: string[];
}) {
  const max = Math.max(...matrix.flat());

  return (
    <div className="confusion-matrix-wrap">
      <p className="confusion-matrix-axis-label">Predicted &rarr;</p>
      <table className="confusion-matrix">
        <thead>
          <tr>
            <th></th>
            {grades.map((g) => (
              <th key={g}>{g}</th>
            ))}
          </tr>
        </thead>
        <tbody>
          {matrix.map((row, i) => (
            <tr key={grades[i]}>
              <th>{grades[i]}</th>
              {row.map((value, j) => (
                <td
                  key={j}
                  className={i === j ? 'confusion-matrix-diag' : ''}
                  style={{ background: `rgba(15, 118, 110, ${max ? value / max : 0})` }}
                >
                  {value}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
      <p className="confusion-matrix-axis-label confusion-matrix-axis-label-y">&darr; True</p>
    </div>
  );
}
