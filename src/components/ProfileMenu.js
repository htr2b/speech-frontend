import React from 'react'
import { NavLink } from 'react-router-dom'
import { RiLogoutBoxLine } from "react-icons/ri"

const ProfileMenu = ({ show }) => {

    return (
        <div className={show ? 'dropdown active' : 'dropdown'}>
            <ul>
                <li>
                    Onur Kahan
                </li>
                <div className='logout'>
                    <li>
                        <NavLink to='/login'><RiLogoutBoxLine />Logout</NavLink>
                    </li>
                </div>

            </ul>

        </div >

    )

}

export default ProfileMenu
