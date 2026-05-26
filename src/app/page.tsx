import Hero from "@/components/Hero/Hero";
import EditorialSection from "@/components/EditorialSection/EditorialSection";
import TelemetryGrid from "@/components/TelemetryGrid/TelemetryGrid";
import CtaSection from "@/components/CtaSection/CtaSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <EditorialSection />
      <TelemetryGrid />
      <CtaSection />
    </main>
  );
}
