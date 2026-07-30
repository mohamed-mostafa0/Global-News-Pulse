import React, { useState } from 'react';
import { GrShare } from "react-icons/gr";
import { RiArrowDownSLine, RiArrowUpSLine, RiNewspaperLine, RiSparklingLine, RiBookmarkFill, RiBookmarkLine } from "react-icons/ri";
import { timeAgo } from "../Utils/dateAgo";

export default function ArticleCard({ article, isSaved, onToggleSave }) {
  const [isExpanded, setIsExpanded] = useState(false);
  
  const getBadgeConfig = () => {
    switch(article.sentiment) {
      case 'positive':
        return {
          label: '● OPTIMISTIC · +0.4',
          styles: 'bg-emerald-500/[0.08] text-emerald-400 border-emerald-500/20'
        };
      case 'negative':
        return {
          label: '● CRITICAL · -0.3',
          styles: 'bg-rose-500/[0.08] text-rose-400 border-rose-500/20'
        };
      default:
        return {
          label: '● NEUTRAL · 0.0',
          styles: 'bg-blue-500/[0.08] text-blue-400 border-blue-500/20'
        };
    }
  };

  const badge = getBadgeConfig();

  return (
    <div className="acrylic-card rounded-xl p-5 flex flex-col justify-between h-full group relative overflow-hidden transition-all duration-300 hover:-translate-y-1">
      <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/[0.04] via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />

      <div>
        <div className="flex items-center justify-between mb-3 text-xs font-mono">
          <span className="text-zinc-400 font-semibold flex items-center gap-1.5 truncate pr-2">
            <RiNewspaperLine className="w-3.5 h-3.5 text-zinc-500" />
            {article.source?.name || 'Syndicated Feed'}
          </span>
          <span className="text-zinc-500 text-[11px] flex-shrink-0">
            {timeAgo(article.publishedAt)}
          </span>
        </div>

        {article.urlToImage && (
          <div className="w-full h-44 rounded-lg overflow-hidden mb-4 border border-white/[0.06] bg-black/40 relative">
            <img 
              src={article.urlToImage} 
              alt="" 
              className="w-full h-full object-cover grayscale-[35%] contrast-105 brightness-90 group-hover:grayscale-0 group-hover:scale-105 group-hover:brightness-100 transition-all duration-500"
              onError={(e) => { e.target.parentElement.style.display = 'none'; }}
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-60 pointer-events-none" />
          </div>
        )}

        <div className="mb-3">
          <div className="mb-2 flex items-start justify-between gap-2">
            <span className={`py-0.5 px-2.5 text-[10px] font-mono font-bold tracking-wide rounded-full border ${badge.styles}`}>
              {badge.label}
            </span>
            
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="text-zinc-500 hover:text-indigo-400 flex items-center gap-0.5 text-[11px] font-mono font-medium transition-colors ml-auto"
              title="Toggle NLP Lexical Synthesis Preview"
            >
              <RiSparklingLine className="w-3 h-3 text-indigo-400" />
              <span>{isExpanded ? "Hide" : "Synthesis"}</span>
              {isExpanded ? <RiArrowUpSLine /> : <RiArrowDownSLine />}
            </button>
          </div>

          <h2 className="text-base font-semibold text-zinc-100 group-hover:text-white leading-snug transition-colors">
            {article.title}
          </h2>
        </div>

        <p className={`text-sm text-zinc-400 leading-relaxed transition-all duration-300 ${isExpanded ? 'line-clamp-none pb-2 text-zinc-300 font-normal' : 'line-clamp-2 mb-4'}`}>
          {article.description || 'No descriptive excerpt transmitted by publisher syndicate.'}
        </p>
      </div>

      <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between mt-4 text-xs font-mono text-zinc-500">
        <span className="group-hover:text-indigo-400 transition-colors hidden xl:inline">
          GLOBAL PULSE AI · ANALYTIC STREAM
        </span>
        <span className="group-hover:text-indigo-400 transition-colors inline xl:hidden font-bold">
          PULSE AI
        </span>
        <div className="flex items-center gap-2">
          <button
            onClick={(e) => {
              e.preventDefault();
              e.stopPropagation();
              onToggleSave && onToggleSave();
            }}
            className={`flex items-center gap-1.5 px-3 py-1 rounded-lg font-mono text-[11px] transition-all duration-300 shadow-sm border ${
              isSaved
                ? 'bg-amber-500/20 text-amber-300 border-amber-500/40 shadow-[0_0_12px_rgba(245,158,11,0.25)] font-bold'
                : 'bg-white/[0.03] text-zinc-400 border-white/[0.08] hover:text-zinc-200 hover:bg-white/[0.08]'
            }`}
            title={isSaved ? "Remove from Personal Dossier" : "Save to Personal Intelligence Dossier"}
          >
            {isSaved ? <RiBookmarkFill className="w-3.5 h-3.5 text-amber-400 animate-pulse" /> : <RiBookmarkLine className="w-3.5 h-3.5 text-zinc-400" />}
            <span>{isSaved ? "★ SAVED" : "☆ SAVE"}</span>
          </button>

          <a
            href={article.url}
            target="_blank"
            rel="noopener noreferrer"
            className="w-8 h-8 rounded-full bg-white/[0.05] border border-white/[0.08] hover:bg-indigo-600 hover:text-white hover:border-indigo-500 flex items-center justify-center text-zinc-300 transition-all duration-200 shadow-sm"
            title="Open complete publication source"
          >
            <GrShare className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>
    </div>
  );
}
