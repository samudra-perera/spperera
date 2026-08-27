import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllProjects, getProject, getProjectSlugs, getAdjacentProjects } from "@/lib/projects";
import { ReadingProgress } from "@/components/reading-progress";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllProjects().map((project) => ({ slug: project.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!getProjectSlugs().includes(slug)) return {};
  const project = getProject(slug);
  return { title: project.title, description: project.summary };
}

export default async function ProjectPage({ params }: PageProps) {
  const { slug } = await params;

  if (!getProjectSlugs().includes(slug)) notFound();

  const project = getProject(slug);
  const { default: Content } = await import(`@/content/projects/${slug}.mdx`);
  const { previous, next } = getAdjacentProjects(slug);

  return (
    <>
      <ReadingProgress />
      <div className="wrap">
        <Link className="back" href="/projects">
          <span className="ar">←</span> Projects
        </Link>

        <div className="ahead">
          <h1>{project.title}</h1>
          <div className="ameta">
            <span>{project.date}</span>
            {project.tags.map((tag) => (
              <span key={tag} className="ameta-tag">
                <span className="dot" />
                <span>{tag}</span>
              </span>
            ))}
          </div>
        </div>

        <article className="prose">
          <Content />
        </article>

        {(previous || next) && (
          <nav className="pager">
            {previous ? (
              <Link href={`/projects/${previous.slug}`}>
                <span>Previous</span>
                <p>{previous.title}</p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link className="pager-next" href={`/projects/${next.slug}`}>
                <span>Next</span>
                <p>{next.title}</p>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>
    </>
  );
}
