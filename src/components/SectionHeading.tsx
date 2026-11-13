export function SectionHeading({ id, eyebrow, title }: { id: string; eyebrow: string; title: string }) {
  return (
    <div className="mb-10">
      <p className="text-sm uppercase tracking-[0.14em] text-ink-faint">{eyebrow}</p>
      <h2 id={id} className="mt-2 font-serif text-3xl tracking-tight sm:text-4xl">
        {title}
      </h2>
    </div>
  );
}
