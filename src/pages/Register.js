import React from "react"
import { NavLink } from "react-router-dom"
import './LoginRegister.css'

export default function Register() {
    return (
        <div className="wrapper">

            <div className="form">
                <div className="heading">CREATE AN ACCOUNT</div>
                <form>
                    <div>
                        <label htmlFor="name">Name</label>
                        <input type="text" id="name" placeholder="Enter your name" />
                    </div>
                    <div>
                        <label htmlFor="name">E-Mail</label>
                        <input type="text" id="e-mail" placeholder="Enter your mail" />
                    </div>
                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            placeholder="Enter you password"
                        />
                    </div>
                    <NavLink to="/">
                        <button type="button">
                            Register
                        </button>
                    </NavLink>
                    <h2 align="center" >
                        OR
                    </h2>
                </form>
                <p>
                    Have an account ? <NavLink to="/login"> Login </NavLink>
                </p>
            </div>
        </div >
    )
}
