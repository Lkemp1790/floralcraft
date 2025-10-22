import React from 'react'
import { SearchIcon } from 'lucide-react'

const SearchBar = () => {
  return (
    <div className='w-full rounded-full bg-white gap-2 flex items-center px-3 py-2 sm:px-4 sm:py-3 transition-all duration-200 focus-within:ring-2 focus-within:ring-blue-500 focus-within:ring-opacity-50'>
      <SearchIcon className='w-5 h-5 sm:w-6 sm:h-6 text-gray-400 flex-shrink-0'/>
      <input
        id="search"
        className="text-sm outline-0 w-full text-black placeholder:text-gray-400 bg-transparent"
        placeholder='Search...'
        type="search"
        autoComplete="off"
      />
    </div>
  )
}

export default SearchBar