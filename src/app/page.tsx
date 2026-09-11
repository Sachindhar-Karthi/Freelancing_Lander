import { Navigation } from "@/components/blocks/navigation";
import { HeroSection } from "@/components/blocks/hero-section";
import { CapabilityStrip } from "@/components/blocks/capability-strip";
import { ProjectShowcase } from "@/components/blocks/project-showcase";
import { ServicesSection } from "@/components/blocks/services-section";
import { ProcessSection } from "@/components/blocks/process-section";
import { BentoGrid } from "@/components/blocks/bento-grid";
import { AboutSection } from "@/components/blocks/about-section";
import { TrustSection } from "@/components/blocks/trust-section";
import { Footer } from "@/components/blocks/footer";
import { Scene } from "@/components/three/Scene";

export default function Home() {
  return (
    <main className="relative min-h-screen">
      {/* 3D R3F Spatial Canvas */}
      <Scene />
      
      {/* Structured Content Architecture */}
      <div className="relative z-10 w-full overflow-hidden">
        <Navigation />
        <HeroSection />
        <CapabilityStrip />
        <ProjectShowcase />
        <ServicesSection />
        <ProcessSection />
        <BentoGrid />
        <AboutSection />
        <TrustSection />
        <Footer />
      </div>
    </main>
  );
}
