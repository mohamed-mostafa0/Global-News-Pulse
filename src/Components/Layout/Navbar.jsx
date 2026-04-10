import React from 'react'
import { RiPulseFill } from "react-icons/ri";
import { GoDotFill } from "react-icons/go";

export default function Navbar() {
  return <>
    <div className='w-full border-b border-white/10 bg-background backdrop-blur-md'>
      <div className='flex items-center justify-between p-3'>
        <div className='flex items-center gap-10'>
          <h1 className='flex items-center font-bold text-2xl text-white'><RiPulseFill  className='text-glow-cyan text-neon-cyan mr-2 '/>Global News <span className='ml-2 text-glow-cyan text-neon-cyan'> Pulse</span></h1>
          <div class="ml-6 flex items-center gap-2 px-3 py-1 rounded-full bg-neon-green/10 border border-neon-green/20" >
            <div class="w-2 h-2 rounded-full bg-neon-green animate-pulse" ></div>
            <span class="text-xs font-mono text-neon-green font-bold tracking-wider" data-id="element-11">LIVE</span>
          </div>
        </div>
        <div>

        </div>
      </div>
    </div>
  </>
}
