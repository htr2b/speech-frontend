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
        if (!token) return

        const fetchHistory = async () => {
            try {
                const res = await fetch(`${process.env.REACT_APP_API_URL}/history`, {
                    headers: { Authorization: `Bearer ${token}` }
                })

                if (res.ok) {
                    const data = await res.json()
                    setHistoryChats(data || [])
                }
            } catch (err) {
                console.error("History fetch error:", err)
            }
        }

        fetchHistory()
        const intervalId = setInterval(fetchHistory, 1000)
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
                    <li key={chat.id}>
                        <NavLink
                            to={`/chat/${chat.id}`}
                            className={({ isActive }) => isActive ? 'linkItem active' : 'linkItem'}
                        >
                            {chat.title || `Chat ${chat.id}`}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Navbar