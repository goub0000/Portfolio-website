document.addEventListener('DOMContentLoaded', function() {
    // Header scroll effect
    const header = document.querySelector('header');
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
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

    // Course category toggle
    const categories = document.querySelectorAll('.category');
    categories.forEach(category => {
        const title = category.querySelector('.category-title');
        const content = category.querySelector('.category-content');

        title.addEventListener('click', () => {
            category.classList.toggle('active');
            if (category.classList.contains('active')) {
                content.style.display = 'grid';
                setTimeout(() => {
                    content.style.opacity = '1';
                    content.style.transform = 'translateY(0)';
                }, 10);
            } else {
                content.style.opacity = '0';
                content.style.transform = 'translateY(-10px)';
                setTimeout(() => {
                    content.style.display = 'none';
                }, 300);
            }
        });
    });

    // Animate course and certification cards on scroll
    const animateCards = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate');
                observer.unobserve(entry.target);
            }
        });
    };

    const cardObserver = new IntersectionObserver(animateCards, {
        root: null,
        threshold: 0.1
    });

    document.querySelectorAll('.course-card, .certification-card').forEach(card => {
        cardObserver.observe(card);
    });

    // Scroll-triggered animations for sections
    const animateSections = (entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    };

    const sectionObserver = new IntersectionObserver(animateSections, {
        root: null,
        threshold: 0.1
    });

    document.querySelectorAll('.animate-on-scroll').forEach(section => {
        sectionObserver.observe(section);
    });

    // Add hover effect to course cards on mobile
    if ('ontouchstart' in window) {
        const courseCards = document.querySelectorAll('.course-card, .certification-card');
        courseCards.forEach(card => {
            card.addEventListener("touchstart", () => {
                card.classList.toggle("hover");
            });
        });
    }
});