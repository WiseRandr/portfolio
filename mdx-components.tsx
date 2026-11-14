import type { ReactNode } from "react";
import type { MDXComponents } from "mdx/types";
import { AllotmentRequestDemo } from "@/components/case-study/AllotmentRequestDemo";
import { ArchitectureComparison } from "@/components/case-study/ArchitectureComparison";
import { DeliveryCoordinationDiagram } from "@/components/case-study/DeliveryCoordinationDiagram";
import { DocumentAccessDemo } from "@/components/case-study/DocumentAccessDemo";
import { FlydeskDataFlowDiagram } from "@/components/case-study/FlydeskDataFlowDiagram";
import { FlydeskTestMatrix } from "@/components/case-study/FlydeskTestMatrix";
import { LiveTrackingDemo } from "@/components/case-study/LiveTrackingDemo";
import { LocationFlowDiagram } from "@/components/case-study/LocationFlowDiagram";
import { PasscodeFlowDiagram } from "@/components/case-study/PasscodeFlowDiagram";
import { SchedulingPolicyDemo } from "@/components/case-study/SchedulingPolicyDemo";

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
  return { Placeholder, LiveTrackingDemo, LocationFlowDiagram, ArchitectureComparison, DocumentAccessDemo, AllotmentRequestDemo, PasscodeFlowDiagram, DeliveryCoordinationDiagram, SchedulingPolicyDemo, FlydeskDataFlowDiagram, FlydeskTestMatrix, ...components };
}
