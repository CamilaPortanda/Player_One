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
    <header className="flex items-center justify-between px-4 md:px-8 py-3 md:py-4 border-b-4 md:border-b-8 border-[#CD163F]">
      
      <Link to="/">
        <img src={logo} alt="Rockwell Automation Logo" className="h-10 sm:h-12 md:h-14" />      
      </Link>

      <div className="flex items-center gap-2 md:gap-3">
        <Link
          to="/productsPage"
          className="flex items-center gap-2 px-4 md:px-7 py-2 md:py-2.5 border border-[#aaa] rounded-[20px] bg-[#9B0032] hover:bg-[#003e7e80] text-sm cursor-pointer text-white transition-colors"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10" />
          </svg>
          <span className="hidden sm:inline">Products Page</span>
        </Link>
        <button
          onClick={handleContact}
          className="flex items-center gap-2 px-4 md:px-7 py-2 md:py-2.5 border border-[#aaa] rounded-[20px] bg-[#003e7e] hover:bg-[#003e7e80] text-sm cursor-pointer text-white transition-colors"
        >
          {/* Ícono de email — visible siempre */}
          <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          {/* Texto — se oculta en móvil */}
          <span className="hidden sm:inline">Contact Us</span>
        </button>

        <Link
          to={autenticado ? '/profilePage' : '/logIn'}
          className="w-9 h-9 md:w-10 md:h-10 rounded-full overflow-hidden cursor-pointer border-2 border-green-400 flex-shrink-0"
        >
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