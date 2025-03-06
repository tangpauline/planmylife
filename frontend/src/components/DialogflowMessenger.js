import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { useChange } from './TaskContext';
import '../styles/DfMessenger.css';

const DialogflowMessenger = () => {
    const { change, setChange } = useChange();
    const location = useLocation();

    useEffect(() => {
        const handleBotResponse = () => {
            console.log("bot response detected");
            setChange(change => !change);
        }

        // Load the Dialogflow Messenger script dynamically
        const scriptAlreadyLoaded = document.querySelector('script[src="https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1"]');
        if (!scriptAlreadyLoaded) {
            const script = document.createElement('script');
            script.src = "https://www.gstatic.com/dialogflow-console/fast/messenger/bootstrap.js?v=1";
            script.type = 'text/javascript';
            script.async = true;

            script.onload = () => {
                console.log('Dialogflow Messenger Loaded');
                const messenger = document.querySelector('df-messenger');
                if (messenger) {
                    messenger.addEventListener("df-response-received", handleBotResponse);
                }
            };

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        }

        // document.addEventListener("df-message-received", handleBotResponse);
    }, []);

    return (
        <div>
            {location.pathname !== "/" && 
                (<df-messenger
                intent="WELCOME"
                chat-title="PaulBot"
                agent-id="6e6e922a-9dd4-4c38-8b9e-1c2bb333b633"
                language-code="en"
                ></df-messenger>)
            }
        </div>
    );
};

export default DialogflowMessenger;