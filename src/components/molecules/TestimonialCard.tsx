import React from "react";
import { Badge } from "@/components/atoms/Badge";
import { cn } from "@/lib/utils";

export interface TestimonialCardProps {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  verifiedBadge: string;
  className?: string;
}

export const TestimonialCard: React.FC<TestimonialCardProps> = ({
  quote,
  author,
  role,
  company,
  avatar,
  verifiedBadge,
  className,
}) => {
  return (
    <div
      className={cn(
        "flex flex-col justify-between rounded-2xl bg-slate-900/40 p-6 sm:p-8 backdrop-blur-xl border border-white/5 transition-all duration-300 hover:border-slate-700/80 hover:bg-slate-900/70 hover:shadow-xl",
        className
      )}
    >
      <div>
        <div className="flex items-center justify-between gap-2 mb-6">
          <div className="flex text-amber-400 gap-1 text-sm">
            {"★★★★★"}
          </div>
          <Badge variant="cyan" size="sm" ping>
            {verifiedBadge}
          </Badge>
        </div>

        <p className="text-sm sm:text-base text-slate-300 italic leading-relaxed">
          &ldquo;{quote}&rdquo;
        </p>
      </div>

      <div className="mt-8 flex items-center gap-3 pt-4 border-t border-white/5">
        <img
          src={avatar}
          alt={author}
          width={44}
          height={44}
          loading="lazy"
          className="h-11 w-11 rounded-full object-cover border border-cyan-500/30 ring-2 ring-cyan-500/10"
        />
        <div>
          <h4 className="text-sm font-semibold text-white">{author}</h4>
          <p className="text-xs text-slate-400">
            {role} • <span className="text-cyan-400 font-medium">{company}</span>
          </p>
        </div>
      </div>
    </div>
  );
};

