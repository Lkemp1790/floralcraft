import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col items-center md:flex-row md:items-start bg-[#5DADAC] min-h-[200px] p-8'>
      <div className='flex flex-col items-center gap-4 md:items-start'>
      <Link href="/" className='flex items-center text-2xl font-bold font-serif transition-colors duration-300'>
          FloralCraft
        </Link>
        <p className='text-white/90 text-sm'>© {new Date().getFullYear()} FloralCraft.</p>
        <p>All rights reserved.</p>
      </div>
    </div>
  )
}

export default Footer
