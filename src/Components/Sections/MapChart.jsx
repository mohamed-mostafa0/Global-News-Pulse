import React, { useState } from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";
import { RiEarthLine, RiBroadcastLine, RiGlobalLine } from "react-icons/ri";

const countries = [
  { name: "United States", code: "US", flag: "🇺🇸", left: "26%", top: "42%", region: "North America" },
  { name: "Argentina", code: "AR", flag: "🇦🇷", left: "32%", top: "76%", region: "South America" },
  { name: "Australia", code: "AU", flag: "🇦🇺", left: "78%", top: "74%", region: "Oceania" },
  { name: "European Union", code: "EU", flag: "🇪🇺", left: "51%", top: "36%", region: "Europe", fallbackVal: 12 },
  { name: "Japan & East Asia", code: "JP", flag: "🇯🇵", left: "79%", top: "44%", region: "East Asia", fallbackVal: 8 }
];

const gridStyle = {
  backgroundImage: "radial-gradient(circle at center, rgba(255, 255, 255, 0.08) 1px, transparent 1px)",
  backgroundSize: "20px 20px"
};

const getSemanticTone = (value) => {
  if (value > 10) return { color: "#10b981", label: "OPTIMISTIC", glow: "rgba(16, 185, 129, 0.5)", bg: "bg-emerald-500/10 text-emerald-400 border-emerald-500/20" };
  if (value > 0) return { color: "#3b82f6", label: "MODERATE", glow: "rgba(59, 130, 246, 0.5)", bg: "bg-blue-500/10 text-blue-400 border-blue-500/20" };
  if (value === 0) return { color: "#71717a", label: "NEUTRAL", glow: "rgba(113, 113, 122, 0.3)", bg: "bg-zinc-500/10 text-zinc-400 border-zinc-500/20" };
  if (value > -15) return { color: "#f59e0b", label: "VOLATILE", glow: "rgba(245, 158, 11, 0.5)", bg: "bg-amber-500/10 text-amber-400 border-amber-500/20" };
  return { color: "#f43f5e", label: "CRITICAL", glow: "rgba(244, 63, 94, 0.5)", bg: "bg-rose-500/10 text-rose-400 border-rose-500/20" };
};

