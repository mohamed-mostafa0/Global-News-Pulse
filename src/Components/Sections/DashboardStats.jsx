import React from 'react'
import { HiOutlineLightningBolt } from "react-icons/hi";
import { ImStatsBars } from "react-icons/im";
import { TfiWorld } from "react-icons/tfi";
import { SimpleAreaChart } from '../Charts/SimpleAreaChart';

export default function DashboardStats({
    globalSentiment , numOfArticles
}
) {




  return <>
  
          <div className="grid grid-cols-4 gap-6 mb-10">
          <div class="rounded-2xl p-6 bg-[#ffffff08] relative overflow-hidden group hover:border-white/20 border-[#ffffff14] border  transition-colors">
            <div class="absolute -right-6 -top-6 w-24 h-24 bg-neon-cyan  rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div class="flex justify-between items-start mb-4 relative z-10">
              <div class="p-2 rounded-lg bg-white/5 border border-white/10">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-newspaper w-5 h-5 text-neon-cyan"
                  aria-hidden="true"
                >
                  <path d="M15 18h-5"></path>
                  <path d="M18 14h-8"></path>
                  <path d="M4 22h16a2 2 0 0 0 2-2V4a2 2 0 0 0-2-2H8a2 2 0 0 0-2 2v16a2 2 0 0 1-4 0v-9a2 2 0 0 1 2-2h2"></path>
                  <rect width="8" height="4" x="10" y="6" rx="1"></rect>
                </svg>
              </div>
              <div
                class="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-full bg-white/5 border border-white/5
            text-neon-green"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  stroke-width="2"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  class="lucide lucide-trending-up w-3 h-3"
                  aria-hidden="true"
                >
                  <path d="M16 7h6v6"></path>
                  <path d="m22 7-8.5 8.5-5-5L2 17"></path>
                </svg>
                <span data-id="element-95">12%</span>
              </div>
            </div>
            <div class="relative z-10" data-id="element-96">
              <h3 class="text-sm text-white/60 font-medium mb-1">
                Total Articles
              </h3>
              <div class="flex items-baseline gap-2" data-id="element-98">
                <span class="text-3xl font-bold font-mono tracking-tight text-white">
                  {numOfArticles}
                </span>
                <span class="text-xs text-white/40" data-id="element-100">
                  Last 24 hours
                </span>
              </div>
            </div>
          </div>
          <div class="glass rounded-2xl p-6 relative overflow-hidden bg-[#ffffff08] group hover:border-white/20 border border-[#ffffff14]  transition-colors">
            <div class="absolute -right-6 -top-6 w-24 h-24 bg-neon-green  rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div class="flex justify-between items-start mb-4 relative z-10">
              <div class="p-2 rounded-lg bg-white/5 border border-white/10 text-neon-green text-xl">
                <HiOutlineLightningBolt />
              </div>
            </div>
            <div className="relative z-10">
              <h3 className="text-sm text-white/60 font-medium mb-1">
                Global Sentiment
              </h3>

              <div className="flex items-center justify-center -mt-2">
                <div className="relative flex flex-col items-center justify-center">
                  {(() => {
                    const radius = 40;
                    const circumference = 2 * Math.PI * radius;
                    const offset =
                      circumference - (globalSentiment / 100) * circumference;

                    return (
                      <svg
                        width="100"
                        height="100"
                        className="-rotate-90 transform"
                      >
                        
                        <circle
                          cx="50"
                          cy="50"
                          r={radius}
                          stroke="rgba(255,255,255,0.1)"
                          strokeWidth="8"
                          fill="transparent"
                        />

                       
                        <circle
                          cx="50"
                          cy="50"
                          r={radius}
                          stroke={globalSentiment > 50 ? "#00ff88" : "#e7000b"}
                          strokeWidth="8"
                          fill="transparent"
                          strokeDasharray={circumference}
                          strokeDashoffset={offset}
                          strokeLinecap="round"
                          className="transition-all duration-700 ease-out"
                        />
                      </svg>
                    );
                  })()}

                  <div className="absolute inset-0 flex items-center justify-center">
                    <span
                      className={`text-2xl font-bold font-mono ${
                        globalSentiment > 50
                          ? "text-neon-green"
                          : "text-red-500"
                      }`}
                    >
                      {Math.round(globalSentiment)}%
                    </span>
                  </div>
                </div>
              </div>
            </div>

          </div>
          <div class="glass rounded-2xl p-6 relative overflow-hidden bg-[#ffffff08] group hover:border-white/20 border border-[#ffffff14]  transition-colors">
            <div class="absolute -right-6 -top-6 w-24 h-24 bg-purple-400 rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div class="flex justify-between items-start mb-4 relative z-10">
              <div class="p-2 rounded-lg bg-white/5 border border-white/10 text-purple-700 text-xl">
               <ImStatsBars />
              </div>
            </div>
            <div class="relative z-10" data-id="element-96">
              <h3 class="text-sm text-white/60 font-medium mb-1">
                Trending keyword
              </h3>
              <h3 className='text-3xl font-semibold text-white'>AI Regulation</h3>

            </div>
          </div>
          <div class="glass rounded-2xl p-6 relative overflow-hidden bg-[#ffffff08] group hover:border-white/20 border border-[#ffffff14]  transition-colors">
            <div class="absolute -right-6 -top-6 w-24 h-24 bg-red-400  rounded-full blur-3xl opacity-20 group-hover:opacity-30 transition-opacity"></div>
            <div class="flex justify-between items-start mb-4 relative z-10">
              <div class="p-2 rounded-lg bg-white/5 border border-white/10 text-xl text-red-400">
                  <TfiWorld />
              </div>
            </div>
            <div class="relative z-10" data-id="element-96">
              <h3 class="text-sm text-white/60 font-medium mb-1">
                Ative Regions
              </h3>
              <h3><span className='text-3xl text-white font-semibold'>42</span> </h3>

            </div>
          </div>
        </div>

  </>
}
