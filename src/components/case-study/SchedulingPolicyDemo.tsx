"use client";

import { useId, useState } from "react";

// An original, schematic scheduling screen with fictional companies, people and
// policies. One schedule is checked against the selected company's policy; the
// schedule itself is kept when the company changes, so a conflict is always
// explained rather than silently cleared. Nothing is sent anywhere.

type Location = "Remote" | "Office" | "Coworking";
type CompanyId = "lumen" | "cedar";
type Day = { day: string; morning: Location; afternoon: Location };

const LOCATIONS: Location[] = ["Remote", "Office", "Coworking"];

const COMPANIES: Record<CompanyId, { name: string; policy: string; splitDays: boolean }> = {
  lumen: {
    name: "Lumen Works",
    policy: "Morning and afternoon can be in different locations.",
    splitDays: true,
  },
  cedar: {
    name: "Cedar Row Co.",
    policy: "One location for the whole day: morning and afternoon must match.",
    splitDays: false,
  },
};

const INITIAL: Day[] = [
  { day: "Monday", morning: "Office", afternoon: "Office" },
  { day: "Tuesday", morning: "Remote", afternoon: "Office" },
  { day: "Wednesday", morning: "Coworking", afternoon: "Coworking" },
];

const describe = (d: Day) => (d.morning === d.afternoon ? `${d.morning} all day` : `${d.morning}, then ${d.afternoon}`);

function OkIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 flex-none text-brand-violet" aria-hidden="true">
      <circle cx="8" cy="8" r="6.75" fill="none" stroke="currentColor" strokeWidth="1.4" />
      <path d="M5 8.2 L7.1 10.2 L11 6" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function ConflictIcon() {
  return (
    <svg viewBox="0 0 16 16" className="mt-0.5 h-4 w-4 flex-none text-brand-pink" aria-hidden="true">
      <path d="M8 1.8 L14.6 13.6 H1.4 Z" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinejoin="round" />
      <path d="M8 6 V9.4" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" />
      <circle cx="8" cy="11.6" r="0.9" fill="currentColor" />
    </svg>
  );
}

const control =
  "focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-accent";

