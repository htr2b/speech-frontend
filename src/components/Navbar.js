import React from 'react'
import { Link } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import { RiLogoutBoxLine } from "react-icons/ri"
import { FaPlus } from "react-icons/fa"
import { useState } from 'react'
const initialList = []
let idCounter = 1
const Navbar = ({ show }) => {
    const [list, setList] = useState(initialList)

    function handleAdd() {
        const newList = list.concat({ id: idCounter })
        idCounter++
        setList(newList)
    }
    return (
        <div className={show ? 'sidenav active' : 'sidenav'}>
            <ul>
                <li>
                    <Link to='/'><FiHome />Home</Link>
                </li>
                <li>
                    <Link to={`/chat/${idCounter}`} onClick={handleAdd} type='submit'><FaPlus />New Chat</Link>
                </li>
                <ul>
                    <li>
                        {list.map((item) => (
                            <Link to={`/chat/${item.id}`} key={item.id} >Chat {item.id} </Link>
                        ))}
                    </li>
                </ul>
                <div className='logout'>
                    <li>
                        <Link to='/login'><RiLogoutBoxLine />Logout</Link>
                    </li>
                </div>

            </ul>

        </div >

    )

}

export default Navbar
