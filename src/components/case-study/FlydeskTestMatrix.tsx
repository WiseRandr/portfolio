// Example regression scenarios written today for this case study. They are not
// the project's original test suite. Companies, people and groups are the
// fictional ones from the scheduling illustration. Static on purpose.

const COLUMNS = ["Company policy", "Attempted schedule", "Expected result", "Viewer group", "Expected visibility"];

const ROWS: string[][] = [
  ["Lumen Works: split days allowed", "Remote morning, Office afternoon", "Saved", "Design (shared)", "Sees both slots"],
  ["Cedar Row Co.: one location per day", "Remote morning, Office afternoon", "Rejected with the policy reason", "Design (shared)", "Previously saved day unchanged"],
  ["Cedar Row Co.: one location per day", "Office all day", "Saved", "Design (shared)", "Sees the day"],
  ["Cedar Row Co.: one location per day", "Office all day", "Saved", "Finance (not shared)", "No schedule details returned"],
];

const cell = "block px-3 py-1 sm:table-cell sm:py-2.5 sm:align-top";

export function FlydeskTestMatrix() {
  return (
    <figure className="my-8" aria-labelledby="flydesk-test-matrix-caption">
      <div className="rounded-2xl border border-line bg-surface/50 p-2 sm:p-3">
        <table role="table" className="w-full border-collapse text-left text-sm">
          <thead role="rowgroup" className="sr-only sm:not-sr-only sm:table-header-group">
            <tr role="row">
              {COLUMNS.map((col) => (
                <th
                  key={col}
                  role="columnheader"
                  scope="col"
                  className="px-3 py-2 text-xs font-semibold text-ink sm:border-b sm:border-line"
                >
                  {col}
                </th>
              ))}
            </tr>
          </thead>
          <tbody role="rowgroup" className="block sm:table-row-group">
            {ROWS.map((row, r) => (
              <tr
                key={r}
                role="row"
                className="block border-line py-2 not-last:border-b sm:table-row sm:py-0"
              >
                {row.map((value, c) => (
                  <td key={c} role="cell" className={`${cell} ${c === 2 || c === 4 ? "text-ink" : "text-ink-muted"}`}>
                    <span aria-hidden="true" className="mr-1 text-xs font-medium text-ink-faint sm:hidden">
                      {COLUMNS[c]}:
                    </span>
                    {value}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <figcaption id="flydesk-test-matrix-caption" className="mt-3 text-sm leading-relaxed text-ink-faint">
        Example regression scenarios I would prioritize today—not the project&apos;s original test suite.
      </figcaption>
    </figure>
  );
}
