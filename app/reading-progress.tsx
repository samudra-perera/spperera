"use client";

import { useEffect, useRef } from "react";

// Scroll-linked width, updated imperatively via ref (not state) so this
// doesn't re-render the tree on every scroll tick.
export function ReadingProgress() {
  const barRef = useRef<HTMLDivElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        const max = document.documentElement.scrollHeight - window.innerHeight;
        const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
        if (barRef.current) barRef.current.style.width = `${pct}%`;
        ticking.current = false;
      });
    }

    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return <div className="prog" ref={barRef} aria-hidden="true" />;
}
