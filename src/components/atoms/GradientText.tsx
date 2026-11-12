import React from "react";
import { cn } from "@/lib/utils";

export interface GradientTextProps extends React.HTMLAttributes<HTMLSpanElement> {
  variant?: "cyan" | "purple" | "sunset" | "silver";
}

export const GradientText: React.FC<GradientTextProps> = ({
  children,
  className,
  variant = "cyan",
  ...props
}) => {
  const gradientStyles = {
    cyan: "bg-gradient-to-r from-white via-cyan-200 to-cyan-400",
    purple: "bg-gradient-to-r from-white via-violet-200 to-violet-400",
    sunset: "bg-gradient-to-r from-amber-200 via-rose-300 to-violet-400",
    silver: "bg-gradient-to-r from-white via-slate-200 to-slate-400",
  };

  return (
    <span
      className={cn(
        "bg-clip-text text-transparent font-bold tracking-tight inline-block",
        gradientStyles[variant],
        className
      )}
      {...props}
    >
      {children}
    </span>
  );
};

