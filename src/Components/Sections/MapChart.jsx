import React from "react";
import { Tooltip } from "react-tooltip";
import "react-tooltip/dist/react-tooltip.css";

const countries = [
  { name: "United States", code: "US", left: "24%", top: "44%" },
  { name: "Australia", code: "AU", left: "80%", top: "76%" },
  { name: "Argentina", code: "AR", left: "30%", top: "79%" },
];

const getColor = (value) => {
  if (value > 15) return "#39ff14";
  if (value > 0) return "#00ffff";
  if (value === 0) return "#888";
  if (value > -15) return "#ff7f50";
  return "#ff0033";
};

export default function MapChart({ sentimentData }) {
  return (
    <div style={containerStyle}>
      {/* Decorative SVG */}
      <svg
        viewBox="0 0 1000 420"
        style={{
          width: "100%",
          height: "100%",
          position: "absolute",
          inset: 0,
        }}
      >
        <defs>
          <linearGradient id="mapStroke" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0%" stopColor="rgba(0,255,255,0.35)" />
            <stop offset="40%" stopColor="rgba(168,85,247,0.30)" />
            <stop offset="100%" stopColor="rgba(255,127,80,0.25)" />
          </linearGradient>
        </defs>

        <path
          d="M90,250 C140,205 190,190 240,190 
             C300,190 330,220 360,235 
             C400,255 420,260 450,255 
             C510,245 545,220 575,210 
             C610,198 660,210 700,205 
             C740,200 770,175 810,175 
             C865,175 900,205 930,235"
          fill="none"
          stroke="url(#mapStroke)"
          strokeWidth="2"
        />
      </svg>

      {/* Sentiment Dots */}
      {countries.map((country, i) => {
        const value = sentimentData?.[country.code] ?? 0;

        return (
          <div
            key={i}
            style={{
              position: "absolute",
              left: country.left,
              top: country.top,
              transform: "translate(-50%, -50%)",
            }}
          >
            <div
              data-tooltip-id="dot-tooltip"
              data-tooltip-html={`<b>${country.name}</b><br/>Sentiment: ${value}`}
              style={{
                width: 14,
                height: 14,
                borderRadius: "50%",
                background: getColor(value),
                boxShadow: `0 0 14px ${getColor(value)}`,
                animation: "pulse 2s infinite",
                cursor: "pointer",
                transition: "all 0.4s ease",
              }}
            />
          </div>
        );
      })}

      <Tooltip id="dot-tooltip" />

      <style>{`
        @keyframes pulse {
          0% { transform: scale(1); opacity: 0.8; }
          50% { transform: scale(1.3); opacity: 1; }
          100% { transform: scale(1); opacity: 0.8; }
        }
      `}</style>
    </div>
  );
}

const containerStyle = {
  position: "relative",
  width: "100%",
  height: "420px",
  background:
    "radial-gradient(circle at 20% 10%, rgba(0,255,255,0.1), transparent 40%), #ffffff08",
  borderRadius: "20px",
  overflow: "hidden",
};
