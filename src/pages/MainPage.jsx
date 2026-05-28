import { useState, useEffect, useRef } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { jwtDecode } from 'jwt-decode'
import heroImg from '../assets/foto_rockwell.png'
import ContactSection from '../components/Contactsection'

function useInView() {
  const ref = useRef(null)
  const [inView, setInView] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => setInView(entry.isIntersecting),
      { threshold: 0.2 }
    )
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [])
  return [ref, inView]
}

function Highlight({ children, inView, delay = 0 }) {
  return (
    <span className="relative inline-block">
      {children}
      <span
        className="absolute bottom-0 left-0 h-0.5 bg-[#770046] transition-all duration-700"
        style={{ width: inView ? '100%' : '0%', transitionDelay: `${delay}ms` }}
      />
    </span>
  )
}

function MainPage() {
  const [autenticado, setAutenticado] = useState(false);
  const permisos = JSON.parse(localStorage.getItem('permisos') || '{}')
  const [textRef, textInView] = useInView()
  const [videoRef, videoInView] = useInView()
  const isMobile = window.innerWidth < 1024

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) { setAutenticado(false); return; }
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

      {/* ── Hero section ── */}
      <main className="relative flex items-center min-h-[calc(100vh-80px)] px-6 md:px-16 overflow-hidden">
        <div className="relative z-10 flex flex-col max-w-xl">
          <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold">
            Is your company really <span className="italic">protected?</span>
          </h1>
          <p className="text-[#003e7e] text-lg md:text-2xl mt-4">
            Find out through our interactive experience.
          </p>
          <div className="flex flex-wrap gap-3 mt-8">
            {autenticado ? (
              <Link to="/gamePage" className="px-7 py-2.5 rounded-[20px] bg-[#003e7e] hover:bg-[#003e7e80] text-sm text-white transition-colors w-fit">
                Try our videogame
              </Link>
            ) : (
              <Link to="/logIn" className="px-7 py-2.5 rounded-[20px] bg-[#003e7e] hover:bg-[#003e7e80] text-sm text-white transition-colors w-fit">
                Sign In
              </Link>
            )}
            {autenticado && permisos.dashboard && (
              <Link to="/dashboard" className="px-7 py-2.5 rounded-[20px] bg-[#9B0032] hover:bg-[#9B0032]/70 text-sm text-white transition-colors w-fit">
                Check Dashboard
              </Link>
            )}
          </div>
        </div>

        {/* Hero image — hidden on mobile, visible on lg+ */}
        <div className="hidden lg:block absolute right-0 h-[80%] w-[45%]">
          <div className="absolute inset-0 rounded-tl-[30px] opacity-50" style={{ clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)', background: '#c1121f', transform: 'translate(25px, 20px)', filter: 'blur(8px)' }} />
          <div className="absolute inset-0 rounded-tl-[30px] opacity-20" style={{ clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)', background: '#c1121f', transform: 'translate(10px, 10px)', filter: 'blur(8px)' }} />
          <div className="absolute inset-0 rounded-tl-[30px] opacity-10" style={{ clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)', background: '#c1121f', transform: 'translate(-50px, -20px)', filter: 'blur(8px)' }} />
          <div className="absolute inset-0 rounded-tl-[30px] opacity-10" style={{ clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)', background: '#003e7e', transform: 'translate(-10px, -35px)', filter: 'blur(8px)' }} />
          <div className="absolute inset-0 rounded-tl-[30px] opacity-80" style={{ clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)', background: '#c1121f', transform: 'translate(-15px, 10px)', filter: 'blur(8px)' }} />
          <div className="absolute inset-0 rounded-tl-[30px] opacity-20" style={{ clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)', background: '#003e7e', transform: 'translate(-35px, 25px)', filter: 'blur(8px)' }} />
          <div className="relative h-full w-full overflow-hidden rounded-tl-[30px]" style={{ clipPath: 'polygon(25% 0%, 100% 0%, 100% 100%, 0% 100%)' }}>
            <img src={heroImg} alt="Hero" className="w-full h-full object-cover" />
          </div>
        </div>
      </main>

      {/* ── About section ── */}
      <section className="flex flex-col lg:flex-row items-center gap-10 lg:gap-16 px-6 md:px-16 py-16 md:py-24 bg-white">
      {/* Video */}
      <div
        ref={videoRef}
        className="relative w-full max-w-sm mx-auto lg:max-w-none lg:w-[480px] flex-shrink-0 transition-all duration-700 ease-out"
        style={{
          opacity: videoInView ? 1 : 0,
          transform: videoInView ? 'translateY(0)' : 'translateY(40px)',
        }}
      >
        {/* Sombra 1 */}
        <div className="absolute bg-[#9B0032] opacity-30" style={{
          width: isMobile ? '100%' : '110%',
          height: isMobile ? '100%' : '110%',
          top: isMobile ? '-3%' : '-15%',
          left: isMobile ? '0%' : '-5%',
          clipPath: 'polygon(8% 0%, 95% 5%, 88% 60%, 3% 55%)',
          transform: isMobile ? 'translate(-4px, -6px)' : 'translate(-10px, -15px)',
          filter: 'blur(12px)'
        }} />
    
        {/* Sombra 2 */}
        <div className="absolute bg-[#003e7e] opacity-20" style={{
          width: isMobile ? '100%' : '105%',
          height: isMobile ? '95%' : '100%',
          top: isMobile ? '-3%' : '-10%',
          left: '0%',
          clipPath: 'polygon(15% 0%, 100% 8%, 92% 50%, 0% 45%)',
          transform: isMobile ? 'translate(6px, -8px)' : 'translate(15px, -20px)',
          filter: 'blur(16px)'
        }} />
    
        {/* Sombra 3 */}
        <div className="absolute bg-[#9B0032] opacity-40" style={{
          width: isMobile ? '105%' : '120%',
          height: isMobile ? '85%' : '90%',
          top: isMobile ? '-3%' : '-10%',
          left: isMobile ? '-3%' : '-10%',
          clipPath: 'polygon(5% 5%, 85% 0%, 95% 55%, 10% 60%)',
          transform: isMobile ? 'translate(-8px, -5px)' : 'translate(-20px, -10px)',
          filter: 'blur(10px)'
        }} />
    
        {/* Sombra 4 */}
        <div className="absolute inset-0 opacity-50 bg-[#9B0032]" style={{
          clipPath: 'polygon(0% 10%, 90% 0%, 100% 85%, 15% 100%)',
          transform: isMobile ? 'translate(10px, 14px)' : 'translate(25px, 35px)',
          filter: 'blur(8px)'
        }} />
    
        {/* Sombra 5 */}
        <div className="absolute inset-0 opacity-50 bg-[#9B0032]" style={{
          height: isMobile ? '120%' : '150%',
          clipPath: 'polygon(20% 40%, 90% 0%, 100% 85%, 15% 100%)',
          transform: isMobile ? 'translate(-40px, -40px)' : 'translate(-105px, -105px)',
          filter: 'blur(8px)'
        }} />
    
        {/* Sombra 6 */}
        <div className="absolute inset-0 opacity-30 bg-[#003e7e]" style={{
          clipPath: 'polygon(5% 0%, 100% 8%, 95% 100%, 0% 90%)',
          transform: isMobile ? 'translate(-20px, 12px)' : 'translate(-50px, 30px)',
          filter: 'blur(10px)'
        }} />
    
        {/* Sombra 7 */}
        <div className="absolute inset-0 opacity-20 bg-[#9B0032]" style={{
          clipPath: 'polygon(10% 5%, 95% 0%, 100% 90%, 5% 100%)',
          transform: isMobile ? 'translate(10px, -4px)' : 'translate(25px, -10px)',
          filter: 'blur(14px)'
        }} />
    
        <video autoPlay loop muted playsInline className="relative w-full rounded-2xl shadow-lg">
          <source src="/src/assets/demo_juego.mp4" type="video/mp4" />
        </video>
      </div>
        
        {/* Text */}
        <div
          ref={textRef}
          className="flex flex-col gap-5 transition-all duration-700 ease-out delay-150"
          style={{
            opacity: textInView ? 1 : 0,
            transform: textInView ? 'translateY(0)' : 'translateY(40px)',
          }}
        >
          <h2 className="text-3xl md:text-4xl font-bold text-[#770046]">Play. Learn. Protect.</h2>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
            Our project is an interactive gaming experience developed in collaboration with{' '}
            <Highlight inView={textInView} delay={300}>Rockwell Automation</Highlight>.
            Through a story-driven arcade adventure, players explore the world of Operational Technology (OT),
            Information Technology (IT), and Industrial Cybersecurity while discovering the importance of
            protecting modern industries from digital threats.
          </p>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
            The game combines{' '}<Highlight inView={textInView} delay={700}>RPG-style storytelling</Highlight>{' '}with fast-paced{' '}
            <Highlight inView={textInView} delay={1000}>arcade minigames</Highlight>{' '}inspired by real industrial
            environments and technologies. Players begin in a familiar office setting before being transported into
            a fictional world where they must overcome cybersecurity challenges across different industries.
          </p>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
            Designed primarily for mobile devices and exhibition environments, the experience is approachable even
            for people with little to no gaming experience. The game features interactive NPCs, exploration, score
            tracking, and a final boss battle that unlocks after completing all three cybersecurity-themed minigames.
          </p>
          <p className="text-base md:text-lg text-gray-700 leading-relaxed font-medium">
            On your right, you can watch a demo showcasing the game's environments, gameplay mechanics, and overall experience.
          </p>
        </div>

      </section>

      <ContactSection />
    </div>
  )
}

export default MainPage