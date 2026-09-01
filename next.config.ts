import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import { lightCodeTheme, darkCodeTheme } from "./lib/code-theme";

// pageExtensions matches Next's own documented MDX dynamic-import pattern.
// content/posts/*.mdx never becomes a route from this alone — Next only
// treats a file as a page when it lives under app/ or pages/, and content/
// is neither — but it's what the loader registration is verified against.
const nextConfig: NextConfig = {
  pageExtensions: ["ts", "tsx", "js", "jsx", "md", "mdx"],
  // The dev-mode corner badge, not the site's own UI — off so nothing
  // Next-branded shows up while working locally.
  devIndicators: false,
};

// Turbopack (the default bundler here) can't accept JS function references
// for remark/rehype plugins — only plain strings, with serializable options
// tuples. Theme objects are plain data, so they pass through fine.
const withMDX = createMDX({
  options: {
    remarkPlugins: ["remark-gfm", "remark-frontmatter"],
    rehypePlugins: [
      "rehype-slug",
      ["rehype-autolink-headings", { behavior: "wrap" }],
      [
        "rehype-pretty-code",
        {
          theme: { light: lightCodeTheme, dark: darkCodeTheme },
          keepBackground: false,
        },
      ],
    ],
  },
});

export default withMDX(nextConfig);
