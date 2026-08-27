import type { Metadata } from "next";
import Link from "next/link";
import { getAllProjects } from "@/lib/projects";
import { stagger } from "@/lib/style-vars";

export const metadata: Metadata = {
  title: "Projects",
  description: "Hackathon builds, weekend projects, and course work.",
};

export default function ProjectsIndex() {
  const projects = getAllProjects();

  return (
    <>
      <div className="wrap intro">
        <h2 className="up" style={stagger(0)}>
          Projects
        </h2>
      </div>

      <section className="up" style={stagger(1)}>
        <div className="wrap">
          <ul className="rows">
            {projects.map((project) => (
              <li className="row" key={project.slug}>
                <Link href={`/projects/${project.slug}`}>
                  <div className="rtop">
                    <p className="rtitle">
                      {project.title} <span className="arrow">→</span>
                    </p>
                    <span className="rdate">{project.date}</span>
                  </div>
                  <p className="rdesc">{project.summary}</p>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
