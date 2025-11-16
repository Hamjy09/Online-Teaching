//====== Navbar section
async function navbarSection() {
  const menuEl = document.getElementById("menu-icon");
  const closeEl = document.getElementById("close-icon");
  const navBar = document.getElementById("nav");
  const cotentWraperEl = document.getElementById("content-wraper");

  if (menuEl && closeEl && navBar && cotentWraperEl) {
    menuEl.addEventListener("click", function () {
      navBar.style.display = "flex";
      requestAnimationFrame(() => {
        navBar.classList.add("show");
      });
      cotentWraperEl.classList.add("blur");
    });

    closeEl.addEventListener("click", function () {
      navBar.classList.remove("show");
      cotentWraperEl.classList.remove("blur");

      setTimeout(() => {
        navBar.style.display = "none";
      }, 500);
    });
  }
}
navbarSection();

//=================== Carousel Section
async function carouselSection() {
  const carousel = document.getElementById("carousel");
  const slides = document.querySelectorAll(".carousel-image");
  const dots = document.querySelectorAll(".dot");

  if (carousel && slides.length > 0 && dots.length > 0) {
    let slideIndex = 1;
    let carouselInterval = null;
    let carouselInView = false;
    let startTouch, endTouch;

    function showSlide(index) {
      if (index > slides.length) slideIndex = 1;
      if (index < 1) slideIndex = slides.length;

      slides.forEach((slide) => {
        slide.classList.remove("active");
        slide.style.opacity = "0";
      });

      dots.forEach((dot) => dot.classList.remove("active"));

      slides[slideIndex - 1].classList.add("active");
      slides[slideIndex - 1].style.opacity = "1";
      dots[slideIndex - 1].classList.add("active");
    }

    function moveSlide(step) {
      showSlide((slideIndex += step));
    }
    window.moveSlide = moveSlide;

    function startAutoplay() {
      if (!carouselInterval && carouselInView) {
        carouselInterval = setInterval(() => moveSlide(1), 3000);
      }
    }

    function stopAutoplay() {
      if (carouselInterval) {
        clearInterval(carouselInterval);
        carouselInterval = null;
      }
    }

    const safeAutoplay = () => {
      stopAutoplay();
      startAutoplay();
    };

    function debounce(func, delay = 300) {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
      };
    }

    function handleSwipe(start, end) {
      if (start - end > 50) moveSlide(1);
      else if (end - start > 50) moveSlide(-1);
    }

    // Events
    carousel.addEventListener("mouseover", stopAutoplay);
    carousel.addEventListener("mouseout", startAutoplay);

    carousel.addEventListener("touchstart", (e) => {
      stopAutoplay();
      startTouch = e.touches[0].clientX;
    });

    carousel.addEventListener(
      "touchend",
      debounce((e) => {
        endTouch = e.changedTouches[0].clientX;

        // Handle swipe if it was a swipe
        if (Math.abs(startTouch - endTouch) > 50) {
          handleSwipe(startTouch, endTouch);
        } else {
          // If it was a tap (not a swipe), check where the user tapped
          const touchedInside = carousel.contains(e.target);
          if (!touchedInside) {
            startAutoplay(); // Tapped outside = resume autoplay
          }
        }
      }, 300) // Debounce to prevent rapid firing
    );

    // Pause on click inside, resume on click outside
    document.addEventListener("click", (e) => {
      if (carousel.contains(e.target)) {
        stopAutoplay();
      } else {
        startAutoplay();
      }
    });

    // Only autoplay if carousel is visible
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            carouselInView = true;
            showSlide(slideIndex);
            startAutoplay();
          } else {
            carouselInView = false;
            stopAutoplay();
          }
        });
      },
      { threshold: 0.5 } // 50% visible to trigger
    );

    observer.observe(carousel);
  }
}
carouselSection();

