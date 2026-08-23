import { ThemeToggle } from "./theme-toggle";

// Placeholder — replaced by the real homepage in the next commit.
// Exists here to sanity-check tokens, fonts, and the theme toggle.
export default function Home() {
  return (
    <main style={{ maxWidth: 640, margin: "0 auto", padding: "72px 24px" }}>
      <div style={{ display: "flex", justifyContent: "flex-end", marginBottom: 24 }}>
        <ThemeToggle />
      </div>
      <h1 style={{ fontSize: 22, fontWeight: 600, letterSpacing: "-0.01em", margin: "0 0 6px" }}>
        Samudra Perera
      </h1>
      <p style={{ fontSize: 16, color: "var(--muted)", margin: "0 0 20px" }}>
        Software engineer, Toronto
      </p>
      <p style={{ fontFamily: "var(--font-mono)", fontSize: 13, color: "var(--faint)" }}>
        Foundation check: tokens, Instrument Sans / JetBrains Mono, theme toggle.
      </p>
    </main>
  );
}
