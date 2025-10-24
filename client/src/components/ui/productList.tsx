import React from 'react'
import { productDummyData } from '@/lib/utils'
import Categories from './categories'
import ProductCard from './productCard'

interface ProductListProps {
  showCategories?: boolean
}

const ProductList = ({ showCategories = true }: ProductListProps) => {
  return (
    <div className='w-full'>
      {showCategories && <Categories />}
      <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
        {productDummyData.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  )
}

export default ProductList