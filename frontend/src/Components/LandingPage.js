import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './LandingPage.css';
const LandingPage = () => {
    const navigate = useNavigate();
    const personas = ['StinkyBoy', 'Maton', 'MeYo', 'Buggy', 'Cocopups'];
    const [activeButton, setActiveButton] = useState(null);
    const startChat = async (persona) => {
        console.log(`Starting chat with ${persona}`)
        navigate('/chat', { state: { persona } });
    }

    return (
        <div className="landing-page">
            {personas.map((persona, index) => (
                <button
                    key={index}
                    onMouseEnter={() => setActiveButton(persona)}
                    onMouseLeave={() => setActiveButton(null)}
                    onClick={() => {
                        setActiveButton(persona);
                        startChat(persona);
                    }}
                >
                    <img
                        src={`${process.env.PUBLIC_URL}/images/${persona}${persona === activeButton ? '_Profile_Hover' : '_Profile_Default'}.png`}
                        alt={persona}
                    />
                </button>
            ))}
            <Link to="/chat"></Link>
        </div>
    );
}

export default LandingPage;