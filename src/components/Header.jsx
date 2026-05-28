import logo from '../assets/rockwell_automation_logo.png'
import { Link, useNavigate } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

function Header() {
  const token = localStorage.getItem('token')
  const avatarUrl = localStorage.getItem('avatarUrl')
  const navigate = useNavigate()
  let autenticado = false

  const handleContact = () => {
    navigate('/')
    setTimeout(() => {
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
    }, 100)
  }
  
  try {
    const decoded = jwtDecode(token)
    autenticado = decoded.exp * 1000 > Date.now()
  } catch (err) {
    autenticado = false
  }

  return (
    <header className="flex items-center justify-between px-8 py-4 border-b-8 border-[#CD163F]">
            <Link to="/">
                <img src={logo} alt="Rockwell Automation Logo" />
            </Link>
            <div className="flex items-center gap-3">
              <button
                onClick={handleContact}
                className="px-7 py-2.5 border border-[#aaa] rounded-[20px] bg-[#003e7e] hover:bg-[#003e7e80] text-sm cursor-pointer text-white transition-colors"
              >
                Contact Us
              </button>
              <Link to={autenticado ? '/profilePage' : '/logIn'} 
                className="w-10 h-10 rounded-full overflow-hidden cursor-pointer border-2 border-green-400 flex-shrink-0">
                {autenticado && avatarUrl
                  ? <img src={avatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                  : <div className="w-full h-full bg-[#5CC334]" />
                }
              </Link>
            </div>
          </header>
  )
}

export default Header