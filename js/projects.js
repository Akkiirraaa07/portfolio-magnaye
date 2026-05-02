console.log("Projects page loaded");

// Lazy-load all project images for faster page load
document.querySelectorAll(".project-card img").forEach(img => {
    img.setAttribute("loading", "lazy");
    img.setAttribute("decoding", "async");
});

function filterProjects(category) {
    console.log("Filter:", category);
}