import Hero from "@/components/Hero/Hero";
import EditorialSection from "@/components/EditorialSection/EditorialSection";
import TelemetryGrid from "@/components/TelemetryGrid/TelemetryGrid";

export default function Home() {
  return (
    <main>
      <Hero />
      <EditorialSection />
      <TelemetryGrid />
    </main>
  );
}
