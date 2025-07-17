'use client'

import Link from 'next/link'
import { useEffect, useState } from 'react'

const Header = () => {
  const [isDark, setIsDark] = useState(true)

  useEffect(() => {
    document.documentElement.classList.toggle('dark', isDark)
  }, [isDark])

  return (
    <header className="w-full p-4 flex justify-between items-center bg-black/20 backdrop-blur border-b border-white/10 text-white">
      <Link href="/" className="text-2xl font-bold">CertifyChain 🚀</Link>

      <nav className="space-x-6">
        <Link href="/upload" className="hover:underline">Upload</Link>
        <Link href="/verify" className="hover:underline">Verify</Link>
        <button
          onClick={() => setIsDark(!isDark)}
          className="ml-4 px-3 py-1 bg-white/10 rounded hover:bg-white/20 transition"
        >
          {isDark ? '🌙 Dark' : '☀️ Light'}
        </button>
      </nav>
    </header>
  )
}

export default Header
