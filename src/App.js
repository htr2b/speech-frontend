import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'
import Navbar from './components/Navbar'
import "./App.css"
import { GiHamburgerMenu } from 'react-icons/gi'
import { useState } from 'react'
import Home from './pages/Home'
import Login from './pages/Login'
import Chat from './pages/Chat'
import logo from './components/icon.svg'
import { FaRegUser } from "react-icons/fa"

const App = () => {
  const [showNav, setShowNav] = useState(false)

  return (
    <>
      <Router>
        <header>
          <GiHamburgerMenu onClick={() => setShowNav(!showNav)} className='menuIcon' />
          <img src={logo} alt='Logo' className='logo' />
          <FaRegUser className='profileIcon' />

        </header>
        <Navbar show={showNav} />
        <div className={showNav ? 'main-active' : 'main'} >
          <Routes>
            <Route path="/" element={<Home />} />
          </Routes>
          <Routes>
            <Route path="/chat" element={<Chat />} />
          </Routes>
          <Routes>
            <Route path="/login" element={<Login />} />
          </Routes>
        </div>
      </Router >
    </>
  )
}

export default App
