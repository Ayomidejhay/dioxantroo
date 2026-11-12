import React from "react";
import { FAQS } from "@/lib/constants";
import { FaqItem } from "@/components/molecules/FaqItem";
import { Badge } from "@/components/atoms/Badge";
import { GradientText } from "@/components/atoms/GradientText";
import { SparklesIcon } from "@/components/atoms/Icons";

export const FaqSection: React.FC = () => {
  return (
    <section id="faq" className="relative py-28 border-t border-white/5 bg-slate-950/60">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge variant="cyan" size="md">
            <SparklesIcon size={14} className="text-cyan-400" />
            <span>Developer Questions</span>
          </Badge>
          <h2 className="text-3xl sm:text-5xl font-extrabold tracking-tight text-white">
            Frequently Asked <GradientText variant="cyan">Questions</GradientText>
          </h2>
          <p className="text-base text-slate-400">
            Everything you need to know about integrating, verifying, and deploying with Doxa.
          </p>
        </div>

        {/* FAQs */}
        <div className="space-y-4">
          {FAQS.map((faq, idx) => (
            <FaqItem
              key={idx}
              question={faq.question}
              answer={faq.answer}
              defaultOpen={idx === 0}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

