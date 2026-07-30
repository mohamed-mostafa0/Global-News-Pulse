import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import { FiFilter } from "react-icons/fi";
import { RiKeyboardLine, RiSearch2Line, RiRefreshLine, RiAddCircleLine, RiLoader4Line, RiStackLine, RiBookmark3Fill, RiBookmark3Line } from "react-icons/ri";
import { analyzeSentiment, calculateGlobalSentiment } from "../Components/Utils/sentiment";
import { fetchArticles } from "../Components/Services/newsService";
import DashboardStats from "../Components/Sections/DashboardStats";
import MapChart from "../Components/Sections/MapChart";
import SentimentTrendsChart from "../Components/Sections/SentimentTrendsChart";
import ArticleCard from "../Components/Common/ArticleCard";
import CommandPalette from "../Components/Common/CommandPalette";

export default function Home() {
  const [articles, setArticles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [numOfArticles, setnumOfArticles] = useState(0);
  const [filterSentiment, setfilterSentiment] = useState('All');
  const [LoadingMap, setLoadingMap] = useState(true);
  const [CountrySentiment, setCountrySentiment] = useState({});
  const [isCmdOpen, setIsCmdOpen] = useState(false);
  
  const [dossier, setDossier] = useState(() => {
    try {
      const localData = localStorage.getItem("global_pulse_dossier");
      return localData ? JSON.parse(localData) : [];
    } catch (err) {
      return [];
    }
  });

  const filterOptions = [
    { id: "All", label: "All", shortcut: "1" },
    { id: "positive", label: "Positive", shortcut: "2" },
    { id: "neutral", label: "Neutral", shortcut: "3" },
    { id: "negative", label: "Negative", shortcut: "4" },
    { id: "dossier", label: `★ Dossier (${dossier.length})`, shortcut: "5", isSpecial: true }
  ];

  const globalSentiment = useMemo(() => {
    return calculateGlobalSentiment(articles);  
  }, [articles]);

  const filteredArticlesBySentiment = useMemo(() => {
    if (filterSentiment === "dossier") return dossier;
    if (filterSentiment === "All") return articles;
    return articles.filter((article) => article.sentiment === filterSentiment);
  }, [articles, filterSentiment, dossier]);

  const toggleDossier = (articleToToggle) => {
    const exists = dossier.some(
      (item) => (item.title && item.title === articleToToggle.title) || (item.url && item.url === articleToToggle.url)
    );
    let updated;
    if (exists) {
      updated = dossier.filter(
        (item) => !((item.title && item.title === articleToToggle.title) || (item.url && item.url === articleToToggle.url))
      );
    } else {
      updated = [articleToToggle, ...dossier];
    }
    setDossier(updated);
    try {
      localStorage.setItem("global_pulse_dossier", JSON.stringify(updated));
    } catch (err) {
      console.log("Failed saving intelligence dossier to local storage:", err);
    }
  };

  const getArticles = async () => {
    setLoading(true);
    try {
      const { articles: initialArticles, numOfArticles: total } = await fetchArticles(1);
      setArticles(initialArticles);
      setnumOfArticles(total);
      setPage(1);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const handleLoadMore = async () => {
    if (loadingMore || loading) return;
    setLoadingMore(true);
    try {
      const nextPage = page + 1;
      const { articles: moreArticles } = await fetchArticles(nextPage);
      setArticles((prev) => [...prev, ...moreArticles]);
      setPage(nextPage);
    } catch (err) {
      console.log("Error ingesting additional page stream:", err);
    } finally {
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    const fetchSentiment = async () => {
      setLoadingMap(true);
      const countries = ["us", "au", "ar"];
      const results = {};

      try {
        await Promise.all(
          countries.map(async (country) => {
            let count = 0;
            let totalScore = 0;

            const isLocalDev = import.meta.env.DEV;
            const baseUrl = isLocalDev ? "https://newsapi.org/v2/top-headlines/sources" : "/api/sources";
            const params = {
              country,
              pageSize: 20,
            };
            if (isLocalDev) params.apiKey = "0a9069f5ff1f4805888d3ec74d79118f";

            const res = await axios.get(baseUrl, { params });

            res.data.sources.forEach((article) => {
              const text = `${article.title || ""} ${article.description || ""}`;
              const sentiment = analyzeSentiment(text);
              totalScore += sentiment.score;
              count++;
            });

            const avg = count ? totalScore / count : 0;
            const normalized = Math.max(-30, Math.min(30, avg * 2));
            results[country.toUpperCase()] = Math.round(normalized);
          })
        );
        setCountrySentiment(results);
      } catch (err) {
        console.log("Error fetching sentiment:", err);
      } finally {
        setLoadingMap(false);
      }
    };

    fetchSentiment();
  }, []);

  useEffect(() => {
    getArticles();
  }, []);

  useEffect(() => {
    const handleKey = (e) => {
      if (document.activeElement?.tagName === "INPUT" || isCmdOpen) return;
      if (e.key === "1") setfilterSentiment("All");
      if (e.key === "2") setfilterSentiment("positive");
      if (e.key === "3") setfilterSentiment("neutral");
      if (e.key === "4") setfilterSentiment("negative");
      if (e.key === "5") setfilterSentiment("dossier");
    };
    window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isCmdOpen]);

  return (
    <main className="min-h-screen px-4 sm:px-10 pb-20 pt-6">
      <div className="max-w-[1600px] mx-auto">
        
        <CommandPalette 
          articles={articles} 
          isOpen={isCmdOpen} 
          setIsOpen={setIsCmdOpen} 
        />

        <DashboardStats 
          numOfArticles={numOfArticles} 
          globalSentiment={globalSentiment} 
          countrySentiment={CountrySentiment} 
          articles={articles}
        />

        <SentimentTrendsChart />

        <MapChart sentimentData={CountrySentiment} />

        <section className="pt-6">
          <div className="acrylic-card p-5 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4 rounded-2xl">
            
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl border transition-colors ${
                filterSentiment === 'dossier' 
                  ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' 
                  : 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400'
              }`}>
                {filterSentiment === 'dossier' ? <RiBookmark3Fill className="w-5 h-5" /> : <FiFilter className="w-5 h-5" />}
              </div>
              <div>
                <h5 className="text-lg font-semibold text-white tracking-tight flex items-center gap-2">
                  <span>{filterSentiment === 'dossier' ? "Personal Saved Intelligence Dossier" : "Live Categorized Editorial Stream"}</span>
                  <span className="text-xs font-mono font-normal text-zinc-400">
                    ({filteredArticlesBySentiment.length} active articles displayed)
                  </span>
                </h5>
                <p className="text-xs font-mono text-zinc-400 mt-0.5 flex items-center gap-2">
                  <RiKeyboardLine className="text-indigo-400" />
                  <span>Shortcut: Press [1-5] to switch filter stream instantly</span>
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3 self-start sm:self-center flex-wrap">
              <button
                onClick={() => setIsCmdOpen(true)}
                className="px-3.5 py-2 rounded-xl bg-white/[0.04] border border-white/[0.08] hover:bg-white/[0.1] text-zinc-300 text-xs font-mono flex items-center gap-2 transition-all shadow-sm"
                title="Open Command Palette (⌘ + K)"
              >
                <RiSearch2Line className="text-indigo-400" />
                <span className="hidden md:inline">Quick Search</span>
                <kbd className="px-1.5 py-0.5 rounded bg-black/50 text-[10px]">⌘K</kbd>
              </button>

              <div className="p-1.5 flex flex-wrap items-center rounded-xl bg-[#0a0b0f] border border-white/[0.08] shadow-inner gap-1">
                {filterOptions.map((opt) => {
                  const isActive = filterSentiment === opt.id;
                  const isDossier = opt.isSpecial;

                  return (
                    <button
                      key={opt.id}
                      onClick={() => setfilterSentiment(opt.id)}
                      className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 flex items-center gap-1.5 ${
                        isActive && isDossier
                          ? "bg-gradient-to-r from-amber-500/20 to-yellow-500/20 text-amber-300 border border-amber-500/50 shadow-[0_0_15px_rgba(245,158,11,0.2)] font-bold"
                          : isActive
                          ? "bg-[#1f222b] text-white border border-indigo-500/30 shadow-md font-semibold"
                          : isDossier
                          ? "text-amber-400/80 hover:text-amber-300 hover:bg-amber-500/10 border border-transparent"
                          : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03] border border-transparent"
                      }`}
                    >
                      <span className="text-[10px] text-zinc-500 hidden xl:inline">[{opt.shortcut}]</span>
                      <span>{opt.label}</span>
                    </button>
                  );
                })}
              </div>
            </div>
          </div>

          {loading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-10">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="acrylic-card rounded-xl p-5 h-72 flex flex-col justify-between relative overflow-hidden">
                  <div className="space-y-3 w-full">
                    <div className="w-1/3 h-3 rounded bg-white/[0.08] animate-shimmer" />
                    <div className="w-full h-36 rounded-lg bg-white/[0.04] animate-shimmer" />
                    <div className="w-3/4 h-5 rounded bg-white/[0.08] animate-shimmer" />
                  </div>
                  <div className="w-full h-3 rounded bg-white/[0.04] animate-shimmer" />
                </div>
              ))}
            </div>
          )}

          {!loading && filterSentiment === 'dossier' && dossier.length === 0 && (
            <div className="acrylic-card rounded-2xl p-16 text-center max-w-2xl mx-auto my-10 border border-amber-500/20 shadow-[0_0_40px_rgba(245,158,11,0.05)]">
              <div className="w-16 h-16 rounded-full bg-amber-500/10 border border-amber-500/30 text-amber-400 mx-auto flex items-center justify-center mb-5 shadow-inner">
                <RiBookmark3Line className="w-8 h-8 animate-pulse" />
              </div>
              <h4 className="text-zinc-100 font-semibold text-xl mb-2 tracking-tight">Your Personal Intelligence Dossier is Empty</h4>
              <p className="text-zinc-400 text-sm leading-relaxed max-w-md mx-auto mb-8 font-normal">
                Click the <span className="text-amber-400 font-mono text-xs bg-amber-500/10 px-2 py-0.5 rounded border border-amber-500/20 mx-1">☆ SAVE</span> button on any news card in the live stream to bookmark breaking reports into your localized offline briefing archive.
              </p>
              <button 
                onClick={() => setfilterSentiment("All")}
                className="px-6 py-2.5 rounded-xl bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-500 hover:to-purple-500 text-white text-xs font-mono font-semibold transition-all shadow-lg hover:scale-105"
              >
                Return to Live Editorial Stream [1]
              </button>
            </div>
          )}

          {!loading && filterSentiment !== 'dossier' && filteredArticlesBySentiment.length === 0 && (
            <div className="acrylic-card rounded-2xl p-16 text-center max-w-xl mx-auto my-10 border border-white/[0.08]">
              <p className="text-zinc-300 font-medium text-lg mb-2">No publications match filter "{filterSentiment}"</p>
              <p className="text-zinc-500 text-sm font-mono mb-6">Try resetting categorical filters or invoking global keyword search.</p>
              <button 
                onClick={() => setfilterSentiment("All")}
                className="px-5 py-2 rounded-xl bg-indigo-600 hover:bg-indigo-500 text-white text-xs font-mono font-semibold transition-all shadow-lg"
              >
                Reset Categorical Filter [1]
              </button>
            </div>
          )}

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredArticlesBySentiment.map((article, index) => {
              const isSaved = dossier.some(
                (item) => (item.title && item.title === article.title) || (item.url && item.url === article.url)
              );
              return (
                <ArticleCard 
                  key={article.url || index} 
                  article={article} 
                  isSaved={isSaved}
                  onToggleSave={() => toggleDossier(article)}
                />
              );
            })}
          </div>

          {!loading && filterSentiment !== 'dossier' && articles.length < numOfArticles && (
            <div className="mt-14 mb-8 flex flex-col items-center justify-center gap-3">
              <div className="flex items-center gap-2 text-[11px] font-mono text-zinc-500 tracking-wider uppercase">
                <RiStackLine className="text-indigo-400" />
                <span>DISPLAYING {articles.length} OF {numOfArticles.toLocaleString()} INGESTED GLOBAL MATCHES · STREAM PAGE {page}</span>
              </div>
              <button
                onClick={handleLoadMore}
                disabled={loadingMore}
                className="px-8 py-3.5 rounded-2xl acrylic-card bg-gradient-to-r from-[#12141c] to-[#181b26] hover:from-indigo-950/60 hover:to-purple-950/60 border border-indigo-500/30 hover:border-indigo-500 text-zinc-200 hover:text-white font-mono text-xs font-bold tracking-widest transition-all duration-300 shadow-2xl flex items-center gap-2.5 group cursor-pointer active:scale-95 disabled:opacity-50 disabled:pointer-events-none"
              >
                {loadingMore ? (
                  <>
                    <RiLoader4Line className="w-4 h-4 text-indigo-400 animate-spin" />
                    <span>INGESTING & PARSING STREAM PAGE {page + 1}...</span>
                  </>
                ) : (
                  <>
                    <RiAddCircleLine className="w-4 h-4 text-indigo-400 group-hover:scale-125 group-hover:text-indigo-300 transition-transform" />
                    <span>+ LOAD MORE INTELLIGENCE FEEDS (PAGE {page + 1})</span>
                  </>
                )}
              </button>
            </div>
          )}

        </section>

      </div>
    </main>
  );
}
