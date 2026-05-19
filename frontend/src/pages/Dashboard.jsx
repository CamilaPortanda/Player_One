import React from 'react'
import { useState } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import barChart from '../assets/barchart.png'
import pieChart from '../assets/piechart.png'

function Dashboard() {
  return (
    <div className="bg-white min-h-screen">
      <Header />
 
      <main className="px-10 py-8">
        
        {/* Title */}
        <h1 className="text-5xl font-bold text-center mb-10">Player One Statistics</h1>
 
        {/* Charts row */}
        <div className="flex items-stretch justify-between gap-8">
          
        {/* Bar chart */}
        <div className="flex flex-col items-center justify-between w-1/2 h-">
        <img src={barChart} alt="Levels Completed by Group" className="w-full max-w-sm" />
        <p className="text-center font-semibold mt-2">Leves Completed by Group</p>
        </div>

        {/* Pie chart */}
        <div className="flex flex-col items-center justify-between w-1/2">
        <img src={pieChart} alt="Percentage of Players per Group" className="w-full max-w-sm" />
        <p className="text-center font-semibold mt-2">Percentage of Players per Group</p>
        </div>
 
        </div>
      </main>
    </div>
  )
}
 
export default Dashboard