export default function MapChart({ sentimentData }) {
  const [selectedRegion, setSelectedRegion] = useState("US");

  return (
    <section className="mb-10 max-w-[1600px] mx-auto">
      <div className="acrylic-card rounded-2xl overflow-hidden relative border border-white/[0.08]">
        
        <div className="p-6 border-b border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4 bg-[#0d0e12]/50">
          <div className="flex items-center gap-3">
            <div className="p-2.5 rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
              <RiGlobalLine className="w-5 h-5" />
            </div>
            <div>
              <h4 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
                <span>Global Spatial Telemetry Map</span>
                <span className="text-xs font-mono font-normal text-zinc-400 px-2 py-0.5 rounded bg-white/[0.04] border border-white/[0.06]">
                  VECTOR STREAM V4
                </span>
              </h4>
              <p className="text-xs font-mono text-zinc-400 mt-0.5">
                Real-time regional sentiment intensity normalized across national publishing syndicates
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400 bg-white/[0.02] px-3 py-1.5 rounded-lg border border-white/[0.05]">
            <RiBroadcastLine className="text-indigo-400 animate-pulse" />
            <span>5 RADAR NODES ACTIVE</span>
          </div>
        </div>

        <div className="relative w-full h-[460px] bg-[#08090d] overflow-hidden" style={gridStyle}>
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(99,102,241,0.07)_0%,transparent_65%)] pointer-events-none" />

          <svg viewBox="0 0 1000 420" className="w-full h-full absolute inset-0 opacity-40 pointer-events-none">
            <defs>
              <linearGradient id="streamStroke" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stopColor="rgba(99,102,241,0.6)" />
                <stop offset="50%" stopColor="rgba(16,185,129,0.5)" />
                <stop offset="100%" stopColor="rgba(244,63,94,0.4)" />
              </linearGradient>
            </defs>
            <path
              d="M100,220 C200,160 280,180 400,200 C520,220 600,160 700,170 C800,180 880,220 950,250"
              fill="none"
              stroke="url(#streamStroke)"
              strokeWidth="1.5"
              strokeDasharray="6 6"
            />
            <path
              d="M260,180 C320,260 400,320 500,280 C600,240 700,280 800,310"
              fill="none"
              stroke="rgba(255,255,255,0.15)"
              strokeWidth="1"
              strokeDasharray="3 3"
            />
          </svg>

          {countries.map((country, i) => {
            const rawVal = sentimentData?.[country.code] ?? country.fallbackVal ?? 10;
            const tone = getSemanticTone(rawVal);
            const isSelected = selectedRegion === country.code;

            return (
              <div
                key={i}
                style={{ position: "absolute", left: country.left, top: country.top, transform: "translate(-50%, -50%)" }}
                className="z-10 group"
                onClick={() => setSelectedRegion(country.code)}
              >
                <div 
                  className="absolute -inset-4 rounded-full border border-current animate-spatial-ripple opacity-30 pointer-events-none"
                  style={{ color: tone.color }}
                />
                
                <div
                  data-tooltip-id="global-spatial-tooltip"
                  data-tooltip-html={`
                    <div style="font-family: JetBrains Mono, monospace; font-size: 12px; padding: 2px 4px;">
                      <div style="color: #a1a1aa; text-transform: uppercase; font-size: 10px; margin-bottom: 4px;">${country.region}</div>
                      <div style="font-weight: 700; color: #fff; font-size: 14px; margin-bottom: 6px;">${country.flag} ${country.name}</div>
                      <div style="display: flex; justify-content: space-between; gap: 16px; border-top: 1px solid rgba(255,255,255,0.1); padding-top: 6px;">
                        <span>VALENCE SCORE:</span>
                        <span style="color: ${tone.color}; font-weight: bold;">${rawVal >= 0 ? '+' : ''}${rawVal} (${tone.label})</span>
                      </div>
                    </div>
                  `}
                  className={`w-4 h-4 rounded-full border-2 border-white cursor-pointer transition-transform duration-300 group-hover:scale-125 ${isSelected ? 'scale-125 ring-4 ring-white/20' : ''}`}
                  style={{
                    background: tone.color,
                    boxShadow: `0 0 16px ${tone.glow}`
                  }}
                />

                <div className="absolute top-6 left-1/2 -translate-x-1/2 whitespace-nowrap pointer-events-none">
                  <div className="px-2 py-0.5 rounded bg-black/80 backdrop-blur-md border border-white/10 text-[10px] font-mono text-zinc-300 font-medium tracking-wide flex items-center gap-1 shadow-lg">
                    <span>{country.code}</span>
                    <span style={{ color: tone.color }}>{rawVal >= 0 ? `+${rawVal}` : rawVal}</span>
                  </div>
                </div>
              </div>
            );
          })}

          <Tooltip 
            id="global-spatial-tooltip" 
            style={{ backgroundColor: "#0e1015", border: "1px solid rgba(255,255,255,0.15)", borderRadius: "12px", zIndex: 100 }} 
          />
        </div>

        <div className="bg-[#0b0c10] border-t border-white/[0.06] p-4 flex flex-col lg:flex-row lg:items-center justify-between gap-4">
          <div className="flex items-center gap-2 text-xs font-mono text-zinc-400">
            <span className="w-2 h-2 rounded-full bg-indigo-500" />
            <span>NATIONAL AFFECTIVE COMPARISON TICKER</span>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {countries.map((c) => {
              const val = sentimentData?.[c.code] ?? c.fallbackVal ?? 10;
              const t = getSemanticTone(val);
              return (
                <button
                  key={c.code}
                  onClick={() => setSelectedRegion(c.code)}
                  className={`flex items-center gap-2 px-3 py-1.5 rounded-lg border text-xs font-mono transition-all ${
                    selectedRegion === c.code 
                      ? 'bg-white/[0.08] border-white/20 text-white shadow-md' 
                      : 'bg-white/[0.02] border-white/[0.05] text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.05]'
                  }`}
                >
                  <span>{c.flag} {c.code}</span>
                  <span className={`px-1.5 py-0.2 rounded text-[10px] uppercase font-bold border ${t.bg}`}>
                    {val >= 0 ? `+${val}` : val} · {t.label}
                  </span>
                </button>
              );
            })}
          </div>
        </div>

      </div>
    </section>
  );
}
