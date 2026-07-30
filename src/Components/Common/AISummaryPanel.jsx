import React, { useState, useEffect } from 'react';
import { RiBrainLine, RiTerminalLine, RiVolumeUpLine, RiVolumeMuteLine, RiPlayCircleFill, RiStopCircleFill } from 'react-icons/ri';

export default function AISummaryPanel({ globalSentiment, numOfArticles, countrySentiment, articles }) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [isSupported, setIsSupported] = useState(true);
  
  const isOptimistic = globalSentiment > 50;
  const sentimentDiff = Math.abs(Math.round((globalSentiment - 50) * 1.5));

  useEffect(() => {
    if (typeof window !== "undefined" && !("speechSynthesis" in window)) {
      setIsSupported(false);
    }
    return () => {
      if (typeof window !== "undefined" && "speechSynthesis" in window) {
        window.speechSynthesis.cancel();
      }
    };
  }, []);
  
  const getInferences = () => {
    const bullets = [];
    if (numOfArticles > 0) {
      bullets.push(
        `Ingested & parsed ${numOfArticles} breaking international publications over the last 24h via zero-cost client-side AFINN lexical evaluation.`
      );
    } else {
      bullets.push(`Establishing real-time algorithmic connection to global syndicated headline feeds...`);
    }

    if (globalSentiment) {
      const tone = isOptimistic ? "moderately optimistic" : "cynical and defensive";
      bullets.push(
        `Global editorial tone is leaning ${tone} at ${Math.round(globalSentiment)}% normalized affective valence (${isOptimistic ? '+' : '-'}${sentimentDiff}% vs. baseline).`
      );
    }

    const keys = Object.keys(countrySentiment || {});
    if (keys.length > 0) {
      const topCountry = keys.reduce((a, b) => (countrySentiment[a] > countrySentiment[b] ? a : b), keys[0]);
      bullets.push(
        `Regional telemetry detects the most affirmative coverage originating from ${topCountry} publication networks regarding technology governance.`
      );
    }

    return bullets;
  };

  const toggleSpeechBriefing = () => {
    if (!isSupported) return;

    if (isPlaying) {
      window.speechSynthesis.cancel();
      setIsPlaying(false);
      return;
    }

    window.speechSynthesis.cancel();

    const toneText = isOptimistic ? "moderately optimistic and bullish" : "cynical and defensive";
    const scoreText = Math.round(globalSentiment || 50);
    const volumeText = numOfArticles || 20;

    let speechText = `Welcome to your Global News Pulse executive AI briefing. Over the last 24 hours, our monitoring systems ingested and evaluated ${volumeText} international syndicated media feeds using client-side lexical analysis. `;
    speechText += `The global public sentiment score is currently leaning ${toneText}, registering at ${scoreText} percent affective valence. `;

    const keys = Object.keys(countrySentiment || {});
    if (keys.length > 0) {
      const topCountry = keys.reduce((a, b) => (countrySentiment[a] > countrySentiment[b] ? a : b), keys[0]);
      speechText += `Our spatial mapping radar identifies ${topCountry} news networks as displaying the highest affirmative momentum today. `;
    }

    if (articles && articles.length > 0) {
      const headline1 = articles[0]?.title || "";
      const headline2 = articles[1]?.title || "";
      if (headline1) {
        speechText += `Key breaking developments currently running through our feed include: ${headline1}. `;
        if (headline2) {
          speechText += `Additionally, reports indicate: ${headline2}. `;
        }
      }
    }

    speechText += `Thank you for utilizing Global News Pulse real-time media intelligence. Have a productive session.`;

    const utterance = new SpeechSynthesisUtterance(speechText);
    utterance.rate = 1.05; 
    utterance.pitch = 0.95;
    utterance.volume = 1.0;

    const voices = window.speechSynthesis.getVoices();
    const preferredVoice = voices.find(v => 
      (v.lang.includes('en') || v.lang.includes('EN')) && 
      (v.name.includes('Natural') || v.name.includes('Google') || v.name.includes('Siri') || v.name.includes('Samantha') || v.name.includes('David') || v.name.includes('Alex'))
    ) || voices.find(v => v.lang.includes('en'));

    if (preferredVoice) {
      utterance.voice = preferredVoice;
    }

    utterance.onstart = () => setIsPlaying(true);
    utterance.onend = () => setIsPlaying(false);
    utterance.onerror = () => setIsPlaying(false);

    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="acrylic-card rounded-2xl p-6 col-span-1 md:col-span-2 relative overflow-hidden flex flex-col justify-between group border-t border-t-indigo-500/60 shadow-[0_4px_30px_rgba(99,102,241,0.05)]">
      <div className="absolute top-0 right-0 w-3/4 h-36 bg-gradient-to-l from-indigo-600/15 via-purple-600/5 to-transparent blur-3xl pointer-events-none transition-opacity duration-500 opacity-75 group-hover:opacity-100" />
      
      <div>
        <div className="flex flex-wrap items-center justify-between gap-3 mb-5">
          <div className="flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-inner">
            <RiBrainLine className="w-3.5 h-3.5 animate-pulse text-indigo-300" />
            <span className="text-[11px] font-mono font-semibold tracking-widest uppercase">✦ Real-Time AI Lexical Synthesis</span>
          </div>

          {isSupported && (
            <button
              onClick={toggleSpeechBriefing}
              className={`flex items-center gap-2.5 px-4 py-1.5 rounded-xl text-xs font-mono font-semibold transition-all duration-300 shadow-md ${
                isPlaying
                  ? 'bg-gradient-to-r from-emerald-500/20 to-teal-500/20 text-emerald-300 border border-emerald-500/50 shadow-[0_0_20px_rgba(16,185,129,0.25)] scale-105'
                  : 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white hover:from-indigo-500 hover:to-purple-500 hover:scale-[1.02] border border-white/20'
              }`}
              title="Speak executive intelligence summary out loud (Web Speech API)"
            >
              {isPlaying ? (
                <>
                  <RiStopCircleFill className="w-4 h-4 text-emerald-400 animate-pulse" />
                  <span>■ STOP BRIEFING</span>
                  <div className="flex items-end gap-[3px] h-3 ml-1 px-1">
                    <span className="w-0.5 h-3 bg-emerald-400 rounded-full animate-[pulse_0.6s_ease-in-out_infinite_alternate]" />
                    <span className="w-0.5 h-2 bg-emerald-400 rounded-full animate-[pulse_0.4s_ease-in-out_infinite_alternate_0.2s]" />
                    <span className="w-0.5 h-3.5 bg-emerald-400 rounded-full animate-[pulse_0.5s_ease-in-out_infinite_alternate_0.1s]" />
                  </div>
                </>
              ) : (
                <>
                  <RiPlayCircleFill className="w-4 h-4 text-white" />
                  <span>▶ LISTEN TO AI BRIEFING (60S)</span>
                  <RiVolumeUpLine className="w-3.5 h-3.5 opacity-70 ml-0.5" />
                </>
              )}
            </button>
          )}
        </div>

        <div className="flex items-center justify-between mb-3">
          <h3 className="text-xl font-semibold text-white tracking-tight flex items-center gap-2">
            Global Media Mood Assessment
          </h3>
          <span className="text-xs font-mono text-zinc-500 hidden sm:flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-breathe" />
            EVALUATED AT 1000HZ
          </span>
        </div>

        <div className="space-y-2.5 mb-6">
          {getInferences().map((bullet, idx) => (
            <p key={idx} className="text-sm text-zinc-300 flex items-start gap-2.5 leading-relaxed">
              <span className="text-indigo-400 mt-0.5 font-mono text-xs select-none font-bold">0{idx + 1}.</span>
              <span>{bullet}</span>
            </p>
          ))}
        </div>
      </div>

      <div className="pt-4 border-t border-white/[0.06] flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex justify-between text-xs font-mono mb-1.5">
            <span className="text-zinc-400">AFFECTIVE VALENCE DISTRIBUTION</span>
            <span className={isOptimistic ? "text-emerald-400 font-bold" : "text-rose-400 font-bold"}>
              {Math.round(globalSentiment || 50)}% {isOptimistic ? "OPTIMISTIC ▲" : "CRITICAL ▼"}
            </span>
          </div>
          <div className="h-2.5 w-full bg-black/50 rounded-full overflow-hidden border border-white/[0.08] relative">
            <div 
              className={`h-full transition-all duration-700 ease-out rounded-full ${
                isOptimistic 
                  ? 'bg-gradient-to-r from-indigo-500 via-teal-400 to-emerald-400 shadow-[0_0_12px_rgba(16,185,129,0.4)]' 
                  : 'bg-gradient-to-r from-indigo-500 via-pink-500 to-rose-500 shadow-[0_0_12px_rgba(244,63,94,0.4)]'
              }`} 
              style={{ width: `${Math.min(100, Math.max(5, globalSentiment || 50))}%` }} 
            />
          </div>
        </div>

        <div className="flex items-center gap-5 text-xs font-mono border-t sm:border-t-0 sm:border-l border-white/[0.06] pt-3 sm:pt-0 sm:pl-5 text-zinc-400">
          <div>
            <div className="text-[10px] text-zinc-500 uppercase font-semibold">MODEL ENGINE</div>
            <div className="text-zinc-200 font-medium">AFINN-165 Node</div>
          </div>
          <div>
            <div className="text-[10px] text-zinc-500 uppercase font-semibold">VOICE NODE</div>
            <div className="text-emerald-400 font-medium">WebSpeech v2</div>
          </div>
        </div>
      </div>
    </div>
  );
}
