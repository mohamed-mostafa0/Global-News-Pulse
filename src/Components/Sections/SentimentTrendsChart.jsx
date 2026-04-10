import React, { useState } from 'react'
import { SimpleAreaChart } from '../Charts/SimpleAreaChart'

export default function SentimentTrendsChart() {

const [activeBtn, setactiveBtn] = useState("Global")
const btns = ["Global" , "US" , "China" , "Europe"]

const data = [
  { name: "00.00", sentiment: 0 },
  { name: "03.00", sentiment: 25 },
  { name: "06.00", sentiment: 24 },
  { name: "09.00", sentiment: 75 },
  { name: "12.00", sentiment: 74 }
];
  return <>
        <div className='p-6 border border-white/10 rounded-2xl bg-[#ffffff08]'>
            <div className='flex items-center justify-between mb-5'>
                <div className=''>
                    <h4 className='text-white font-semibold text-xl'>Sentiment Trends</h4>
                    <p className='text-white/20'>Real-time sentiment fluctuation over the last 24h</p>
                </div>
                <div className='p-1 bg-white/5 rounded-lg border border-white/10'>
                {
                    btns.map((btn)=><>
                        <button 
                        className={` px-4 py-1.5 rounded-md text-sm font-medium ${activeBtn==btn ? "bg-[#3A294D] text-[#a855f7]" : "text-white/60"}`}
                        onClick={()=>setactiveBtn(btn)}
                        >{btn}</button>
                        
                    </>)
                }
                </div>
            </div>
                <div>

          <SimpleAreaChart data={data}/>
                </div>
        </div>
  </>
}
