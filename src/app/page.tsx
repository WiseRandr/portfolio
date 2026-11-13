import { About } from "@/components/home/About";
import { Experience } from "@/components/home/Experience";
import { Hero } from "@/components/home/Hero";
import { ProofBar } from "@/components/home/ProofBar";
import { SelectedWork } from "@/components/home/SelectedWork";
import { ContactCTA } from "@/components/ContactCTA";

export default function Home() {
  return (
    <>
      <Hero />
      <ProofBar />
      <SelectedWork />
      <Experience />
      <About />
      <ContactCTA />
    </>
  );
}
