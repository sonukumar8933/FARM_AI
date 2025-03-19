// Initialize AOS (Animate On Scroll)
document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
});

// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Navbar scroll effect
window.addEventListener('scroll', function() {
    const nav = document.querySelector('nav');
    if (window.scrollY > 50) {
        nav.classList.add('nav-scrolled');
    } else {
        nav.classList.remove('nav-scrolled');
    }
});

// Mobile menu toggle
const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', function() {
    this.classList.toggle('active');
    navLinks.classList.toggle('active');
});

// Services tabs
const tabs = document.querySelectorAll('.tab');
const tabContents = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
    tab.addEventListener('click', () => {
        // Remove active class from all tabs
        tabs.forEach(t => t.classList.remove('active'));
        // Add active class to clicked tab
        tab.classList.add('active');
        
        // Hide all tab contents
        tabContents.forEach(content => content.classList.remove('active'));
        // Show corresponding content
        const tabId = tab.getAttribute('data-tab');
        document.getElementById(tabId).classList.add('active');
    });
});

// Video modal
const videoModal = document.getElementById('videoModal');
const watchDemo = document.getElementById('watchDemo');
const closeModal = document.querySelector('.close-modal');
const modalIframe = document.querySelector('.modal-content iframe');

watchDemo.addEventListener('click', () => {
    videoModal.style.display = 'flex';
    modalIframe.src = './videos/demo.mp4'; // Update with your video path
});

closeModal.addEventListener('click', () => {
    videoModal.style.display = 'none';
    modalIframe.src = '';
});

window.addEventListener('click', (e) => {
    if (e.target === videoModal) {
        videoModal.style.display = 'none';
        modalIframe.src = '';
    }
});

// Form submission handling
const contactForm = document.querySelector('.contact-form');
contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for your message! We will get back to you soon.');
    this.reset();
});

// Newsletter form handling
const newsletterForm = document.querySelector('.newsletter-form');
newsletterForm.addEventListener('submit', function(e) {
    e.preventDefault();
    alert('Thank you for subscribing to our newsletter!');
    this.reset();
});

// Cookie consent
const cookieConsent = document.querySelector('.cookie-consent');
const acceptCookies = document.querySelector('.accept-cookies');

if (!localStorage.getItem('cookiesAccepted')) {
    setTimeout(() => {
        cookieConsent.classList.add('show');
    }, 2000);
}

acceptCookies.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieConsent.classList.remove('show');
});

// Loading animation
const loader = document.querySelector('.loader');
window.addEventListener('load', () => {
    setTimeout(() => {
        loader.style.opacity = '0';
        setTimeout(() => {
            loader.style.display = 'none';
        }, 300);
    }, 500);
});

// Testimonials slider
const testimonials = [
    {
        image: './images/farmer1.jpg',
        text: "Farm AI has completely transformed how I manage my farm. The AI recommendations have helped me increase my yield by 40%!",
        name: "John Smith",
        role: "Wheat Farmer, Kansas"
    },
    {
        image: './images/farmer2.jpg',
        text: "The pest detection feature saved my entire crop last season. This is a game-changer for modern farming.",
        name: "Sarah Johnson",
        role: "Organic Farmer, California"
    },
    {
        image: './images/farmer3.jpg',
        text: "The market insights help me get the best prices for my produce. My profits have increased significantly.",
        name: "Michael Chen",
        role: "Rice Farmer, Texas"
    }
];

let currentTestimonial = 0;

function updateTestimonials() {
    const slider = document.querySelector('.testimonials-slider');
    const dots = document.querySelector('.testimonial-dots');
    
    slider.innerHTML = '';
    dots.innerHTML = '';
    
    testimonials.forEach((testimonial, index) => {
        const testimonialElement = document.createElement('div');
        testimonialElement.className = `testimonial ${index === currentTestimonial ? 'active' : ''}`;
        testimonialElement.innerHTML = `
            <div class="testimonial-image">
                <img src="${testimonial.image}" alt="${testimonial.name}" loading="lazy">
            </div>
            <div class="testimonial-content">
                <p>${testimonial.text}</p>
                <h4>${testimonial.name}</h4>
                <span>${testimonial.role}</span>
            </div>
        `;
        slider.appendChild(testimonialElement);
        
        const dot = document.createElement('span');
        dot.className = `dot ${index === currentTestimonial ? 'active' : ''}`;
        dot.addEventListener('click', () => {
            currentTestimonial = index;
            updateTestimonials();
        });
        dots.appendChild(dot);
    });
}

// Initialize testimonials
document.addEventListener('DOMContentLoaded', () => {
    updateTestimonials();
    
    // Auto-advance testimonials
    setInterval(() => {
        currentTestimonial = (currentTestimonial + 1) % testimonials.length;
        updateTestimonials();
    }, 5000);
});

// Statistics animation
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate statistics when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const numbers = entry.target.querySelectorAll('.number');
            numbers.forEach(number => {
                const finalValue = parseInt(number.textContent);
                animateValue(number, 0, finalValue, 2000);
            });
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.hero-stats').forEach(stat => {
    statsObserver.observe(stat);
});

// Get Started button action
document.querySelector('.get-started').addEventListener('click', function() {
    document.querySelector('#contact').scrollIntoView({ behavior: 'smooth' });
});

// Animation for feature cards
const observerOptions = {
    threshold: 0.5
};

const observer = new IntersectionObserver(function(entries, observer) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card').forEach(card => {
    card.style.opacity = '0';
    card.style.transform = 'translateY(20px)';
    card.style.transition = 'all 0.5s ease-out';
    observer.observe(card);
});

// Statistics counter animation
function animateValue(obj, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        obj.innerHTML = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Animate statistics when they come into view
const statsObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            const statValue = entry.target.querySelector('h3');
            const finalValue = parseInt(statValue.textContent);
            animateValue(statValue, 0, finalValue, 2000);
            statsObserver.unobserve(entry.target);
        }
    });
}, { threshold: 0.5 });

document.querySelectorAll('.stat-item').forEach(stat => {
    statsObserver.observe(stat);
});
