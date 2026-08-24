"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_THRESHOLD = 80;

// True once the page has scrolled down past `threshold`; flips back to
// false on any upward scroll, or when back near the top. Used to hide/show
// the sticky nav.
export function useScrollDirection(threshold = DEFAULT_THRESHOLD): boolean {
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      const scrollingDown = y > lastY.current;
      setHidden(y > threshold && scrollingDown);
      lastY.current = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);

  return hidden;
}
