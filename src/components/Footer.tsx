import { profile } from "@/data/profile";
import { Container } from "./Container";

export function Footer() {
  return (
    <footer className="border-t border-line py-10 text-sm text-ink-faint">
      <Container className="flex flex-col justify-between gap-3 sm:flex-row">
        <p>
          © {new Date().getFullYear()} {profile.name}
        </p>
        <p>Built with Next.js, TypeScript, and Tailwind CSS.</p>
      </Container>
    </footer>
  );
}
