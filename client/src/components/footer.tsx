import Link from 'next/link'
import React from 'react'

const Footer = () => {
  return (
    <div className='flex flex-col items-center gap-8 md:gap-0 md:flex-row md:items-start md:justify-between bg-white p-8'>
      <div className='flex flex-col items-center gap-4 md:items-start'>
      <Link href="/" className='flex items-center text-2xl font-bold font-serif transition-colors duration-300 text-[#0D383B]'>
          FloralCraft
        </Link>
        <p className='text-[#0D383B] text-sm'>© {new Date().getFullYear()} FloralCraft.</p>
        <p className='text-[#0D383B] text-sm'>All rights reserved.</p>
        <p className='text-[#0D383B] text-sm'>Website by <Link href="https://liamkemp.dev" target='_blank' className='text-[#0D383B] hover:text-gray-500'>Liam Kemp</Link></p>
      </div>
      <div className='flex flex-col gap-4 text-lg items-center md:items-start'>
        <p className='text-gray-900 text-sm'>Links</p>
        <Link href="/" className='text-[#0D383B] hover:text-gray-500'>Home</Link>
        <Link href="/" className='text-[#0D383B] hover:text-gray-500'>About</Link>
        <Link href="/" className='text-[#0D383B] hover:text-gray-500'>Contact</Link>
        <Link href="/" className='text-[#0D383B] hover:text-gray-500'>Privacy Policy</Link>
        <Link href="/" className='text-[#0D383B] hover:text-gray-500'>Terms of Service</Link>
      </div>
        <div className='flex flex-col gap-4 text-lg items-center md:items-start'>
          <p className='text-gray-900 text-sm'>Collections</p>
          <Link href="/" className='text-[#0D383B] hover:text-gray-500'>Bouquets</Link>
          <Link href="/" className='text-[#0D383B] hover:text-gray-500'>Flowers</Link>
          <Link href="/" className='text-[#0D383B] hover:text-gray-500'>Plants</Link>
          <Link href="/" className='text-[#0D383B] hover:text-gray-500'>Gift Cards</Link>
          <Link href="/" className='text-[#0D383B] hover:text-gray-500'>Decorations</Link>
        </div>
        <div className='flex flex-col gap-4 text-lg items-center md:items-start'>
          <p className='text-gray-900 text-sm'>Follow Us</p>
          <Link href="/" className='text-[#0D383B] hover:text-gray-500'>Facebook</Link>
          <Link href="/" className='text-[#0D383B] hover:text-gray-500'>Instagram</Link>
          <Link href="/" className='text-[#0D383B] hover:text-gray-500'>Twitter</Link>
          <Link href="/" className='text-[#0D383B] hover:text-gray-500'>LinkedIn</Link>
          <Link href="/" className='text-[#0D383B] hover:text-gray-500'>YouTube</Link>
        </div>
    </div>
  )
}

export default Footer
