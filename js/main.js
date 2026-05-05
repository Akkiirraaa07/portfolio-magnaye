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

});