import React from 'react'
import { Product } from '@/lib/types'
import Image from 'next/image'

interface ProductCardProps {
  product: Product
}

const ProductCard = ({ product }: ProductCardProps) => {
  return (
    <div>
    <div className='bg-white rounded-lg shadow-md overflow-hidden'>
      <Image src={product.image} alt={product.name} width={300} height={300} />
    </div>
    <div className='p-4'>
      <h3 className='text-lg font-medium text-gray-900'>{product.name}</h3>
      <p className='text-sm text-gray-500'>{product.description}</p>
      <p className='text-lg font-medium text-gray-900'>${product.price}</p>
    </div>
    <div className='p-4'>
      <button className='bg-black text-white px-4 py-2 rounded-md'>Add to Cart</button>
    </div>
    </div>
  )
}

export default ProductCard