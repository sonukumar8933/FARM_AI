// Farm AI Chatbot Implementation

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

    // Predefined responses based on keywords
    const responses = {
        'hello': 'Hello! How can I help you with your farming needs today?',
        'hi': 'Hi there! How can I assist you with your agricultural questions?',
        'help': 'I can help with pest detection, crop management, irrigation solutions, weather forecasts, and more. What specific area are you interested in?',
        'pest': 'Our AI-Based Pest & Disease Detection system can identify crop issues from images with 95% accuracy. Would you like more information about this service?',
        'disease': 'Our disease detection system can identify over 50 common crop diseases and suggest appropriate treatments. Would you like to learn more?',
        'irrigation': 'Our precision irrigation system can reduce water usage by up to 30% while improving yields. Would you like me to explain how it works?',
        'soil': 'Our soil health monitoring solution provides real-time analysis of nutrient levels, pH, and moisture. Would you like more details?',
        'weather': 'Our weather intelligence system provides hyperlocal forecasts and early warnings for adverse conditions that might affect your crops.',
        'price': 'Our pricing depends on farm size and selected features. Would you like me to connect you with a sales representative for a custom quote?',
        'demo': 'We offer free demonstrations of our technology. Would you like to schedule one? You can also fill out the contact form on our website.',
        'contact': 'You can reach our team at sonuk.gupta81@gmail.com or +91 8109246603. Would you like me to connect you with a specific department?',
        'thanks': 'You\'re welcome! Feel free to reach out if you have any other questions.',
        'thank you': 'You\'re welcome! Is there anything else I can help you with?'
    };

    // Fallback response when no keyword match is found
    const fallbackResponses = [
        "I'm not sure I understand. Could you rephrase your question?",
        "Let me connect you with our agriculture experts. Please call +91 8109246603 or email us at sonuk.gupta81@gmail.com.",
        "That's an interesting question. Our team would be happy to provide more information. Would you like to schedule a call?",
        "Our Smart Farm AI solutions cover many aspects of agriculture. Could you specify which area you're interested in?",
        "I'd be happy to help with that. Could you provide more details about your farming needs?"
    ];

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

    // Get bot response based on user input
    function getBotResponse(userInput) {
        userInput = userInput.toLowerCase().trim();
        
        // Check for keyword matches
        for (const [keyword, response] of Object.entries(responses)) {
            if (userInput.includes(keyword)) {
                return response;
            }
        }
        
        // If no match, return random fallback response
        return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
    }

    // Handle sending a message
    function sendMessage() {
        const userMessage = chatInput.value.trim();
        
        if (userMessage) {
            // Add user message to chat
            addMessage(userMessage, true);
            
            // Clear input
            chatInput.value = '';
            chatInput.style.height = 'auto';
            
            // Show typing indicator
            const typingIndicator = showTypingIndicator();
            
            // Simulate processing time (0.5 to 1.5 seconds)
            const responseTime = Math.floor(Math.random() * 1000) + 500;
            
            // Get and display bot response after delay
            setTimeout(() => {
                removeTypingIndicator();
                const botResponse = getBotResponse(userMessage);
                addMessage(botResponse, false);
            }, responseTime);
        }
    }

    // Initialize the chat functionality
    initChat();
}); 