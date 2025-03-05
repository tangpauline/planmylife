import '../styles/AboutPage.css'

const AboutPage = () => {
    return (
        <div className="about-page-div">
            <header className="about-page-header">
                <h1>planmylife</h1>
            </header>
            <main className="about-main">
                <div className="about-content">
                    <h2>About planmylife</h2>
                    <p>Welcome to Your Personal AI Planner! Stay organized, manage your tasks efficiently, and take control of your time—all through a seamless, interactive experience with our AI-powered chatbot.</p>
                    
                    <br></br>
                    <br></br>

                    <h3>What is PaulBot?</h3>
                    <p>Paulbot is a smart, AI-driven virtual assistant designed to make scheduling and task management easy and intuitive. PaulBot is here thanks to Google Dialogflow and will help you add and delete tasks all through the messenger chat!</p>
                    <br></br>
                    <p>Ask Paulbot a command, such as "Schedule a meeting with Pauline for tomorrow", and it'll add the task right into your schedule.</p>
                    <br></br>
                    <p>You can also delete tasks using commands like "Remove meeting with Pauline from my schedule."</p>

                    <br></br>
                    <br></br>

                    <h3>Under construction</h3>
                    <p>planmylife is still under construction and will add more features soon!</p>
                    <p>Keep an eye out for new features like: task edits, smoother conversations with PaulBot, and AI-powered planning for breaking a large task down into a structured plan.</p>
                </div>
            </main>
        </div>
    )
}

export default AboutPage