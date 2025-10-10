// Preloader
window.addEventListener('load', function () {
    const preloader = document.getElementById('preloader');
    if (preloader) {
        setTimeout(() => {
            preloader.classList.add('hide');
            document.body.classList.remove('no-scroll');
        }, 1000);
    }
});

// Navbar scroll effect with smooth transition
let lastScrollTop = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', function () {
    const scrollTop = window.pageYOffset || document.documentElement.scrollTop;

    // Add/remove scrolled class based on scroll position
    if (scrollTop > 50) {
        navbar.classList.add('scrolled');

        // Hide/show navbar on scroll
        if (scrollTop > lastScrollTop && scrollTop > 200) {
            // Scrolling down
            navbar.style.transform = 'translateY(-100%)';
        } else {
            // Scrolling up
            navbar.style.transform = 'translateY(0)';
        }
    } else {
        navbar.classList.remove('scrolled');
        navbar.style.transform = 'translateY(0)';
    }

    lastScrollTop = scrollTop;
});

// Add active class to current nav link
const sections = document.querySelectorAll('section[id]');

function highlightNav() {
    if (!sections.length) return;

    const scrollY = window.pageYOffset;

    sections.forEach(current => {
        const sectionHeight = current.offsetHeight;
        const sectionTop = current.offsetTop - 100;
        const sectionId = current.getAttribute('id');

        const navLink = document.querySelector(`.nav-link[href*="${sectionId}"]`);
        if (!navLink) return;

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            navLink.classList.add('active');
        } else {
            navLink.classList.remove('active');
        }
    });
}
window.addEventListener('scroll', highlightNav);

// Smooth scrolling for anchor links with offset and active state
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#' || targetId === '#!') return true;

        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            e.preventDefault();

            // Get the header height with a small offset
            const headerHeight = document.querySelector('.navbar').offsetHeight + 20;
            const elementPosition = targetElement.getBoundingClientRect().top;
            const offsetPosition = elementPosition + window.pageYOffset - headerHeight;

            // Use smooth scrolling if supported
            try {
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            } catch (e) {
                // Fallback for browsers that don't support smooth scrolling
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'auto'
                });
            }

            // Update URL without adding to history
            if (history.pushState) {
                history.pushState(null, null, targetId);
            } else {
                window.location.hash = targetId;
                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });

                // Close mobile menu if open
                const navbarToggler = document.querySelector('.navbar-toggler');
                if (navbarToggler && !navbarToggler.classList.contains('collapsed')) {
                    navbarToggler.click();
                }

                // Update URL without page jump
                history.pushState(null, null, targetId);
            }
        }
    });
});

// Add ripple effect to buttons
function createRipple(event) {
    const button = event.currentTarget;
    const circle = document.createElement('span');
    const diameter = Math.max(button.clientWidth, button.clientHeight);
    const radius = diameter / 2;

    circle.style.width = circle.style.height = `${diameter}px`;
    circle.style.left = `${event.clientX - button.getBoundingClientRect().left - radius}px`;
    circle.style.top = `${event.clientY - button.getBoundingClientRect().top - radius}px`;
    circle.classList.add('ripple');

    const ripple = button.getElementsByClassName('ripple')[0];
    if (ripple) {
        ripple.remove();
    }

    button.appendChild(circle);
}

// Add ripple effect to all buttons with .btn class
document.addEventListener('DOMContentLoaded', () => {
    const buttons = document.querySelectorAll('.btn');
    if (buttons.length) {
        buttons.forEach(button => {
            button.addEventListener('click', createRipple);
        });
    }
});

// Enhanced Animation on Scroll with Intersection Observer
const animateOnScroll = () => {
    const elements = document.querySelectorAll('.animate-on-scroll');

    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.15
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    elements.forEach(element => {
        observer.observe(element);
    });
};

