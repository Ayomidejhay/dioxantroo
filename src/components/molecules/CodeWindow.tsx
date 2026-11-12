"use client";

import React, { useState } from "react";
import { CopyIcon, CheckIcon, TerminalIcon } from "@/components/atoms/Icons";
import { cn } from "@/lib/utils";

export interface CodeWindowProps {
  code: string;
  filename?: string;
  language?: string;
  className?: string;
}

export const CodeWindow: React.FC<CodeWindowProps> = ({
  code,
  filename = "protocol-engine.ts",
  className,
}) => {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(code);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // fallback
    }
  };

  return (
    <div
      className={cn(
        "rounded-2xl border border-slate-800 bg-slate-950/90 shadow-2xl overflow-hidden font-mono text-xs backdrop-blur-xl",
        className
      )}
    >
      {/* Window Header */}
      <div className="flex items-center justify-between border-b border-slate-800/80 bg-slate-900/60 px-4 py-3">
        <div className="flex items-center gap-2">
          <div className="flex items-center gap-1.5">
            <div className="h-2.5 w-2.5 rounded-full bg-rose-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-amber-500/80" />
            <div className="h-2.5 w-2.5 rounded-full bg-emerald-500/80" />
          </div>
          <span className="ml-2 flex items-center gap-1.5 text-slate-400 text-[11px]">
            <TerminalIcon size={12} className="text-cyan-400" />
            {filename}
          </span>
        </div>

        <button
          onClick={handleCopy}
          aria-label={copied ? "Code copied" : "Copy code snippet"}
          className="flex items-center gap-1 rounded-md px-2 py-1 text-slate-400 hover:text-white hover:bg-slate-800/80 transition-colors"
        >
          {copied ? (
            <>
              <CheckIcon size={13} className="text-emerald-400" />
              <span className="text-[10px] text-emerald-400">Copied</span>
            </>
          ) : (
            <>
              <CopyIcon size={13} />
              <span className="text-[10px]">Copy</span>
            </>
          )}
        </button>
      </div>

      {/* Code body */}
      <div className="p-4 overflow-x-auto text-slate-300 leading-relaxed font-mono selection:bg-cyan-500/30">
        <pre className="text-xs">
          <code>
            {code.split("\n").map((line, idx) => (
              <div key={idx} className="table-row">
                <span className="table-cell pr-4 text-right select-none text-slate-600 text-[11px]">
                  {idx + 1}
                </span>
                <span className="table-cell whitespace-pre">
                  {line.startsWith("//") ? (
                    <span className="text-slate-500 italic">{line}</span>
                  ) : line.includes("await") || line.includes("const") || line.includes("return") ? (
                    <span>
                      {line
                        .replace(/(const|await|return|async)/g, "___KW_$1___")
                        .split("___")
                        .map((part, i) =>
                          part.startsWith("KW_") ? (
                            <span key={i} className="text-purple-400 font-semibold">
                              {part.replace("KW_", "")}
                            </span>
                          ) : (
                            part
                          )
                        )}
                    </span>
                  ) : (
                    line
                  )}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
};

