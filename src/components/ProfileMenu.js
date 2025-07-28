import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { supabase } from '../supabase/client'

const ProfileMenu = ({ show }) => {
    const navigate = useNavigate()
    const handleLogout = async () => {
        localStorage.removeItem('token')
        await supabase.auth.signOut()
        navigate('/login')
        localStorage.removeItem('email')
    }
    const email = localStorage.getItem('email')
    return (
        <div className={show ? 'dropdown active' : 'dropdown'}>
            <ul>
                <li>{email}</li>
                <li className="logout" onClick={handleLogout}>
                    <RiLogoutBoxLine /> Çıkış Yap
                </li>
            </ul>
        </div>
    )
}

export default ProfileMenu
