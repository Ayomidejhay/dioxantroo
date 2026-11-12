"use client";

import React, { useState } from "react";
import { Button } from "@/components/atoms/Button";
import { ArrowRightIcon, CheckIcon } from "@/components/atoms/Icons";
import { cn } from "@/lib/utils";

export interface WaitlistFormProps {
  buttonText?: string;
  placeholder?: string;
  className?: string;
}

export const WaitlistForm: React.FC<WaitlistFormProps> = ({
  buttonText = "Request Mainnet Access",
  placeholder = "Enter your work or institutional email...",
  className,
}) => {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMessage, setErrorMessage] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@") || !email.includes(".")) {
      setStatus("error");
      setErrorMessage("Please enter a valid business email address.");
      return;
    }

    setStatus("loading");
    setErrorMessage("");

    setTimeout(() => {
      setStatus("success");
    }, 800);
  };

  return (
    <div className={cn("w-full max-w-lg", className)}>
      {status === "success" ? (
        <div className="flex items-center gap-3 rounded-xl bg-cyan-500/10 border border-cyan-500/30 p-4 text-cyan-200">
          <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-cyan-500/20 text-cyan-300">
            <CheckIcon size={16} />
          </div>
          <div>
            <p className="text-sm font-semibold text-white">Access Key Requested!</p>
            <p className="text-xs text-cyan-200/80">
              We dispatched your cryptographic verification token to <span className="font-mono text-cyan-100">{email}</span>.
            </p>
          </div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="relative flex flex-col sm:flex-row gap-2">
          <div className="relative flex-1">
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                if (status === "error") setStatus("idle");
              }}
              placeholder={placeholder}
              required
              aria-label="Email address for access"
              className={cn(
                "w-full rounded-xl bg-slate-900/90 border border-slate-700/80 px-4 py-3.5 text-sm text-slate-100 placeholder:text-slate-500 outline-none transition-all duration-200 focus:border-cyan-400 focus:ring-2 focus:ring-cyan-400/20 shadow-inner",
                status === "error" && "border-rose-500 focus:border-rose-500"
              )}
            />
          </div>

          <Button
            type="submit"
            variant="glow"
            size="md"
            isLoading={status === "loading"}
            rightIcon={<ArrowRightIcon size={16} />}
            className="sm:w-auto w-full py-3.5 font-semibold text-sm shrink-0"
          >
            {buttonText}
          </Button>
        </form>
      )}

      {status === "error" && (
        <p className="mt-2 text-xs text-rose-400" role="alert">
          {errorMessage}
        </p>
      )}
    </div>
  );
};

