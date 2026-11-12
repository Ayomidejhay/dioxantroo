import React from "react";
import { cn } from "@/lib/utils";

export interface BadgeProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "cyan" | "violet" | "emerald" | "amber" | "neutral" | "outline";
  size?: "sm" | "md";
  ping?: boolean;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  className,
  variant = "cyan",
  size = "md",
  ping = false,
  ...props
}) => {
  const variantStyles = {
    cyan: "bg-cyan-500/10 text-cyan-300 border-cyan-500/20",
    violet: "bg-violet-500/10 text-violet-300 border-violet-500/20",
    emerald: "bg-emerald-500/10 text-emerald-300 border-emerald-500/20",
    amber: "bg-amber-500/10 text-amber-300 border-amber-500/20",
    neutral: "bg-white/5 text-zinc-300 border-white/10",
    outline: "bg-transparent text-zinc-300 border-zinc-700",
  };

  const pingColors = {
    cyan: "bg-cyan-400",
    violet: "bg-violet-400",
    emerald: "bg-emerald-400",
    amber: "bg-amber-400",
    neutral: "bg-zinc-400",
    outline: "bg-zinc-400",
  };

  const sizeStyles = {
    sm: "text-xs px-2.5 py-0.5",
    md: "text-xs font-medium px-3 py-1",
  };

  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-full border transition-all duration-200 select-none",
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {ping && (
        <span className="relative flex h-2 w-2">
          <span
            className={cn(
              "animate-ping absolute inline-flex h-full w-full rounded-full opacity-75",
              pingColors[variant]
            )}
          />
          <span
            className={cn("relative inline-flex rounded-full h-2 w-2", pingColors[variant])}
          />
        </span>
      )}
      {children}
    </span>
  );
};

