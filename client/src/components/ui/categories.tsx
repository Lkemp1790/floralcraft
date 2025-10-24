import React from 'react'
import { categoryDummyData } from '@/lib/utils'
import Image from 'next/image'


const Categories = () => {
  return (
    <div className='flex flex-wrap flex-row gap-6 w-full'>
      {categoryDummyData.map((category) => (
        <div key={category.id} className='relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 w-full group flex-1 min-w-[280px]'>
          {/* Background Image */}
          <div className='relative aspect-[3/4] bg-gray-200'>
            <Image
              src={category.image}
              alt={category.name}
              fill
              className='object-cover group-hover:scale-105 transition-transform duration-300'
              sizes="(max-width: 768px) 50vw, (max-width: 1200px) 33vw, 25vw"
            />

            {/* Subtle overall overlay for contrast */}
            <div className='absolute inset-0 bg-black/5'></div>

            {/* Subtle Bottom Blur Overlay covering text */}
            <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 via-black/30 to-transparent backdrop-blur-[3px]'>
              {/* Content Overlay */}
              <div className='absolute bottom-0 left-0 right-0 p-4 space-y-2 flex flex-col items-start justify-between h-full'>
                <h3 className='text-white text-lg font-serif font-semibold'>
                  {category.name}
                </h3>
                <p className='text-white/95 text-sm leading-relaxed'>
                  {category.description}
                </p>

                {/* Glass Effect Button */}
                <button className='w-full bg-white/20 backdrop-blur-md border border-white/30 rounded-lg px-4 py-2 text-white text-sm font-medium hover:bg-white/30 transition-all duration-300 hover:scale-105'>
                  View Collection →
                </button>
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Categories