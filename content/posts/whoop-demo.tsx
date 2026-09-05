import whoopData from "./whoop-2026.json";

// Both charts are plain server-rendered markup, not client components. The
// underlying data is a fixed year-old snapshot, nothing here is interactive,
// so there's no reason to ship any JS for it. Reads correctly with
// JavaScript disabled by construction.

function capitalize(text: string): string {
  return text.charAt(0).toUpperCase() + text.slice(1);
}

const MONTH_ABBR = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

function monthLabel(month: string): string {
  const [, monthNum] = month.split("-");
  return MONTH_ABBR[Number(monthNum) - 1];
}

export function BedtimeChart() {
  const buckets = whoopData.bedtime_buckets;
  const maxRecovery = Math.max(...buckets.map((b) => b.recovery));

  return (
    <div className="demo">
      <div className="dtop">
        <span>Recovery score (%) by bedtime</span>
        <span>{whoopData.meta.days} nights</span>
      </div>
      <div className="wbars">
        {buckets.map((b) => (
          <div className="wbar-col" key={b.bucket}>
            <span className="wbar-val">{Math.round(b.recovery)}%</span>
            <div className="wbar-track">
              <div
                className={`wbar${b.bucket === "after 2am" ? " accent" : ""}`}
                style={{ height: `${(b.recovery / maxRecovery) * 100}%` }}
              />
            </div>
            <span className="wbar-label">{b.bucket}</span>
            <span className="wbar-n">n={b.nights}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function YearChart() {
  const months = whoopData.months;
  const maxRecovery = Math.max(...months.map((m) => m.recovery));
  const lowest = months.reduce((min, m) => (m.recovery < min.recovery ? m : min));

  return (
    <div className="demo">
      <div className="dtop">
        <span>Recovery score (%) by month</span>
        <span>
          {monthLabel(months[0].month)}&ndash;{monthLabel(months[months.length - 1].month)}
        </span>
      </div>
      <div className="wbars compact">
        {months.map((m) => (
          <div className="wbar-col" key={m.month}>
            <span className="wbar-val">{Math.round(m.recovery)}%</span>
            <div className="wbar-track">
              <div
                className={`wbar${m.month === lowest.month ? " accent" : ""}`}
                style={{ height: `${(m.recovery / maxRecovery) * 100}%` }}
              />
            </div>
            <span className="wbar-label">{monthLabel(m.month)}</span>
            <span className="wbar-n">n={m.days}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function StreakChart() {
  const stages = whoopData.strain_streak_progression;
  const maxRecovery = Math.max(...stages.map((s) => s.recovery));

  return (
    <div className="demo">
      <div className="dtop">
        <span>Recovery score (%) through a hard-training streak</span>
        <span>strain 14+</span>
      </div>
      <div className="wbars">
        {stages.map((s) => (
          <div className="wbar-col" key={s.stage}>
            <span className="wbar-val">{Math.round(s.recovery)}%</span>
            <div className="wbar-track">
              <div
                className={`wbar${s.stage === "day 3+" ? " accent" : ""}`}
                style={{ height: `${(s.recovery / maxRecovery) * 100}%` }}
              />
            </div>
            <span className="wbar-label">{capitalize(s.stage)}</span>
            <span className="wbar-n">n={s.n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function SleepBandsChart() {
  const bands = whoopData.sleep_bands;
  const maxMin = Math.max(...bands.flatMap((b) => [b.deep_min, b.rem_min]));

  return (
    <div className="demo">
      <div className="dtop">
        <span>Deep vs REM minutes by sleep duration</span>
        <span>{whoopData.meta.days} nights</span>
      </div>
      <p className="wlegend">
        <span>deep (min)</span>
        <span className="accent">REM (min)</span>
      </p>
      <div className="wbars">
        {bands.map((b) => (
          <div className="wbar-col" key={b.band}>
            <span className="wbar-val split">
              <span>{Math.round(b.deep_min)}m</span>
              <span>{Math.round(b.rem_min)}m</span>
            </span>
            <div className="wbar-track split">
              <div className="wbar-half" style={{ height: `${(b.deep_min / maxMin) * 100}%` }} />
              <div
                className="wbar-half accent"
                style={{ height: `${(b.rem_min / maxMin) * 100}%` }}
              />
            </div>
            <span className="wbar-label">{b.band}</span>
            <span className="wbar-n">n={b.nights}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function WeeklyRhythmChart() {
  const days = whoopData.weekly_rhythm;
  const maxRecovery = Math.max(...days.map((d) => d.recovery));
  const lowest = days.reduce((min, d) => (d.recovery < min.recovery ? d : min));

  return (
    <div className="demo">
      <div className="dtop">
        <span>Recovery score (%) by day of week</span>
        <span>Mon&ndash;Sun</span>
      </div>
      <div className="wbars">
        {days.map((d) => (
          <div className="wbar-col" key={d.dow}>
            <span className="wbar-val">{Math.round(d.recovery)}%</span>
            <div className="wbar-track">
              <div
                className={`wbar${d.dow === lowest.dow ? " accent" : ""}`}
                style={{ height: `${(d.recovery / maxRecovery) * 100}%` }}
              />
            </div>
            <span className="wbar-label">{d.dow.slice(0, 3)}</span>
            <span className="wbar-n">n={d.n}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function LateNightTrendChart() {
  const months = whoopData.months;
  const maxPct = Math.max(...months.map((m) => m.pct_after2));
  const peak = months.reduce((max, m) => (m.pct_after2 > max.pct_after2 ? m : max));

  return (
    <div className="demo">
      <div className="dtop">
        <span>Nights after 2am (% of month), by month</span>
        <span>
          {monthLabel(months[0].month)}&ndash;{monthLabel(months[months.length - 1].month)}
        </span>
      </div>
      <div className="wbars compact">
        {months.map((m) => (
          <div className="wbar-col" key={m.month}>
            <span className="wbar-val">{Math.round(m.pct_after2)}%</span>
            <div className="wbar-track">
              <div
                className={`wbar${m.month === peak.month ? " accent" : ""}`}
                style={{ height: `${(m.pct_after2 / maxPct) * 100}%` }}
              />
            </div>
            <span className="wbar-label">{monthLabel(m.month)}</span>
            <span className="wbar-n">n={m.days}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function RecoveryCorrelatesChart() {
  const rows = whoopData.recovery_correlates;
  const maxAbs = Math.max(...rows.map((r) => Math.abs(r.corr)));

  return (
    <div className="demo">
      <div className="dtop">
        <span>What actually predicts recovery</span>
        <span>correlation (r), &minus;1 to +1</span>
      </div>
      <ul className="whlist">
        {rows.map((r, i) => (
          <li key={r.label}>
            <span className="whlist-label">{r.label}</span>
            <div className="whlist-bar">
              <div
                className={`whlist-fill${i === 0 ? " accent" : ""}`}
                style={{ width: `${(Math.abs(r.corr) / maxAbs) * 100}%` }}
              />
            </div>
            <span className="whlist-val">
              {r.corr > 0 ? "+" : ""}
              {r.corr.toFixed(2)}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function ActivitiesChart() {
  const activities = whoopData.activities;
  const maxHours = Math.max(...activities.map((a) => a.hours));

  return (
    <div className="demo">
      <div className="dtop">
        <span>Hours by activity</span>
        <span>top {activities.length}</span>
      </div>
      <ul className="whlist">
        {activities.map((a, i) => (
          <li key={a.name}>
            <span className="whlist-label">{a.name}</span>
            <div className="whlist-bar">
              <div
                className={`whlist-fill${i === 0 ? " accent" : ""}`}
                style={{ width: `${(a.hours / maxHours) * 100}%` }}
              />
            </div>
            <span className="whlist-val">{a.hours}h</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export function TrainingVolumeChart() {
  const months = whoopData.months;
  const maxHours = Math.max(...months.map((m) => m.hours));
  const peak = months.reduce((max, m) => (m.hours > max.hours ? m : max));

  return (
    <div className="demo">
      <div className="dtop">
        <span>Training hours by month</span>
        <span>
          {monthLabel(months[0].month)}&ndash;{monthLabel(months[months.length - 1].month)}
        </span>
      </div>
      <div className="wbars compact">
        {months.map((m) => (
          <div className="wbar-col" key={m.month}>
            <span className="wbar-val">{Math.round(m.hours)}h</span>
            <div className="wbar-track">
              <div
                className={`wbar${m.month === peak.month ? " accent" : ""}`}
                style={{ height: `${(m.hours / maxHours) * 100}%` }}
              />
            </div>
            <span className="wbar-label">{monthLabel(m.month)}</span>
            <span className="wbar-n">{m.sessions}x</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export function AltitudeCompareChart() {
  const rows = whoopData.altitude_trip.compare;

  return (
    <div className="demo">
      <div className="dtop">
        <span>February average vs. the Mexico City week</span>
        <span>Feb 15&ndash;21</span>
      </div>
      <p className="wlegend">
        <span>Feb avg</span>
        <span className="accent">trip</span>
      </p>
      <div className="wcompare">
        {rows.map((r) => {
          const max = Math.max(r.feb, r.trip);
          return (
            <div key={r.metric}>
              <p className="wcompare-label">{r.metric}</p>
              <div className="wcompare-bar">
                <span className="wcompare-tag">feb</span>
                <div className="wcompare-track">
                  <div className="wcompare-fill" style={{ width: `${(r.feb / max) * 100}%` }} />
                </div>
                <span className="wcompare-val">
                  {r.feb}
                  {r.unit}
                </span>
              </div>
              <div className="wcompare-bar">
                <span className="wcompare-tag">trip</span>
                <div className="wcompare-track">
                  <div
                    className="wcompare-fill accent"
                    style={{ width: `${(r.trip / max) * 100}%` }}
                  />
                </div>
                <span className="wcompare-val">
                  {r.trip}
                  {r.unit}
                </span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export function ConfoundsChart() {
  const confounds = whoopData.confounds;
  const maxAbs = Math.max(...confounds.map((c) => Math.abs(c.naive_delta_recovery)));

  return (
    <div className="demo">
      <div className="dtop">
        <span>Looks like a finding, isn&apos;t</span>
        <span>{confounds.length} confounds</span>
      </div>
      <ul className="wconfounds">
        {confounds.map((c) => (
          <li key={c.variable}>
            <div className="wc-top">
              <span className="wc-name">{capitalize(c.variable)}</span>
              <span className="wc-delta">
                {c.naive_delta_recovery > 0 ? "+" : ""}
                {c.naive_delta_recovery} pts recovery
              </span>
            </div>
            <div className="wc-bar">
              <div
                className="wc-fill"
                style={{ width: `${(Math.abs(c.naive_delta_recovery) / maxAbs) * 100}%` }}
              />
            </div>
            <p className="wc-why">{c.why_wrong}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
