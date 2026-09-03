"use client";

import { useEffect, useRef } from "react";
import type { Heading } from "@/lib/headings";

// Renders as a plain link list (works with no JS); the effect below is
// purely an enhancement layer that highlights whichever section is
// currently in view, scrollspy-style. rAF-throttled scroll listener,
// same technique as the reading-progress bar — tried IntersectionObserver
// first, but it only updates on continuous scrolling: an instant jump
// (scrollbar drag, browser back-navigation restoring scroll position)
// can skip a heading's trigger band entirely and never fire an "entering"
// event, leaving the wrong link active. Computing the active heading
// directly from current scroll position on every tick has no such gap.
export function TableOfContents({ headings }: { headings: Heading[] }) {
  const navRef = useRef<HTMLElement>(null);
  const ticking = useRef(false);

  useEffect(() => {
    const nav = navRef.current;
    if (!nav) return;

    const links = new Map(
      Array.from(nav.querySelectorAll<HTMLAnchorElement>("a[href^='#']")).map((a) => [
        a.getAttribute("href")!.slice(1),
        a,
      ]),
    );

    const targets = headings
      .map((h) => document.getElementById(h.slug))
      .filter((el): el is HTMLElement => el !== null);

    if (targets.length === 0) return;

    let activeId: string | null = null;
    const TRIGGER_LINE = 120;

    function setActive(id: string) {
      if (activeId === id) return;
      if (activeId) links.get(activeId)?.classList.remove("active");
      links.get(id)?.classList.add("active");
      activeId = id;
    }

    function updateActive() {
      // A trailing section is often too short for its heading to ever
      // reach TRIGGER_LINE before scrolling maxes out — there's just not
      // enough content left below it. Snap to the last heading once the
      // page is actually scrolled to the bottom, independent of geometry.
      const atBottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4;
      if (atBottom) {
        setActive(targets[targets.length - 1].id);
        return;
      }

      let current = targets[0];
      for (const el of targets) {
        if (el.getBoundingClientRect().top <= TRIGGER_LINE) current = el;
      }
      setActive(current.id);
    }

    function onScroll() {
      if (ticking.current) return;
      ticking.current = true;
      requestAnimationFrame(() => {
        updateActive();
        ticking.current = false;
      });
    }

    updateActive();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);

    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, [headings]);

  // A TOC only earns its keep with more than a couple of sections.
  if (headings.length < 2) return null;

  return (
    <nav className="toc" aria-label="Table of contents" ref={navRef}>
      <ul>
        {headings.map((heading) => (
          <li key={heading.slug} className={heading.depth === 3 ? "toc-sub" : undefined}>
            <a href={`#${heading.slug}`}>{heading.text}</a>
          </li>
        ))}
      </ul>
    </nav>
  );
}
