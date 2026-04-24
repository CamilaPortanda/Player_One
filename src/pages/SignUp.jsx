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
        <div className="bg-[#fcfcfc] rounded-2xl p-10 w-[550px] shadow-[0px_4px_12px_rgba(0,0,0,0.20)]">
          
          <Link
            className="text-[#003e7e] hover:text-[#003e7e80] no-underline text-sm"
            to="/logIn"
          >
            ← Back
          </Link>

          <h2 className="text-center text-[32px] font-normal mt-2.5 mb-0 text-[#003e7e]">
            Sign Up
          </h2>

          <p className="text-center text-[13px] text-[#003e7e] mt-5">
            ¿Already have an account?{' '}
            <Link to="/logIn" className="text-[#003e7e] hover:text-[#003e7e80] underline">
              Log in
            </Link>
          </p>

          <div className="grid grid-cols-2 gap-3 mt-5">


            <input
              type="text"
              placeholder="Name(s)"
              className="w-full px-3.5 py-2.5 border border-[#bebebe] rounded-lg bg-transparent text-sm outline-none text-[#003e7e] placeholder-[#003e7e]"
            />

            <div className="flex">
              <select
                id="country_code"
                className="w-[90px] px-3.5 py-2.5 border border-[#bebebe] rounded-l-lg bg-transparent text-sm outline-none text-[#003e7e]"
              >
                <option value="+52">+52</option>
              </select>
              <input
                type="tel"
                placeholder="Phone Number"
                className="w-full px-3.5 py-2.5 border border-[#bebebe] border-l-0 rounded-r-lg bg-transparent text-sm outline-none text-[#003e7e] placeholder-[#003e7e]"
              />
            </div>

            <input
              type="text"
              placeholder="Last Name(s)"
              className="w-full px-3.5 py-2.5 border border-[#bebebe] rounded-lg bg-transparent text-sm outline-none text-[#003e7e] placeholder-[#003e7e]"
            />

            <select
              id="selector_industry"
              className="w-full px-3.5 py-2.5 border border-[#bebebe] rounded-lg bg-transparent text-sm outline-none text-[#003e7e]"
            >
              <option value="">Industry</option>
            </select>

            <input
              type="email"
              placeholder="Email"
              className="w-full px-3.5 py-2.5 border border-[#bebebe] rounded-lg bg-transparent text-sm outline-none text-[#003e7e] placeholder-[#003e7e]"
            />

            <input
              type="text"
              placeholder="Company"
              className="w-full px-3.5 py-2.5 border border-[#bebebe] rounded-lg bg-transparent text-sm outline-none text-[#003e7e] placeholder-[#003e7e]"
            />

            <input
              type="password"
              placeholder="Password"
              className="w-full px-3.5 py-2.5 border border-[#bebebe] rounded-lg bg-transparent text-sm outline-none text-[#003e7e] placeholder-[#003e7e]"
            />

            <select
              id="selector_jobPosition"
              className="w-full px-3.5 py-2.5 border border-[#bebebe] rounded-lg bg-transparent text-sm outline-none text-[#003e7e]"
            >
              <option value="">Job Position</option>
            </select>

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