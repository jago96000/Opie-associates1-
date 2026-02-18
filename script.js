
// Enhanced scroll animation with intersection observer
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-scroll');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.classList.add('animate-fadeInUp');
                }, index * 150); // Stagger delay
                observer.unobserve(entry.target);
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px'
    });

    elements.forEach((element, index) => {
        // Add delay classes based on position
        if (index % 3 === 1) element.classList.add('animate-delay-1');
        if (index % 3 === 2) element.classList.add('animate-delay-2');
        if (index % 5 === 0) element.classList.add('animate-float');
        
        observer.observe(element);
    });
};

// Initialize animations
document.addEventListener('DOMContentLoaded', animateOnScroll);
window.addEventListener('load', () => {
    // Trigger animations for elements already in view
    requestAnimationFrame(() => {
        animateOnScroll();
    });
});
// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
anchor.addEventListener('click', function (e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Dark mode toggle (if needed)
const darkModeToggle = document.getElementById('darkModeToggle');
if (darkModeToggle) {
    darkModeToggle.addEventListener('click', () => {
        document.documentElement.classList.toggle('dark');
        localStorage.setItem('darkMode', document.documentElement.classList.contains('dark'));
    });
}
// Check for saved dark mode preference
if (localStorage.getItem('darkMode') === 'true') {
    document.documentElement.classList.add('dark');
} else {
    document.documentElement.classList.remove('dark');
}

// Form validation for contact page
if (document.getElementById('contactForm')) {
    const form = document.getElementById('contactForm');
    
    form.addEventListener('submit', function(e) {
        const email = form.querySelector('#email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        
        if (!emailRegex.test(email.value)) {
            e.preventDefault();
            email.classList.add('border-red-500');
            alert('Please enter a valid email address');
        } else {
            email.classList.remove('border-red-500');
        }
    });
}
