import { useState } from 'react'
import logo from '../assets/rockwell_automation_logo.png'
import { Link } from 'react-router-dom'

function App() {
  return (
    <div className="bg-[#9B0032] min-h-screen">
      <header className='border-b-8 border-[#CD163F]'>
        <img src={logo} alt="Rockwell Automation Logo" />
      </header>

      <main className="flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="relative flex flex-col justify-center bg-[#fcfcfc] rounded-2xl p-10 w-[550px] h-[450px] shadow-[0px_4px_12px_rgba(0,0,0,0.20)]">

          <Link
            to="/"
            className="absolute top-10 left-10 text-[#003e7e] hover:text-[#003e7e80] text-sm no-underline"
          >
            ← Back
          </Link>

          <h2 className="text-center text-[32px] font-normal mt-2.5 mb-1 text-[#003e7e]">
            Log In
          </h2>

          <p className="text-center text-[13px] text-[#003e7e] mt-5 mb-2.5">
            ¿No account?{' '}
            <Link to="/signUp" className="text-[#003e7e] hover:text-[#003e7e80] underline">
              Sign up
            </Link>
          </p>

          <div className="flex flex-col justify-center items-center gap-[15px] mt-[30px]">
            <input
              type="email"
              placeholder="Email"
              className="w-4/5 px-3.5 py-2.5 border border-[#bebebe] rounded-lg bg-transparent text-sm text-[#003e7e] placeholder-[#003e7e] outline-none"
            />
            <input
              type="password"
              placeholder="Password"
              className="w-4/5 px-3.5 py-2.5 border border-[#bebebe] rounded-lg bg-transparent text-sm text-[#003e7e] placeholder-[#003e7e] outline-none"
            />
          </div>

          <Link to="/" className="block mx-auto mt-6 w-fit text-center px-10 py-2.5 border border-[#aaa] rounded-[20px] bg-[#003e7e] hover:bg-[#003e7e80] text-sm text-white cursor-pointer transition-colors">
            Ready
          </Link>

        </div>
      </main>
    </div>
  )
}

export default App