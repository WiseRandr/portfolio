import Link from "next/link";
import { profile } from "@/data/profile";
import { publicPath } from "@/lib/paths";
import { Container } from "./Container";

const navItems = [
  { href: "/#work", label: "Work" },
  { href: "/#experience", label: "Experience" },
  { href: "/#about", label: "About" },
];

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="whitespace-nowrap font-serif text-lg tracking-tight">
          <span className="sm:hidden">{profile.shortName}</span>
          <span className="hidden sm:inline">{profile.name}</span>
        </Link>
        <nav aria-label="Main" className="flex items-center gap-5 text-sm text-ink-muted">
          {navItems.map((item) => (
            <Link key={item.href} href={item.href} className="hidden hover:text-ink sm:inline">
              {item.label}
            </Link>
          ))}
          <a href={publicPath(profile.resumeFile)} className="hover:text-ink">
            Resume
          </a>
          <a
            href={`mailto:${profile.email}`}
            className="rounded-full bg-ink px-4 py-1.5 font-medium text-bg hover:opacity-90"
          >
            Contact
          </a>
        </nav>
      </Container>
    </header>
  );
}
