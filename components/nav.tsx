"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ThemeToggle } from "./theme-toggle";
import { useScrollDirection } from "@/hooks/use-scroll-direction";
import { stagger } from "@/lib/style-vars";

const LINKS = [
  { href: "/", label: "Home" },
  { href: "/writing", label: "Writing" },
  { href: "/projects", label: "Projects" },
  { href: "/about", label: "About" },
];

export function Nav() {
  const pathname = usePathname();
  const hidden = useScrollDirection();

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
