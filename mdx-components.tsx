import type { MDXComponents } from "mdx/types";
import { Side } from "@/components/side";
import { Callout } from "@/components/callout";
import { Figure } from "@/components/figure";

// Global to every MDX file. Per-post demos are imported directly in the
// post that uses them instead — nothing ships on posts that don't.
const components = {
  Side,
  Callout,
  Figure,
} satisfies MDXComponents;

export function useMDXComponents(): MDXComponents {
  return components;
}
