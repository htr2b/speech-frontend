import React, { useState } from 'react'
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Login from './pages/Login'
import Register from './pages/Register'
import Chat from './pages/Chat'
import ProfileMenu from './components/ProfileMenu'
import logo from './components/icon.svg'
import { FaRegUser } from 'react-icons/fa'
import './App.css'

const AppContent = () => {
  const location = useLocation()
  const isAuthPage = ['/login', '/register'].includes(location.pathname)

  const [showDropdown, setShowDropdown] = useState(false)

  return (
    <>
      <header className="app-header">
        <img src={logo} alt="Logo" className="logo" />

        {!isAuthPage && (
          <FaRegUser
            className="profileIcon"
            onClick={() => setShowDropdown((prev) => !prev)}
          />
        )}
      </header>

      <Navbar show={!isAuthPage} />

      {!isAuthPage && (
        <ProfileMenu show={showDropdown} onClose={() => setShowDropdown(false)} />
      )}

      <main className={isAuthPage ? 'main' : 'main-active'}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/chat/:id" element={<Chat />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
        </Routes>
      </main>
    </>
  )
}

const App = () => (
  <Router>
    <AppContent />
  </Router>
)

export default App
