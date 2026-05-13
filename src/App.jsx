import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import MainPage from './pages/MainPage'
import GamePage from './pages/GamePage'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/gamePage" element={<GamePage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App