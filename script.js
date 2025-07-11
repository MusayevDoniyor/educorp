document.addEventListener("DOMContentLoaded", () => {
  // Cache DOM elements
  const elements = {
    mobileMenuBtn: document.getElementById("mobileMenuBtn"),
    navLinks: document.getElementById("navLinks"),
    backToTopBtn: document.getElementById("backToTop"),
    progressFill: document.querySelector(".progress-circle-fill"),
    swiperTop: document.querySelector(".clients-swiper-top"),
    swiperBottom: document.querySelector(".clients-swiper-bottom"),
  };

  // Scroll handler with requestAnimationFrame
  let isScrolling = false;
  const handleScroll = () => {
    if (isScrolling) return;
    isScrolling = true;
    requestAnimationFrame(() => {
      const scrollPosition = window.scrollY;
      const pageHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.min(scrollPosition / pageHeight, 1);

      // Progress circle
      if (elements.progressFill) {
        const circumference = 138;
        elements.progressFill.style.strokeDashoffset =
          circumference - scrollPercentage * circumference;
      }

      // Back to top button
      if (elements.backToTopBtn) {
        elements.backToTopBtn.classList.toggle("visible", scrollPosition > 300);
      }

      isScrolling = false;
    });
  };

  window.addEventListener("scroll", handleScroll, { passive: true });

  // Event delegation
  document.addEventListener("click", (e) => {
    // Mobile menu toggle
    if (e.target.closest("#mobileMenuBtn")) {
      elements.navLinks.classList.toggle("active");
      return;
    }

    // Nav links close
    if (e.target.closest(".nav-links a")) {
      elements.navLinks.classList.remove("active");
      return;
    }

    // Back to top
    if (e.target.closest("#backToTop")) {
      e.preventDefault();
      window.scrollTo({ top: 0, behavior: "smooth" });
      return;
    }

    // Accordion
    const accordionHeader = e.target.closest(".accordion-header");
    if (accordionHeader) {
      const item = accordionHeader.parentElement;
      const row = item.closest(".accordion-row");
      const wasActive = item.classList.contains("active");

      row
        .querySelectorAll(".accordion-item")
        .forEach((i) => i.classList.remove("active"));
      if (!wasActive) item.classList.add("active");
    }
  });

  // Conditional Swiper initialization
  if (elements.swiperTop || elements.swiperBottom) {
    const swiperConfig = {
      slidesPerView: "auto",
      spaceBetween: 10,
      loop: true,
      autoplay: { delay: 0, disableOnInteraction: false },
      speed: 3000,
      freeMode: true,
      freeModeMomentum: false,
      allowTouchMove: false,
    };

    if (elements.swiperTop) {
      new Swiper(".clients-swiper-top", swiperConfig);
    }
    if (elements.swiperBottom) {
      new Swiper(".clients-swiper-bottom", {
        ...swiperConfig,
        autoplay: { ...swiperConfig.autoplay, reverseDirection: true },
      });
    }
  }
  AOS.init({
    duration: window.innerWidth <= 768 ? 600 : 800,
    easing: "ease-in-out",
    once: true,
    offset: 100,
  });
});
