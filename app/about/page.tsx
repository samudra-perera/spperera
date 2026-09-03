import type { Metadata } from "next";
import { stagger } from "@/lib/style-vars";
import { TruckCrossing } from "@/components/truck-crossing";
import { ResumeLink } from "@/components/resume-link";

export const metadata: Metadata = {
  title: "About",
  description: "Full work history and a longer bio for Samudra Perera.",
};

type Job = {
  role: string;
  at: string;
  date: string;
  description: string;
  tags?: string[];
};

const SOFTWARE: Job[] = [
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
    role: "Software Engineering Intern",
    at: "Pod",
    date: "2024",
    description:
      "Built Redux state management and REST integrations syncing Salesforce and third-party CRM data into a real-time Kanban leads dashboard.",
    tags: ["TypeScript", "Redux"],
  },
  {
    role: "Software Engineering Intern",
    at: "Spingle.ai",
    date: "2023",
    description:
      "Built a Python file-watcher that auto-rebuilt the app inside Adobe Premiere Pro on file changes, saving the team 3+ hours a week, and designed the company's landing page from scratch.",
    tags: ["Python", "React"],
  },
];

const CIVIL: Job[] = [
  {
    role: "Project Manager",
    at: "SPH",
    date: "2022",
    description:
      "Overhauled the material supply chain to cut out intermediaries, saving over 20% annually, and led the shift to CRM and scheduling software that improved resource allocation by 30%.",
  },
  {
    role: "Building Science Consultant",
    at: "WSP",
    date: "2021",
    description:
      "Engineering evaluations, budget reviews, and contract administration on construction projects — saved clients over $500K in cost efficiencies.",
  },
  {
    role: "Engineering Assistant",
    at: "Town of Oakville",
    date: "2019",
    description:
      "Contract administration and inspections on a $9.9M road resurfacing project, directing crews and resolving disputes on site.",
  },
  {
    role: "Project Coordinator",
    at: "Orlando Corporation",
    date: "2018",
    description:
      "Prepared tenders and quantity take-offs for a 440,000 sq ft refrigerated distribution centre, coordinating subcontractor bids and schedule.",
  },
  {
    role: "Assistant Capital Works Inspector",
    at: "City of Brampton",
    date: "2017",
    description:
      "Inspected municipal infrastructure for spec compliance, tracked contractor progress, and ran the project's closing audit.",
  },
  {
    role: "Civil Engineering",
    at: "SCS Consulting",
    date: "2017",
    description:
      "Drafted infrastructure project drawings in AutoCAD and LDD, ensuring compliance with company, client, and municipal standards.",
  },
  {
    role: "Geotechnical Engineering Technician",
    at: "EXP",
    date: "2016",
    description:
      "Tested and sampled asphalt and concrete on site to ASTM guidelines, and repaired sampling equipment, saving over $3,000 in replacement costs.",
  },
];

const EDUCATION: Job[] = [
  {
    role: "Master of Systems Design Engineering",
    at: "University of Waterloo",
    date: "2027",
    description: "",
  },
  {
    role: "Bachelor of Civil Engineering",
    at: "University of Waterloo",
    date: "2021",
    description: "",
  },
];

function JobRow({ job }: { job: Job }) {
  return (
    <li className="row">
      <div className="rtop">
        <p className="rtitle">
          {job.role} <span className="at">· {job.at}</span>
        </p>
        <span className="rdate">{job.date}</span>
      </div>
      {job.description && <p className="rdesc">{job.description}</p>}
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
  );
}

export default function About() {
  return (
    <>
      <div className="wrap intro">
        <h2 className="up" style={stagger(0)}>
          About
        </h2>
        <p className="up" style={stagger(1)}>
          I&apos;m a software engineer in Toronto. Most recently I worked in C++ at Airbus, on
          a flight-planning platform used for commercial flight dispatch. I&apos;m currently
          open to new roles.
        </p>
        <p className="sub up" style={stagger(2)}>
          I started in civil engineering. I studied it at Waterloo, then spent a few years in
          consulting engineering and building science — mostly project design and
          management — before moving into software. I&apos;m finishing a Master&apos;s in
          Systems Design Engineering, also at Waterloo — these internships ran alongside it.
        </p>
        <div className="links up" style={stagger(3)}>
          <a href="mailto:samudrapup@gmail.com">Email</a>
          <a href="https://github.com/samudra-perera">GitHub</a>
          <a href="https://linkedin.com/in/samudraperera">LinkedIn</a>
          <ResumeLink />
        </div>
      </div>

      <section className="up" style={stagger(4)}>
        <div className="wrap">
          <h2>Experience</h2>
          <div className="timeline">
            <ul className="rows">
              {SOFTWARE.map((job) => (
                <JobRow job={job} key={`${job.role}-${job.at}-${job.date}`} />
              ))}
            </ul>
            <TruckCrossing />
            <ul className="rows civil">
              {CIVIL.map((job) => (
                <JobRow job={job} key={`${job.role}-${job.at}-${job.date}`} />
              ))}
            </ul>
          </div>
        </div>
      </section>

      <section className="up" style={stagger(5)}>
        <div className="wrap">
          <h2>Education</h2>
          <ul className="rows">
            {EDUCATION.map((job) => (
              <JobRow job={job} key={`${job.role}-${job.date}`} />
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}