export function SchedulingPolicyDemo() {
  const id = useId();
  const [companyId, setCompanyId] = useState<CompanyId>("cedar");
  const [days, setDays] = useState<Day[]>(INITIAL);
  const company = COMPANIES[companyId];

  const conflicts = days.filter((d) => !company.splitDays && d.morning !== d.afternoon);
  const update = (index: number, patch: Partial<Day>) =>
    setDays((prev) => prev.map((d, i) => (i === index ? { ...d, ...patch } : d)));

  return (
    <figure className="my-8" aria-labelledby={`${id}-caption`}>
      <div className="rounded-2xl border border-line bg-surface/50 p-4 sm:p-6">
        <div className="text-sm leading-relaxed text-ink-muted">
          The same scheduling experience must reflect the selected company&apos;s rules. Try a split day, then switch
          company.
        </div>

        <div className="mt-4 rounded-xl border border-line bg-bg p-4">
          <fieldset>
            <legend className="text-xs font-medium text-ink">Company (fictional)</legend>
            <div className="mt-2 inline-flex flex-wrap gap-1 rounded-full border border-line p-1">
              {(Object.keys(COMPANIES) as CompanyId[]).map((key) => (
                <label
                  key={key}
                  className={`cursor-pointer rounded-full px-3.5 py-1.5 text-sm font-medium has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent ${
                    companyId === key ? "bg-ink text-bg" : "text-ink-muted hover:text-ink"
                  }`}
                >
                  <input
                    type="radio"
                    name={`${id}-company`}
                    value={key}
                    checked={companyId === key}
                    onChange={() => setCompanyId(key)}
                    className="sr-only"
                  />
                  {COMPANIES[key].name}
                </label>
              ))}
            </div>
          </fieldset>

          <div className="mt-3 rounded-lg border border-dashed border-ink-faint px-3 py-2 text-sm">
            <span className="font-medium text-ink">{company.name} policy:</span>{" "}
            <span className="text-ink-muted">{company.policy}</span>
          </div>

          <div className="mt-4 text-xs font-medium text-ink">Sam Ortega · this week (fictional)</div>
          <div role="list" className="mt-2 space-y-2">
            {days.map((d, i) => {
              const split = d.morning !== d.afternoon;
              const conflict = split && !company.splitDays;
              return (
                <div
                  key={d.day}
                  role="listitem"
                  className={`rounded-lg border px-3 py-2.5 ${conflict ? "border-dashed border-brand-pink" : "border-line"}`}
                >
                  <div className="text-sm font-medium text-ink">{d.day}</div>
                  <div className="mt-2 grid grid-cols-2 gap-2">
                    {(["morning", "afternoon"] as const).map((slot) => (
                      <label key={slot} className="text-xs text-ink-muted">
                        {slot === "morning" ? "Morning" : "Afternoon"}
                        <select
                          value={d[slot]}
                          onChange={(e) => update(i, { [slot]: e.target.value as Location })}
                          className={`mt-1 block w-full rounded-md border border-line bg-bg px-2 py-1.5 text-sm text-ink ${control}`}
                        >
                          {LOCATIONS.map((loc) => (
                            <option key={loc}>{loc}</option>
                          ))}
                        </select>
                      </label>
                    ))}
                  </div>
                  <div className="mt-2 flex gap-1.5 text-xs leading-relaxed">
                    {conflict ? <ConflictIcon /> : <OkIcon />}
                    <div className="min-w-0">
                      {!split && <span className="text-ink-muted">One location all day: fits both policies.</span>}
                      {split && !conflict && (
                        <span className="text-ink-muted">
                          <span className="font-medium text-ink">Split day allowed.</span> {company.name} lets morning
                          and afternoon differ.
                        </span>
                      )}
                      {conflict && (
                        <>
                          <span className="font-medium text-ink">Conflict:</span>{" "}
                          <span className="text-ink-muted">
                            {company.name} needs one location for the whole day, but this is {d.morning} in the
                            morning and {d.afternoon} in the afternoon. Choose one:
                          </span>
                          <span className="mt-1.5 flex flex-wrap gap-1.5">
                            {[d.morning, d.afternoon].map((loc) => (
                              <button
                                key={loc}
                                type="button"
                                onClick={() => update(i, { morning: loc, afternoon: loc })}
                                className={`rounded-full border border-line bg-bg px-2.5 py-1 text-xs font-medium text-ink hover:border-ink-faint ${control}`}
                              >
                                {loc} all day
                              </button>
                            ))}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          <div role="status" aria-live="polite" className="mt-3 text-sm text-ink">
            {conflicts.length === 0
              ? `This schedule fits the ${company.name} policy.`
              : `${conflicts.length} day${conflicts.length > 1 ? "s" : ""} conflict${
                  conflicts.length > 1 ? "" : "s"
                } with the ${company.name} policy. The schedule is kept, so you can choose an allowed option.`}
          </div>
          <div className="mt-1 text-xs leading-relaxed text-ink-faint">
            This check gives feedback in the interface; a real product must also enforce the policy in the API.
          </div>
        </div>

        {/* Subordinate, static example: who can see a shared schedule. */}
        <div className="mt-5 border-t border-line pt-4">
          <div className="text-sm font-medium text-ink">Conceptual permissions example</div>
          <div className="mt-1 text-sm text-ink-muted">Sam&apos;s schedule is shared with the Design group.</div>
          <div className="mt-3 grid gap-3 sm:grid-cols-2">
            <div className="rounded-lg border border-line bg-bg px-3 py-2.5 text-sm">
              <div className="font-medium text-ink">Priya · Design group</div>
              <div className="mt-0.5 text-xs text-ink-muted">In the group, so Sam&apos;s schedule is visible:</div>
              <div role="list" className="mt-1.5 space-y-0.5 text-xs text-ink">
                {days.map((d) => (
                  <div key={d.day} role="listitem">
                    {d.day}: {describe(d)}
                  </div>
                ))}
              </div>
            </div>
            <div className="rounded-lg border border-dashed border-ink-faint bg-bg px-3 py-2.5 text-sm">
              <div className="font-medium text-ink">Jon · Finance group</div>
              <div className="mt-0.5 text-xs text-ink-muted">
                Not in the group, so no schedule details are shown for Sam.
              </div>
            </div>
          </div>
          <div className="mt-2 text-xs leading-relaxed text-ink-faint">
            Hiding a schedule in the interface isn&apos;t access control: the API must only return schedules the viewer
            is allowed to see.
          </div>
        </div>
      </div>
      <figcaption id={`${id}-caption`} className="mt-3 text-sm leading-relaxed text-ink-faint">
        Illustrative reconstruction—not the production interface. Fictional companies and policies explain the
        scheduling constraints described here.
      </figcaption>
    </figure>
  );
}
