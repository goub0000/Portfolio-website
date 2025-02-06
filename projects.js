document.addEventListener("DOMContentLoaded", function () {
    // Smooth scrolling for navigation links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            document.querySelector(this.getAttribute('href')).scrollIntoView({
                behavior: 'smooth'
            });
        });
    });

    // Fade in effect for hero content
    const heroContent = document.querySelector(".hero-content");
    heroContent.style.opacity = 0;
    heroContent.style.transform = "translateY(20px)";
    setTimeout(() => {
        heroContent.style.transition = "opacity 1.5s ease-in, transform 1.5s ease-out";
        heroContent.style.opacity = 1;
        heroContent.style.transform = "translateY(0)";
    }, 500);

    // Animate project cards on scroll
    const projectCards = document.querySelectorAll(".project-card");
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.1 });

    projectCards.forEach(card => {
        observer.observe(card);
    });

    // Add hover effect to project cards on mobile
    if ('ontouchstart' in window) {
        projectCards.forEach(card => {
            card.addEventListener("touchstart", () => {
                card.classList.toggle("hover");
            });
        });
    }

    // Filter projects by category
    const categoryButtons = document.querySelectorAll(".category-filter button");
    const allProjects = document.querySelectorAll(".project-card");

    categoryButtons.forEach(button => {
        button.addEventListener("click", () => {
            const category = button.getAttribute("data-category");
            
            categoryButtons.forEach(btn => btn.classList.remove("active"));
            button.classList.add("active");

            allProjects.forEach(project => {
                if (category === "all" || project.getAttribute("data-category") === category) {
                    project.style.display = "block";
                } else {
                    project.style.display = "none";
                }
            });
        });
    });

    // Lazy loading for project images
    const projectImages = document.querySelectorAll(".project-image img");
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.getAttribute("data-src");
                img.removeAttribute("data-src");
                imageObserver.unobserve(img);
            }
        });
    }, { rootMargin: "50px" });

    projectImages.forEach(img => {
        imageObserver.observe(img);
    });
});