import type { CSSProperties } from "react";

// The staggered entrance fade reads its delay off --i (see .up in styles/globals.css).
export function stagger(i: number): CSSProperties {
  return { "--i": i } as CSSProperties;
}
