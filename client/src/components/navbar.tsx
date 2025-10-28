'use client'

import Link from 'next/link'
import React, { useState, useEffect } from 'react'
import SearchBar from './ui/searchBar'
import { ShoppingCartIcon, UserIcon, MenuIcon, XIcon } from 'lucide-react'

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false)
  const [isScrolled, setIsScrolled] = useState(false)

  const isSolid = isScrolled || isMenuOpen

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY
      setIsScrolled(scrollTop > 50)
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    const original = document.body.style.overflow
    document.body.style.overflow = isMenuOpen ? 'hidden' : original
    return () => { document.body.style.overflow = original }
  }, [isMenuOpen])

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300
        bg-white shadow-lg
        ${isScrolled ? 'lg:bg-white/95 lg:backdrop-blur-md lg:shadow-lg' : 'lg:bg-transparent lg:shadow-none'}`}
    >
      {/* Desktop Navigation */}
      <div className='hidden lg:flex justify-between items-center max-w-7xl mx-auto w-full gap-10 px-4 py-4'>
        <Link href="/" className={`flex items-center text-2xl font-bold font-serif transition-colors duration-300 ${
          isScrolled ? 'text-gray-900' : 'text-white'
        }`}>
          FloralCraft
        </Link>
        <div className='flex items-center gap-6'>
          <Link href="/products" className={`transition-colors duration-300 ${
            isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-300'
          }`}>Shop</Link>
          <Link href="#about" className={`transition-colors duration-300 ${
            isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-300'
          }`}>About</Link>
          <Link
            href="#contact"
            onClick={(e) => {
              e.preventDefault()
              const el = document.getElementById('contact')
              if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
            }}
            className={`transition-colors duration-300 ${
              isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-300'
            }`}
          >Contact</Link>
        </div>
        <div className='flex items-center w-full '>
          <SearchBar />
        </div>
        <div className='flex items-center gap-4'>
          <ShoppingCartIcon className={`w-6 h-6 cursor-pointer transition-colors duration-300 ${
            isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-300'
          }`} />
          <UserIcon className={`w-6 h-6 cursor-pointer transition-colors duration-300 ${
            isScrolled ? 'text-gray-700 hover:text-gray-900' : 'text-white hover:text-gray-300'
          }`} />
        </div>
      </div>

      {/* Mobile Navigation (always solid white) */}
      <div className='lg:hidden flex justify-between items-center w-full px-4 py-4'>
        <Link href="/" className='flex items-center text-xl font-bold font-serif text-gray-900'>
          FloralCraft
        </Link>

        <div className='flex items-center gap-4'>
          <ShoppingCartIcon className='w-6 h-6 cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-300' />
          <UserIcon className='w-6 h-6 cursor-pointer text-gray-700 hover:text-gray-900 transition-colors duration-300' />
          <button
            onClick={toggleMenu}
            className='text-gray-700 hover:text-gray-900 transition-colors duration-300'
            aria-label="Toggle menu"
          >
            {isMenuOpen ? (
              <XIcon className='w-6 h-6' />
            ) : (
              <MenuIcon className='w-6 h-6' />
            )}
          </button>
        </div>
      </div>

      {/* Mobile Menu Overlay */}
      <div
        className={`lg:hidden fixed inset-0 z-40 bg-black bg-opacity-50 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
        }`}
        onClick={toggleMenu}
      />

      {/* Mobile Menu */}
      <div
        className={`lg:hidden fixed top-0 right-0 h-full w-80 max-w-[85vw] bg-white z-50 transform transition-transform duration-300 ease-in-out ${
          isMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className='flex flex-col h-full'>
          {/* Mobile Menu Header */}
          <div className='flex justify-between items-center p-6 border-b border-gray-200'>
            <Link href="/" className='text-xl font-bold font-serif text-gray-900'>
              FloralCraft
            </Link>
            <button
              onClick={toggleMenu}
              className='text-gray-600 hover:text-gray-900 transition-colors duration-200'
              aria-label="Close menu"
            >
              <XIcon className='w-6 h-6' />
            </button>
          </div>

          {/* Mobile Search */}
          <div className='p-6 border-b border-gray-200'>
            <SearchBar />
          </div>

          {/* Mobile Navigation Links */}
          <div className='flex-1 flex flex-col'>
            <Link
              href="/products"
              className='px-6 py-4 text-gray-900 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100'
              onClick={toggleMenu}
            >
              Shop
            </Link>
            <Link
              href="#about"
              className='px-6 py-4 text-gray-900 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100'
              onClick={toggleMenu}
            >
              About
            </Link>
            <Link
              href="#contact"
              className='px-6 py-4 text-gray-900 hover:bg-gray-50 transition-colors duration-200 border-b border-gray-100'
              onClick={(e) => {
                e.preventDefault()
                toggleMenu()
                const el = document.getElementById('contact')
                if (el) el.scrollIntoView({ behavior: 'smooth', block: 'start' })
              }}
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Footer */}
          <div className='p-6 border-t border-gray-200'>
            <div className='flex items-center justify-center gap-6'>
              <ShoppingCartIcon className='w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors duration-200' />
              <UserIcon className='w-6 h-6 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors duration-200' />
            </div>
          </div>
        </div>
      </div>
    </nav>
  )
}

export default Navbar