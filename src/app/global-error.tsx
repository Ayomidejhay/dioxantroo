"use client";

import React from "react";

export default function GlobalError({
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <html lang="en">
      <body className="bg-slate-950 text-white min-h-screen flex items-center justify-center p-6 font-sans">
        <div className="max-w-md w-full text-center space-y-4">
          <h2 className="text-2xl font-bold">System Telemetry Interrupted</h2>
          <p className="text-sm text-slate-400">
            An unexpected error occurred while executing the consensus state machine.
          </p>
          <button
            onClick={() => reset()}
            className="px-4 py-2 bg-cyan-500 text-slate-950 font-semibold rounded-lg hover:bg-cyan-400 transition-colors"
          >
            Recover Session
          </button>
        </div>
      </body>
    </html>
  );
}
