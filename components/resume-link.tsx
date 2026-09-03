// A visually distinct CTA, unlike the plain text links around it — this
// is the one action on the page most worth making impossible to miss.
export function ResumeLink() {
  return (
    <a className="resume-cta" href="/resume.pdf">
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v12m0 0-4-4m4 4 4-4" />
        <path d="M4 17v2a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-2" />
      </svg>
      Résumé
    </a>
  );
}
