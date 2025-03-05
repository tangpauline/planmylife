import { useAuth } from '../components/AuthContext';
import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import '../styles/DfMessenger.css';

const DialogflowMessenger = () => {
    const { user } = useAuth();
    const location = useLocation();

    useEffect(() => {
        // Load the Dialogflow Messenger script dynamically
        const scriptAlreadyLoaded = document.querySelector('script[src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"]');
        if (!scriptAlreadyLoaded) {
            const script = document.createElement('script');
            script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
            script.type = 'text/javascript';
            script.async = true;
            script.onload = () => {
                console.log('Dialogflow Messenger Loaded');
            };
            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script); // Clean up the script when the component unmounts
            };
        }
    }, []);

    return (
        <div>
            {location.pathname !== "/" && 
                (<df-messenger
                intent="WELCOME"
                chat-title="PaulBot"
                agent-id="6e6e922a-9dd4-4c38-8b9e-1c2bb333b633"
                language-code="en"
                // user-id={user.user_id}
                ></df-messenger>)
            }
        </div>
    );
};

export default DialogflowMessenger;