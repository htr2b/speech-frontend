import React, { useState, useEffect } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Chat from './pages/Chat'
import logo from './components/icon.svg'
import { FaRegUser } from "react-icons/fa"
import ProfileMenu from './components/ProfileMenu'
import Register from './pages/Register'
const AppContent = () => {
  const [showNav, setShowNav] = useState(true)
  const [showDropdown, setShowDropdown] = useState(false)
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/login' || location.pathname === '/register') {
      setShowDropdown(false)
      setShowNav(false)
    } else {
      setShowNav(true)
    }
  }, [location.pathname])

  return (
    <>
      <header>
        <img src={logo} alt='Logo' className='logo' />

        {(location.pathname !== '/login' || location.pathname !== '/register') && (
          <FaRegUser
            onClick={() => setShowDropdown(!showDropdown)}
            className='profileIcon'
          />)}


      </header>
      <Navbar show={showNav} />
      <ProfileMenu show={showDropdown} />

      <div className={showNav ? 'main-active' : 'main'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

        </Routes>
      </div>
    </>
  )
}

const App = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  )
}

export default App
