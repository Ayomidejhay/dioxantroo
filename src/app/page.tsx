import React from "react";
import { Navbar } from "@/components/organisms/Navbar";
import { HeroSection } from "@/components/organisms/HeroSection";
import { MetricsBar } from "@/components/organisms/MetricsBar";
import { BentoFeatures } from "@/components/organisms/BentoFeatures";
import { ArchitectureSection } from "@/components/organisms/ArchitectureSection";
import { TestimonialsSection } from "@/components/organisms/TestimonialsSection";
import { FaqSection } from "@/components/organisms/FaqSection";
import { CtaSection } from "@/components/organisms/CtaSection";
import { Footer } from "@/components/organisms/Footer";

export default function HomePage() {
  return (
    <div className="relative min-h-screen bg-slate-950 text-slate-100 flex flex-col selection:bg-cyan-500/30 selection:text-white">
      {/* Top Navbar */}
      <Navbar />

      {/* Main Landmark */}
      <main className="flex-1">
        {/* Hero Section with Live Telemetry */}
        <HeroSection />

        {/* Enterprise Metrics Bar */}
        <MetricsBar />

        {/* Bento Grid Feature Showcase */}
        <BentoFeatures />

        {/* Interactive 4-Step Architecture & Code Walkthrough */}
        <ArchitectureSection />

        {/* Institutional & Developer Testimonials */}
        <TestimonialsSection />

        {/* Frequently Asked Questions */}
        <FaqSection />

        {/* Aurora Call-To-Action */}
        <CtaSection />
      </main>

      {/* Semantic Footer */}
      <Footer />
    </div>
  );
}
