import Image from "next/image";
import Link from "next/link";
import photo from "@/assets/profile-photo.webp";
import { profile } from "@/data/profile";
import { publicPath } from "@/lib/paths";
import { Container } from "../Container";

export function Hero() {
  return (
    <section aria-labelledby="hero-title" className="pb-10 pt-6 sm:pb-16 sm:pt-24">
      <Container className="grid items-center gap-6 sm:grid-cols-[1fr_auto] sm:gap-10">
        <div>
          <div className="flex items-center gap-3">
            <Image
              src={photo}
              alt={`Portrait of ${profile.name}`}
              width={56}
              height={56}
              priority
              className="h-14 w-14 flex-none rounded-full border border-line object-cover sm:hidden"
            />
            <p className="leading-snug">
              <span className="block font-medium">{profile.name}</span>
              <span className="block text-ink-muted">{profile.title}</span>
            </p>
          </div>
          <p className="mt-4 inline-flex items-center gap-2 rounded-full bg-ok-soft px-3 py-1 text-sm text-ok sm:mt-6">
            <span className="h-2 w-2 flex-none rounded-full bg-ok" aria-hidden="true" />
            {profile.openTo}
          </p>
          <h1 id="hero-title" className="mt-4 max-w-2xl font-serif text-[2rem] leading-[1.12] tracking-tight sm:mt-6 sm:text-6xl">
            {profile.headline}
          </h1>
          <p className="mt-4 max-w-xl text-base leading-relaxed text-ink-muted sm:mt-6 sm:text-lg">{profile.summary}</p>
          <div className="mt-6 flex flex-wrap gap-3 sm:mt-8">
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
          className="hidden h-44 w-44 rounded-full border border-line object-cover sm:block"
        />
      </Container>
    </section>
  );
}
