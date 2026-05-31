import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import defaultAvatar from '../assets/profilePic.png'

const MailIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
  </svg>
)
const PhoneIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
  </svg>
)
const BuildingIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-2 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
  </svg>
)
const GamepadIcon = ({ className = "w-7 h-7" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="currentColor" viewBox="0 0 24 24">
    <path d="M17 4H7C4.24 4 2 6.24 2 9v2c0 1.1.45 2.1 1.17 2.83L6 16.66V20h2v-2h8v2h2v-3.34l2.83-2.83C21.55 13.1 22 12.1 22 11V9c0-2.76-2.24-5-5-5zM10 11H8v2H6v-2H4v-2h2V7h2v2h2v2zm4.5 1c-.83 0-1.5-.67-1.5-1.5S13.67 9 14.5 9s1.5.67 1.5 1.5S15.33 12 14.5 12zm3-3c-.83 0-1.5-.67-1.5-1.5S16.67 6 17.5 6s1.5.67 1.5 1.5S18.33 9 17.5 9z"/>
  </svg>
)
const TrophyIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24">
    <path d="M19 5h-2V3H7v2H5c-1.1 0-2 .9-2 2v1c0 2.55 1.92 4.63 4.39 4.94.63 1.5 1.98 2.63 3.61 2.96V19H7v2h10v-2h-4v-3.1c1.63-.33 2.98-1.46 3.61-2.96C19.08 12.63 21 10.55 21 8V7c0-1.1-.9-2-2-2zM5 8V7h2v3.82C5.84 10.4 5 9.3 5 8zm14 0c0 1.3-.84 2.4-2 2.82V7h2v1z"/>
  </svg>
)
const EditIcon = () => (
  <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M15.232 5.232l3.536 3.536m-2.036-5.036a2.5 2.5 0 113.536 3.536L6.5 21.036H3v-3.572L16.732 3.732z" />
  </svg>
)

function InfoRow({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4 py-3">
      <div className="w-9 h-9 rounded-full bg-blue-50 flex items-center justify-center text-[#003e7e] flex-shrink-0">
        {icon}
      </div>
      <div>
        <p className="text-md text-gray-400 leading-none mb-0.5">{label}</p>
        <p className="text-lg font-bold text-gray-800">{value}</p>
      </div>
    </div>
  )
}

