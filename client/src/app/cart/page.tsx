'use client'
import React, { useState } from 'react'

const steps = [
  {
    label: 'Cart',
    href: '/cart',
  },
  {
    label: 'Shipping',
    href: '/cart/shipping',
  },
  {
    label: 'Payment',
    href: '/cart/payment',
  },
]
const cartItems = [
  {
    id: 1,
    name: 'Bouquet 1',
    price: 100,
    image: '/images/product1.jpg',
    quantity: 1,
  },
  {
    id: 2,
    name: 'Bouquet 2',
    price: 200,
    image: '/images/product2.jpg',
    quantity: 1,
  },
  {
    id: 3,
    name: 'Bouquet 3',
    price: 300,
    image: '/images/product3.jpg',
    quantity: 1,
  },
]


const CartPage = () => {
  const [step, setStep] = useState(0)
  return (
    <main
    className="min-h-[calc(100vh-20rem)]"
    style={{
      background: "linear-gradient(to right, #0D383B 39%, #142424 100%)",
    }}
  >
    <section
    className="w-full py-10 px-4 sm:px-6 lg:px-8 pt-24 pb-10 flex flex-col items-center justify-center "
    >
      <div className="max-w-7xl mx-auto mt-20">
        <div className="flex items-center justify-center">
          <h1 className="text-2xl font-bold text-white text-center">Your Shopping Cart</h1>
        </div>
      </div>
    </section>
  </main>
  )
}

export default CartPage