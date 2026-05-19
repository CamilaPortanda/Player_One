import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

function MainPage() {
  const token = localStorage.getItem('token');
  
  return (
    <div>
      <Header />
      <main className="flex flex-col justify-center min-h-[calc(100vh-80px)] px-16">
        <h1 className="text-7xl font-bold max-w-xl">
          Is your company really <span className="italic">protected?</span>
        </h1>
        <p className="text-[#003e7e] text-2xl mt-4">Find out through our interactive experience.</p>
        {token ? (
          <Link to="/gamePage" className="mt-8 px-7 py-2.5 rounded-[20px] bg-[#003e7e] hover:bg-[#003e7e80] text-sm text-white transition-colors w-fit">
            Try our videogame
          </Link>
        ) : (
          <Link to="/logIn" className="mt-8 px-7 py-2.5 rounded-[20px] bg-[#003e7e] hover:bg-[#003e7e80] text-sm text-white transition-colors w-fit">
            Sign In
          </Link>
        )}
      </main>
    </div>
  )
}

export default MainPage