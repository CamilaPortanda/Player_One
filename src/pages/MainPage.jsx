import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { jwtDecode } from 'jwt-decode'
import heroImg from '../assets/foto_rockwell.png'
 
function MainPage() {
  const [autenticado, setAutenticado] = useState(false);
 
  useEffect(() => {
    const token = localStorage.getItem("token");
 
    if (!token) {
      setAutenticado(false);
      return;
    }
 
    try {
      const decoded = jwtDecode(token);
      const expirado = decoded.exp * 1000 < Date.now();
 
      if (expirado) {
        localStorage.removeItem("token");
        setAutenticado(false);
      } else {
        setAutenticado(true);
      }
    } catch (err) {
      localStorage.removeItem("token");
      setAutenticado(false);
    }
  }, []);
 
  return (
    <div>
      <Header />
      <main className="relative flex items-center min-h-[calc(100vh-80px)] px-16 overflow-hidden">
 
        {/* Text content */}
        <div className="relative z-10 flex flex-col max-w-xl">
          <h1 className="text-7xl font-bold">
            Is your company really <span className="italic">protected?</span>
          </h1>
          <p className="text-[#003e7e] text-2xl mt-4">Find out through our interactive experience.</p>
          {autenticado ? (
            <Link to="/gamePage" className="mt-8 px-7 py-2.5 rounded-[20px] bg-[#003e7e] hover:bg-[#003e7e80] text-sm text-white transition-colors w-fit">
              Try our videogame
            </Link>
          ) : (
            <Link to="/logIn" className="mt-8 px-7 py-2.5 rounded-[20px] bg-[#003e7e] hover:bg-[#003e7e80] text-sm text-white transition-colors w-fit">
              Sign In
            </Link>
          )}
        </div>
 
        {/* Hero image container */}
        <div className="absolute right-0 h-[80%] w-[45%]">

          {/* Red shadow layer */}
          <div
            className="absolute inset-0 rounded-tl-[30px] opacity-50"
            style={{
              clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)',
              background: '#c1121f',
              transform: 'translate(25px, 20px)',
              filter: 'blur(8px)',
            }}
          />

          <div
            className="absolute inset-0 rounded-tl-[30px] opacity-20"
            style={{
              clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)',
              background: '#c1121f',
              transform: 'translate(10px, 10px)',
              filter: 'blur(8px)',
            }}
          />

          <div
            className="absolute inset-0 rounded-tl-[30px] opacity-10"
            style={{
              clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)',
              background: '#c1121f',
              transform: 'translate(-50px, -20px)',
              filter: 'blur(8px)',
            }}
          />

          <div
            className="absolute inset-0 rounded-tl-[30px] opacity-60"
            style={{
              clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)',
              background: '#c1121f',
              transform: 'translate(-10px, -35px)',
              filter: 'blur(8px)',
            }}
          />
          <div
            className="absolute inset-0 rounded-tl-[30px] opacity-80"
            style={{
              clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)',
              background: '#c1121f',
              transform: 'translate(-15px, 10px)',
              filter: 'blur(8px)',
            }}
          />

          {/* Main image */}
          <div
            className="relative h-full w-full overflow-hidden rounded-tl-[30px]"
            style={{
              clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)',
            }}
          >
            <img
              src={heroImg}
              alt="Hero"
              className="w-full h-full object-cover"
            />
          </div>

        </div>
 
      </main>
    </div>
  )
}
 
export default MainPage