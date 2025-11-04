'use client'
import React, { useState } from 'react'
import { Product } from '@/lib/types'

import { Loader2, MinusIcon, PlusIcon } from 'lucide-react'
import useCartStore from '@/stores/cartStore'
import { CheckIcon } from 'lucide-react'
import { toast } from 'react-toastify'

interface ProductInteractionProps {
  product: Product
}
const ProductInteraction = ({ product }: ProductInteractionProps) => {
  const { addToCart } = useCartStore()
  const [quantity, setQuantity] = useState(1)
  const [isAdded, setIsAdded] = useState(false)
  const [isLoading, setIsLoading] = useState(false)

  const handleAddToCart = () => {
    setIsLoading(true)
    addToCart({ product, quantity: quantity })
    setIsAdded(true)
    setIsLoading(false)
    setTimeout(() => {
      setIsAdded(false)
    }, 2000)
    toast.success(`${product.name} added to cart`)
    setQuantity(1)
  }
  return (
    <div className="flex items-center gap-2">
      <div className="flex items-center gap-2">
        <button onClick={() => {
          setQuantity(quantity - 1)
          if (quantity <= 1) {
            setQuantity(1)
          }
        }} className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <MinusIcon className="w-4 h-4" />
        </button>
        <span className="text-gray-500 text-sm">{quantity}</span>
      </div>
      <div className="flex items-center gap-2">
        <button onClick={() => {
          setQuantity(quantity + 1)
          if (quantity >= product.stock) {
            setQuantity(product.stock)
          }
        }} className="w-10 h-10 bg-gray-200 rounded-full flex items-center justify-center">
          <PlusIcon className="w-4 h-4" />
        </button>
      </div>
      <button disabled={isLoading || isAdded} onClick={() => {
        handleAddToCart()
      }} className="w-full bg-[#5DADAC] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#0D383B] transition-all duration-300 flex items-center justify-center gap-2 shadow-lg disabled:opacity-50 disabled:cursor-not-allowed">
        {isLoading ? <Loader2 className="w-4 h-4 animate-spin" /> : isAdded ? <CheckIcon className="w-4 h-4" /> : 'Add to Cart'}
        {isLoading && <span className="text-white text-sm">Adding to cart...</span>}
        {isAdded && <span className="text-white text-sm">Added to cart</span>}
      </button>
    </div>
  )
}

export default ProductInteraction