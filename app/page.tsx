import Link from "next/link";
import { stagger } from "./style-vars";

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
      "Backend work on flight planning software. Wrote a C++ library adopted across product teams — replace this with the specific problem it solved.",
    tags: ["C++", "CMake", "PostgreSQL"],
  },
  {
    role: "Software Engineer",
    at: "Spingle.ai",
    date: "2024 — 2025",
    description: "One of three engineers at an early-stage startup.",
    tags: ["TypeScript", "React", "Python"],
  },
  {
    role: "Contract Administrator",
    at: "AEC consulting",
    date: "2021 — 2024",
    description: "Contract administration and site review on infrastructure projects.",
  },
];

type Project = {
  name: string;
  href: string;
  date: string;
  description: string;
  tags: string[];
};

const PROJECTS: Project[] = [
  {
    name: "mango_recruit",
    href: "#",
    date: "2026",
    description: "An AI-native applicant tracking system with explainable candidate scoring.",
    tags: ["React", "FastAPI", "Postgres"],
  },
  {
    name: "streak",
    href: "#",
    date: "2026",
    description: "A habit tracker that lives in the terminal. Built to learn Rust properly.",
    tags: ["Rust"],
  },
];

type Post = {
  title: string;
  href: string;
  date: string;
};

const WRITING: Post[] = [
  { title: "Designing a C++ library four teams wanted to use", href: "#", date: "Draft" },
  { title: "What flight planning taught me about constraint solving", href: "#", date: "Draft" },
];

export default function Home() {
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
          I work on backend systems — currently C++ for flight planning software at Airbus,
          where a library I wrote is used across several product teams.
        </p>
        <p className="sub up" style={stagger(4)}>
          Before software I spent about three years in construction contract administration,
          which is why I know what tools for that industry are actually missing.
        </p>
        <div className="links up" style={stagger(5)}>
          <a href="mailto:samudrapup@gmail.com">Email</a>
          <a href="https://github.com/samudra-perera">GitHub</a>
          <a href="#">LinkedIn</a>
          <a href="#">Résumé</a>
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
            {PROJECTS.map((project) => (
              <li className="row" key={project.name}>
                <a href={project.href}>
                  <div className="rtop">
                    <p className="rtitle">
                      {project.name} <span className="arrow">→</span>
                    </p>
                    <span className="rdate">{project.date}</span>
                  </div>
                  <p className="rdesc">{project.description}</p>
                  <div className="tags">
                    {project.tags.map((tag) => (
                      <span className="tag" key={tag}>
                        {tag}
                      </span>
                    ))}
                  </div>
                </a>
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
            {WRITING.map((post) => (
              <li className="row" key={post.title}>
                <a href={post.href}>
                  <div className="rtop">
                    <p className="rtitle">
                      {post.title} <span className="arrow">→</span>
                    </p>
                    <span className="rdate">{post.date}</span>
                  </div>
                </a>
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
