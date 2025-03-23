import React, { useContext, useEffect } from 'react';
import "./App.css";
import va from "./assets/ai.png";
import { FaMicrophone, FaStop } from "react-icons/fa";
import { FaMoon, FaSun } from "react-icons/fa";
import { FaHome } from "react-icons/fa";
import { datacontext } from './context/UserContext';
import speakingGif from './assets/speak.gif';
import aiVoiceGif from './assets/aivoice.gif';

function App() {
    const { startListening, stopListening, prompt, isListening, speaking, darkMode, toggleDarkMode } = useContext(datacontext);

    const handleButtonClick = () => {
        if (isListening || speaking) {
            stopListening();
        } else {
            startListening();
        }
    };

    // Handle keyboard shortcuts
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.ctrlKey) {
                handleButtonClick();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [isListening, speaking]);

    // Function to navigate back to home page
    const goBackToHome = () => {
        // Using relative path that works when the app is in the /dist folder
        window.location.href = '..\..\index.html';
    };

    return (
        <div className={`main ${darkMode ? 'dark-mode' : ''}`}>
            <div className="theme-toggle">
                <button onClick={toggleDarkMode} className="theme-toggle-button">
                    {darkMode ? <FaSun className="theme-icon" /> : <FaMoon className="theme-icon" />}
                </button>
            </div>

            <div className="home-button-container">
                <button onClick={goBackToHome} className="home-button">
                    <FaHome className="home-icon" />
                    <span>Back to Home</span>
                </button>
            </div>

            <div className="logo-container">
                <img src={va} alt="Virtual Assistant" id="NEXUS" className={speaking || isListening ? 'pulse' : ''} />
            </div>

            <div className="header">
                <h1 className="title" data-text="I'm NEXUS, Your Advanced Virtual Assistant">
                    I'm NEXUS, Your Advanced Virtual Assistant
                </h1>
            </div>

            <div className='content'>
                <div className='button-container'>
                    <button 
                        onClick={handleButtonClick} 
                        className={`speak-button ${isListening ? 'listening' : ''} ${speaking ? 'speaking' : ''}`}
                    >
                        <span>
                            {isListening ? 'Listening...' : speaking ? 'Speaking...' : 'Click to Speak (or press Ctrl)'}
                        </span>
                        {isListening ? <FaStop className="mic-icon pulse" /> : <FaMicrophone className={`mic-icon ${speaking ? 'speaking' : ''}`} />}
                    </button>
                </div>

                <div className='response-container'>
                    <div className="response-content">
                        <div className="animation-container">
                            {speaking ? (
                                <img src={aiVoiceGif} alt="AI Response" className="animation-gif" />
                            ) : isListening ? (
                                <img src={speakingGif} alt="Listening" className="animation-gif" />
                            ) : (
                                <img src={aiVoiceGif} alt="AI Response" className="animation-gif" style={{opacity: 3.0}} />
                            )}
                        </div>
                        <p className="response-text">
                            {prompt && prompt !== "Click to Speak" 
                                ? prompt 
                                : "I'm ready to assist you. Click the button above or press Ctrl to start speaking."}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default App;