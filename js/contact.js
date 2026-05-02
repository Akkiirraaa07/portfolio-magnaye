document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();

    document.getElementById("formMsg").innerText = "Message sent successfully!";
});