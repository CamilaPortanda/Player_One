import { useState, useEffect } from 'react'
import axios from 'axios'
import Header from '../components/Header'
import defaultAvatar from '../assets/profilePic.png'

function StatCard({ label, value }) {
    return (
        <div className="flex flex-col gap-2">
            <span className="text-black font-bold text-2xl md:text-3xl leading-tight">
                {label}
            </span>
            <span className="text-black/80 text-lg md:text-xl">
                {value}
            </span>
        </div>
    )
}

function ProfileField({ label, value }) {
    return (
        <div className="flex flex-col gap-0.5">
            <span className="text-black font-bold text-xl md:text-2xl leading-tight">
                {label}
            </span>
            <span className="text-black/80 text-sm md:text-base">
                {value}
            </span>
        </div>
    )
}

function ProfilePage() {
    const [usuario, setUsuario] = useState(null)
    const [error, setError] = useState('')

    useEffect(() => {
        const fetchPerfil = async () => {
            try {
                const token = localStorage.getItem('token')
                const res = await axios.get(
                    import.meta.env.VITE_API_URL + '/api/usuarios/perfil',
                    { headers: { Authorization: `Bearer ${token}` } }
                )
                setUsuario(res.data)
            } catch (err) {
                console.log(err.response?.status, err.response?.data)
                setError('No se pudo cargar el perfil')
            }
        }
        fetchPerfil()
    }, [])

    const [bestScore, setBestScore] = useState(null)
    const [gamesPlayed, setGamesPlayed] = useState(null)

    useEffect(() => {
        const fetchData = async () => {
            try {
            const token = localStorage.getItem('token')
            const headers = { Authorization: `Bearer ${token}` }

            const [perfilRes, scoreRes, gamesRes] = await Promise.all([
                axios.get(import.meta.env.VITE_API_URL + '/api/usuarios/perfil', { headers }),
                axios.get(import.meta.env.VITE_API_URL + '/api/usuarios/bestscore', { headers }),
                axios.get(import.meta.env.VITE_API_URL + '/api/usuarios/gamesplayed', { headers })
            ])

            setUsuario(perfilRes.data)
            setBestScore(scoreRes.data.best_score)
            setGamesPlayed(gamesRes.data.games_played)
            } catch (err) {
            setError('No se pudo cargar el perfil')
            }
        }
        fetchData()
        }, [])

    if (error) return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <p className="text-center text-red-600 mt-10">{error}</p>
        </div>
    )

    if (!usuario) return (
        <div className="min-h-screen flex flex-col">
            <Header />
            <p className="text-center text-gray-400 mt-10">Loading...</p>
        </div>
    )

    return (
        <div className="min-h-screen flex flex-col">
            <Header />

            <main className="flex-1 flex flex-col justify-center px-10 md:px-20 py-12">

                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 md:gap-0 items-center w-full">

                    {/* LEFT — user info */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-[#C4003B] font-black text-5xl md:text-6xl leading-none mb-2">
                            Profile
                        </h2>
                        <ProfileField label="Name"         value={`${usuario.first_name} ${usuario.last_name}`} />
                        <ProfileField label="Email"        value={usuario.email} />
                        <ProfileField label="Phone number" value={usuario.phone} />
                        <ProfileField label="Industry"     value={usuario.industry} />
                    </div>

                    {/* CENTER — avatar */}
                    <div className="flex justify-center items-center px-10">
                        <div className="w-56 h-56 md:w-72 md:h-72 rounded-full ring-[6px] ring-[#22c55e] overflow-hidden flex-shrink-0 bg-black">
                            <img src={defaultAvatar} alt="Avatar" className="w-full h-full object-cover" />
                        </div>
                    </div>

                    {/* RIGHT — stats */}
                    <div className="flex flex-col gap-10 pl-0 md:pl-10">
                        <StatCard label="Personal best:"   value={bestScore?? 'No games yet'} />
                        <StatCard label="Games completed:" value={gamesPlayed?? '0'} />
                    </div>

                </div>
            </main>
        </div>
    )
}

export default ProfilePage