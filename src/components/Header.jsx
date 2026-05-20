import logo from '../assets/rockwell_automation_logo.png'
import { Link } from 'react-router-dom'
import { jwtDecode } from 'jwt-decode'

function Header() {
  const token = localStorage.getItem('token')
  let autenticado = false

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
              <Link to="/contactPage" className="px-7 py-2.5 border border-[#aaa] rounded-[20px] bg-[#003e7e] hover:bg-[#003e7e80] text-sm cursor-pointer text-white transition-colors">
                Contact Us
              </Link>
              <Link to={autenticado ? '/profilePage' : '/logIn'} className="w-10 h-10 bg-[#5CC334] hover:bg-green-400 rounded-full cursor-pointer">
              </Link>
            </div>
          </header>
  )
}

export default Header