import React from "react";
import { cn } from "@/lib/utils";

export interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  glow?: "none" | "cyan" | "violet" | "emerald";
  interactive?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  className,
  glow = "none",
  interactive = false,
  ...props
}) => {
  const glowStyles = {
    none: "",
    cyan: "hover:border-cyan-500/40 hover:shadow-[0_0_30px_rgba(6,182,212,0.12)]",
    violet: "hover:border-violet-500/40 hover:shadow-[0_0_30px_rgba(139,92,246,0.12)]",
    emerald: "hover:border-emerald-500/40 hover:shadow-[0_0_30px_rgba(16,185,129,0.12)]",
  };

  return (
    <div
      className={cn(
        "rounded-2xl bg-slate-900/60 backdrop-blur-xl border border-white/5 p-6 transition-all duration-300",
        interactive && "cursor-pointer hover:-translate-y-1",
        glowStyles[glow],
        className
      )}
      {...props}
    >
      {children}
    </div>
  );
};

