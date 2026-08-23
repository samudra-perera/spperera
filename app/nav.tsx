"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { stagger } from "./style-vars";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/writing", label: "Writing" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

// Hide once scrolled past this many px, so a small scroll near the top
// doesn't flicker the bar away.
const HIDE_THRESHOLD = 80;

export function Nav() {
  const pathname = usePathname();
  const [hidden, setHidden] = useState(false);
  const lastY = useRef(0);

  useEffect(() => {
    lastY.current = window.scrollY;

    function onScroll() {
      const y = window.scrollY;
      const scrollingDown = y > lastY.current;
      setHidden(y > HIDE_THRESHOLD && scrollingDown);
      lastY.current = y;
    }

    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`site-header${hidden ? " nav-hidden" : ""}`}>
      <div className="wrap">
        <nav className="nav up" style={stagger(0)}>
          {LINKS.map((link) => {
            const active = link.href === "/" ? pathname === "/" : pathname.startsWith(link.href);
            return (
              <Link key={link.href} href={link.href} aria-current={active ? "page" : undefined}>
                {link.label}
              </Link>
            );
          })}
          <span className="spacer" />
          <ThemeToggle />
        </nav>
      </div>
    </header>
  );
}
