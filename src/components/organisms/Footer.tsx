import React from "react";
import { SITE_CONFIG } from "@/lib/constants";

export const Footer: React.FC = () => {
  const currentYear = 2026;

  return (
    <footer className="border-t border-white/5 bg-slate-950 py-16 text-slate-400 text-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 md:grid-cols-5 gap-8 mb-12">
          {/* Brand Col */}
          <div className="col-span-2 space-y-4">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-gradient-to-tr from-cyan-500 to-violet-600 text-white font-mono font-bold text-sm">
                Δ
              </div>
              <span className="font-mono text-lg font-bold text-white tracking-wider">
                {SITE_CONFIG.name}
              </span>
            </div>
            <p className="text-xs text-slate-400 max-w-sm leading-relaxed">
              {SITE_CONFIG.description}
            </p>
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400">
              <span className="h-2 w-2 rounded-full bg-emerald-400 animate-pulse" />
              <span>All Systems Operational (42/42 PoPs Healthy)</span>
            </div>
          </div>

          {/* Product links */}
          <div className="space-y-3">
            <h5 className="text-xs uppercase font-semibold text-white tracking-wider">
              Product
            </h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">ZK Prover Engine</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Verifiable AI Agents</a></li>
              <li><a href="#architecture" className="hover:text-cyan-400 transition-colors">MPC Key Sharding</a></li>
              <li><a href="#metrics" className="hover:text-cyan-400 transition-colors">Consensus Telemetry</a></li>
              <li><a href="#features" className="hover:text-cyan-400 transition-colors">Sovereign Subnets</a></li>
            </ul>
          </div>

          {/* Developers */}
          <div className="space-y-3">
            <h5 className="text-xs uppercase font-semibold text-white tracking-wider">
              Developers
            </h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#architecture" className="hover:text-cyan-400 transition-colors">Documentation</a></li>
              <li><a href="#architecture" className="hover:text-cyan-400 transition-colors">Rust &amp; EVM SDK</a></li>
              <li><a href="#architecture" className="hover:text-cyan-400 transition-colors">Halo2 Circuit Library</a></li>
              <li><a href="#faq" className="hover:text-cyan-400 transition-colors">Technical FAQ</a></li>
              <li><a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">GitHub Repository</a></li>
            </ul>
          </div>

          {/* Company & Compliance */}
          <div className="space-y-3">
            <h5 className="text-xs uppercase font-semibold text-white tracking-wider">
              Compliance &amp; Trust
            </h5>
            <ul className="space-y-2 text-xs">
              <li><a href="#testimonials" className="hover:text-cyan-400 transition-colors">SOC2 Type II Report</a></li>
              <li><a href="#testimonials" className="hover:text-cyan-400 transition-colors">Security Audits (Trail of Bits)</a></li>
              <li><a href="#privacy" className="hover:text-cyan-400 transition-colors">Privacy Policy</a></li>
              <li><a href="#terms" className="hover:text-cyan-400 transition-colors">Terms of Protocol</a></li>
              <li><a href="#bug-bounty" className="hover:text-cyan-400 transition-colors">Bug Bounty ($1M Pool)</a></li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <p>© {currentYear} Doxa Network Foundation. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="https://x.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              X (Twitter)
            </a>
            <a href="https://discord.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              Discord
            </a>
            <a href="https://t.me" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              Telegram
            </a>
            <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="hover:text-cyan-400 transition-colors">
              GitHub
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

