document.addEventListener("DOMContentLoaded", () => {
  const mobileMenuBtn = document.getElementById("mobileMenuBtn");
  const navLinks = document.getElementById("navLinks");
  const backToTopBtn = document.getElementById("backToTop");
  const progressFill = document.querySelector(".progress-circle-fill");

  window.addEventListener("scroll", function () {
    const scrollPosition = window.scrollY;
    const pageHeight =
      document.documentElement.scrollHeight - window.innerHeight;
    const scrollPercentage = scrollPosition / pageHeight;

    // Update progress circle
    const circumference = 138; // 2πr ≈ 138
    const offset = circumference - scrollPercentage * circumference;
    progressFill.style.strokeDashoffset = offset;

    // Show button after scrolling a bit
    if (scrollPosition > 300) {
      backToTopBtn.classList.add("visible");
    } else {
      backToTopBtn.classList.remove("visible");
    }
  });

  // Smooth scroll to top
  backToTopBtn.addEventListener("click", function (e) {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  });

  mobileMenuBtn.addEventListener("click", () => {
    navLinks.classList.toggle("active");
  });

  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      navLinks.classList.remove("active");
    });
  });
});
