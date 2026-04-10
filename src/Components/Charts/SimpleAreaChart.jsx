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

export const SimpleAreaChart = ({ data }) => {

  return (
    <div style={{ width: "100%", height: 350 }}>
      <ResponsiveContainer>
        <AreaChart
          data={data}
          margin={{ top: 20, right: 0, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorUv" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
            </linearGradient>
          </defs>

          <CartesianGrid stroke="rgba(255,255,255,0.05)" vertical={false}/>
          <XAxis
           dataKey="name"
            stroke="rgba(255,255,255,0.4)"
            tick={{ fontSize: 12 }} 
            axisLine={false}/>
            
          <YAxis
           stroke="rgba(255,255,255,0.4)"
           tick={{ fontSize: 14 }}
           axisLine={false}  />
          <Tooltip
            contentStyle={{
              backgroundColor: "#111",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
            }}
            labelStyle={{ color: "#fff" }}
          />

          <Area
            type="monotone"
            dataKey="sentiment"
            stroke="#a855f7"
            strokeWidth={2}
            fill="url(#colorUv)"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
};
