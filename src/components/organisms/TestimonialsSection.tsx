import React from "react";
import { TESTIMONIALS } from "@/lib/constants";
import { TestimonialCard } from "@/components/molecules/TestimonialCard";
import { Badge } from "@/components/atoms/Badge";
import { GradientText } from "@/components/atoms/GradientText";
import { ShieldCheckIcon } from "@/components/atoms/Icons";

export const TestimonialsSection: React.FC = () => {
  return (
    <section id="testimonials" className="relative py-28 border-t border-white/5">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16 space-y-4">
          <Badge variant="cyan" size="md">
            <ShieldCheckIcon size={14} className="text-cyan-400" />
            <span>Institutional Validation</span>
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Trusted by Builders &amp; <GradientText variant="cyan">Market Makers</GradientText>
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            See how quantitative funds, DeFi protocols, and decentralized AI networks leverage Doxa to achieve unprecedented execution speed.
          </p>
        </div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {TESTIMONIALS.map((item, idx) => (
            <TestimonialCard
              key={idx}
              quote={item.quote}
              author={item.author}
              role={item.role}
              company={item.company}
              avatar={item.avatar}
              verifiedBadge={item.verifiedBadge}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