//========= Read more Script
async function readMoreSection() {
  // This function is safe to always run since it only defines a global function
  window.toggleText = function (idSuffix) {
    const moreText = document.getElementById("more-text" + idSuffix);
    const toggleBtn = document.getElementById("toggle-btn" + idSuffix);

    if (moreText && toggleBtn) {
      const isExpanded = moreText.classList.contains("show");
      moreText.classList.toggle("show");
      toggleBtn.textContent = isExpanded ? "Read more" : "Show less";

      if (isExpanded) {
        toggleBtn.scrollIntoView({ behavior: "smooth", block: "end" });
      }
    }
  };
}
readMoreSection();

//======== Reviews Carousel

async function reviewsCarouselSection() {
  const reviewCarousel = document.querySelector(".review-carousel");
  const reviewSlides = document.querySelectorAll(".review-carousel .review");
  const reviewPrevBtn = document.getElementById("prev");
  const reviewNextBtn = document.getElementById("next");

  if (
    reviewCarousel &&
    reviewSlides.length > 0 &&
    reviewPrevBtn &&
    reviewNextBtn
  ) {
    let reviewIndex = 0;
    let reviewAutoplay = null;
    let carouselInView = false;
    let startTouch, endTouch;

    function showReviewSlide(i) {
      reviewSlides.forEach((review, idx) => {
        review.classList.toggle("active", idx === i);
      });
    }

    function nextReviewSlide() {
      reviewIndex = (reviewIndex + 1) % reviewSlides.length;
      showReviewSlide(reviewIndex);
    }

    function prevReviewSlide() {
      reviewIndex =
        (reviewIndex - 1 + reviewSlides.length) % reviewSlides.length;
      showReviewSlide(reviewIndex);
    }

    function startReviewAutoplay() {
      if (!reviewAutoplay && carouselInView) {
        reviewAutoplay = setInterval(nextReviewSlide, 3000);
      }
    }

    function stopReviewAutoplay() {
      if (reviewAutoplay) {
        clearInterval(reviewAutoplay);
        reviewAutoplay = null;
      }
    }

    const safeAutoplay = () => {
      stopReviewAutoplay();
      startReviewAutoplay();
    };

    function debounce(func, delay = 300) {
      let timeout;
      return (...args) => {
        clearTimeout(timeout);
        timeout = setTimeout(() => func.apply(this, args), delay);
      };
    }

    // === Event listeners ===
    reviewNextBtn.addEventListener("click", () => {
      nextReviewSlide();
      safeAutoplay();
    });

    reviewPrevBtn.addEventListener("click", () => {
      prevReviewSlide();
      safeAutoplay();
    });

    reviewCarousel.addEventListener("mouseover", stopReviewAutoplay);
    reviewCarousel.addEventListener("mouseout", startReviewAutoplay);

    reviewCarousel.addEventListener("touchstart", (e) => {
      stopReviewAutoplay();
      startTouch = e.touches[0].clientX;
    });

    reviewCarousel.addEventListener(
      "touchend",
      debounce((e) => {
        endTouch = e.changedTouches[0].clientX;

        // Handle swipe action
        if (Math.abs(startTouch - endTouch) > 50) {
          if (startTouch - endTouch > 50) {
            nextReviewSlide();
          } else if (endTouch - startTouch > 50) {
            prevReviewSlide();
          }
        } else {
          // If it was a tap (not swipe), check where the user tapped
          const touchedInside = reviewCarousel.contains(e.target);
          if (!touchedInside) {
            startReviewAutoplay(); // Tap outside = resume autoplay
          } else {
            stopReviewAutoplay(); // Tap inside = pause autoplay
          }
        }
      }, 300) // Debounce to prevent rapid firing
    );

    // 📌 Click to pause/resume based on where user clicks
    document.addEventListener("click", (e) => {
      if (reviewCarousel.contains(e.target)) {
        stopReviewAutoplay(); // clicked inside carousel
      } else {
        startReviewAutoplay(); // clicked outside
      }
    });

    // 🧭 Only start when carousel scrolls into view
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            carouselInView = true;
            showReviewSlide(reviewIndex); // ensure correct start
            startReviewAutoplay();
          } else {
            carouselInView = false;
            stopReviewAutoplay();
          }
        });
      },
      {
        threshold: 0.5, // at least 50% visible
      }
    );

    observer.observe(reviewCarousel);
  }
}
reviewsCarouselSection();
