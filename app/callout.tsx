import type { ReactNode } from "react";

// One kind of callout only — a rule and a label, no fill.
export function Callout({ title, children }: { title: string; children: ReactNode }) {
  return (
    <div className="callout">
      <b>{title}</b>
      {children}
    </div>
  );
}
