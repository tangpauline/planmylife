import React from 'react'
import '../styles/LandingPage.css'

const LandingPage = () => {
    const handleLogin = () => {
        window.location.href = process.env.REACT_APP_SERVER_URL + "/auth/google"; // calls backend to handle OAuth
    };

    return (
        <div className="landing-page-div">
            <header className="landing-page-header">
                <h1>planmylife</h1>
                <p>Your all-in-one planning application and built-in AI chatbot friend, PaulBot &#x1F916;!</p>
                <button id="landing-page-button" onClick={handleLogin}>Get started</button>
            </header>
        </div>
    )
}

export default LandingPage