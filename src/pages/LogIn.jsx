import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import Header from '../components/Header'
import axios from 'axios';

function LogIn() {
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [error, setError] = useState(''); 
  const navigate = useNavigate();  

  const handleLogin = async () => {
    setError('');
    try {
      const res = await axios.post(
        import.meta.env.VITE_API_URL + '/api/auth/login',
        { email, password }
      );

      const token = res.data.token
      localStorage.setItem('token', token);
      localStorage.setItem('permisos', JSON.stringify(res.data.permisos));

      const headers = { Authorization: `Bearer ${token}` }
      const [perfilRes, pfpsRes] = await Promise.all([
        axios.get(import.meta.env.VITE_API_URL + '/api/usuarios/perfil', { headers }),
        axios.get(import.meta.env.VITE_API_URL + '/api/pfps'),
      ])
      const userPfp = pfpsRes.data.find(p => p.pfp_id === perfilRes.data.pfp_id)
      if (userPfp) localStorage.setItem('avatarUrl', userPfp.image_link)

      navigate('/');
    } catch (err) {
      setError(err.response?.data?.error || 'Error de conexión');
    }
  }

  return (
    <div className="bg-[#9B0032] min-h-screen">
      <Header />
      <main className="flex justify-center items-center min-h-[calc(100vh-80px)] py-8 px-4">
        <div className="relative flex flex-col justify-center bg-[#fcfcfc] rounded-2xl p-6 md:p-8 w-full max-w-[500px] min-h-[400px] md:h-[430px] shadow-[0px_4px_12px_rgba(0,0,0,0.20)]">

          <Link
            to="/"
            className="absolute top-6 left-6 md:top-10 md:left-10 text-[#003e7e] hover:text-[#003e7e80] text-sm no-underline"
          >
            ← Back
          </Link>

          <h2 className="text-center text-[28px] md:text-[32px] font-normal mt-2.5 mb-1 text-[#003e7e]">
            Log In
          </h2>

          <p className="text-center text-[13px] text-[#003e7e] mt-5 mb-2.5">
            ¿No account?{' '}
            <Link to="/signUp" className="text-[#003e7e] hover:text-[#003e7e80] underline">
              Sign up
            </Link>
          </p>

          {error ? (
            <div className="mb-4 rounded-lg bg-red-50 px-3 py-2 text-sm text-red-700 border border-red-100" role="alert">
              {error}
            </div>
          ) : null}

          <div className="flex flex-col justify-center items-center gap-[15px] mt-[30px]">
            <input
              id="login-email"
              type="email"
              autoComplete='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Email"
              className="w-full sm:w-4/5 px-3.5 py-2.5 border border-[#bebebe] rounded-lg bg-transparent text-sm text-[#003e7e] placeholder-[#003e7e] outline-none"
            />
            <input
              id="login-password"
              type="password"
              autoComplete='current-password'
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Password"
              className="w-full sm:w-4/5 px-3.5 py-2.5 border border-[#bebebe] rounded-lg bg-transparent text-sm text-[#003e7e] placeholder-[#003e7e] outline-none"
            />
          </div>

          <button
            onClick={handleLogin}
            className="block mx-auto mt-6 w-fit text-center px-10 py-2.5 border border-[#aaa] rounded-[20px] bg-[#003e7e] hover:bg-[#003e7e80] text-sm text-white cursor-pointer transition-colors"
          >
            Ready
          </button>

        </div>
      </main>
    </div>
  )
}

export default LogIn