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
                    <NavLink to='/' className="linkItem">
                        <FiHome /> Home
                    </NavLink>
                </li>
                <li>
                    <NavLink onClick={handleAdd} type='submit' >
                        <FaPlus /> New Chat
                    </NavLink>
                </li>
                {list.map((item) => (
                    <li key={item.id}>
                        <NavLink
                            to={`/chat/${item.id}`}
                            className={({ isActive }) => isActive ? 'linkItem active' : 'linkItem'}
                        >
                            Chat {item.id}
                        </NavLink>
                    </li>
                ))}
            </ul>
        </div>


    )

}

export default Navbar
