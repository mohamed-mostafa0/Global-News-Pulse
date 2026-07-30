import React, { useState } from 'react';
import { SimpleAreaChart } from '../Charts/SimpleAreaChart';
import { RiTimeLine, RiLineChartLine } from 'react-icons/ri';

export default function SentimentTrendsChart() {
  const [activeBtn, setActiveBtn] = useState("Global");
  const btns = ["Global", "US", "China", "Europe"];

  const data = [
    { name: "00.00", sentiment: 35 },
    { name: "03.00", sentiment: 48 },
    { name: "06.00", sentiment: 42 },
    { name: "09.00", sentiment: 78 },
    { name: "12.00", sentiment: 68 },
    { name: "15.00", sentiment: 84 },
    { name: "18.00", sentiment: 72 },
    { name: "21.00", sentiment: 76 }
  ];

  return (
    <section className="mb-10 max-w-[1600px] mx-auto">
      <div className="acrylic-card rounded-2xl p-6 sm:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-6 pb-6 border-b border-white/[0.06]">
          <div>
            <div className="flex items-center gap-2 text-xs font-mono text-indigo-400 font-semibold uppercase mb-1">
              <RiLineChartLine className="w-4 h-4" />
              <span>24h Time-Series Telemetry</span>
            </div>
            <h4 className="text-xl sm:text-2xl font-semibold text-white tracking-tight">
              Sentiment Volatility Curve
            </h4>
            <p className="text-sm text-zinc-400 mt-1">
              Continuous affective score tracking across sequential 3-hour chronological sampling buckets.
            </p>
          </div>

          <div className="p-1 bg-[#0d0e12] rounded-xl border border-white/[0.08] flex items-center gap-1 self-start md:self-center shadow-inner">
            {btns.map((btn) => (
              <button
                key={btn}
                onClick={() => setActiveBtn(btn)}
                className={`px-4 py-1.5 rounded-lg text-xs font-mono font-medium transition-all duration-200 ${
                  activeBtn === btn
                    ? "bg-[#1f222b] text-indigo-300 border border-indigo-500/30 shadow-md font-semibold"
                    : "text-zinc-400 hover:text-zinc-200 hover:bg-white/[0.03]"
                }`}
              >
                {btn}
              </button>
            ))}
          </div>
        </div>

        <div className="pt-2">
          <SimpleAreaChart data={data} />
        </div>

        <div className="mt-4 pt-4 border-t border-white/[0.04] flex items-center justify-between text-xs font-mono text-zinc-500">
          <span>AGGREGATED CONFIDENCE: HIGH (±1.4%)</span>
          <span className="flex items-center gap-1">
            <RiTimeLine /> UPDATED IN REAL-TIME FROM CLIENT AGGREGATE
          </span>
        </div>
      </div>
    </section>
  );
}
