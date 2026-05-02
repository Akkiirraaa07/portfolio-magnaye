document.getElementById("contactForm").addEventListener("submit", function(e) {
    e.preventDefault();
    const msg = document.getElementById("formMsg");
    msg.innerText = "Message sent successfully!";
    msg.style.color = "#38bdf8";
    this.reset();
});