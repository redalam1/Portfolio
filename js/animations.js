// ===================================
// Advanced Animations
// ===================================

// Intersection Observer for scroll animations
const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const animationObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            
            // Add stagger effect for children
            const children = entry.target.querySelectorAll('.stagger-item');
            children.forEach((child, index) => {
                setTimeout(() => {
                    child.classList.add('visible');
                }, index * 100);
            });
        }
    });
}, observerOptions);

// Observe elements when DOM is loaded
document.addEventListener('DOMContentLoaded', () => {
    // Animate section headers
    document.querySelectorAll('.section-header').forEach(header => {
        header.classList.add('fade-in');
        animationObserver.observe(header);
    });
    
    // Animate about content
    const aboutImage = document.querySelector('.about-image');
    const aboutText = document.querySelector('.about-text');
    if (aboutImage) {
        aboutImage.classList.add('slide-in-left');
        animationObserver.observe(aboutImage);
    }
    if (aboutText) {
        aboutText.classList.add('slide-in-right');
        animationObserver.observe(aboutText);
    }
    
    // Animate skill categories with stagger
    document.querySelectorAll('.skill-category').forEach((category, index) => {
        category.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Animate timeline items alternately
    document.querySelectorAll('.timeline-item').forEach((item, index) => {
        const content = item.querySelector('.timeline-content');
        if (content) {
            if (index % 2 === 0) {
                content.classList.add('slide-in-right');
            } else {
                content.classList.add('slide-in-left');
            }
            animationObserver.observe(content);
        }
    });
    
    // Animate project cards
    document.querySelectorAll('.project-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.15}s`;
    });
    
    // Animate education cards
    document.querySelectorAll('.education-card').forEach((card, index) => {
        card.style.animationDelay = `${index * 0.1}s`;
    });
    
    // Parallax effect for hero shapes
    initParallax();
    
    // Animate on scroll
    window.addEventListener('scroll', handleScroll);
});

// ===================================
// Parallax Effect
// ===================================

function initParallax() {
    const shapes = document.querySelectorAll('.hero-shape');
    
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        
        shapes.forEach((shape, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            shape.style.transform = `translateY(${yPos}px)`;
        });
    });
}

// ===================================
// Scroll Progress Indicator
// ===================================

function handleScroll() {
    // Calculate scroll progress
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
    
    // You can add a progress bar if needed
    // document.getElementById('progressBar').style.width = scrolled + '%';
}

// ===================================
// Hover Effects for Cards
// ===================================

/*document.addEventListener('DOMContentLoaded', () => {
    // Add tilt effect to cards
    const cards = document.querySelectorAll('.experience-card, .project-card, .education-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', handleCardTilt);
        card.addEventListener('mouseleave', resetCardTilt);
    });
});*/

function handleCardTilt(e) {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    const centerX = rect.width / 2;
    const centerY = rect.height / 2;
    
    const rotateX = (y - centerY) / 20;
    const rotateY = (centerX - x) / 20;
    
    card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
}

function resetCardTilt(e) {
    const card = e.currentTarget;
    card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale(1)';
}

// ===================================
// Skill Badge Animation
// ===================================

document.addEventListener('DOMContentLoaded', () => {
    const skillBadges = document.querySelectorAll('.skill-badge');
    
    skillBadges.forEach((badge, index) => {
        badge.style.opacity = '0';
        badge.style.transform = 'translateY(20px)';
        
        setTimeout(() => {
            badge.style.transition = 'all 0.3s ease';
            badge.style.opacity = '1';
            badge.style.transform = 'translateY(0)';
        }, index * 50);
    });
});

// ===================================
// Text Reveal Animation
// ===================================

function revealText(element) {
    const text = element.textContent;
    element.textContent = '';
    element.style.opacity = '1';
    
    let index = 0;
    const interval = setInterval(() => {
        if (index < text.length) {
            element.textContent += text[index];
            index++;
        } else {
            clearInterval(interval);
        }
    }, 30);
}

// ===================================
// Number Counter Animation
// ===================================

function animateValue(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        const value = Math.floor(progress * (end - start) + start);
        element.textContent = value + (element.dataset.suffix || '');
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// ===================================
// Smooth Reveal on Scroll
// ===================================

const revealElements = document.querySelectorAll('.reveal-on-scroll');

const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
            revealObserver.unobserve(entry.target);
        }
    });
}, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
});

revealElements.forEach(element => {
    revealObserver.observe(element);
});

// ===================================
// Cursor Trail Effect (Optional)
// ===================================

let cursorTrail = [];
const trailLength = 10;

document.addEventListener('mousemove', (e) => {
    cursorTrail.push({ x: e.clientX, y: e.clientY });
    
    if (cursorTrail.length > trailLength) {
        cursorTrail.shift();
    }
});

// ===================================
// Page Load Animation
// ===================================

window.addEventListener('load', () => {
    document.body.classList.add('loaded');
    
    // Animate hero content
    const heroElements = document.querySelectorAll('.hero-badge, .hero-title, .hero-subtitle, .hero-description, .hero-buttons, .hero-stats');
    heroElements.forEach((element, index) => {
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 150);
    });
});

// ===================================
// Scroll-triggered Animations
// ===================================

const scrollTriggers = document.querySelectorAll('[data-scroll]');

scrollTriggers.forEach(trigger => {
    const animation = trigger.dataset.scroll;
    trigger.classList.add('scroll-hidden');
    
    const triggerObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add(`scroll-${animation}`);
                entry.target.classList.remove('scroll-hidden');
                triggerObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.2 });
    
    triggerObserver.observe(trigger);
});

// ===================================
// Button Ripple Effect
// ===================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add ripple styles dynamically
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: ripple-animation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

// ===================================
// Magnetic Button Effect
// ===================================

document.querySelectorAll('.btn-primary').forEach(button => {
    button.addEventListener('mousemove', (e) => {
        const rect = button.getBoundingClientRect();
        const x = e.clientX - rect.left - rect.width / 2;
        const y = e.clientY - rect.top - rect.height / 2;
        
        button.style.transform = `translate(${x * 0.1}px, ${y * 0.1}px)`;
    });
    
    button.addEventListener('mouseleave', () => {
        button.style.transform = 'translate(0, 0)';
    });
});