// Initialize animations
window.addEventListener('DOMContentLoaded', () => {
    // Add animation class to elements that should animate on scroll
    const sections = document.querySelectorAll('section');
    sections.forEach(section => {
        const elements = section.querySelectorAll('h2, h3, h4, p, .feature-card, .card, img, .btn, .feature-box, .testimonial-card');
        elements.forEach((element, index) => {
            if (!element.classList.contains('no-animate')) {
                element.classList.add('animate-on-scroll');
                element.style.animationDelay = `${index * 0.1}s`;
            }
        });
    });

    // Initialize animations
    animateOnScroll();

    // Add hover effect to feature boxes
    const featureBoxes = document.querySelectorAll('.feature-box, .card, .testimonial-card');
    featureBoxes.forEach(box => {
        box.addEventListener('mousemove', (e) => {
            const rect = box.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            box.style.setProperty('--mouse-x', `${x}px`);
            box.style.setProperty('--mouse-y', `${y}px`);
        });
    });
});

// Parallax effect for hero section
function parallaxEffect() {
    const hero = document.querySelector('.hero');
    if (hero) {
        const scrollPosition = window.pageYOffset;
        hero.style.backgroundPositionY = scrollPosition * 0.5 + 'px';
    }
}

window.addEventListener('scroll', parallaxEffect);

// Initialize AOS (Animate On Scroll)
if (typeof AOS !== 'undefined') {
    AOS.init({
        duration: 800,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    });
}

// Enhanced Back to Top Button with Progress Circle
const backToTopButton = document.createElement('button');
backToTopButton.innerHTML = '<i class="fas fa-arrow-up"></i>';
backToTopButton.className = 'back-to-top';
backToTopButton.setAttribute('aria-label', 'Back to top');
document.body.appendChild(backToTopButton);

// Create progress circle
const progressCircle = document.createElement('div');
progressCircle.className = 'progress-circle';
backToTopButton.appendChild(progressCircle);

// Add styles for back to top button and progress circle
const style = document.createElement('style');
style.textContent = `
    .back-to-top {
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 56px;
        height: 56px;
        border-radius: 50% !important;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 20px;
        opacity: 0;
        visibility: hidden;
        transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
        z-index: 999;
        background: var(--gradient);
        color: white;
        border: none;
        cursor: pointer;
        box-shadow: 0 5px 20px rgba(0, 0, 0, 0.15);
        transform: translateY(20px);
    }
    
    .back-to-top.visible {
        opacity: 1;
        visibility: visible;
        transform: translateY(0);
    }
    
    .back-to-top:hover {
        transform: translateY(-5px) !important;
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.2);
    }
    
    .progress-circle {
        position: absolute;
        top: -4px;
        left: -4px;
        width: calc(100% + 8px);
        height: calc(100% + 8px);
        border-radius: 50%;
        background: conic-gradient(var(--primary) 0%, var(--secondary) 0%);
        -webkit-mask: radial-gradient(transparent 60%, #000 60%);
        mask: radial-gradient(transparent 60%, #000 60%);
        pointer-events: none;
        z-index: -1;
        transition: all 0.3s ease;
    }
    
    .back-to-top i {
        transition: transform 0.3s ease;
    }
    
    .back-to-top:hover i {
        transform: translateY(-3px);
    }
`;
document.head.appendChild(style);

// Show/hide back to top button with progress
window.addEventListener('scroll', () => {
    const scrollPosition = window.pageYOffset;
    const windowHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = (scrollPosition / windowHeight) * 100;

    // Update progress circle
    progressCircle.style.background = `conic-gradient(var(--primary) ${scrollPercentage}%, var(--secondary) ${scrollPercentage}% 100%)`;

    // Toggle visibility
    if (scrollPosition > 300) {
        backToTopButton.classList.add('visible');
    } else {
        backToTopButton.classList.remove('visible');
    }
});

// Smooth scroll to top with easing
backToTopButton.addEventListener('click', (e) => {
    e.preventDefault();

    const startPosition = window.pageYOffset;
    const targetPosition = 0;
    const distance = targetPosition - startPosition;
    const duration = 1000;
    let start = null;

    function step(timestamp) {
        if (!start) start = timestamp;
        const progress = timestamp - start;
        const percentage = Math.min(progress / duration, 1);

        // Easing function (easeInOutCubic)
        const easeInOutCubic = t => t < 0.5
            ? 4 * t * t * t
            : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

        window.scrollTo(0, startPosition + distance * easeInOutCubic(percentage));

        if (progress < duration) {
            window.requestAnimationFrame(step);
        }
    }

    window.requestAnimationFrame(step);
});

