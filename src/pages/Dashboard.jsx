import { useState, useEffect } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import Abrazo from '../assets/abrazo.png'
import { ComposableMap, Geographies, Geography, } from "react-simple-maps"
import { Pie, Doughnut, Bar } from 'react-chartjs-2'
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend,
} from 'chart.js'

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  ArcElement,
  Tooltip,
  Legend
)

const BASE = import.meta.env.VITE_API_URL

const MINIGAME_COLORS = ['#9B0032', '#003e7e', '#16a34a']
const MINIGAME_NAMES = ['Minigame 1', 'Minigame 2', 'Minigame 3']
const DASH_COLORS = ['#003e7e','#9B0032','#16a34a','#f9c20a','#c40073','#00aeef','#14b8a6','#f58025','#6366f1']

function StatCard({ title, children, accent }) {
  return (
    <div
      className="w-full h-full bg-white rounded-2xl p-5 shadow-sm border border-gray-100 flex flex-col gap-3"
      style={{ borderTop: `4px solid ${accent || '#003e7e'}` }}
    >
      <div className="flex items-center gap-2">
        <h3 className="font-bold text-gray-700 text-lg">{title}</h3>
      </div>

      <div className="flex-1">
        {children}
      </div>
    </div>
  )
}

export default function DashboardPage() {
  const navigate = useNavigate()
  const [data, setData] = useState({
    percentage: [],
    avgMedian: [],
    ranking: [],
    accesses: null,
    industry: [],
    country: [],
    products: [],
  })
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const token = localStorage.getItem('token')
    const permisos = JSON.parse(localStorage.getItem('permisos') || '{}')
    if (!token || !permisos.dashboard) {
      navigate('/')
    }
  }, [])

  useEffect(() => {
    const fetchAll = async () => {
      try {
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}` }

        const [pct, time, rank, acc, ind, cty, prods] = await Promise.all([
          axios.get(`${BASE}/api/dashboard/percentage-completed`, { headers }),
          axios.get(`${BASE}/api/dashboard/avg-median-time`, { headers }),
          axios.get(`${BASE}/api/dashboard/ranking-products`, { headers }),
          axios.get(`${BASE}/api/dashboard/total-product-accesses`, { headers }),
          axios.get(`${BASE}/api/dashboard/users-per-industry`, { headers }),
          axios.get(`${BASE}/api/dashboard/users-per-country`, { headers }),
          axios.get(`${BASE}/api/products`),
        ])

        setData({
          percentage: pct.data,
          avgMedian: time.data,
          ranking: rank.data,
          accesses: acc.data.total,
          industry: ind.data,
          country: cty.data,
          products: prods.data,
        })
      } catch (err) {
        console.log(err)
        setError('No se pudieron cargar los datos del dashboard')
      } finally {
        setLoading(false)
      }
    }
    fetchAll()
  }, [])

  if (loading) return (
    <div className="min-h-screen"><Header />
      <p className="text-center text-gray-400 mt-10">Loading dashboard...</p>
    </div>
  )

  if (error) return (
    <div className="min-h-screen"><Header />
      <p className="text-center text-red-600 mt-10">{error}</p>
    </div>
  )

  // Prepare data
  const percentageData = data.percentage.map((d, i) => ({
    name: MINIGAME_NAMES[i],
    percentage: parseFloat(d.percentage),
    color: MINIGAME_COLORS[i],
  }))
  
  const industryPieData = data.industry
  .filter(d => parseInt(d.total_users) > 0)
  .map(d => ({
    name: d.industry_name,
    value: parseInt(d.total_users)
  }))

  const industryChartData = {
    labels: industryPieData.map(d => d.name),
    datasets: [
      {
        data: industryPieData.map(d => d.value),
        backgroundColor: DASH_COLORS,
        borderWidth: 1,
      },
    ],
  }

  const industryChartOptions = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
  }

  const timeData = data.avgMedian.map((d, i) => ({
    name: MINIGAME_NAMES[i],
    avg: Math.round(parseFloat(d.average_time) || 0),
    median: Math.round(parseFloat(d.median_time) || 0),
  }))

  const industryData = data.industry
    .filter(d => parseInt(d.total_users) > 0)
    .map((d, i) => ({
      name: d.industry_name,
      value: parseInt(d.total_users),
      color: DASH_COLORS[i % DASH_COLORS.length],
    }))

  const totalUsers = industryData.reduce((acc, d) => acc + d.value, 0)

  const rankingWithNames = data.ranking.map(t => {
    const product = data.products.find(p => p.product_id === t.product_id)
    return { ...t, name: product?.name_product || `Product ${t.product_id}`, clicks: parseInt(t.total_clicks), active: product?.active }
  }).filter(p => p.active === true)
  const totalClicks = rankingWithNames.reduce((acc, t) => acc + t.clicks, 0)

  const geoUrl =
    "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json"

  const countryUsers = Object.fromEntries(
    data.country.map(c => [c.country, parseInt(c.total_users)])
  )

  const maxUsers = Math.max(
    ...data.country.map(c => parseInt(c.total_users)),
    1
  )
  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: false,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Seconds'
        }
      }
    }
  }

  const getCountryColor = (countryName) => {
    const users = countryUsers[countryName]

    if (!users) return "#E5E7EB"

    const intensity = users / maxUsers

    if (intensity > 0.75) return "#003e7e"
    if (intensity > 0.5) return "#2563eb"
    if (intensity > 0.25) return "#60a5fa"

    return "#bfdbfe"
  }

  return (
    <div className="min-h-screen">
      <Header />
      <main className="px-6 md:px-10 py-8">

        {/* Title */}
        <div className="flex items-center gap-3 mb-8">
          <div className="flex flex-col gap-0.5">
            <div className="w-2 h-4 bg-[#9B0032] rounded-sm" />
            <div className="w-2 h-6 bg-[#003e7e] rounded-sm" />
          </div>
          <h1 className="text-3xl md:text-4xl font-black text-gray-900">Dashboard</h1>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 md:grid-cols-12 gap-5">

          {/* 1. Completion percentage */}
          <div className="md:col-span-4 flex">
            <StatCard title="Total completion percentage per minigame" accent="#9B0032">
              <div className="flex flex-col gap-3 mt-1">
                {percentageData.map((d) => (
                  <div key={d.name}>
                    <div className="flex items-center gap-2 mb-1">
                      <span className="text-xs font-medium text-gray-600 w-24">{d.name}</span>
                      <span className="text-sm font-black ml-auto" style={{ color: d.color }}>{d.percentage.toFixed(0)}%</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full transition-all duration-700"
                        style={{ width: `${d.percentage}%`, backgroundColor: d.color }} />
                    </div>
                    <p className="text-xs text-gray-400 mt-0.5 text-right">{d.percentage.toFixed(2)} / 100</p>
                  </div>
                ))}
              </div>
            </StatCard>
          </div>
          

          {/* 2. Avg & Median time */}
          <div className="md:col-span-6 flex">
            <StatCard
              title="Average and Median Time per Minigame"
              accent="#003e7e"
            >
              <div className="grid grid-cols-3 gap-4">
                {timeData.map((game, index) => {
                  const chartData = {
                    labels: ['Avg', 'Median'],
                    datasets: [
                      {
                        data: [game.avg, game.median],
                        backgroundColor: ['#003e7e', '#f59e0b'],
                        borderRadius: 4,
                      },
                    ],
                  }

                  const chartOptions = {
                    responsive: true,
                    maintainAspectRatio: false,
                    plugins: {
                      legend: {
                        display: false,
                      },
                      tooltip: {
                        callbacks: {
                          label: (ctx) => `${ctx.raw} s`,
                        },
                      },
                    },
                    scales: {
                      x: {
                        ticks: {
                          font: {
                            size: 10,
                          },
                        },
                      },
                      y: {
                        beginAtZero: true,
                        ticks: {
                          font: {
                            size: 10,
                          },
                        },
                      },
                    },
                  }

                  return (
                    <div key={index}>
                      <p className="text-xs font-semibold text-center text-gray-700 mb-2">
                        {game.name}
                      </p>

                      <div className="h-32">
                        <Bar
                          data={chartData}
                          options={chartOptions}
                        />
                      </div>
                    </div>
                  )
                })}
              </div>
            </StatCard>
          </div>
          

          {/* 3. Product accesses */}
          <div className="md:col-span-2 flex">
            <StatCard title="Product section Accesses" accent="#16a34a">
              <div className="flex flex-col items-center justify-center flex-1 py-4">
                <p className="text-5xl font-black text-green-600">{parseInt(data.accesses).toLocaleString()}</p>
                <p className="text-sm text-gray-400 mt-2">Total de accesos</p>
              </div>
            </StatCard>
          </div>
          

          {/* 4. Users per industry */}
          <div className="md:col-span-4">
            <StatCard
              title="Users Registered per Industry"
              accent="#9B0032"
            >
              <div className="h-[240px]">
                <Doughnut
                  data={industryChartData}
                  options={industryChartOptions}
                />
              </div>

              <div className="mt-4 grid grid-cols-2 gap-2">
                {industryData.map((item) => (
                  <div
                    key={item.name}
                    className="bg-gray-50 rounded-lg px-2 py-2"
                  >
                    <div className="flex items-center gap-2">
                      <div
                        className="w-3 h-3 rounded-full flex-shrink-0"
                        style={{ backgroundColor: item.color }}
                      />

                      <span
                        className="text-xs text-gray-700 truncate"
                        title={item.name}
                      >
                        {item.name}
                      </span>
                    </div>

                    <p className="text-sm font-bold text-[#003e7e] mt-1 ml-5">
                      {item.value} users
                    </p>
                  </div>
                ))}
              </div>
            </StatCard>
          </div>
          

          {/* 5. Users per country */}
          <div className="md:col-span-4 flex">
            <StatCard
              title="Users Registered per Country"
              accent="#003e7e"
            >
              <div className="h-[240px]">
                <ComposableMap
                  projectionConfig={{ scale: 200 }}
                  style={{ width: "100%", height: "100%" }}
                >
                  <Geographies geography={geoUrl}>
                    {({ geographies }) =>
                      geographies.map((geo) => (
                        <Geography
                          key={geo.rsmKey}
                          geography={geo}
                          fill={getCountryColor(geo.properties.name)}
                          stroke="#ffffff"
                          strokeWidth={0.5}
                          style={{
                            default: { outline: "none" },
                            hover: {
                              fill: "#9B0032",
                              outline: "none",
                              cursor: "pointer",
                            },
                            pressed: { outline: "none" },
                          }}
                        />
                      ))
                    }
                  </Geographies>
                </ComposableMap>
              </div>

              <div className="grid grid-cols-2 gap-2 mt-0">
                {data.country.map((d, i) => (
                  <div
                    key={i}
                    className="bg-gray-50 rounded-lg p-2 flex justify-between"
                  >
                    <span className="text-xs text-gray-600 truncate">
                      {d.country}
                    </span>

                    <span className="font-bold text-[#003e7e]">
                      {d.total_users}
                    </span>
                  </div>
                ))}
              </div>
            </StatCard>
          </div>
          

          {/* 6. Ranking products */}
          <div className="md:col-span-4 flex">
            <StatCard title="Ranking of Products with Most Clicks" accent="#16a34a">
              <div className="flex items-center gap-2 mb-2 ">
                <span className="text-3xl font-black text-[#003e7e]">{totalClicks.toLocaleString()}</span>
                <span className="text-xs text-gray-400">Total Clicks</span>
              </div>
              <div className="flex flex-col gap-3">
                {rankingWithNames.map((p, i) => (
                  <div key={p.product_id}>
                    <div className="flex justify-between mb-1">
                      <span className="text-sm font-semibold text-gray-700 max-w-full">{p.name}</span>
                      <span className="text-sm font-black" style={{ color: DASH_COLORS[i] }}>{p.clicks.toLocaleString()}</span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full rounded-full"
                        style={{ width: `${(p.clicks / totalClicks) * 100}%`, backgroundColor: DASH_COLORS[i] }} />
                    </div>
                    <p className="text-xs text-gray-400 text-right mt-0.5">{((p.clicks / totalClicks) * 100).toFixed(1)}%</p>
                  </div>
                ))}
              </div>
              <div className="mt-3 pt-4 flex justify-center">
                <img
                  src={Abrazo}
                  alt="Abrazo"
                  className="w-[80%] h-25 object-cover rounded-lg"
                />
              </div>
            </StatCard>
          </div>
        </div>
      </main>
    </div>
  )
}