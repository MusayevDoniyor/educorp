document.addEventListener("DOMContentLoaded", function () {
  // Cache DOM elements
  const elements = {
    mobileMenuBtn: document.getElementById("mobileMenuBtn"),
    navLinks: document.getElementById("navLinks"),
    backToTopBtn: document.getElementById("backToTop"),
    progressFill: document.querySelector(".progress-circle-fill"),
  };

  // Scroll handler with debounce
  let isScrolling;
  window.addEventListener(
    "scroll",
    function () {
      window.clearTimeout(isScrolling);
      isScrolling = setTimeout(() => {
        const scrollPosition = window.scrollY;
        const pageHeight =
          document.documentElement.scrollHeight - window.innerHeight;
        const scrollPercentage = Math.min(scrollPosition / pageHeight, 1);

        // Progress circle
        if (elements.progressFill) {
          const circumference = 138;
          const offset = circumference - scrollPercentage * circumference;
          elements.progressFill.style.strokeDashoffset = offset;
        }

        // Back to top button
        if (elements.backToTopBtn) {
          elements.backToTopBtn.classList.toggle(
            "visible",
            scrollPosition > 300
          );
        }
      }, 16);
    },
    { passive: true }
  );

  // Event delegation
  document.addEventListener("click", function (e) {
    // Mobile menu toggle
    if (
      e.target === elements.mobileMenuBtn ||
      e.target.closest("#mobileMenuBtn")
    ) {
      elements.navLinks.classList.toggle("active");
      return;
    }

    // Nav links close
    if (e.target.closest(".nav-links a")) {
      elements.navLinks.classList.remove("active");
      return;
    }

    // Back to top
    if (e.target === elements.backToTopBtn || e.target.closest("#backToTop")) {
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

      row.querySelectorAll(".accordion-item").forEach((i) => {
        i.classList.remove("active");
      });

      if (!wasActive) {
        item.classList.add("active");
      }
    }
  });

  if (document.querySelector(".clients-swiper-top")) {
    new Swiper(".clients-swiper-top", {
      slidesPerView: "auto",
      spaceBetween: 10,
      loop: true,
      autoplay: { delay: 0, disableOnInteraction: false },
      speed: 3000,
      freeMode: true,
      freeModeMomentum: false,
      allowTouchMove: false,
    });

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
  }
});
