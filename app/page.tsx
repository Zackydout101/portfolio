import { Navigation } from "@/components/navigation";
import { Hero } from "@/components/hero";
import { Projects } from "@/components/projects";
import { About } from "@/components/about";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { CursorGlow } from "@/components/cursor-glow";

export default function Home() {
  return (
    <main className="min-h-screen">
      <CursorGlow />
      <Navigation />
      <Hero />
      <About />
      <Projects />
      <Contact />
      <Footer />
    </main>
  );
}
