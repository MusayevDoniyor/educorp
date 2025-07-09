const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navLinks = document.getElementById("navLinks");
const backToTopBtn = document.getElementById("backToTop");
const progressFill = document.querySelector(".progress-circle-fill");

window.addEventListener("scroll", function () {
  const scrollPosition = window.scrollY;
  const pageHeight = document.documentElement.scrollHeight - window.innerHeight;
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

new Swiper(".clients-swiper-top", {
  slidesPerView: "auto",
  spaceBetween: 10,
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
  },
  speed: 3000,
  freeMode: true,
  freeModeMomentum: false,
  allowTouchMove: false,
});

// Bottom swiper (right to left)
new Swiper(".clients-swiper-bottom", {
  slidesPerView: "auto",
  spaceBetween: 10,
  loop: true,
  autoplay: {
    delay: 0,
    disableOnInteraction: false,
    reverseDirection: true,
  },
  speed: 3000,
  freeMode: true,
  freeModeMomentum: false,
  allowTouchMove: false,
});

const companyTypes = document.querySelectorAll(".company-type");

companyTypes.forEach((type) => {
  type.addEventListener("mouseenter", () => {
    type.style.transform = "translateY(-5px)";
    type.style.boxShadow = "0 10px 20px rgba(0, 0, 0, 0.1)";
  });

  type.addEventListener("mouseleave", () => {
    type.style.transform = "translateY(0)";
    type.style.boxShadow = "none";
  });
});

// Step cards animation
const steps = document.querySelectorAll(".step");

steps.forEach((step) => {
  step.addEventListener("mouseenter", () => {
    step.style.transform = "translateY(-5px)";
    step.style.boxShadow = "0 10px 20px rgba(0,0,0,0.1)";
  });

  step.addEventListener("mouseleave", () => {
    step.style.transform = "translateY(0)";
    step.style.boxShadow = "0 5px 15px rgba(0,0,0,0.05)";
  });
});

const rows = document.querySelectorAll(".accordion-row");

rows.forEach((row) => {
  const items = row.querySelectorAll(".accordion-item");

  items.forEach((item) => {
    const header = item.querySelector(".accordion-header");

    header.addEventListener("click", () => {
      // Close all items in this row
      items.forEach((i) => i.classList.remove("active"));

      // Open the clicked item
      item.classList.add("active");
    });
  });
});
