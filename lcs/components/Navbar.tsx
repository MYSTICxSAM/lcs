'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useState } from 'react'

export default function Navbar() {
  const pathname = usePathname()
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white/90 backdrop-blur-md border-b border-gray-200/60 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 md:px-8 py-2 md:py-3 flex items-center justify-between gap-2">

        {/* Brand */}
        <Link href="/" className="flex items-center gap-2 min-w-0" onClick={() => setMenuOpen(false)}>
          <img
            src="/5f1da0ee-bc82-4aea-a30f-aaaac8e84a1d.jpg"
            alt="Lending Capital Solutions logo"
            className="w-10 h-10 md:w-13 md:h-13 rounded-full object-cover shrink-0"
          />
          <span className="text-[#1e3a8a] font-bold text-sm md:text-xl tracking-wide leading-tight">
            Lending Capital Solutions
          </span>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 shrink-0">
          <Link
            href="/"
            className={`font-medium text-base transition-colors ${
              pathname === '/' ? 'text-[#1e3a8a] border-b-2 border-[#1e3a8a]' : 'text-gray-600 hover:text-[#1e3a8a]'
            }`}
          >
            Home
          </Link>
          <Link
            href="/about"
            className={`font-medium text-base transition-colors ${
              pathname === '/about' ? 'text-[#1e3a8a] border-b-2 border-[#1e3a8a]' : 'text-gray-600 hover:text-[#1e3a8a]'
            }`}
          >
            About Us
          </Link>
          <a
            href="tel:+919596601094"
            className="bg-[#1e3a8a] hover:bg-[#1e40af] text-white px-4 py-2 rounded-md font-semibold text-base transition-colors"
          >
            📞 Call Us
          </a>
        </nav>

        {/* Hamburger button (mobile only) */}
        <button
          className="md:hidden flex flex-col justify-center items-center w-9 h-9 gap-1.5 shrink-0"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-[#1e3a8a] transition-all duration-300 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#1e3a8a] transition-all duration-300 ${menuOpen ? 'opacity-0' : ''}`} />
          <span className={`block w-6 h-0.5 bg-[#1e3a8a] transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`} />
        </button>
      </div>

      {/* Mobile dropdown menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t border-gray-100 shadow-lg px-4 py-4 flex flex-col gap-3">
          <Link
            href="/"
            onClick={() => setMenuOpen(false)}
            className={`font-medium text-base py-2.5 px-3 rounded-lg transition-colors ${
              pathname === '/' ? 'bg-blue-50 text-[#1e3a8a] font-semibold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            🏠 Home
          </Link>
          <Link
            href="/about"
            onClick={() => setMenuOpen(false)}
            className={`font-medium text-base py-2.5 px-3 rounded-lg transition-colors ${
              pathname === '/about' ? 'bg-blue-50 text-[#1e3a8a] font-semibold' : 'text-gray-700 hover:bg-gray-50'
            }`}
          >
            ℹ️ About Us
          </Link>
          <a
            href="tel:+919596601094"
            onClick={() => setMenuOpen(false)}
            className="bg-[#1e3a8a] text-white text-center py-3 rounded-lg font-semibold text-base"
          >
            📞 Call Us — +91 95966 01094
          </a>
          <a
            href="https://wa.me/919596601094?text=Hi%20I%20want%20to%20apply%20for%20the%20Loan"
            onClick={() => setMenuOpen(false)}
            className="bg-[#25D366] text-white text-center py-3 rounded-lg font-semibold text-base"
          >
            💬 WhatsApp Us
          </a>
        </div>
      )}
    </header>
  )
}
