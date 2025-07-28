import React, { useEffect, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import { FaPlus } from 'react-icons/fa'
import '../App.css'

const Navbar = ({ show }) => {
    const [historyChats, setHistoryChats] = useState([])
    const token = localStorage.getItem('token')
    const navigate = useNavigate()

    const handleAdd = () => {
        navigate('/chat/0')
    }


    useEffect(() => {
        let intervalId

        const fetchHistory = async () => {
            if (!token) return
            const API_URL = process.env.REACT_APP_API_URL
            try {
                const res = await fetch(`${API_URL}/history`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                })
                if (res.ok) {
                    const data = await res.json()
                    setHistoryChats(data || [])
                } else {
                    const error = await res.json()
                    console.error("History fetch failed:", error)
                }
            } catch (err) {
                console.error("History fetch error:", err)
            }
        }

        fetchHistory()
        intervalId = setInterval(fetchHistory, 5000)
        return () => clearInterval(intervalId)
    }, [token])



    return (
        <div className={show ? 'sidenav active' : 'sidenav'}>
            <ul>
                <li>
                    <NavLink to="/" className="linkItem">
                        <FiHome /> Home
                    </NavLink>
                </li>
                <li>
                    <button
                        onClick={handleAdd}
                        className="linkItem"
                        style={{ background: "none", border: "none", cursor: "pointer" }}
                    >
                        <FaPlus /> New Chat
                    </button>
                </li>

                {historyChats.map((chat) => (
                    <li key={`history-${chat.id}`}>
                        <NavLink
                            to={`/chat/${chat.id}`}
                            className={({ isActive }) => isActive ? 'linkItem active' : 'linkItem'}
                        >
                            {chat.title || `Chat ${chat.title}`}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Navbar
