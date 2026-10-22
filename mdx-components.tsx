import type { ReactNode } from "react";
import type { MDXComponents } from "mdx/types";

// Marks text Wise still has to write. Rendered visibly so a draft can never
// be mistaken for finished content.
function Placeholder({ children }: { children: ReactNode }) {
  return (
    <div className="my-4 rounded-xl border border-dashed border-ink-faint px-4 py-3 text-sm text-ink-muted not-italic">
      <span className="mr-2 font-medium text-ink">To fill in:</span>
      {children}
    </div>
  );
}

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return { Placeholder, ...components };
}
