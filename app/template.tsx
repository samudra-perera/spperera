import type { ReactNode } from "react";

// Re-mounts on every navigation (unlike layout.tsx), which is what gives
// each page its own fade-in — content is already rendered/static, this
// just animates its opacity in, so it never delays content.
export default function Template({ children }: { children: ReactNode }) {
  return <div className="page-fade">{children}</div>;
}
