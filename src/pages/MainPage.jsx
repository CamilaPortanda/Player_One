import { useState } from 'react'
import logo from '../assets/rockwell_automation_logo.png'
import { Link } from 'react-router-dom'

function MainPage() {
  return (
    <div>
      <header className="flex items-center justify-between px-8 py-4 border-b-8 border-[#CD163F]">
        <img src={logo} alt="Rockwell Automation Logo" />
        
        <div className="flex items-center gap-3">
          <button className="px-7 py-2.5 border border-[#aaa] rounded-[20px] bg-[#003e7e] hover:bg-[#003e7e80] text-sm cursor-pointer text-white transition-colors">
            Contact Us
          </button>
          <Link to="/logIn" className="w-10 h-10 bg-[#5CC334] hover:bg-green-400 rounded-full cursor-pointer">
          </Link>
        </div>
      </header>

      <main className="flex flex-col justify-center min-h-[calc(100vh-80px)] px-16">
        <h1 className="text-7xl font-bold max-w-xl">
          Is your company really <span className="italic">protected?</span>
        </h1>
        <p className="text-[#003e7e] text-2xl mt-4">Find out through our interactive experience.</p>
        <Link to="/logIn" className="mt-8 px-7 py-2.5 rounded-[20px] bg-[#003e7e] hover:bg-[#003e7e80] text-sm text-white transition-colors w-fit">
          Sign In
        </Link>
      </main>
    </div>
  )
}

export default MainPage