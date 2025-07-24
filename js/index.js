document.addEventListener('DOMContentLoaded', () => {
    // Theme initialization
    function initTheme() {
        const themeToggle = document.getElementById('theme-toggle');
        if (!themeToggle) return;

        const prefersDarkScheme = window.matchMedia('(prefers-color-scheme: dark)');
        const currentTheme = localStorage.getItem('theme') || (prefersDarkScheme.matches ? 'dark' : 'light');
        
        document.documentElement.setAttribute('data-theme', currentTheme);
        updateThemeIcon(currentTheme);
        
        themeToggle.addEventListener('click', () => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            
            document.documentElement.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            updateThemeIcon(newTheme);
        });
    }

    function updateThemeIcon(theme) {
        const icon = document.querySelector('.theme-toggle i');
        if (icon) {
            icon.className = theme === 'light' ? 'fas fa-moon' : 'fas fa-sun';
        }
    }

    // Counter animation
    function initCounters() {
        const counters = document.querySelectorAll('.counter');
        
        counters.forEach(counter => {
            const target = parseInt(counter.getAttribute('data-target'));
            let current = 0;
            const increment = target / 50;
            
            const updateCounter = setInterval(() => {
                current += increment;
                
                if (current >= target) {
                    counter.textContent = target;
                    clearInterval(updateCounter);
                } else {
                    counter.textContent = Math.floor(current);
                }
            }, 40);
        });
    }

    // Testimonials slider
    function initTestimonials() {
        const cards = document.querySelectorAll('.testimonial-card');
        if (!cards.length) return;

        let current = 0;
        
        setInterval(() => {
            cards[current].classList.remove('active');
            current = (current + 1) % cards.length;
            cards[current].classList.add('active');
        }, 5000);
    }

    // Card animations on scroll
    const cards = document.querySelectorAll('.service-card, .pricing-card');
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, { threshold: 0.1 });

    cards.forEach(card => {
        card.style.opacity = '0';
        card.style.transform = 'translateY(30px)';
        card.style.transition = 'all 0.6s ease';
        observer.observe(card);
    });

    // Initialize all features
    initTheme();
    initCounters();
    initTestimonials();
});