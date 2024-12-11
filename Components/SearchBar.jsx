'use client'

import { useState } from 'react'
import { Search } from 'lucide-react'

export default function SearchBar() {



  return (
    <div className="py-8">
      <div className="container mx-auto px-4">
        <form
      
          className="flex items-center justify-center">
          <input
            type="text"
            placeholder="Search courses..."
        
            
            className="w-full max-w-md px-4 py-2 rounded-l-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent"
          />
          <button
            type="submit"
            className="bg-blue-600 text-white px-6 py-2 rounded-r-full hover:bg-blue-700 transition duration-300"
          >
            <Search className="w-5 h-5" />
          </button>
        </form>
      </div>
    </div>
  )
}

