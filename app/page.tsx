import Link from "next/link";
import { stagger } from "@/lib/style-vars";
import { getProject } from "@/lib/projects";
import { getAllPosts } from "@/lib/posts";

// Hand-picked for the homepage teaser rather than sorted — every project
// below is dated 2024, so "most recent" isn't a meaningful ordering.
const FEATURED_PROJECT_SLUGS = ["transparence", "street-camera-optimizer"];

type Job = {
  role: string;
  at: string;
  date: string;
  description: string;
  tags?: string[];
};

const EXPERIENCE: Job[] = [
  {
    role: "Software Developer Intern",
    at: "Airbus",
    date: "2025 — 2026",
    description:
      "C++ on a flight-planning platform — built a shared Zip library adopted across three product teams, cutting per-query weather data transfer from multiple GB to 30–40 MB.",
    tags: ["C++"],
  },
  {
    role: "Software Engineering Intern",
    at: "Spingle.ai",
    date: "2024",
    description:
      "One of three engineers alongside the founding team; migrated the AI video platform to enterprise Google Cloud Vertex AI and shipped an over-the-air update system used by every user.",
    tags: ["Python", "GCP"],
  },
  {
    role: "Building Science Consultant",
    at: "WSP",
    date: "2021",
    description:
      "Engineering evaluations, budget reviews, and contract administration on construction projects — saved clients over $500K in cost efficiencies.",
  },
];

export default function Home() {
  const projectsTeaser = FEATURED_PROJECT_SLUGS.map(getProject);
  const writingTeaser = getAllPosts().slice(0, 2);

  return (
    <>
      <div className="wrap intro">
        <h1 className="up" style={stagger(1)}>
          Samudra Perera
        </h1>
        <p className="role up" style={stagger(2)}>
          Software engineer, Toronto
        </p>
        <p className="up" style={stagger(3)}>
          I work across the stack — most recently C++ on Airbus&apos;s flight-planning
          platform, where a shared Zip library I built was adopted across three product
          teams. I&apos;m finishing my Master&apos;s at Waterloo and open to new roles.
        </p>
        <p className="sub up" style={stagger(4)}>
          Before software, I worked in consulting engineering and building science, mostly
          on project design and construction management.
        </p>
        <div className="links up" style={stagger(5)}>
          <a href="mailto:samudrapup@gmail.com">Email</a>
          <a href="https://github.com/samudra-perera">GitHub</a>
          <a href="https://linkedin.com/in/samudraperera">LinkedIn</a>
          <a href="/resume.pdf">Résumé</a>
        </div>
      </div>

      <section className="up" style={stagger(6)}>
        <div className="wrap">
          <h2>Experience</h2>
          <ul className="rows">
            {EXPERIENCE.map((job) => (
              <li className="row" key={`${job.role}-${job.at}`}>
                <div className="rtop">
                  <p className="rtitle">
                    {job.role} <span className="at">· {job.at}</span>
                  </p>
                  <span className="rdate">{job.date}</span>
                </div>
                <p className="rdesc">{job.description}</p>
                {job.tags && job.tags.length > 0 && (
                  <div className="tags">
                    {job.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                )}
              </li>
            ))}
          </ul>
          <Link className="allof" href="/about">
            Full history <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      <section className="up" style={stagger(7)}>
        <div className="wrap">
          <h2>Projects</h2>
          <ul className="rows">
            {projectsTeaser.map((project) => (
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
          <Link className="allof" href="/projects">
            All projects <span className="arrow">→</span>
          </Link>
        </div>
      </section>

      <section className="up" style={stagger(8)}>
        <div className="wrap">
          <h2>Writing</h2>
          <ul className="rows">
            {writingTeaser.map((post) => (
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
                </Link>
              </li>
            ))}
          </ul>
          <Link className="allof" href="/writing">
            All writing <span className="arrow">→</span>
          </Link>
        </div>
      </section>
    </>
  );
}