// Initialize tooltips with custom styling
const tooltipTriggerList = [].slice.call(document.querySelectorAll('[data-bs-toggle="tooltip"]'));
const tooltipList = tooltipTriggerList.map(function (tooltipTriggerEl) {
    return new bootstrap.Tooltip(tooltipTriggerEl, {
        animation: true,
        placement: 'top',
        trigger: 'hover focus',
        customClass: 'custom-tooltip',
        delay: {
            show: 300,
            hide: 100
        }
    });
});

// Add custom tooltip styles
const tooltipStyle = document.createElement('style');
tooltipStyle.textContent = `
    .custom-tooltip .tooltip-inner {
        background-color: var(--dark);
        color: white;
        padding: 8px 12px;
        font-size: 14px;
        border-radius: 6px;
        box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
    }
    
    .custom-tooltip.bs-tooltip-auto[x-placement^=top] .tooltip-arrow::before,
    .custom-tooltip.bs-tooltip-top .tooltip-arrow::before {
        border-top-color: var(--dark);
    }
    
    .custom-tooltip.bs-tooltip-auto[x-placement^=bottom] .tooltip-arrow::before,
    .custom-tooltip.bs-tooltip-bottom .tooltip-arrow::before {
        border-bottom-color: var(--dark);
    }
    
    .custom-tooltip.bs-tooltip-auto[x-placement^=left] .tooltip-arrow::before,
    .custom-tooltip.bs-tooltip-left .tooltip-arrow::before {
        border-left-color: var(--dark);
    }
    
    .custom-tooltip.bs-tooltip-auto[x-placement^=right] .tooltip-arrow::before,
    .custom-tooltip.bs-tooltip-right .tooltip-arrow::before {
        border-right-color: var(--dark);
    }
`;
document.head.appendChild(tooltipStyle);

// Add scroll reveal animations
const scrollReveal = ScrollReveal({
    origin: 'bottom',
    distance: '60px',
    duration: 1000,
    delay: 200,
    reset: false,
    mobile: true
});

// Reveal elements
scrollReveal.reveal('.feature-box', { interval: 200 });
scrollReveal.reveal('.testimonial-card', { interval: 200 });
scrollReveal.reveal('.card', { interval: 200 });
scrollReveal.reveal('section h2, section h3', {
    delay: 200,
    origin: 'left',
    distance: '50px'
});

// Initialize counter animation for stats
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    const speed = 200;

    counters.forEach(counter => {
        const target = +counter.getAttribute('data-target');
        const count = +counter.innerText;
        const increment = target / speed;

        if (count < target) {
            counter.innerText = Math.ceil(count + increment);
            setTimeout(animateCounters, 10);
        } else {
            counter.innerText = target.toLocaleString();
        }
    });
}

// Start counter animation when in viewport
const counterSection = document.querySelector('.counter-section');
if (counterSection) {
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    observer.observe(counterSection);
}

// Add smooth hover effect to all interactive elements
const interactiveElements = document.querySelectorAll('a, button, .btn, .card, .feature-box, .testimonial-card');
interactiveElements.forEach(element => {
    element.style.transition = 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)';

    element.addEventListener('mouseenter', () => {
        element.style.transform = 'translateY(-5px)';
        element.style.boxShadow = '0 10px 20px rgba(0, 0, 0, 0.1)';
    });

    element.addEventListener('mouseleave', () => {
        element.style.transform = 'translateY(0)';
        element.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.05)';
    });
});

// Add loading animation to buttons with loading state
document.querySelectorAll('.btn-loading').forEach(button => {
    button.addEventListener('click', function () {
        this.classList.add('loading');
        this.setAttribute('disabled', 'disabled');

        // Simulate loading (replace with actual async operation)
        setTimeout(() => {
            this.classList.remove('loading');
            this.removeAttribute('disabled');
        }, 2000);
    });
});

// Add parallax effect to elements with data-parallax attribute
document.addEventListener('mousemove', (e) => {
    const parallaxElements = document.querySelectorAll('[data-parallax]');

    parallaxElements.forEach(element => {
        const speed = parseFloat(element.getAttribute('data-parallax')) || 0.1;
        const x = (window.innerWidth - e.pageX * speed) / 100;
        const y = (window.innerHeight - e.pageY * speed) / 100;

        element.style.transform = `translateX(${x}px) translateY(${y}px)`;
    });
});
