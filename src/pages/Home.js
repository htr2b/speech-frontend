import React from 'react'
import "../App.css"

const Home = () => {

    const handleUpgrade = async () => {
        const token = localStorage.getItem('token')   // login olurken kaydettiğimiz token
        const API_URL = process.env.REACT_APP_API_URL

        if (!token) {
            alert("Önce giriş yapmanız gerekiyor!")
            return
        }

        try {
            const res = await fetch(`${API_URL}/pro`, {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${token}`
                }
            })

            const data = await res.json()

            if (!res.ok) {
                alert(data.error || "Plan yükseltme başarısız!")
                return
            }

            if (data.data === "pro") {
                alert("Tebrikler! Planınız PRO olarak güncellendi 🎉")
            }
        } catch (err) {
            console.error("Upgrade error:", err)
            alert("Sunucuya bağlanırken bir hata oluştu.")
        }
    }

    return (
        <div className='homePage'>
            <h1>Welcome to the Speech Summarize AI APP</h1>
            <p>This app is designed for efficient speech-to-text summarization using advanced AI algorithms.</p>

            <section>
                <h2>Features</h2>
                <ul>
                    <li>Accurate speech recognition</li>
                    <li>Fast summary generation</li>
                    <li>Multiple language support</li>
                    <li>Easy export and sharing options</li>
                </ul>
            </section>

            {/* Buton tıklandığında handleUpgrade çalışacak */}
            <button className='upgradePlan' onClick={handleUpgrade}>
                Upgrade your plan to PRO
            </button>
        </div>
    )
}

export default Home
