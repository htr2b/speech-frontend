import React, { useRef, useState } from 'react'
import { NavLink, useNavigate } from 'react-router-dom'
import './LoginRegister.css'

const Login = () => {
    const emailRef = useRef(null)
    const passwordRef = useRef(null)

    const [errorMsg, setErrorMsg] = useState("")
    const [loading, setLoading] = useState(false)

    const navigate = useNavigate()

    const handleSubmit = async (e) => {
        e.preventDefault()

        const email = emailRef.current?.value.trim()
        const password = passwordRef.current?.value

        if (!email || !password) {
            setErrorMsg("Lütfen tüm alanları doldurun")
            return
        }

        try {
            setErrorMsg("")
            setLoading(true)
            const API_URL = process.env.REACT_APP_API_URL
            const res = await fetch(`${API_URL}/user/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            })

            const data = await res.json()

            if (!res.ok) {
                setErrorMsg(data.error || "Register failed")
                return
            }

            if (data.token) {
                localStorage.setItem("token", data.token)
                localStorage.setItem('email', email)
            }

            navigate("/")
        } catch (err) {
            setErrorMsg("Giriş işlemi sırasında bir hata oluştu")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="wrapper">
            <div className="form">
                <h2 className="heading">Login</h2>

                {errorMsg && <div className="error-message">{errorMsg}</div>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            ref={emailRef}
                            placeholder="E-posta adresinizi girin"
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            ref={passwordRef}
                            placeholder="Şifrenizi girin"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>

                <p>
                    Don't you have an account? <NavLink to="/register">Register</NavLink>
                </p>
            </div>
        </div>
    )
}

export default Login