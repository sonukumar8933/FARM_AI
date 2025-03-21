// Farm AI Chatbot Implementation with Google Gemini API

document.addEventListener('DOMContentLoaded', function() {
    // DOM Elements
    const chatToggle = document.getElementById('chat-toggle');
    const chatContainer = document.getElementById('chat-container');
    const closeChat = document.getElementById('close-chat');
    const messagesContainer = document.getElementById('messages-container');
    const chatInput = document.getElementById('chat-input');
    const sendButton = document.getElementById('send-button');

    // Chat state
    let chatOpen = false;
    
    // Welcome message
    const welcomeMessage = 'Hello! I\'m your Farm AI Assistant. How can I help you with your farming needs today?';

    // Initialize chat
    function initChat() {
        // Toggle chat visibility
        chatToggle.addEventListener('click', toggleChat);
        closeChat.addEventListener('click', toggleChat);

        // Send message on button click
        sendButton.addEventListener('click', sendMessage);

        // Send message on Enter key (but allow Shift+Enter for new line)
        chatInput.addEventListener('keydown', function(e) {
            if (e.key === 'Enter' && !e.shiftKey) {
                e.preventDefault();
                sendMessage();
            }
        });

        // Auto-resize textarea as user types
        chatInput.addEventListener('input', function() {
            this.style.height = 'auto';
            this.style.height = (this.scrollHeight) + 'px';
            // Limit to 5 rows max
            if (this.scrollHeight > 150) {
                this.style.height = '150px';
                this.style.overflowY = 'auto';
            } else {
                this.style.overflowY = 'hidden';
            }
        });
    }

    // Toggle chat visibility
    function toggleChat() {
        chatOpen = !chatOpen;
        chatContainer.style.display = chatOpen ? 'flex' : 'none';
        
        // Focus on input when chat is opened
        if (chatOpen) {
            chatInput.focus();
            // Scroll to bottom of messages
            messagesContainer.scrollTop = messagesContainer.scrollHeight;
        }
    }

    // Add a message to the chat
    function addMessage(content, isUser = false) {
        const messageDiv = document.createElement('div');
        messageDiv.classList.add('message', isUser ? 'user' : 'bot');
        
        const messageContent = document.createElement('div');
        messageContent.classList.add('message-content');
        messageContent.textContent = content;
        
        messageDiv.appendChild(messageContent);
        messagesContainer.appendChild(messageDiv);
        
        // Apply animation dynamically
        setTimeout(() => {
            messageDiv.style.opacity = '1';
        }, 10);
        
        // Scroll to the new message
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
    }

    // Show typing indicator
    function showTypingIndicator() {
        const typingDiv = document.createElement('div');
        typingDiv.classList.add('message', 'bot', 'typing-indicator-message');
        
        const typingContent = document.createElement('div');
        typingContent.classList.add('message-content');
        
        const typingIndicator = document.createElement('div');
        typingIndicator.classList.add('typing-indicator');
        
        for (let i = 0; i < 3; i++) {
            const dot = document.createElement('span');
            typingIndicator.appendChild(dot);
        }
        
        typingContent.appendChild(typingIndicator);
        typingDiv.appendChild(typingContent);
        messagesContainer.appendChild(typingDiv);
        
        messagesContainer.scrollTop = messagesContainer.scrollHeight;
        return typingDiv;
    }

    // Remove typing indicator
    function removeTypingIndicator() {
        const typingIndicator = document.querySelector('.typing-indicator-message');
        if (typingIndicator) {
            messagesContainer.removeChild(typingIndicator);
        }
    }

    // Get bot response using Google Gemini API
    async function getBotResponseFromAPI(userInput) {
        try {
            const response = await fetch("https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=AIzaSyBUWDjOwZdvuWUoGGKak5lJzhxBWMMi0m8", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify({
                    "contents": [{
                        "parts": [{
                            "text": `You are a smart farming assistant that helps farmers with their agricultural questions. 
                                    Provide helpful, accurate information about farming practices, pest control, irrigation, 
                                    crop management, soil health, and other farming topics. 
                                    Keep responses concise and targeted to farming needs.
                                    User query: ${userInput}`
                        }]
                    }]
                })
            });

            if (!response.ok) {
                throw new Error(`API request failed with status ${response.status}`);
            }

            const data = await response.json();
            return data?.candidates[0]?.content?.parts[0]?.text || "I'm sorry, I couldn't process your request at the moment. Please try again.";
        } catch (error) {
            console.error("Error fetching from Gemini API:", error);
            return "I'm experiencing technical difficulties. Please try again later or contact our support team at sonuk.gupta81@gmail.com.";
        }
    }

    // Handle sending a message
    async function sendMessage() {
        const userMessage = chatInput.value.trim();
        
        if (userMessage) {
            // Add user message to chat
            addMessage(userMessage, true);
            
            // Clear input
            chatInput.value = '';
            chatInput.style.height = 'auto';
            
            // Show typing indicator
            showTypingIndicator();
            
            try {
                // Get response from API
                const botResponse = await getBotResponseFromAPI(userMessage);
                
                // Remove typing indicator and add response
                removeTypingIndicator();
                addMessage(botResponse, false);
            } catch (error) {
                console.error("Error in sendMessage:", error);
                removeTypingIndicator();
                addMessage("Sorry, I encountered a problem. Please try again or contact support.", false);
            }
        }
    }

    // Initialize the chat functionality
    initChat();
}); 