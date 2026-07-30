import React from 'react';
import { RiPulseFill, RiSearchLine, RiTerminalLine } from "react-icons/ri";

export default function Navbar() {
  const triggerCommandPalette = () => {
    window.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true, ctrlKey: true }));
  };

  return (
    <header className="sticky top-0 z-40 px-4 sm:px-10 pt-4 pb-2 pointer-events-none">
      <div className="max-w-[1600px] mx-auto acrylic-nav rounded-2xl md:rounded-full px-5 py-3 pointer-events-auto flex flex-col md:flex-row items-center justify-between gap-4 transition-all duration-300">
        
        <div className="flex items-center justify-between w-full md:w-auto gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-full bg-gradient-to-tr from-indigo-600 to-indigo-400 flex items-center justify-center shadow-[0_0_15px_rgba(99,102,241,0.5)]">
              <RiPulseFill className="text-white text-xl" />
            </div>
            <h1 className="font-bold text-lg text-white tracking-tight flex items-center gap-1.5 font-sans">
              <span>Global News</span>
              <span className="text-indigo-400 font-normal">Pulse</span>
              <span className="text-[10px] font-mono text-zinc-500 bg-white/[0.05] px-2 py-0.5 rounded border border-white/[0.06] ml-1 hidden sm:inline">
                2026.1
              </span>
            </h1>
          </div>

          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 shadow-[0_0_12px_rgba(16,185,129,0.15)]">
            <span className="w-2 h-2 rounded-full bg-emerald-400 animate-breathe" />
            <span className="text-[11px] font-mono font-semibold text-emerald-400 tracking-wider">
              LIVE TELEMETRY
            </span>
          </div>
        </div>

        <div className="flex items-center gap-4 w-full md:w-auto justify-end">
          <button
            onClick={triggerCommandPalette}
            className="w-full md:w-80 flex items-center justify-between px-3.5 py-1.5 rounded-full bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.08] hover:border-white/[0.15] text-zinc-400 hover:text-zinc-200 transition-all text-sm font-medium shadow-inner group"
          >
            <div className="flex items-center gap-2 truncate">
              <RiSearchLine className="text-zinc-500 group-hover:text-indigo-400 transition-colors" />
              <span className="text-xs font-sans truncate">Search global narrative stream...</span>
            </div>
            <div className="flex items-center gap-1">
              <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] font-mono font-bold text-zinc-400">
                ⌘
              </kbd>
              <kbd className="px-1.5 py-0.5 rounded bg-black/40 border border-white/10 text-[10px] font-mono font-bold text-zinc-400">
                K
              </kbd>
            </div>
          </button>

          <div className="hidden lg:flex items-center gap-2 text-zinc-500 text-xs font-mono pl-2 border-l border-white/[0.08]">
            <RiTerminalLine className="text-indigo-400 text-sm" />
            <span>AFINN-165 NODE</span>
          </div>
        </div>

      </div>
    </header>
  );
}
