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

});