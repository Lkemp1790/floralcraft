import React from 'react'
import { Product } from '@/lib/types'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div className='relative rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group bg-white'>
      <div className='relative aspect-[3/4] bg-gray-100'>
        <Image
          src={product.image}
          alt={product.name}
          fill
          className='object-cover group-hover:scale-105 transition-transform duration-300'
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />
        <div className='absolute inset-0 bg-black/5' />
        <div className='absolute bottom-0 left-0 right-0 h-1/2 bg-gradient-to-t from-black/50 via-black/30 to-transparent backdrop-blur-[3px]'>
          <div className='absolute bottom-0 left-0 right-0 p-4 space-y-2'>
            <h3 className='text-white text-lg font-serif font-semibold'>{product.name}</h3>
            <p className='text-white/95 text-sm line-clamp-2'>{product.description}</p>
            <div className='flex items-center justify-between'>
              <span className='text-white font-medium'>£{product.price}</span>
              <span className='bg-white/20 backdrop-blur-md border border-white/30 rounded-md px-3 py-1 text-white text-xs'>View</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductCard