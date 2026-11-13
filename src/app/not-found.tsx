import Link from "next/link";
import { Container } from "@/components/Container";

export default function NotFound() {
  return (
    <Container className="py-32 text-center">
      <h1 className="font-serif text-4xl">Page not found</h1>
      <p className="mt-4 text-ink-muted">That page doesn&apos;t exist or has moved.</p>
      <Link href="/" className="mt-8 inline-block font-medium text-accent hover:underline">
        Back to the homepage
      </Link>
    </Container>
  );
}
