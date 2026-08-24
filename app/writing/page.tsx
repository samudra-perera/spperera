import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { stagger } from "../style-vars";

export const metadata: Metadata = {
  title: "Writing",
  description: "Posts on backend systems, C++, and whatever else comes up.",
};

export default function WritingIndex() {
  const posts = getAllPosts();

  return (
    <>
      <div className="wrap intro">
        <h2 className="up" style={stagger(0)}>
          Writing
        </h2>
      </div>

      <section className="up" style={stagger(1)}>
        <div className="wrap">
          {posts.length === 0 ? (
            <p className="sub">Nothing published yet.</p>
          ) : (
            <ul className="rows">
              {posts.map((post) => (
                <li className="row" key={post.slug}>
                  <Link href={`/writing/${post.slug}`}>
                    <div className="rtop">
                      <p className="rtitle">
                        {post.title} <span className="arrow">→</span>
                      </p>
                      <span className="rdate">
                        {new Date(post.date).toLocaleDateString("en-US", {
                          month: "long",
                          year: "numeric",
                        })}
                      </span>
                    </div>
                    {post.summary && <p className="rdesc">{post.summary}</p>}
                    {post.tags && post.tags.length > 0 && (
                      <div className="tags">
                        {post.tags.map((tag) => (
                          <span className="tag" key={tag}>
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          )}
        </div>
      </section>
    </>
  );
}
