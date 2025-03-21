import React, { createContext, useState, useCallback, useEffect, useRef } from 'react';
import run from '../gemini';

export const datacontext = createContext();

function UserContext({ children }) {
    const [prompt, setPrompt] = useState("Click to Speak");
    const [speaking, setSpeaking] = useState(false);
    const [isListening, setIsListening] = useState(false);
    const [darkMode, setDarkMode] = useState(false);
    const recognitionRef = useRef(null);
    const languageCode = 'HI-IN';//LAUNGUAGE 
    const [availableVoices, setAvailableVoices] = useState([]);

    useEffect(() => {
        // Get the list of available voices
        const loadVoices = () => {
            const voices = window.speechSynthesis.getVoices();
            setAvailableVoices(voices);
        };

        // Load voices initially
        loadVoices();

        // Chrome loads voices asynchronously
        if (window.speechSynthesis.onvoiceschanged !== undefined) {
            window.speechSynthesis.onvoiceschanged = loadVoices;
        }
    }, []);

    const toggleDarkMode = () => {
        setDarkMode(prev => !prev);
        document.body.classList.toggle('dark-mode');
    };

    const speak = useCallback((text) => {
        return new Promise((resolve) => {
            const text_speak = new SpeechSynthesisUtterance(text);
            
            // Find a male voice
            let maleVoice = null;
            
            // Try to find a male voice (most voices with 'Male' in the name or lower pitch)
            if (availableVoices.length > 0) {
                // First preference: Try to find an explicitly male voice
                maleVoice = availableVoices.find(voice => 
                    voice.name.includes('Male') || 
                    voice.name.includes('male') || 
                    voice.name.includes('David') || 
                    voice.name.includes('Thomas') ||
                    voice.name.includes('Daniel') ||
                    voice.name.includes('Google UK English Male')
                );
                
                // Second preference: Use any available voice that isn't explicitly female
                if (!maleVoice) {
                    maleVoice = availableVoices.find(voice => 
                        !voice.name.includes('Female') && 
                        !voice.name.includes('female')
                    );
                }
                
                // Fallback: Use the first available voice if no male voice found
                if (!maleVoice && availableVoices.length > 0) {
                    maleVoice = availableVoices[0];
                }
            }
            
            // Set the voice if found
            if (maleVoice) {
                text_speak.voice = maleVoice;
            }
            
            // Set voice parameters for a deeper, more masculine sound
            text_speak.volume = 1;       // Maximum volume
            text_speak.rate = 0.9;       // Slightly slower rate for clarity
            text_speak.pitch = 0.8;      // Lower pitch for male voice
            text_speak.lang = 'en-US';   // Set language to English

            text_speak.onstart = () => setSpeaking(true);
            text_speak.onend = () => {
                setSpeaking(false);
                resolve();
            };
            text_speak.onerror = () => {
                setSpeaking(false);
                resolve();
            };

            window.speechSynthesis.speak(text_speak);
        });
    }, [availableVoices]);

    const stopListening = useCallback(() => {
        window.speechSynthesis.cancel();
        if (recognitionRef.current && isListening) {
            recognitionRef.current.abort();
        }
        setSpeaking(false);
        setIsListening(false);
        setPrompt("Click to Speak");
    }, [isListening]);

     const processNameQuestion = useCallback((text) => {
        const lowercaseText = text.toLowerCase();
        const creationQuestions = [
            "who (made|created) you",
            "who is your creator",
            "who developed you",
            "who built you"
        ];

        if (/(what(\s+is|\s+'s)? your name|who are you|tell me your name|your name)/.test(lowercaseText)) {
            return "I am NEXUS, your advanced virtual assistant. How can I help you today?";
        }

        if (creationQuestions.some(question => new RegExp(question).test(lowercaseText))) {
            return "I was developed by sonu kumar an 1st year student of computer science and engineering from vit bhopal university.";
        }

        return null;
    }, []);

    const isValidUrl = (url) => {
        try {
            new URL(url);
            return true;
        } catch (error) {
            return false;
        }
    };

    // Enhanced function to open PC applications
    const openApplication = useCallback(async (lowercaseText, originalText) => {
        const appPatterns = [
            /open (the )?(.*?) app/i,
            /launch (the )?(.*?)( app)?/i,
            /start (the )?(.*?)( app)?/i,
            /run (the )?(.*?)( app)?/i
        ];
        
        let appMatch = null;
        let appName = null;
        
        // Check if any of the patterns match
        for (const pattern of appPatterns) {
            appMatch = originalText.match(pattern);
            if (appMatch) {
                appName = appMatch[2]?.trim();
                break;
            }
        }
        
        if (appName) {
            try {
                // Create a custom protocol URL to open Windows apps
                const appNameLower = appName.toLowerCase();
                
                // Map common app names to their Windows executable names
                const appMappings = {
                    'calculator': 'calc',
                    'notepad': 'notepad',
                    'paint': 'mspaint',
                    'word': 'winword',
                    'excel': 'excel',
                    'powerpoint': 'powerpnt',
                    'outlook': 'outlook',
                    'chrome': 'chrome',
                    'edge': 'msedge',
                    'firefox': 'firefox',
                    'settings': 'ms-settings:',
                    'control panel': 'control',
                    'file explorer': 'explorer',
                    'task manager': 'taskmgr',
                    'photos': 'ms-photos:',
                    'camera': 'microsoft.windows.camera:',
                    'mail': 'outlookmail:',
                    'calendar': 'outlookcal:',
                    'maps': 'bingmaps:',
                    'store': 'ms-windows-store:',
                    'spotify': 'spotify:',
                    'netflix': 'netflix:'
                };
                
                let appCommand = appMappings[appNameLower] || appName;
                
                // Try to open the app using the custom protocol
                if (appCommand.endsWith(':')) {
                    window.location.href = appCommand;
                } else {
                    // For Windows executables, use a special protocol handler if available
                    // Otherwise fall back to trying to open it via shell protocol (requires configuration)
                    try {
                        window.location.href = `shell:${appCommand}`;
                    } catch (e) {
                        window.open(`ms-launch://${appCommand}`, '_blank');
                    }
                }
                
                return `Attempting to open ${appName}. If it doesn't open, this app might not be available on your system or may require administrator privileges.`;
            } catch (error) {
                console.error("Error opening application:", error);
                return `I couldn't open ${appName}. This might be due to security restrictions in the browser or the app might not be installed on your system.`;
            }
        }
        
        return null;
    }, []);

    // Enhanced function to open websites with better extraction and handling
    const openWebsite = useCallback(async (lowercaseText, originalText) => {
        // Check for website opening commands with various patterns
        const websitePatterns = [
            /open (the )?(website |site )?(.*?)( website| site)?$/i,
            /go to (the )?(website |site )?(.*?)( website| site)?$/i,
            /visit (the )?(website |site )?(.*?)( website| site)?$/i,
            /navigate to (the )?(website |site )?(.*?)( website| site)?$/i,
            /browse (to )?(the )?(website |site )?(.*?)( website| site)?$/i
        ];
        
        let websiteMatch = null;
        let websiteName = null;
        
        // Check if any of the patterns match for websites
        for (const pattern of websitePatterns) {
            websiteMatch = originalText.match(pattern);
            if (websiteMatch) {
                websiteName = websiteMatch[3]?.trim();
                break;
            }
        }
        
        // Simple pattern for direct URLs mentioned
        if (!websiteName && originalText.toLowerCase().includes('http')) {
            const urlPattern = /(https?:\/\/[^\s]+)/i;
            const urlMatch = originalText.match(urlPattern);
            if (urlMatch) {
                websiteName = urlMatch[1];
            }
        }
        
        // If we have a website name from any pattern
        if (websiteName) {
            // Process the website name to construct a URL
            let url = websiteName;
            
            // Clean up common phrases
            url = url.replace(/^(the|a|an) /, '');
            
            // Add domain extensions if missing
            if (!url.includes('.') && !url.startsWith('http')) {
                // Try to add the most likely extension
                if (url === 'google') url = 'google.com';
                else if (url === 'youtube') url = 'youtube.com';
                else if (url === 'facebook') url = 'facebook.com';
                else if (url === 'twitter' || url === 'x') url = 'twitter.com';
                else if (url === 'instagram') url = 'instagram.com';
                else if (url === 'linkedin') url = 'linkedin.com';
                else if (url === 'reddit') url = 'reddit.com';
                else if (url === 'amazon') url = 'amazon.com';
                else if (url === 'netflix') url = 'netflix.com';
                else if (url === 'tiktok') url = 'tiktok.com';
                else if (url === 'twitch') url = 'twitch.tv';
                else url = url + '.com'; // Default to .com
            }
            
            // Prepend 'https://' if no protocol is specified
            if (!url.startsWith('http://') && !url.startsWith('https://')) {
                url = 'https://' + url;
            }
            
            // Validate the URL
            if (isValidUrl(url)) {
                try {
                    window.open(url, "_blank");
                    return `Opening ${websiteName} for you.`;
                } catch (error) {
                    console.error("Error opening URL:", error);
                    return `I encountered an error while opening ${websiteName}. Please try again later.`;
                }
            } else {
                // If URL is invalid, try searching for it
                try {
                    const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(websiteName)}`;
                    window.open(searchUrl, "_blank");
                    return `I couldn't recognize "${websiteName}" as a valid website URL, so I've searched for it on Google instead.`;
                } catch (error) {
                    console.error("Error searching:", error);
                    return `I encountered an error while searching for ${websiteName}. Please try again.`;
                }
            }
        }
        
        return null;
    }, []);

    const processCommand = useCallback(async (text) => {
        const lowercaseText = text.toLowerCase();

        // Try to open an application first
        const appResponse = await openApplication(lowercaseText, text);
        if (appResponse) return appResponse;

        // Then try to open a website if app opening didn't match
        const websiteResponse = await openWebsite(lowercaseText, text);
        if (websiteResponse) return websiteResponse;

        // Time related commands
        if (/(what time|current time)/.test(lowercaseText)) {
            const now = new Date();
            return `The current time is ${now.toLocaleTimeString()}.`;
        }

        // Date related commands
        if (/(what date|what day|current date)/.test(lowercaseText)) {
            const now = new Date();
            return `Today is ${now.toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' })}.`;
        }

        // Search commands
        if (lowercaseText.startsWith("search for") || lowercaseText.startsWith("search")) {
            const searchQuery = text.replace(/^search\s*(for\s*)?/i, '').trim();
            window.open(`https://www.google.com/search?q=${encodeURIComponent(searchQuery)}`, "_blank");
            return `Searching for "${searchQuery}" on Google.`;
        }

        // YouTube search
        if (lowercaseText.startsWith("play") || lowercaseText.includes("on youtube")) {
            const searchQuery = text.replace(/^play\s*/i, '').replace(/\s*on youtube\s*$/i, '').trim();
            window.open(`https://www.youtube.com/results?search_query=${encodeURIComponent(searchQuery)}`, "_blank");
            return `Searching for "${searchQuery}" on YouTube.`;
        }

        // Email command
        if (lowercaseText.includes("send email") || lowercaseText.includes("write email") || lowercaseText.includes("compose email")) {
            window.open("mailto:", "_blank");
            return "Opening your default email client.";
        }

        return null;
    }, [openWebsite, openApplication]);

    const aiResponse = useCallback(async (promptText) => {
        try {
            setPrompt("Thinking...");

            // Check if it's a name question first
            let nameResponse = processNameQuestion(promptText);

            // If it's a creation question, replace the response with "Sumit Prasad"
            if (/(who (made|created) you|who is your creator|who developed you|who built you)/.test(promptText.toLowerCase())) {
                nameResponse = "I was developed by sonu kumar. The 1st year student of computer science and engineering from vellore institute of technology bhopal university";
            }

            if (nameResponse) {
                setPrompt(nameResponse);
                await speak(nameResponse);
                return;
            }

            // Check for commands
            const commandResponse = await processCommand(promptText);
            if (commandResponse) {
                setPrompt(commandResponse);
                await speak(commandResponse);
                return;
            }

            // Otherwise, proceed with Gemini API
            let text = await run(promptText);
           // After getting a response from Gemini, check for creation questions again
            if (/(who (made|created) you|who is your creator|who developed you|who built you)/.test(promptText.toLowerCase())) {
                text = "I was developed by sonu kumar an 1st year student of computer science and engineering from vit bhopal university."; // Replace Gemini output
            }
            setPrompt(text);
            await speak(text);

        } catch (error) {
            console.error("Error:", error);
            const errorMessage = "I apologize, but I encountered an error. Please try again.";
            setPrompt(errorMessage);
            await speak(errorMessage);
        }
    }, [speak, processNameQuestion, processCommand]);

    // Initialize speech recognition
    useEffect(() => {
        const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
        recognitionRef.current = new SpeechRecognition();

        recognitionRef.current.continuous = false;
        recognitionRef.current.interimResults = false;
        recognitionRef.current.lang = 'en-US';

        recognitionRef.current.onstart = () => {
            setIsListening(true);
            setPrompt("Listening...");
        };

        recognitionRef.current.onresult = (e) => {
            const transcript = e.results[0][0].transcript;
            console.log("Recognized:", transcript);
            setIsListening(false);
            aiResponse(transcript);
        };

        recognitionRef.current.onend = () => {
            setIsListening(false);
        };

        recognitionRef.current.onerror = (event) => {
            console.error("Recognition error:", event.error);
            setIsListening(false);
            const errorMessage = "I couldn't hear you clearly. Please try again.";
            setPrompt(errorMessage);
            speak(errorMessage);
        };

        // Cleanup on unmount
        return () => {
            if (recognitionRef.current) {
                recognitionRef.current.abort();
            }
            window.speechSynthesis.cancel();
        };
    }, [aiResponse, speak]);

    const startListening = useCallback(() => {
        window.speechSynthesis.cancel();
        setSpeaking(false);

        try {
            recognitionRef.current.abort();
            recognitionRef.current.start();
        } catch (error) {
            console.error("Error starting recognition:", error);
        }
    }, []);

    const value = {
        speak,
        startListening,
        stopListening,
        prompt,
        speaking,
        isListening,
        darkMode,
        toggleDarkMode
    };

    return (
        <datacontext.Provider value={value}>
            {children}
        </datacontext.Provider>
    );
}

export default UserContext;