function PfpModal({ pfps, currentPfpId, userId, onClose, onSaved }) {
  const initialIndex = pfps.findIndex(p => p.pfp_id === currentPfpId)
  const [selectedIndex, setSelectedIndex] = useState(initialIndex >= 0 ? initialIndex : 0)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')

  const prev = () => setSelectedIndex(i => (i - 1 + pfps.length) % pfps.length)
  const next = () => setSelectedIndex(i => (i + 1) % pfps.length)

  const handleSave = async () => {
    setSaving(true)
    setError('')
    try {
      await axios.put(
        import.meta.env.VITE_API_URL + '/api/pfps/update-user-pfp',
        { user_id: userId, pfp_id: pfps[selectedIndex].pfp_id }
      )
      onSaved(pfps[selectedIndex].image_link)
      onClose()
    } catch (err) {
      console.log(err.response?.status, err.response?.data)
      setError('Error al guardar, intenta de nuevo')
    } finally {
      setSaving(false)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 px-4">
      <div className="bg-white rounded-2xl p-6 md:p-8 w-full max-w-[420px] shadow-xl flex flex-col items-center gap-6">
        <h3 className="text-xl font-bold text-[#003e7e]">Change profile picture</h3>
        <div className="flex items-center gap-4">
          <button onClick={prev} className="text-[#003e7e] text-3xl font-bold cursor-pointer hover:text-[#003e7e80]">‹</button>
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden opacity-40 flex-shrink-0 bg-gray-200">
              <img src={pfps[(selectedIndex - 1 + pfps.length) % pfps.length]?.image_link} alt="prev" className="w-full h-full object-cover" />
            </div>
            <div className="w-24 h-24 md:w-28 md:h-28 rounded-full overflow-hidden ring-4 ring-[#003e7e] flex-shrink-0 bg-gray-200">
              <img src={pfps[selectedIndex]?.image_link} alt="selected" className="w-full h-full object-cover" />
            </div>
            <div className="w-12 h-12 md:w-14 md:h-14 rounded-full overflow-hidden opacity-40 flex-shrink-0 bg-gray-200">
              <img src={pfps[(selectedIndex + 1) % pfps.length]?.image_link} alt="next" className="w-full h-full object-cover" />
            </div>
          </div>
          <button onClick={next} className="text-[#003e7e] text-3xl font-bold cursor-pointer hover:text-[#003e7e80]">›</button>
        </div>
        {error && <p className="text-red-600 text-sm">{error}</p>}
        <div className="flex gap-3 w-full">
          <button onClick={onClose} className="flex-1 py-2.5 border border-[#bebebe] rounded-[20px] text-sm text-gray-600 hover:bg-gray-50 cursor-pointer transition-colors">Cancel</button>
          <button onClick={handleSave} disabled={saving} className="flex-1 py-2.5 rounded-[20px] bg-[#003e7e] hover:bg-[#003e7e80] text-sm text-white cursor-pointer transition-colors disabled:opacity-50">
            {saving ? 'Saving...' : 'Save'}
          </button>
        </div>
      </div>
    </div>
  )
}

const MINIGAMES = [
  { id: 1, name: 'Minigame 1', color: '#9B0032', bg: 'bg-red-50',   text: 'text-[#9B0032]' },
  { id: 2, name: 'Minigame 2', color: '#003e7e', bg: 'bg-blue-50',  text: 'text-[#003e7e]' },
  { id: 3, name: 'Minigame 3', color: '#16a34a', bg: 'bg-green-50', text: 'text-green-600'  },
]

function ProfilePage() {
  const [usuario, setUsuario] = useState(null)
  const [gamesPlayed, setGamesPlayed] = useState(null)
  const [scores, setScores] = useState({})
  const [avatarUrl, setAvatarUrl] = useState(null)
  const [pfps, setPfps] = useState([])
  const [showModal, setShowModal] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token')
        const headers = { Authorization: `Bearer ${token}` }

        const [perfilRes, gamesRes, pfpsRes] = await Promise.all([
          axios.get(import.meta.env.VITE_API_URL + '/api/usuarios/perfil', { headers }),
          axios.get(import.meta.env.VITE_API_URL + '/api/usuarios/gamesplayed', { headers }),
          axios.get(import.meta.env.VITE_API_URL + '/api/pfps'),
        ])

        const scoresRes = await axios.get(
          import.meta.env.VITE_API_URL + '/api/usuarios/bestscores', { headers }
        )

        setUsuario(perfilRes.data)
        setGamesPlayed(gamesRes.data.games_played)
        setPfps(pfpsRes.data)

        const userPfp = pfpsRes.data.find(p => p.pfp_id === perfilRes.data.pfp_id)
        setAvatarUrl(userPfp?.image_link || null)

        const scoresMap = {}
        scoresRes.data.forEach(s => { scoresMap[s.minigame_id] = s.best_score })
        setScores(scoresMap)

      } catch (err) {
        console.log(err.response?.status, err.response?.data)
        setError('No se pudo cargar el perfil')
      }
    }
    fetchData()
  }, [])

  if (error) return (
    <div className="min-h-screen"><Header />
      <p className="text-center text-red-600 mt-10">{error}</p>
    </div>
  )

  if (!usuario) return (
    <div className="min-h-screen"><Header />
      <p className="text-center text-gray-400 mt-10">Loading...</p>
    </div>
  )

  const totalScore = Object.values(scores).reduce((acc, s) => acc + Number(s), 0)

  const handleSignOut = () => {
    localStorage.removeItem('token')
    localStorage.removeItem('avatarUrl')
    window.location.href = '/'
  }

  return (
    <div className="min-h-screen">
      <Header />

      {showModal && (
        <PfpModal
          pfps={pfps}
          currentPfpId={usuario.pfp_id}
          userId={usuario.user_id}
          onClose={() => setShowModal(false)}
          onSaved={(newUrl) => {
            setAvatarUrl(newUrl)
            localStorage.setItem('avatarUrl', newUrl)
          }}
        />
      )}

      <main className="px-4 md:px-8 py-6 md:py-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8 items-start">

          {/* LEFT — profile card */}
          <div className="bg-white rounded-2xl shadow-md p-5 md:p-6 flex flex-col gap-4">

            {/* Avatar + name */}
            <div className="flex items-center gap-4 md:gap-5 pb-4 border-b border-gray-100">
              <div className="relative flex-shrink-0">
                <div className="w-20 h-20 md:w-28 md:h-28 rounded-full ring-4 ring-green-400 overflow-hidden bg-black">
                  <img src={avatarUrl || defaultAvatar} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <button
                  onClick={() => setShowModal(true)}
                  className="absolute bottom-0 right-0 w-7 h-7 md:w-8 md:h-8 bg-[#003e7e] hover:bg-[#003e7e80] rounded-full flex items-center justify-center text-white cursor-pointer transition-colors shadow-md"
                >
                  <EditIcon />
                </button>
              </div>
              <div>
                <h2 className="text-lg md:text-2xl font-black text-gray-900 uppercase tracking-wide">
                  {usuario.first_name} {usuario.last_name}
                </h2>
                <p className="text-sm md:text-md text-gray-400">Player Profile</p>
              </div>
            </div>

            {/* Info rows */}
            <div className="divide-y divide-gray-50">
              <InfoRow icon={<MailIcon />}     label="Email"        value={usuario.email.toLowerCase()} />
              <InfoRow icon={<PhoneIcon />}    label="Phone number" value={usuario.phone} />
              <InfoRow icon={<BuildingIcon />} label="Industry"     value={usuario.industry} />
            </div>

            {/* Stats row */}
            <div className="grid grid-cols-2 gap-3 pt-2">
              <div className="bg-green-50 rounded-xl p-3 md:p-4 flex items-center gap-3">
                <div className="text-green-500"><GamepadIcon /></div>
                <div>
                  <p className="text-xs md:text-md text-gray-500">Games completed</p>
                  <p className="text-xl md:text-2xl font-black text-green-600">{gamesPlayed ?? '—'}</p>
                </div>
              </div>
              <div className="bg-blue-50 rounded-xl p-3 md:p-4 flex items-center gap-3">
                <div className="text-[#003e7e]"><TrophyIcon /></div>
                <div>
                  <p className="text-xs md:text-md text-gray-500">Total best scores</p>
                  <p className="text-xl md:text-2xl font-black text-[#003e7e]">{totalScore}</p>
                </div>
              </div>
            </div>

          </div>

          {/* RIGHT — minigame cards */}
          <div className="flex flex-col gap-3 md:gap-4">
            {MINIGAMES.map((game) => (
              <div
                key={game.name}
                className="bg-white rounded-2xl shadow-md p-4 md:p-5 flex items-center gap-4 border-l-4 cursor-pointer hover:shadow-lg transition-shadow"
                style={{ borderLeftColor: game.color }}
              >
                <div className={`w-12 h-12 md:w-14 md:h-14 rounded-full ${game.bg} flex items-center justify-center flex-shrink-0`} style={{ color: game.color }}>
                  <GamepadIcon className="w-6 h-6 md:w-7 md:h-7" />
                </div>
                <div className="flex-1">
                  <p className="font-bold text-gray-900 text-lg md:text-xl">{game.name}</p>
                  <p className="text-sm text-gray-400">Best Score</p>
                  <p className={`text-xl md:text-2xl font-black ${game.text}`}>{scores[game.id] ?? '—'}</p>
                </div>
              </div>
            ))}
            <button
              onClick={handleSignOut}
              className="w-full py-3 rounded-2xl bg-red-600 hover:bg-red-700 text-white font-bold text-sm transition-colors cursor-pointer"
            >
              Sign Out
            </button>
          </div>

        </div>
      </main>
    </div>
  )
}

export default ProfilePage