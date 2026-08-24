import type { ReactNode } from "react";

// A margin note. Floats into the page gutter beside its paragraph at
// >=1120px (see .side in styles/globals.css) — no wrapper div needed around
// the paragraph it annotates, since float positions at its point in the flow.
export function Side({ children }: { children: ReactNode }) {
  return <aside className="side">{children}</aside>;
}
