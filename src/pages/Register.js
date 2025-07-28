import { useRef, useState } from "react"
import { Link } from "react-router-dom"
import './LoginRegister.css'

const Register = () => {
    const nameRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const confirmPasswordRef = useRef(null)

    const [errorMsg, setErrorMsg] = useState("")
    const [msg, setMsg] = useState("")
    const [loading, setLoading] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()

        const name = nameRef.current?.value.trim()
        const email = emailRef.current?.value.trim()
        const password = passwordRef.current?.value
        const confirmPassword = confirmPasswordRef.current?.value

        if (!name || !email || !password || !confirmPassword) {
            setErrorMsg("Fill all the blocks")
            return
        }

        if (password !== confirmPassword) {
            setErrorMsg("Passwords doesn't match.")
            return
        }

        try {
            setErrorMsg("")
            setMsg("")
            setLoading(true)
            const API_URL = process.env.REACT_APP_API_URL
            const res = await fetch(`${API_URL}/user/register`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    email,
                    password,
                    full_name: name
                })
            })

            const data = await res.json()
            if (!res.ok) { // HTTP başarılı mı değil mi diye kontrol eder
                setErrorMsg(data.error || "Register failed")
                return
            }

            setMsg(data.message || "Successfuly Registered. Check your mail box.")


        } catch (err) {
            console.error("Register error:", err)
            setErrorMsg("Kayıt işlemi sırasında bir hata oluştu.")
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="wrapper">
            <div className="form">
                <h2 className="heading">Register</h2>

                {errorMsg && <div className="error-message">{errorMsg}</div>}
                {msg && <div className="success-message">{msg}</div>}

                <form onSubmit={handleSubmit}>
                    <div>
                        <label htmlFor="name">Full Name</label>
                        <input
                            type="text"
                            id="name"
                            ref={nameRef}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="email">E-mail</label>
                        <input
                            type="email"
                            id="email"
                            ref={emailRef}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="password">Password</label>
                        <input
                            type="password"
                            id="password"
                            ref={passwordRef}
                            required
                        />
                    </div>

                    <div>
                        <label htmlFor="confirm-password">Confirm Password </label>
                        <input
                            type="password"
                            id="confirm-password"
                            ref={confirmPasswordRef}
                            required
                        />
                    </div>

                    <button type="submit" disabled={loading}>
                        {loading ? "Registering..." : "Register"}
                    </button>
                </form>

                <p>
                    Do you have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    )
}

export default Register