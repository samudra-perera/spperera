"use client";

import { useEffect, useRef, useState } from "react";

// A one-time, decorative marker at the point the timeline crosses from
// software into civil engineering. Drives across on scroll-into-view;
// prefers-reduced-motion (see styles/globals.css) skips the drive and shows
// it already parked, same as with JS disabled.
export function TruckCrossing() {
  const ref = useRef<HTMLDivElement>(null);
  const [drive, setDrive] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setDrive(true);
          observer.disconnect();
        }
      },
      { threshold: 0.4 },
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="crossing" ref={ref}>
      <svg
        className={`truck${drive ? " drive" : ""}`}
        viewBox="-8 -6 36 22"
        width="72"
        height="44"
        shapeRendering="crispEdges"
        aria-hidden="true"
      >
        <rect className="puff puff-1" x="0" y="1" width="3" height="3" />
        <rect className="puff puff-2" x="-3" y="-1" width="2" height="2" />
        <rect className="puff puff-3" x="-6" y="-3" width="2" height="2" />
        <rect x="3" y="3" width="15" height="8" fill="currentColor" />
        <rect x="19" y="6" width="6" height="5" fill="currentColor" />
        <rect x="21" y="7" width="2" height="2" fill="var(--accent)" />
        <rect x="3" y="11" width="22" height="1" fill="currentColor" />
        <rect x="6" y="12" width="3" height="3" fill="currentColor" />
        <rect x="20" y="12" width="3" height="3" fill="currentColor" />
      </svg>
      <span className={`era-label${drive ? " reveal" : ""}`}>— before software —</span>
    </div>
  );
}
