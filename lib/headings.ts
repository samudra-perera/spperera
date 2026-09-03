import GithubSlugger from "github-slugger";

export type Heading = {
  depth: 2 | 3;
  text: string;
  slug: string;
};

// Strips the inline markdown syntax rehype-slug would never see (it slugs
// rendered text, not raw markdown) — links, bold/italic, inline code —
// so a heading like "Using `useEffect` correctly" slugs the same way here
// as it does in the actual rendered page.
function toPlainText(raw: string): string {
  return raw
    .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
    .replace(/[*_`]+/g, "")
    .trim();
}

// Scans raw MDX for ## / ### lines. Content headings are plain text today,
// but toPlainText keeps this correct if that changes. Uses github-slugger
// directly — the same package rehype-slug uses internally — so generated
// slugs match the actual heading ids exactly.
export function extractHeadings(source: string): Heading[] {
  const slugger = new GithubSlugger();
  const headings: Heading[] = [];

  for (const line of source.split("\n")) {
    const match = line.match(/^(#{2,3})\s+(.+?)\s*$/);
    if (!match) continue;

    const text = toPlainText(match[2]);
    if (!text) continue;

    headings.push({
      depth: match[1].length as 2 | 3,
      text,
      slug: slugger.slug(text),
    });
  }

  return headings;
}
