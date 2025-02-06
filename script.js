document.addEventListener('DOMContentLoaded', function() {
    const contactForm = document.getElementById('contact-form');
    const projectGrid = document.querySelector('.project-grid');
    const contactToggle = document.getElementById('contact-toggle');
    const contactFormContainer = document.getElementById('contact-form-container');

    // Header scroll effect
    window.addEventListener('scroll', function() {
        const header = document.querySelector('header');
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

    // Toggle contact form visibility
    contactToggle.addEventListener('click', function() {
        contactFormContainer.classList.toggle('hidden');
        contactToggle.textContent = contactFormContainer.classList.contains('hidden') ? 'Show Contact Form' : 'Hide Contact Form';
    });

    // Contact form submission
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;
        console.log('Form submitted:', { name, email, message });
        contactForm.reset();
        alert('Thank you for your message! I will get back to you soon.');
    });

    // Animate skill categories to expand/collapse
    const skillCategories = document.querySelectorAll('.skill-category');
    skillCategories.forEach(category => {
        category.addEventListener('click', function() {
            this.classList.toggle('active');
            const skillList = this.querySelector('.skill-list');
            if (this.classList.contains('active')) {
                skillList.style.display = 'block';
                setTimeout(() => {
                    skillList.querySelectorAll('li').forEach((li, index) => {
                        setTimeout(() => {
                            li.style.opacity = '1';
                            li.style.transform = 'translateY(0)';
                        }, index * 100);
                    });
                }, 0);
            } else {
                skillList.querySelectorAll('li').forEach(li => {
                    li.style.opacity = '0';
                    li.style.transform = 'translateY(10px)';
                });
                setTimeout(() => {
                    skillList.style.display = 'none';
                }, 300);
            }
        });
    });

    // Dynamic project loading with more detail
    const projects = [
        { 
            title: 'E-commerce Platform',
            description: 'A full-stack e-commerce solution with React, Node.js, and MongoDB.',
            image: 'project1.jpg',
            link: 'https://github.com/yourusername/project1',
            tags: ['React', 'Node.js', 'MongoDB']
        },
        { 
            title: 'AI-Powered Chatbot',
            description: 'An intelligent chatbot using natural language processing and machine learning.',
            image: 'project2.jpg',
            link: 'https://github.com/yourusername/project2',
            tags: ['Python', 'TensorFlow', 'NLP']
        },
        { 
            title: 'Responsive Portfolio Website',
            description: 'A modern, responsive portfolio website showcasing web development skills.',
            image: 'project3.jpg',
            link: 'https://github.com/yourusername/project3',
            tags: ['HTML5', 'CSS3', 'JavaScript']
        },
    ];

    projects.forEach(project => {
        const projectElement = document.createElement('div');
        projectElement.className = 'project';
        projectElement.innerHTML = `
            <div class="project-image">
                <img src="${project.image}" alt="${project.title}">
                <div class="project-overlay">
                    <a href="${project.link}" target="_blank" class="btn-view">View Project</a>
                    <a href="${project.link}" target="_blank" class="btn-github"><i class="fab fa-github"></i> GitHub</a>
                </div>
            </div>
            <div class="project-info">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="project-tags">
                    ${project.tags.map(tag => `<span>${tag}</span>`).join('')}
                </div>
            </div>
        `;
        projectGrid.appendChild(projectElement);
    });

    // Scroll-triggered animations
    const animateOnScrollObserver = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('is-visible');
                    animateOnScrollObserver.unobserve(entry.target);
                }
            });
        },
        { threshold: 0.1 }
    );

    document.querySelectorAll('.animate-on-scroll').forEach((element) => {
        animateOnScrollObserver.observe(element);
    });

    // Typing effect for hero section
    const heroText = "Hi, I'm Oumarou Gouba. I am a Junior Information Science and Technology Major at The University of Oklahoma.";
    const heroP = document.querySelector('#home p');
    let index = 0;

    function typeHeroText() {
        if (index < heroText.length) {
            heroP.textContent += heroText.charAt(index);
            index++;
            setTimeout(typeHeroText, 50);
        }
    }

    typeHeroText();
});