import React from 'react'
import "../App.css"

const Home = () => {
    return (
        <div>
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
            <button className='upgradePlan'>
                Upgrade your plan to PRO
            </button>
        </div>
    )
}

export default Home
