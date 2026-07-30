import React, { useState, useEffect } from 'react';
import { RiSearchLine, RiCloseLine, RiCompass3Line, RiExternalLinkLine } from 'react-icons/ri';
import { timeAgo } from '../Utils/dateAgo';

export default function CommandPalette({ articles, isOpen, setIsOpen, onSelectArticle }) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape' && isOpen) {
        setIsOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, setIsOpen]);

  if (!isOpen) return null;

  const filtered = (articles || []).filter(article => {
    if (!query) return true;
    const q = query.toLowerCase();
    return (
      (article.title && article.title.toLowerCase().includes(q)) ||
      (article.description && article.description.toLowerCase().includes(q)) ||
      (article.source?.name && article.source.name.toLowerCase().includes(q)) ||
      (article.sentiment && article.sentiment.toLowerCase().includes(q))
    );
  }).slice(0, 7); 

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-20 px-4">
      
      <div 
        className="fixed inset-0 bg-black/70 backdrop-blur-md transition-opacity animate-fadeIn" 
        onClick={() => setIsOpen(false)}
      />

      <div className="relative w-full max-w-2xl bg-[#0e1015]/95 border border-white/20 rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.8)] overflow-hidden animate-scaleUp z-10 text-zinc-100 font-sans">
        
        <div className="flex items-center px-5 py-4 border-b border-white/[0.08] gap-3 bg-white/[0.02]">
          <RiSearchLine className="text-zinc-400 w-5 h-5 flex-shrink-0" />
          <input
            type="text"
            placeholder="Search global intelligence headlines, syndicates, or sentiment ('positive', 'AI', 'Bloomberg')..."
            value={query}
            onChange={(e) => { setQuery(e.target.value); setSelectedIndex(0); }}
            autoFocus
            className="w-full bg-transparent border-none outline-none text-base text-white placeholder:text-zinc-500 font-medium"
          />
          <kbd className="hidden sm:inline-block px-2 py-0.5 text-[10px] font-mono font-semibold bg-white/10 text-zinc-300 rounded border border-white/10">
            ESC
          </kbd>
        </div>

        <div className="max-h-[380px] overflow-y-auto divide-y divide-white/[0.04]">
          {filtered.length === 0 ? (
            <div className="p-8 text-center text-zinc-500 text-sm font-mono">
              No matching publications detected in current active memory stream.
            </div>
          ) : (
            filtered.map((item, idx) => (
              <a
                key={idx}
                href={item.url}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setIsOpen(false)}
                className={`flex items-center justify-between p-4 transition-colors group ${
                  idx === selectedIndex ? 'bg-white/[0.06]' : 'hover:bg-white/[0.04]'
                }`}
              >
                <div className="flex flex-col gap-1 pr-4 min-w-0 flex-1">
                  <div className="flex items-center gap-2">
                    <span className="text-xs text-indigo-400 font-mono font-semibold truncate">
                      {item.source?.name || 'Syndicate'}
                    </span>
                    <span className="text-[11px] font-mono text-zinc-500">
                      · {timeAgo(item.publishedAt)}
                    </span>
                    <span className={`text-[10px] font-mono uppercase px-2 py-0.2 rounded-full border ${
                      item.sentiment === 'positive'
                        ? 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20'
                        : item.sentiment === 'negative'
                        ? 'bg-rose-500/10 text-rose-400 border-rose-500/20'
                        : 'bg-blue-500/10 text-blue-400 border-blue-500/20'
                    }`}>
                      {item.sentiment}
                    </span>
                  </div>
                  <h4 className="text-sm text-zinc-200 group-hover:text-white font-medium truncate">
                    {item.title}
                  </h4>
                </div>
                
                <RiExternalLinkLine className="text-zinc-500 group-hover:text-white w-4 h-4 flex-shrink-0 transition-colors" />
              </a>
            ))
          )}
        </div>

        <div className="px-4 py-2.5 bg-black/40 border-t border-white/[0.06] flex items-center justify-between text-[11px] font-mono text-zinc-500">
          <div className="flex items-center gap-2">
            <RiCompass3Line className="w-3.5 h-3.5 text-indigo-400" />
            <span>RAYCAST · APPLE VISIONOS SPATIAL COMMAND ARCHITECTURE</span>
          </div>
          <span className="hidden sm:inline">Press ESC to dismiss</span>
        </div>
      </div>
    </div>
  );
}
