const container = document.querySelector('.container');
const registerBtn = document.querySelector('.register-btn');
const loginBtn = document.querySelector('.login-btn');

registerBtn.addEventListener('click', () => {
    container.classList.add('active');
})

loginBtn.addEventListener('click', () => {
    container.classList.remove('active');
})

// Check if Boxicons has loaded properly
document.addEventListener('DOMContentLoaded', () => {
    // Function to check if an element has CSS loaded for a specific class
    function isIconRendered(element) {
        const style = getComputedStyle(element);
        // If the element has the 'content' property set via CSS (:before), 
        // then Boxicons is working
        return style.getPropertyValue('content') !== 'none' && 
               style.getPropertyValue('content') !== '';
    }
    
    // Wait a moment for CSS to load and apply
    setTimeout(() => {
        // Get all the social icons
        const socialIcons = document.querySelectorAll('.social-icons i');
        const firstIcon = socialIcons[0];
        
        // If the first icon isn't rendered properly, add a fallback class
        if (firstIcon && !isIconRendered(firstIcon)) {
            document.body.classList.add('boxicons-failed');
            
            // Apply fallback styling
            const style = document.createElement('style');
            style.textContent = `
                .boxicons-failed .social-icons a i::after {
                    display: inline !important;
                }
                .boxicons-failed .social-icons a i:before {
                    display: none !important;
                }
            `;
            document.head.appendChild(style);
        }
    }, 500); // Wait 500ms to check
});