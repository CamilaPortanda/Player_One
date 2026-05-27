import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'
import Header from '../components/Header'
 
const apiBase = import.meta.env.VITE_API_URL
 
function ChoosePfp() {
  const [pfps, setPfps] = useState([])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const [error, setError] = useState('')
  const navigate = useNavigate()
 
  useEffect(() => {
    axios.get(`${apiBase}/api/pfps`)
      .then(res => setPfps(res.data))
      .catch(() => setError('No se pudieron cargar las fotos'))
  }, [])
 
  const handleReady = async (pfp_id) => {
    try {
      const userData = JSON.parse(sessionStorage.getItem('signUpData'))
      await axios.post(`${apiBase}/api/auth/registro`, {
        ...userData,
        pfp_id
      })
      sessionStorage.removeItem('signUpData')
      navigate('/logIn')
    } catch (err) {
      setError(err.response?.data?.error || 'Error de conexión')
    }
  }
 
  const handleSkip = () => handleReady(1)
  const handleConfirm = () => handleReady(pfps[selectedIndex]?.pfp_id)
 
  const prev = () => setSelectedIndex(i => (i - 1 + pfps.length) % pfps.length)
  const next = () => setSelectedIndex(i => (i + 1) % pfps.length)
 
  return (
    <div className="bg-[#9B0032] min-h-screen">
      <Header />
      <main className="flex justify-center items-center min-h-[calc(100vh-80px)]">
        <div className="bg-[#fcfcfc] rounded-2xl p-10 w-[550px] shadow-[0px_4px_12px_rgba(0,0,0,0.20)] flex flex-col items-center">
 
          <Link to="/signUp" className="self-start text-[#003e7e] hover:text-[#003e7e80] no-underline text-sm mb-4">
            ← Back
          </Link>
 
          <h2 className="text-center text-[28px] font-normal text-[#003e7e] mb-8">
            Choose your profile picture
          </h2>
 
          {error && (
            <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 border border-red-100 w-full">
              {error}
            </div>
          )}
 
          {pfps.length > 0 && (
            <div className="flex items-center justify-center gap-4 mb-8">
 
              {/* Previous */}
              <button onClick={prev} className="text-[#003e7e] hover:text-[#003e7e80] text-3xl font-bold cursor-pointer">
                ‹
              </button>
 
              {/* Carousel */}
              <div className="flex items-center gap-4">
                {/* Left — previous image preview */}
                <div className="w-16 h-16 rounded-full overflow-hidden opacity-40 scale-90 transition-all flex-shrink-0 bg-gray-200">
                  <img
                    src={pfps[(selectedIndex - 1 + pfps.length) % pfps.length]?.image_link}
                    alt="prev"
                    className="w-full h-full object-cover"
                  />
                </div>
 
                {/* Center — selected */}
                <div className="w-32 h-32 rounded-full overflow-hidden ring-4 ring-[#003e7e] flex-shrink-0 bg-gray-200 transition-all">
                  <img
                    src={pfps[selectedIndex]?.image_link}
                    alt="selected"
                    className="w-full h-full object-cover"
                  />
                </div>
 
                {/* Right — next image preview */}
                <div className="w-16 h-16 rounded-full overflow-hidden opacity-40 scale-90 transition-all flex-shrink-0 bg-gray-200">
                  <img
                    src={pfps[(selectedIndex + 1) % pfps.length]?.image_link}
                    alt="next"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
 
              {/* Next */}
              <button onClick={next} className="text-[#003e7e] hover:text-[#003e7e80] text-3xl font-bold cursor-pointer">
                ›
              </button>
 
            </div>
          )}
 
          <button
            onClick={() => setSelectedIndex(i => i)} // just visual feedback trigger
            className="text-[#003e7e] underline text-sm mb-4 cursor-pointer bg-transparent border-none"
            onClick={handleSkip}
          >
            Skip for now
          </button>
 
          <button
            onClick={handleConfirm}
            className="block mx-auto px-10 py-2.5 border border-[#aaa] rounded-[20px] bg-[#003e7e] hover:bg-[#003e7e80] text-sm text-white cursor-pointer transition-colors"
          >
            Ready
          </button>
 
        </div>
      </main>
    </div>
  )
}
 
export default ChoosePfp