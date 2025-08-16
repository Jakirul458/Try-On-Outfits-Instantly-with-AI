'use client'

import React, { useState } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { Menu, X } from 'lucide-react'

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  return (
    <header className="bg-white shadow-sm border-b border-gray-100 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3">
            <div className="relative">
              <Image
                src="/instant-outfits-logo.svg"
                alt="Instant Outfit Logo"
                width={40}
                height={27}
                className="h-8 w-auto"
              />
            </div>
            <span className="text-xl font-bold text-gray-900">Instant Outfit</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">Home</Link>
            <Link href="/#try-on" className="text-gray-600 hover:text-primary-600 transition-colors">Try On</Link>
            <Link href="/#features" className="text-gray-600 hover:text-primary-600 transition-colors">Features</Link>
            <Link href="/about" className="text-gray-600 hover:text-primary-600 transition-colors">About</Link>
            <Link href="/contact" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</Link>
            <button 
              onClick={() => document.getElementById('try-on')?.scrollIntoView({ behavior: 'smooth' })}
              className="btn-primary"
            >
              Get Started
            </button>
          </nav>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-600 hover:text-gray-900 focus:outline-none"
            >
              {isMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-100">
            <div className="flex flex-col space-y-4">
              <Link href="/" className="text-gray-600 hover:text-primary-600 transition-colors">Home</Link>
              <Link href="/#features" className="text-gray-600 hover:text-primary-600 transition-colors">Features</Link>
              <Link href="/#try-on" className="text-gray-600 hover:text-primary-600 transition-colors">Try On</Link>
              <Link href="/about" className="text-gray-600 hover:text-primary-600 transition-colors">About</Link>
              <Link href="/contact" className="text-gray-600 hover:text-primary-600 transition-colors">Contact</Link>
              <button 
                onClick={() => {
                  setIsMenuOpen(false)
                  document.getElementById('try-on')?.scrollIntoView({ behavior: 'smooth' })
                }}
                className="btn-primary w-full"
              >
                Get Started
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  )
}
