import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getAllPosts, getPost, getPostSlugs, getAdjacentPosts } from "@/lib/posts";
import { ReadingProgress } from "../../reading-progress";
import { FootnoteHover } from "../../footnote-hover";

type PageProps = {
  params: Promise<{ slug: string }>;
};

export function generateStaticParams() {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  if (!getPostSlugs().includes(slug)) return {};
  const post = getPost(slug);
  return { title: post.title, description: post.summary };
}

export default async function ArticlePage({ params }: PageProps) {
  const { slug } = await params;

  if (!getPostSlugs().includes(slug)) notFound();

  const post = getPost(slug);
  const { default: Content } = await import(`@/content/posts/${slug}.mdx`);
  const { previous, next } = getAdjacentPosts(slug);

  return (
    <>
      <ReadingProgress />
      <div className="wrap">
        <Link className="back" href="/writing">
          <span className="ar">←</span> Writing
        </Link>

        <div className="ahead">
          <h1>{post.title}</h1>
          <div className="ameta">
            <span>
              {new Date(post.date).toLocaleDateString("en-US", { month: "long", year: "numeric" })}
            </span>
            <span className="dot" />
            <span>{post.readingTime} min</span>
            {post.tags.map((tag) => (
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
              <Link href={`/writing/${previous.slug}`}>
                <span>Previous</span>
                <p>{previous.title}</p>
              </Link>
            ) : (
              <span />
            )}
            {next ? (
              <Link className="pager-next" href={`/writing/${next.slug}`}>
                <span>Next</span>
                <p>{next.title}</p>
              </Link>
            ) : (
              <span />
            )}
          </nav>
        )}
      </div>
      <FootnoteHover />
    </>
  );
}
