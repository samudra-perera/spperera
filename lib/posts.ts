import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const POSTS_DIR = path.join(process.cwd(), "content/posts");
const WORDS_PER_MINUTE = 200;

export type PostFrontmatter = {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  published: boolean;
};

export type Post = PostFrontmatter & {
  slug: string;
  readingTime: number;
};

function wordCount(text: string): number {
  const matches = text.trim().match(/\S+/g);
  return matches ? matches.length : 0;
}

export function getPostSlugs(): string[] {
  if (!fs.existsSync(POSTS_DIR)) return [];
  return fs
    .readdirSync(POSTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getPost(slug: string): Post {
  const filePath = path.join(POSTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as PostFrontmatter;

  return {
    ...frontmatter,
    slug,
    readingTime: Math.max(1, Math.ceil(wordCount(content) / WORDS_PER_MINUTE)),
  };
}

// published:false hides a draft here (and from the index) while still
// allowing it to render locally at its own /writing/[slug] URL.
export function getAllPosts({ includeDrafts = false } = {}): Post[] {
  return getPostSlugs()
    .map((slug) => getPost(slug))
    .filter((post) => includeDrafts || post.published)
    .sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getAdjacentPosts(slug: string): { previous: Post | null; next: Post | null } {
  const posts = getAllPosts();
  const index = posts.findIndex((post) => post.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    // posts[] is newest-first, so the next array index is the older post.
    previous: posts[index + 1] ?? null,
    next: posts[index - 1] ?? null,
  };
}
