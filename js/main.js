// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    function setNavOpen(open) {
      navLinks.classList.toggle('active', open);
      navToggle.classList.toggle('active', open);
      navLinks.style.display = open ? 'flex' : 'none';
      navToggle.setAttribute('aria-expanded', String(open));
    }

    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      setNavOpen(!navLinks.classList.contains('active'));
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        setNavOpen(false);
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        setNavOpen(false);
      }
    });

    // Close menu on Escape, and return focus to the toggle button
    document.addEventListener('keydown', function(e) {
      if (e.key === 'Escape' && navLinks.classList.contains('active')) {
        setNavOpen(false);
        navToggle.focus();
      }
    });
  }

  // Initialize hero slideshow if present
  initHeroSlideshow();

  // Initialize location slideshows if present
  initLocationSlideshows();
});

// Wires up autoplay, dot navigation, and pause-on-interaction for one
// slideshow. Shared by the hero and each location gallery so the rotation
// logic isn't duplicated per instance.
function createSlideshow(slideshow, dotsContainer, interval) {
  const slides = slideshow.querySelectorAll('.slide');
  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval;

  if (dotsContainer) {
    slides.forEach((_, index) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.classList.add('slideshow-dot');
      dot.setAttribute('aria-label', `Go to slide ${index + 1}`);
      if (index === 0) dot.classList.add('active');
      dot.addEventListener('click', () => goToSlide(index));
      dotsContainer.appendChild(dot);
    });
  }

  const dots = dotsContainer ? dotsContainer.querySelectorAll('.slideshow-dot') : [];

  function goToSlide(index) {
    slides[currentSlide].classList.remove('active');
    if (dots[currentSlide]) dots[currentSlide].classList.remove('active');

    currentSlide = index;
    if (currentSlide >= slides.length) currentSlide = 0;
    if (currentSlide < 0) currentSlide = slides.length - 1;

    slides[currentSlide].classList.add('active');
    if (dots[currentSlide]) dots[currentSlide].classList.add('active');
  }

  function nextSlide() {
    goToSlide(currentSlide + 1);
  }

  function startSlideshow() {
    slideInterval = setInterval(nextSlide, interval);
  }

  function stopSlideshow() {
    clearInterval(slideInterval);
  }

  // Start automatic slideshow
  startSlideshow();

  // Pause on hover (mouse) and focus (keyboard), per WCAG 2.2.2 - auto
  // rotation must be stoppable without a mouse.
  slideshow.addEventListener('mouseenter', stopSlideshow);
  slideshow.addEventListener('mouseleave', startSlideshow);
  slideshow.addEventListener('focusin', stopSlideshow);
  slideshow.addEventListener('focusout', startSlideshow);
}

// Hero Slideshow Functionality
function initHeroSlideshow() {
  const slideshow = document.querySelector('.hero .slideshow');
  if (!slideshow) return;

  const dotsContainer = document.querySelector('.hero .slideshow-controls');
  createSlideshow(slideshow, dotsContainer, 4000);
}

// Location Slideshows Functionality
function initLocationSlideshows() {
  const slideshows = document.querySelectorAll('.location-slideshow[data-slideshow]');

  slideshows.forEach(slideshow => {
    const slides = slideshow.querySelectorAll('.slide');
    const dotsContainer = slideshow.querySelector('.slideshow-controls');

    // Skip if only one slide
    if (slides.length <= 1) {
      if (dotsContainer) dotsContainer.style.display = 'none';
      return;
    }

    createSlideshow(slideshow, dotsContainer, 3000);
  });
}

// Set active nav link based on current page
document.addEventListener('DOMContentLoaded', function() {
  const currentPage = window.location.pathname.split('/').pop() || 'index.html';
  const navLinks = document.querySelectorAll('.nav-links a');

  navLinks.forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPage || (currentPage === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // Keep the footer copyright year current automatically
  const copyrightYear = document.getElementById('copyright-year');
  if (copyrightYear) {
    copyrightYear.textContent = new Date().getFullYear();
  }
});
