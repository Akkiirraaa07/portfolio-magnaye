console.log("Portfolio Loaded");

// ─────────────────────────────────────────
// Scroll effect (your original code)
// ─────────────────────────────────────────
window.addEventListener("scroll", () => {
    console.log("Scrolling...");
});

// ─────────────────────────────────────────
// All interactive effects run after page loads
// ─────────────────────────────────────────
document.addEventListener("DOMContentLoaded", () => {

    // 1. RIPPLE EFFECT — all .btn elements
    document.querySelectorAll(".btn").forEach(btn => {
        btn.addEventListener("click", function (e) {
            const r = document.createElement("span");
            r.className = "ripple";

            const size = Math.max(btn.offsetWidth, btn.offsetHeight);
            const rect = btn.getBoundingClientRect();

            r.style.width  = size + "px";
            r.style.height = size + "px";
            r.style.left   = (e.clientX - rect.left - size / 2) + "px";
            r.style.top    = (e.clientY - rect.top  - size / 2) + "px";

            btn.appendChild(r);
            r.addEventListener("animationend", () => r.remove());
        });
    });

    // 2. SKILL TAG TOGGLE — click to select/deselect
    document.querySelectorAll(".skills span").forEach(tag => {
        tag.addEventListener("click", () => {
            tag.classList.toggle("selected");
        });
    });

    // 3. SMOOTH SCROLL — nav links with href="#section"
    document.querySelectorAll(".nav-links a").forEach(link => {
        link.addEventListener("click", function (e) {
            const href = this.getAttribute("href");
            if (href && href.startsWith("#")) {
                e.preventDefault();
                const target = document.querySelector(href);
                if (target) {
                    target.scrollIntoView({ behavior: "smooth" });
                }
            }
        });
    });

    // ─────────────────────────────────────────
    // 4. SLIDESHOW FUNCTIONALITY
    // ─────────────────────────────────────────
    const slides = document.querySelectorAll(".slide");
    const indicators = document.querySelectorAll(".indicator");
    const prevBtn = document.querySelector(".slide-btn.prev");
    const nextBtn = document.querySelector(".slide-btn.next");

    let currentSlide = 0;
    let autoPlayInterval;

    // Function to show a specific slide
    function showSlide(index) {
        // Wrap around if index is out of bounds
        if (index >= slides.length) {
            currentSlide = 0;
        } else if (index < 0) {
            currentSlide = slides.length - 1;
        } else {
            currentSlide = index;
        }

        // Remove active class from all slides and indicators
        slides.forEach(slide => slide.classList.remove("active"));
        indicators.forEach(indicator => indicator.classList.remove("active"));

        // Add active class to current slide and indicator
        slides[currentSlide].classList.add("active");
        indicators[currentSlide].classList.add("active");
    }

    // Function to go to next slide
    function nextSlide() {
        showSlide(currentSlide + 1);
    }

    // Function to go to previous slide
    function prevSlide() {
        showSlide(currentSlide - 1);
    }

    // Auto-play functionality
    function startAutoPlay() {
        autoPlayInterval = setInterval(nextSlide, 5000); // Change slide every 5 seconds
    }

    function stopAutoPlay() {
        clearInterval(autoPlayInterval);
    }

    // Event listeners for navigation buttons
    if (prevBtn) {
        prevBtn.addEventListener("click", () => {
            prevSlide();
            stopAutoPlay();
            startAutoPlay(); // Restart auto-play after manual navigation
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener("click", () => {
            nextSlide();
            stopAutoPlay();
            startAutoPlay(); // Restart auto-play after manual navigation
        });
    }

    // Event listeners for indicators
    indicators.forEach((indicator, index) => {
        indicator.addEventListener("click", () => {
            showSlide(index);
            stopAutoPlay();
            startAutoPlay(); // Restart auto-play after manual navigation
        });
    });

    // Keyboard navigation
    document.addEventListener("keydown", (e) => {
        if (e.key === "ArrowLeft") {
            prevSlide();
            stopAutoPlay();
            startAutoPlay();
        } else if (e.key === "ArrowRight") {
            nextSlide();
            stopAutoPlay();
            startAutoPlay();
        }
    });

    // Pause auto-play on hover
    const slideshowContainer = document.querySelector(".slideshow-container");
    if (slideshowContainer) {
        slideshowContainer.addEventListener("mouseenter", stopAutoPlay);
        slideshowContainer.addEventListener("mouseleave", startAutoPlay);
    }

    // Start auto-play when page loads
    if (slides.length > 0) {
        startAutoPlay();
    }

    // ─────────────────────────────────────────
    // 5. SOCIAL MEDIA ICON ANIMATIONS
    // ─────────────────────────────────────────
    document.querySelectorAll(".social-icon").forEach(icon => {
        icon.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-4px) rotate(5deg)";
        });
        
        icon.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0) rotate(0deg)";
        });
    });

     // Light/Dark Mode Toggle Functionality (Separate Implementation)
    (function() {
        // Check for saved theme preference
        const savedTheme = localStorage.getItem('portfolio-theme');
        const body = document.body;
        
        // Apply saved theme or default to dark mode
        if (savedTheme === 'light') {
            body.classList.add('light-mode');
        } else if (savedTheme === 'dark') {
            body.classList.remove('light-mode');
        } else {
            // Default to dark mode (original)
            body.classList.remove('light-mode');
            localStorage.setItem('portfolio-theme', 'dark');
        }
        
        // Get toggle button
        const toggleBtn = document.getElementById('themeToggle');
        
        if (toggleBtn) {
            toggleBtn.addEventListener('click', function() {
                if (body.classList.contains('light-mode')) {
                    // Switch to dark mode
                    body.classList.remove('light-mode');
                    localStorage.setItem('portfolio-theme', 'dark');
                    
                    // Optional: change icon to moon for dark mode
                    const svg = toggleBtn.querySelector('svg');
                    if (svg) {
                        svg.innerHTML = '<path d="M12 3c-4.97 0-9 4.03-9 9s4.03 9 9 9 9-4.03 9-9-4.03-9-9-9zm0 16c-3.86 0-7-3.14-7-7s3.14-7 7-7 7 3.14 7 7-3.14 7-7 7z"/><path d="M12 7v10c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>';
                    }
                } else {
                    // Switch to light mode (cream white)
                    body.classList.add('light-mode');
                    localStorage.setItem('portfolio-theme', 'light');
                    
                    // Optional: change icon to sun for light mode
                    const svg = toggleBtn.querySelector('svg');
                    if (svg) {
                        svg.innerHTML = '<path d="M12 7c-2.76 0-5 2.24-5 5s2.24 5 5 5 5-2.24 5-5-2.24-5-5-5zm0-5C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z"/>';
                    }
                }
            });
        }
    })();

});