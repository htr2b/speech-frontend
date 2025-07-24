import React from 'react'
import { NavLink } from 'react-router-dom'
import { FiHome } from 'react-icons/fi'
import { FaPlus } from "react-icons/fa"
import { useState } from 'react'
import "../App.css"

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
                    <NavLink to='/'><FiHome />Home</NavLink>
                </li>
                <li>
                    <NavLink to={`/chat/${idCounter}`} onClick={handleAdd} type='submit'><FaPlus />New Chat</NavLink>
                </li>
                <ul>
                    <li>
                        {list.map((item) => (
                            <NavLink className='linkItem' to={`/chat/${item.id}`} key={item.id} >Chat {item.id} </NavLink>
                        ))}
                    </li>
                </ul>

            </ul>

        </div >

    )

}

export default Navbar
