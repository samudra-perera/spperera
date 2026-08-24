"use client";

import { useMemo, useState } from "react";

type PayloadDemoProps = {
  min: number;
  max: number;
  initial: number;
};

const BAR_COUNT = 12;

export function PayloadDemo({ min, max, initial }: PayloadDemoProps) {
  const [hours, setHours] = useState(initial);

  const bars = useMemo(() => {
    return Array.from({ length: BAR_COUNT }, (_, i) => {
      const fraction = Math.min(1, (hours / max) * (0.55 + 0.45 * Math.sin((i / BAR_COUNT) * Math.PI)));
      return {
        height: 12 + fraction * 84,
        old: i > BAR_COUNT * (hours / max) + 0.5,
      };
    });
  }, [hours, max]);

  const payloadMb = Math.round(6 + hours * 5.4);

  return (
    <div className="demo">
      <div className="dtop">
        <span>Payload per forecast cycle</span>
        <span>~{payloadMb} MB</span>
      </div>
      <div className="bars">
        {bars.map((bar, i) => (
          <div key={i} className={`bar2${bar.old ? " old" : ""}`} style={{ height: `${bar.height}%` }} />
        ))}
      </div>
      <div className="ctl">
        <label htmlFor="payload-slider">Query window</label>
        <input
          id="payload-slider"
          type="range"
          min={min}
          max={max}
          value={hours}
          onChange={(event) => setHours(Number(event.target.value))}
        />
        <span className="val">
          {hours} {hours === 1 ? "hour" : "hours"}
        </span>
      </div>
    </div>
  );
}
