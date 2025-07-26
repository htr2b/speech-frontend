import React from 'react'
import { useNavigate } from 'react-router-dom'
import { RiLogoutBoxLine } from 'react-icons/ri'
import { useAuth } from '../context/AuthProvider'
import { supabase } from '../supabase/client'

const ProfileMenu = ({ show }) => {
    const { user } = useAuth()
    const navigate = useNavigate()

    const handleLogout = async () => {
        await supabase.auth.signOut()
        navigate('/login')
    }

    return (
        <div className={show ? 'dropdown active' : 'dropdown'}>
            <ul>
                <li>{user?.email}</li>
                <li className="logout" onClick={handleLogout}>
                    <RiLogoutBoxLine /> Çıkış Yap
                </li>
            </ul>
        </div>
    )
}

export default ProfileMenu
