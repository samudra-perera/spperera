"use client";

import { useTheme } from "next-themes";
import { useMounted } from "@/hooks/use-mounted";

const ORDER = ["system", "light", "dark"] as const;
type Theme = (typeof ORDER)[number];

const ICONS: Record<Theme, React.ReactNode> = {
  system: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <rect x="2.5" y="4" width="19" height="13" rx="2" />
      <path d="M8 20.5h8" />
    </svg>
  ),
  light: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <circle cx="12" cy="12" r="4.2" />
      <path d="M12 2.6v2M12 19.4v2M2.6 12h2M19.4 12h2M5.4 5.4l1.4 1.4M17.2 17.2l1.4 1.4M18.6 5.4l-1.4 1.4M6.8 17.2l-1.4 1.4" />
    </svg>
  ),
  dark: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round">
      <path d="M20 13.4A8.2 8.2 0 1 1 10.6 4a6.6 6.6 0 0 0 9.4 9.4z" />
    </svg>
  ),
};

export function ThemeToggle() {
  const { theme, setTheme } = useTheme();
  const mounted = useMounted();

  const current: Theme = mounted && ORDER.includes(theme as Theme) ? (theme as Theme) : "system";

  function cycle() {
    const next = ORDER[(ORDER.indexOf(current) + 1) % ORDER.length];
    setTheme(next);
  }

  return (
    <button
      type="button"
      className="theme-toggle"
      onClick={cycle}
      aria-label="Switch theme"
      title={mounted ? `Theme: ${current}` : undefined}
    >
      {ICONS[current]}
    </button>
  );
}
