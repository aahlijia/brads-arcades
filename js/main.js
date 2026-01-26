// Mobile Navigation Toggle
document.addEventListener('DOMContentLoaded', function() {
  const navToggle = document.querySelector('.nav-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (navToggle && navLinks) {
    navToggle.addEventListener('click', function(e) {
      e.preventDefault();
      e.stopPropagation();
      const isActive = navLinks.classList.contains('active');
      if (isActive) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navLinks.style.display = 'none';
      } else {
        navLinks.classList.add('active');
        navToggle.classList.add('active');
        navLinks.style.display = 'flex';
      }
    });

    // Close menu when clicking a link
    navLinks.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', function() {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navLinks.style.display = 'none';
      });
    });

    // Close menu when clicking outside
    document.addEventListener('click', function(e) {
      if (!navToggle.contains(e.target) && !navLinks.contains(e.target)) {
        navLinks.classList.remove('active');
        navToggle.classList.remove('active');
        navLinks.style.display = 'none';
      }
    });
  }

  // Initialize hero slideshow if present
  initHeroSlideshow();

  // Initialize location slideshows if present
  initLocationSlideshows();
});

// Hero Slideshow Functionality
function initHeroSlideshow() {
  const slideshow = document.querySelector('.hero .slideshow');
  if (!slideshow) return;

  const slides = slideshow.querySelectorAll('.slide');
  const dotsContainer = document.querySelector('.hero .slideshow-controls');

  if (slides.length === 0) return;

  let currentSlide = 0;
  let slideInterval;

  // Create dots
  if (dotsContainer) {
    slides.forEach((_, index) => {
      const dot = document.createElement('div');
      dot.classList.add('slideshow-dot');
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
    slideInterval = setInterval(nextSlide, 4000);
  }

  function stopSlideshow() {
    clearInterval(slideInterval);
  }

  // Start automatic slideshow
  startSlideshow();

  // Pause on hover
  slideshow.addEventListener('mouseenter', stopSlideshow);
  slideshow.addEventListener('mouseleave', startSlideshow);
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

    let currentSlide = 0;
    let slideInterval;

    // Create dots
    if (dotsContainer) {
      slides.forEach((_, index) => {
        const dot = document.createElement('div');
        dot.classList.add('slideshow-dot');
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
      slideInterval = setInterval(nextSlide, 3000);
    }

    function stopSlideshow() {
      clearInterval(slideInterval);
    }

    // Start automatic slideshow
    startSlideshow();

    // Pause on hover
    slideshow.addEventListener('mouseenter', stopSlideshow);
    slideshow.addEventListener('mouseleave', startSlideshow);
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
});
