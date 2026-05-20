import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { jwtDecode } from 'jwt-decode'  // npm install jwt-decode

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
      <main className="flex flex-col justify-center min-h-[calc(100vh-80px)] px-16">
        <h1 className="text-7xl font-bold max-w-xl">
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
      </main>
    </div>
  )
}

export default MainPage