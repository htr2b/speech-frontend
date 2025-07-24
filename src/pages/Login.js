import React from 'react'
import { NavLink } from 'react-router-dom'
import './LoginRegister.css'

const Login = () => {
    return (
        <div className="wrapper">

            <div className="form">
                <div className="heading">LOGIN</div>
                <form>
                    <div>
                        <label >E-Mail</label>
                        <input type="email" id="e-mail" placeholder="Enter you mail" />
                    </div>
                    <div>
                        <label>Password</label>
                        <input type="password" id="password" placeholder="Enter you password" />
                    </div>
                    <NavLink to="/">
                        <button type="button">
                            Login
                        </button>
                    </NavLink>
                </form>
                <p>
                    Don't have an account ? <NavLink to="/register"> Sign In </NavLink>
                </p>
            </div>
        </div>
    )
}

export default Login
