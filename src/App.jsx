import { BrowserRouter, Routes, Route } from 'react-router-dom'
import SignUp from './pages/SignUp'
import LogIn from './pages/LogIn'
import MainPage from './pages/MainPage'
import GamePage from './pages/GamePage'
import ProfilePage from './pages/ProfilePage'
import Dashboard from './pages/Dashboard'
import ProductsPage from './pages/ProductsPage'


function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainPage />} />
        <Route path="/signUp" element={<SignUp />} />
        <Route path="/logIn" element={<LogIn />} />
        <Route path="/gamePage" element={<GamePage />} />
        <Route path="/profilePage" element={<ProfilePage />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/productsPage" element={<ProductsPage />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App