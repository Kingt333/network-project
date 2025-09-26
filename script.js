// Navbar toggle for mobile
const menuToggle = document.getElementById("menu-toggle");
const navLinks = document.getElementById("nav-links");

menuToggle.addEventListener("click", () => {
  navLinks.classList.toggle("active");
});

// Dropdown toggle for OSI layers
document.querySelectorAll(".layer-card").forEach(card => {
  card.addEventListener("click", function () {
    // Close other open dropdowns
    document.querySelectorAll(".layer-card.active").forEach(activeCard => {
      if (activeCard !== card) {
        activeCard.classList.remove("active");
        const arrow = activeCard.querySelector('.dropdown-arrow i');
        if (arrow) arrow.style.transform = "rotate(0deg)";
      }
    });

    // Toggle current card
    card.classList.toggle("active");

    // Arrow animation
    const arrow = card.querySelector('.dropdown-arrow i');
    if (arrow) {
      arrow.style.transform = card.classList.contains("active")
        ? "rotate(180deg)"
        : "rotate(0deg)";
    }
  });
});
