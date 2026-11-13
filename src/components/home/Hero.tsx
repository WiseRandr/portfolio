import Image from "next/image";
import Link from "next/link";
import photo from "@/assets/profile-photo.webp";
import { profile } from "@/data/profile";
import { publicPath } from "@/lib/paths";
import { Container } from "../Container";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pb-12 pt-16 sm:pb-16 sm:pt-24">
      <Container className="grid items-center gap-10 sm:grid-cols-[1fr_auto]">
        <div>
          <p className="inline-flex items-center gap-2 rounded-full bg-ok-soft px-3 py-1 text-sm text-ok">
            <span className="h-2 w-2 rounded-full bg-ok" aria-hidden="true" />
            {profile.openTo}
          </p>
          <h1 id="hero-title" className="mt-6 max-w-2xl font-serif text-4xl leading-[1.1] tracking-tight sm:text-6xl">
            {profile.headline}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-ink-muted">{profile.summary}</p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="/#work"
              className="rounded-full bg-accent px-5 py-2.5 text-sm font-medium text-white hover:opacity-90 dark:text-bg"
            >
              View my work
            </Link>
            <a
              href={publicPath(profile.resumeFile)}
              className="rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:border-ink-faint"
            >
              Download resume
            </a>
            <a
              href={`mailto:${profile.email}`}
              className="rounded-full border border-line px-5 py-2.5 text-sm font-medium hover:border-ink-faint"
            >
              Email me
            </a>
          </div>
        </div>
        <Image
          src={photo}
          alt={`Portrait of ${profile.name}`}
          width={176}
          height={176}
          priority
          className="order-first h-28 w-28 rounded-full border border-line object-cover sm:order-none sm:h-44 sm:w-44"
        />
      </Container>
    </section>
  );
}
