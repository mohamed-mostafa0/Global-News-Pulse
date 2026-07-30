import React from 'react';
import { RiNewspaperLine, RiFocus3Line, RiEarthLine, RiFlashlightLine } from "react-icons/ri";
import { HiOutlineTrendingUp } from "react-icons/hi";
import AISummaryPanel from '../Common/AISummaryPanel';

export default function DashboardStats({ globalSentiment, numOfArticles, countrySentiment, articles }) {
  return (
    <section className="mb-10 max-w-[1600px] mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        
        <AISummaryPanel 
          globalSentiment={globalSentiment} 
          numOfArticles={numOfArticles} 
          countrySentiment={countrySentiment} 
          articles={articles}
        />

        <div className="acrylic-card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-indigo-400 group-hover:bg-white/[0.08] transition-colors">
                <RiNewspaperLine className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1 text-xs font-mono px-2.5 py-0.5 rounded-full bg-emerald-500/[0.08] border border-emerald-500/20 text-emerald-400 font-medium">
                <HiOutlineTrendingUp className="w-3 h-3" />
                <span>+12.4% vs avg</span>
              </div>
            </div>

            <h3 className="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider mb-1">
              Ingestion Stream Volume
            </h3>
            <div className="flex items-baseline gap-2 mb-3">
              <span className="text-3xl font-bold font-mono tracking-tight text-white tabular-nums">
                {numOfArticles}
              </span>
              <span className="text-xs text-zinc-500 font-mono">
                / 24 hrs
              </span>
            </div>
          </div>

          <div className="pt-4 border-t border-white/[0.06]">
            <div className="flex justify-between items-center text-xs text-zinc-400">
              <span>Primary Vendor</span>
              <span className="font-mono text-indigo-300">Vercel Proxy · API</span>
            </div>
          </div>
        </div>

        <div className="acrylic-card rounded-2xl p-6 relative overflow-hidden flex flex-col justify-between group">
          <div>
            <div className="flex justify-between items-start mb-4">
              <div className="p-2 rounded-lg bg-white/[0.04] border border-white/[0.08] text-amber-400 group-hover:bg-white/[0.08] transition-colors">
                <RiFocus3Line className="w-5 h-5" />
              </div>
              <div className="flex items-center gap-1.5 text-[11px] font-mono px-2 py-0.5 rounded bg-white/[0.05] text-zinc-400 border border-white/[0.06]">
                <RiEarthLine className="text-indigo-400" />
                <span>42 JURISDICTIONS</span>
              </div>
            </div>

            <h3 className="text-xs font-mono font-semibold text-zinc-500 uppercase tracking-wider mb-1">
              Sentinel Trending Topic
            </h3>
            <h3 className="text-2xl font-semibold text-zinc-100 group-hover:text-white tracking-tight leading-snug">
              AI Regulation & Policy
            </h3>
          </div>

          <div className="pt-4 border-t border-white/[0.06] mt-4 flex items-center justify-between">
            <span className="text-xs font-mono text-zinc-500">
              FREQ VELOCITY
            </span>
            <span className="text-xs font-mono text-amber-400 font-medium bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20">
              HIGH · 240 MENTIONS
            </span>
          </div>
        </div>

      </div>
    </section>
  );
}
