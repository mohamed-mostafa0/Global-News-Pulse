import React from "react";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-[#0e1015]/95 backdrop-blur-xl border border-white/[0.15] p-3.5 rounded-xl shadow-2xl font-mono text-xs text-zinc-200">
        <div className="text-[11px] text-zinc-500 uppercase pb-1.5 border-b border-white/[0.08] mb-2 flex items-center justify-between gap-4">
          <span>TIME BUCKET</span>
          <span className="text-indigo-400 font-bold">{label} UTC</span>
        </div>
        <div className="flex items-center justify-between gap-6 py-0.5">
          <span className="text-zinc-400">VALENCE METRIC</span>
          <span className="text-emerald-400 font-bold tabular-nums">+{payload[0].value}%</span>
        </div>
        <div className="flex items-center justify-between gap-6 py-0.5 text-[11px]">
          <span className="text-zinc-500">CONFIDENCE INTERVAL</span>
          <span className="text-zinc-300">98.4% (p &lt; 0.01)</span>
        </div>
      </div>
    );
  }
  return null;
};

export const SimpleAreaChart = ({ data }) => {
  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 10, left: -20, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorSentiment" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#6366f1" stopOpacity={0.35} />
              <stop offset="60%" stopColor="#8b5cf6" stopOpacity={0.1} />
              <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="rgba(255,255,255,0.04)" vertical={false} strokeDasharray="4 4" />
          
          <XAxis
            dataKey="name"
            stroke="rgba(255,255,255,0.3)"
            tick={{ fontSize: 12, fill: "#a1a1aa", fontFamily: "JetBrains Mono, monospace" }}
            axisLine={false}
            tickLine={false}
            dy={8}
          />
            
          <YAxis
            stroke="rgba(255,255,255,0.3)"
            tick={{ fontSize: 12, fill: "#71717a", fontFamily: "JetBrains Mono, monospace" }}
            axisLine={false}
            tickLine={false}
            domain={[0, 100]}
          />
          
          <Tooltip content={<CustomTooltip />} cursor={{ stroke: 'rgba(255,255,255,0.2)', strokeDasharray: '4 4' }} />

          <Area
            type="monotone"
            dataKey="sentiment"
            stroke="#818cf8"
            strokeWidth={2.5}
            fillOpacity={1}
            fill="url(#colorSentiment)"
            activeDot={{ r: 5, stroke: "#ffffff", strokeWidth: 2, fill: "#6366f1" }}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
