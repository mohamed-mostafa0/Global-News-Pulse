import React from 'react'

export default function StatesCard({icon , iconColor, title , content ,cardStat}) {
  return <>
  
    <div>
        <div className='p-3'>
            <div className='flex items-center'>
                <span className={`${iconColor} p-2`}>{icon}</span>
                {cardStat?  <div class="flex items-center gap-1 text-xs font-mono px-2 py-1 rounded-full bg-white/5 border border-white/5
                text-neon-green" data-id="element-91"><svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-trending-up w-3 h-3" aria-hidden="true" data-id="element-92"><path d="M16 7h6v6"></path><path d="m22 7-8.5 8.5-5-5L2 17"></path></svg><span data-id="element-95">12%</span></div>
                :""  
                }
            </div>
            <p className='text-gray-400'>{title}</p>
            <div className='flex-items-center'>
                <p className='font-bold text-3xl'>{content}</p>
                <span></span>
            </div>
        </div>
    </div>
  </>
}
