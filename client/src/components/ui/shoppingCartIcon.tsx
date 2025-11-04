'use client'
import React from 'react'

import Link from 'next/link'
import { ShoppingCartIcon as ShoppingCartIconIcon } from 'lucide-react'
import useCartStore from '@/stores/cartStore'

interface ShoppingCartIconProps {
  isScrolled: boolean
}

const ShoppingCartIcon = ({ isScrolled }: ShoppingCartIconProps) => {
  const { cart, hasHydrated } = useCartStore();

  if (!hasHydrated) return null;
  return (
    <Link href="/cart" className='relative'>
      <ShoppingCartIconIcon className={`w-6 h-6 cursor-pointer transition-colors duration-300 ${
            isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-300'
          }`} />
          {cart.length > 0 && <span className='absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>{cart.reduce((acc, item) => acc + item.quantity, 0)}</span>}
    </Link>
  )
}

export default ShoppingCartIcon