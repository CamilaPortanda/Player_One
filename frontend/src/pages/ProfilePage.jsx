import { Link } from 'react-router-dom'
import Header from '../components/Header'
 
// Replace with real data once backend is connected
const MOCK_USER = {
    name: 'John Doe',
    email: 'email@example.com',
    phone: '+52 123 456 7890',
    industry: 'Automotive',
    avatar: 'src/assets/profilePic.png',
    personalBest: '3.45 seconds',
    gamesCompleted: 12,
}
 
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
    const user = MOCK_USER
 
    return (
        <div className="min-h-screen flex flex-col">
            <Header />
 
            <main className="flex-1 flex flex-col justify-center px-10 md:px-20 py-12">
 
                {/* Profile grid — full width */}
                <div className="grid grid-cols-1 md:grid-cols-[1fr_auto_1fr] gap-12 md:gap-0 items-center w-full">
 
                    {/* LEFT — user info */}
                    <div className="flex flex-col gap-6">
                        <h2 className="text-[#C4003B] font-black text-5xl md:text-6xl leading-none mb-2">
                            Profile
                        </h2>
                        <ProfileField label="Name"         value={user.name} />
                        <ProfileField label="Email"        value={user.email} />
                        <ProfileField label="Phone number" value={user.phone} />
                        <ProfileField label="Industry"     value={user.industry} />
                    </div>
 
                    {/* CENTER — avatar */}
                    <div className="flex justify-center items-center px-10">
                        <div className="w-56 h-56 md:w-72 md:h-72 rounded-full ring-[6px] ring-[#22c55e] overflow-hidden flex-shrink-0 bg-black">
                            {user.avatar
                                ? <img src={user.avatar} alt="Avatar" className="w-full h-full object-cover" />
                                : <div className="w-full h-full bg-[#7a0028]" />
                            }
                        </div>
                    </div>
 
                    {/* RIGHT — stats */}
                    <div className="flex flex-col gap-10 pl-0 md:pl-10">
                        <StatCard label="Personal best:"   value={user.personalBest} />
                        <StatCard label="Games completed:" value={user.gamesCompleted} />
                    </div>
 
                </div>
 
                {/* Divider line at the bottom for visual grounding */}
                <div className="mt-16 border-t border-black/10" />
            </main>
        </div>
    )
}
 
export default ProfilePage
 