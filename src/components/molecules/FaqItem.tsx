"use client";

import React, { useState } from "react";
import { ChevronDownIcon } from "@/components/atoms/Icons";
import { cn } from "@/lib/utils";

export interface FaqItemProps {
  question: string;
  answer: string;
  defaultOpen?: boolean;
}

export const FaqItem: React.FC<FaqItemProps> = ({
  question,
  answer,
  defaultOpen = false,
}) => {
  const [isOpen, setIsOpen] = useState(defaultOpen);

  return (
    <div className="rounded-xl border border-white/5 bg-slate-900/40 backdrop-blur-md overflow-hidden transition-all duration-200 hover:border-slate-700/80">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
        className="flex w-full items-center justify-between p-5 text-left transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
      >
        <span className="text-base font-medium text-slate-100 pr-4">
          {question}
        </span>
        <span
          className={cn(
            "shrink-0 rounded-full p-1 text-slate-400 transition-transform duration-300",
            isOpen && "rotate-180 text-cyan-400"
          )}
        >
          <ChevronDownIcon size={18} />
        </span>
      </button>

      {isOpen && (
        <div className="px-5 pb-5 pt-0 text-sm text-slate-400 leading-relaxed border-t border-white/5 mt-1">
          <p className="pt-3">{answer}</p>
        </div>
      )}
    </div>
  );
};

