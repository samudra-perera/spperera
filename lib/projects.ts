import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { extractHeadings, type Heading } from "./headings";

const PROJECTS_DIR = path.join(process.cwd(), "content/projects");

export type ProjectLink = {
  label: string;
  href: string;
};

export type ProjectFrontmatter = {
  title: string;
  date: string;
  summary: string;
  tags: string[];
  links: ProjectLink[];
  published: boolean;
};

export type Project = ProjectFrontmatter & { slug: string; headings: Heading[] };

export function getProjectSlugs(): string[] {
  if (!fs.existsSync(PROJECTS_DIR)) return [];
  return fs
    .readdirSync(PROJECTS_DIR)
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => file.replace(/\.mdx$/, ""));
}

export function getProject(slug: string): Project {
  const filePath = path.join(PROJECTS_DIR, `${slug}.mdx`);
  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const frontmatter = data as ProjectFrontmatter;

  return { ...frontmatter, slug, headings: extractHeadings(content) };
}

// published:false hides a draft here (and from the index) while still
// allowing it to render locally at its own /projects/[slug] URL.
//
// Dates here are year-only, so ties are common — break them by slug for a
// stable order instead of leaving it to filesystem readdir order, which
// isn't guaranteed consistent between local dev and the production build.
export function getAllProjects({ includeDrafts = false } = {}): Project[] {
  return getProjectSlugs()
    .map((slug) => getProject(slug))
    .filter((project) => includeDrafts || project.published)
    .sort((a, b) => (a.date === b.date ? a.slug.localeCompare(b.slug) : a.date < b.date ? 1 : -1));
}

export function getAdjacentProjects(slug: string): { previous: Project | null; next: Project | null } {
  const projects = getAllProjects();
  const index = projects.findIndex((project) => project.slug === slug);
  if (index === -1) return { previous: null, next: null };

  return {
    previous: projects[index + 1] ?? null,
    next: projects[index - 1] ?? null,
  };
}
