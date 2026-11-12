"use client";

import React, { useState, useEffect } from "react";
import { NAV_LINKS, SITE_CONFIG } from "@/lib/constants";
import { Button } from "@/components/atoms/Button";
import { Badge } from "@/components/atoms/Badge";
import { MenuIcon, XIcon, ArrowRightIcon, ZapIcon } from "@/components/atoms/Icons";
import { cn } from "@/lib/utils";

export const Navbar: React.FC = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        isScrolled
          ? "bg-slate-950/80 backdrop-blur-xl border-b border-white/10 py-3 shadow-lg shadow-black/40"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo & Brand */}
          <a
            href="#"
            className="flex items-center gap-3 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-lg p-1"
          >
            <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-cyan-500 via-blue-600 to-violet-600 p-[1px] shadow-lg shadow-cyan-500/20 group-hover:shadow-cyan-500/40 transition-shadow">
              <div className="flex h-full w-full items-center justify-center rounded-[11px] bg-slate-950">
                <span className="font-mono text-xl font-black text-transparent bg-clip-text bg-gradient-to-br from-cyan-300 to-white">
                  Δ
                </span>
              </div>
            </div>
            <div className="flex flex-col">
              <div className="flex items-center gap-2">
                <span className="text-xl font-extrabold tracking-tight text-white font-mono">
                  {SITE_CONFIG.name}
                </span>
                <span className="hidden sm:inline-block">
                  <Badge variant="cyan" size="sm" ping>
                    v2.4 Mainnet
                  </Badge>
                </span>
              </div>
            </div>
          </a>

          {/* Desktop Navigation Links */}
          <nav
            aria-label="Main Navigation"
            className="hidden md:flex items-center gap-1 rounded-full bg-slate-900/60 border border-white/5 px-4 py-1.5 backdrop-blur-md"
          >
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                className="px-3.5 py-1.5 text-sm font-medium text-slate-300 hover:text-white hover:bg-white/5 rounded-full transition-all duration-200"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Right Action Buttons */}
          <div className="hidden md:flex items-center gap-3">
            <div className="flex items-center gap-2 text-xs font-mono text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-full border border-emerald-500/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
              </span>
              <span>TPS: 138.4k</span>
            </div>

            <Button
              variant="glow"
              size="sm"
              rightIcon={<ArrowRightIcon size={14} />}
              onClick={() => {
                const el = document.getElementById("waitlist");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Launch App
            </Button>
          </div>

          {/* Mobile menu trigger button */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            aria-expanded={mobileMenuOpen}
            aria-label="Toggle Navigation Menu"
            className="md:hidden flex items-center justify-center p-2 rounded-lg text-slate-400 hover:text-white hover:bg-white/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400"
          >
            {mobileMenuOpen ? <XIcon size={24} /> : <MenuIcon size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden border-b border-white/10 bg-slate-950/95 backdrop-blur-2xl px-4 pt-4 pb-6 space-y-4">
          <nav className="flex flex-col space-y-1">
            {NAV_LINKS.map((link) => (
              <a
                key={link.label}
                href={link.href}
                onClick={() => setMobileMenuOpen(false)}
                className="px-4 py-3 text-base font-medium text-slate-200 hover:text-white hover:bg-white/5 rounded-xl transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          <div className="pt-4 border-t border-white/5 flex flex-col gap-3">
            <div className="flex items-center justify-between text-xs font-mono text-emerald-400 bg-emerald-500/10 px-4 py-2.5 rounded-xl border border-emerald-500/20">
              <span className="flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500" />
                </span>
                Consensus Mesh Live
              </span>
              <span>138,420 TPS</span>
            </div>

            <Button
              variant="glow"
              size="md"
              className="w-full"
              onClick={() => {
                setMobileMenuOpen(false);
                const el = document.getElementById("waitlist");
                el?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Launch App
            </Button>
          </div>
        </div>
      )}
    </header>
  );
};

