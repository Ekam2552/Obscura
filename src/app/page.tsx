import Hero from "@/components/Hero/Hero";
import EditorialSection from "@/components/EditorialSection/EditorialSection";
import TelemetryGrid from "@/components/TelemetryGrid/TelemetryGrid";
import OutroSection from "@/components/OutroSection/OutroSection";

export default function Home() {
  return (
    <main>
      <Hero />
      <EditorialSection />
      <TelemetryGrid />
      <OutroSection />
    </main>
  );
}
