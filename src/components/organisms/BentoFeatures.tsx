import React from "react";
import { FEATURES } from "@/lib/constants";
import { FeatureCard } from "@/components/molecules/FeatureCard";
import { Badge } from "@/components/atoms/Badge";
import { GradientText } from "@/components/atoms/GradientText";
import { SparklesIcon } from "@/components/atoms/Icons";

export const BentoFeatures: React.FC = () => {
  return (
    <section id="features" className="relative py-28 overflow-hidden">
      {/* Background radial glow */}
      <div className="absolute top-1/2 left-1/4 w-[500px] h-[500px] bg-cyan-600/10 rounded-full blur-[140px] pointer-events-none" />
      <div className="absolute bottom-10 right-1/4 w-[500px] h-[500px] bg-violet-600/10 rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="cyan" size="md">
            <SparklesIcon size={14} className="text-cyan-400" />
            <span>Next-Generation Architecture</span>
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Engineered for <GradientText variant="cyan">Uncompromising</GradientText> Performance
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            Every layer of the Doxa protocol is built from the silicon up for ultra-low latency,
            verifiable zero-knowledge proofs, and sovereign cryptographic autonomy.
          </p>
        </div>

        {/* Bento Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {FEATURES.map((feature, idx) => (
            <FeatureCard
              key={feature.id}
              id={feature.id}
              badge={feature.badge}
              title={feature.title}
              description={feature.description}
              icon={feature.icon}
              gradient={feature.gradient}
              borderHighlight={feature.borderHighlight}
              metricsHighlight={feature.metricsHighlight}
              className={idx === 0 || idx === 1 ? "lg:col-span-1" : ""}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

