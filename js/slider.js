function slider() {
  // Next button
  const next = document.querySelector(".offer__slider-next");
  // Prev button
  const prev = document.querySelector(".offer__slider-prev");
  // Current slide number in the Title
  const currentSlideTitle = document.querySelector(".offer__slider-counter #current");

  const sliderWrapper = document.querySelector(".offer__slider-wrapper");
  const secWrapper = document.querySelector(".offer__slider-secwrap");
  const slides = document.querySelectorAll(".offer__slide");
  const slideContainer = document.querySelector(".offer__slider-container");

  const indicator = document.querySelector(".slider__indicator");
  const dots = document.querySelectorAll(".slider__dot");
  // Get current position of slide
  const currentPos = secWrapper.getAttribute("data-pos");

  // Width of slide
  const slideWidth = sliderWrapper.clientWidth;
  // Total slides
  const totalSlides = slides.length - 1;

  let currentSlide = 0;
  let positionPX = 0;
  // console.log(newPosition);

  indicator.style.left = `${currentSlide * 2}em`;
  slideContainer.style.transition = "transform 1s";

  function slideAction(shift) {
    // Change global current slide
    currentSlide += shift;

    if (currentSlide < 0) {
      currentSlide = totalSlides;
    }
    if (currentSlide > totalSlides) {
      currentSlide = 0;
    }

    positionPX = currentSlide * slideWidth;

    // Set attr to div
    secWrapper.setAttribute("data-pos", currentSlide);
    // Moving slide
    slideContainer.style.transform = `translateX(-${positionPX}px)`;
    // Moving dots
    indicator.style.left = `${currentSlide * 2}em`;

    // Change title
    if (currentSlide > 9) {
      currentSlideTitle.innerHTML = currentSlide + 1;
    } else {
      currentSlideTitle.innerHTML = `0${currentSlide + 1}`;
    }
  }

  // const dataPosDot = secWrapper.getAttribute('data-pos');
  dots.forEach((dot) => {
    dot.addEventListener("click", (e) => {
      // event.preventDefault();
      const event = e.target;
      const newPos = event.getAttribute("data-pos");

      currentSlide = +newPos;
      console.log(newPos);
      slideAction(0);
    });
  });

  next.addEventListener("click", () => {
    slideAction(1);
  });

  prev.addEventListener("click", () => {
    slideAction(-1);
  });
}

module.exports = slider();