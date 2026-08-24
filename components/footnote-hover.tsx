"use client";

import { useEffect, useRef } from "react";

const DESKTOP_MIN_WIDTH = 900;
const POPOVER_MAX_WIDTH = 300;

// Wires hover-popover (desktop) / tap-to-scroll (mobile) onto whatever
// footnote refs remark-gfm rendered — a[data-footnote-ref] and their
// matching li in section[data-footnotes]. Works for any article generically,
// no per-post setup.
export function FootnoteHover() {
  const popRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!popRef.current) return;
    const pop: HTMLDivElement = popRef.current;

    const refs = Array.from(document.querySelectorAll<HTMLAnchorElement>("a[data-footnote-ref]"));
    const cleanups: Array<() => void> = [];

    refs.forEach((ref) => {
      const noteId = ref.getAttribute("href")?.slice(1);

      function onEnter() {
        if (window.innerWidth < DESKTOP_MIN_WIDTH || !noteId) return;
        const note = document.getElementById(noteId);
        if (!note) return;
        pop.innerHTML = note.innerHTML;
        pop.classList.add("on");
        const rect = ref.getBoundingClientRect();
        pop.style.top = `${window.scrollY + rect.bottom + 9}px`;
        pop.style.left = `${Math.min(rect.left, window.innerWidth - POPOVER_MAX_WIDTH - 10)}px`;
      }

      function onLeave() {
        pop.classList.remove("on");
      }

      function onClick(event: MouseEvent) {
        if (window.innerWidth >= DESKTOP_MIN_WIDTH || !noteId) return;
        const note = document.getElementById(noteId);
        if (!note) return;
        event.preventDefault();
        note.scrollIntoView({ behavior: "smooth", block: "center" });
      }

      ref.addEventListener("mouseenter", onEnter);
      ref.addEventListener("mouseleave", onLeave);
      ref.addEventListener("click", onClick);
      cleanups.push(() => {
        ref.removeEventListener("mouseenter", onEnter);
        ref.removeEventListener("mouseleave", onLeave);
        ref.removeEventListener("click", onClick);
      });
    });

    return () => cleanups.forEach((cleanup) => cleanup());
  }, []);

  return <div className="fn-popover" ref={popRef} />;
}
