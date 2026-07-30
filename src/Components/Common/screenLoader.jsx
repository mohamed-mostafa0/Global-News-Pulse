import React, { useState, useEffect } from 'react';
import { RiPulseFill, RiTerminalLine } from "react-icons/ri";

export default function ScreenLoader({ onComplete }) {
  const [progress, setProgress] = useState(0);
  const [statusText, setStatusText] = useState("ESTABLISHING SECURE TELEMETRY NODE...");
  const [isFadingOut, setIsFadingOut] = useState(false);

  useEffect(() => {
    const totalDuration = 1400;
    const intervalTime = 20; 
    const step = 100 / (totalDuration / intervalTime);
    
    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = Math.min(100, Math.floor(prev + step));
        if (next >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setIsFadingOut(true);
            setTimeout(() => {
              if (onComplete) onComplete();
            }, 500); 
          }, 250); 
          return 100;
        }
        return next;
      });
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  useEffect(() => {
    if (progress < 25) {
      setStatusText("ESTABLISHING SECURE TELEMETRY NODE...");
    } else if (progress < 55) {
      setStatusText("SYNCHRONIZING AFINN-165 SENTIMENT MATRICES...");
    } else if (progress < 85) {
      setStatusText("INGESTING BREAKING EDITORIAL STREAMS...");
    } else if (progress < 100) {
      setStatusText("INITIALIZING UI COMMAND PALETTE...");
    } else {
      setStatusText("SYSTEM ONLINE · READY");
    }
  }, [progress]);

  return (
    <div 
      className={`fixed inset-0 z-[100] flex flex-col items-center justify-center bg-[#060608] px-4 overflow-hidden transition-all duration-500 cubic-bezier(0.16, 1, 0.3, 1) ${
        isFadingOut ? "opacity-0 scale-105 pointer-events-none filter blur-sm" : "opacity-100 scale-100"
      }`}
    >
      <div className="absolute w-[550px] h-[550px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-emerald-500/10 rounded-full blur-[140px] pointer-events-none animate-spatial-ripple" />
      <div className="absolute w-[350px] h-[350px] bg-indigo-500/10 rounded-full blur-[80px] pointer-events-none animate-breathe" />
      
      <div 
        className="absolute inset-0 opacity-[0.03] pointer-events-none" 
        style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255, 255, 255, 0.8) 1px, transparent 0)`,
          backgroundSize: '24px 24px'
        }}
      />

      <div className="relative flex items-center justify-center mb-9">
        <div className="absolute -inset-4 rounded-full bg-gradient-to-tr from-indigo-500 via-purple-500 to-emerald-400 opacity-25 blur-xl animate-pulse" />
        
        <div className="absolute w-28 h-28 rounded-full border-2 border-dashed border-indigo-500/40 animate-[spin_12s_linear_infinite]" />
        <div className="absolute w-22 h-22 -inset-2 rounded-full border border-emerald-500/30 animate-[spin_8s_linear_infinite_reverse]" />
        
        <div className="w-20 h-20 rounded-2xl bg-gradient-to-tr from-[#3f3bce] via-indigo-600 to-purple-600 flex items-center justify-center shadow-[0_0_35px_rgba(99,102,241,0.6)] border border-white/20 relative z-10 transform transition-transform duration-300 hover:scale-105">
          <RiPulseFill className="text-white text-4xl animate-pulse drop-shadow-[0_0_8px_rgba(255,255,255,0.8)]" />
        </div>
      </div>

      <div className="text-center space-y-3 z-10 max-w-md px-4">
        <h1 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white flex items-center justify-center gap-2 font-sans">
          <span>Global News</span>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-purple-300 to-emerald-400 font-normal">
            Pulse
          </span>
        </h1>
        
        <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white/[0.04] border border-white/[0.08] shadow-inner backdrop-blur-md">
          <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-ping" />
          <span className="text-[10px] font-mono font-medium tracking-widest uppercase text-zinc-400">
            INTELLIGENCE BRIEFING NODE 2026.1
          </span>
        </div>
      </div>

      <div className="w-72 sm:w-80 mt-12 z-10 space-y-2.5">
        <div className="flex items-center justify-between text-xs font-mono text-zinc-400">
          <span className="flex items-center gap-1.5 text-emerald-400 truncate pr-2">
            <RiTerminalLine className="text-sm shrink-0 animate-pulse text-indigo-400" />
            <span className="truncate tracking-tight font-medium text-zinc-300">{statusText}</span>
          </span>
          <span className="text-indigo-300 font-bold shrink-0 text-right w-12">{progress}%</span>
        </div>
        
        <div className="w-full h-2 bg-[#101218] rounded-full overflow-hidden p-0.5 border border-white/[0.08] shadow-[inset_0_1px_3px_rgba(0,0,0,0.6)] relative">
          <div 
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-emerald-400 rounded-full transition-all duration-75 ease-out relative shadow-[0_0_12px_rgba(16,185,129,0.5)]"
            style={{ width: `${progress}%` }}
          >
            <div className="absolute right-0 top-0 bottom-0 w-4 bg-white/60 blur-[2px] rounded-full" />
          </div>
        </div>

        <div className="flex items-center justify-between text-[10px] font-mono text-zinc-500 px-0.5">
          <span>AFINN-165 MATRIX</span>
          <span className="flex items-center gap-1">
            <span className="w-1 h-1 rounded-full bg-emerald-400 animate-ping" />
            <span>STREAM LATENCY: &lt;12ms</span>
          </span>
        </div>
      </div>
    </div>
  );
}
