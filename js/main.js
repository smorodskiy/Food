/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/cal.js":
/*!*******************!*\
  !*** ./js/cal.js ***!
  \*******************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cal() {
  class Person {
    constructor(gender, growth, weight, age, activity) {
      this.gender = gender;
      this.growth = growth;
      this.weight = weight;
      this.age = age;
      this.activity = activity;
      this.calories();
    }

    // Для женщин: (10 х вес в кг) + (6,25 х рост в см) – (5 х возраст в г) – 161;
    // Для мужчин: (10 х вес в кг) + (6,25 х рост в см) – (5 х возраст в г) + 5;

    calories() {
      let genFormula = 0,
        formula = 0,
        activityNum = 0;

      switch (this.gender) {
        case "male":
          genFormula = -161;
          break;
        case "female":
          genFormula = 5;
          break;
        default:
          genFormula = 5;
          break;
      }

      switch (this.activity) {
        case "low":
          activityNum = 0.2;
          break;
        case "small":
          activityNum = 0.3;
          break;
        case "medium":
          activityNum = 0.4;
          break;
        case "high":
          activityNum = 0.5;
          break;
        default:
          activityNum = 0.3;
          break;
      }

      formula = 10 * this.weight + 6.25 * this.growth - 5 * this.age + genFormula;

      activityNum *= formula;

      return Math.round(formula + activityNum);
    }
  }

  // init

  let gender = "female",
    height,
    weight,
    age,
    activity = "small";

  const calcResult = document.querySelector(".calculating__result span");

  let activityElements = document.querySelector(".calculating__choose_big");
  let genderElements = document.querySelector("#gender");
  let inputsParent = document.querySelector(".calculating__choose_medium");
  let inputElements = inputsParent.children;

  (function initial() {
    if (localStorage.getItem("gender")) {
      gender = localStorage.getItem("gender");
    }
    if (localStorage.getItem("activity")) {
      activity = localStorage.getItem("activity");
    }

    removeActiveClass(genderElements);
    removeActiveClass(activityElements);

    function setActiveClass(parent) {
      for (const element of parent.children) {
        if (element.getAttribute("id") == gender) {
          element.classList.add("calculating__choose-item_active");
        }

        if (element.getAttribute("id") == activity) {
          element.classList.add("calculating__choose-item_active");
        }
      }
    }

    setActiveClass(activityElements);
    setActiveClass(genderElements);

    calc();
  })();

  for (const input of inputElements) {
    //console.log(element);
    inputsEvent(input);
  }

  // Remove active highlight
  function removeActiveClass(element) {
    for (let i = 0; i < element.children.length; i++) {
      element.children[i].classList.remove("calculating__choose-item_active");
    }
  }

  // Events on buttons
  function buttonsEvent(element) {
    element.addEventListener("click", (e) => {
      const event = e.target;
      if (
        event &&
        event.classList.contains("calculating__choose-item") &&
        !event.classList.contains("calculating__choose-item_active")
      ) {
        removeActiveClass(element);
        event.classList.add("calculating__choose-item_active");

        const index = Array.from(element.children).indexOf(event) + 1;

        if (element.getAttribute("id") == "gender") {
          switch (index) {
            case 1:
              gender = "female";
              break;
            case 2:
              gender = "male";
              break;
          }
        }

        if (element.getAttribute("id") == "activity") {
          switch (index) {
            case 1:
              activity = "low";
              break;
            case 2:
              activity = "small";
              break;
            case 3:
              activity = "medium";
              break;
            case 4:
              activity = "high";
              break;
          }
          console.log(activity);
        }

        calc();
      }
    });
  }

  buttonsEvent(activityElements);
  buttonsEvent(genderElements);

  function inputsEvent(input) {
    input.addEventListener("input", (e) => {
      const attr = input.getAttribute("id");

      switch (attr) {
        case "height":
          height = +input.value;
          break;
        case "weight":
          weight = +input.value;
          break;
        case "age":
          age = +input.value;
          break;
      }

      if (checkInputs()) {
        input.style.border = "solid #FF0000";
      } else {
        input.style.border = "";
        calc();
      }
    });
  }

  function checkInputs() {
    // if (!height || !weight || !age) return;

    if (height > 250 || weight > 200 || age > 100 || height < 50 || weight < 10 || age < 1) {
      return false;
    } else {
      return true;
    }
  }

  function calc() {
    localStorage.setItem("gender", gender);
    localStorage.setItem("activity", activity);

    console.log(`${gender}, ${height}, ${weight}, ${age}, ${activity}`);

    if (checkInputs()) {
      const person = new Person(gender, height, weight, age, activity);
      calcResult.textContent = person.calories();
    } else {
      calcResult.textContent = "____";
    }
  }

  // const fruitBasket = ['banana', 'cherry', 'orange', 'apple',
  // 'cherry', 'orange', 'apple', 'banana', 'cherry', 'orange', 'fig' ];
  // const div = fruitBasket.reduce((acc, index) => {
  //   if (!acc[index]) {
  //     acc[index] = 1;
  //   } else {
  //     acc[index] += 1;
  //   }
  //   return acc;
  // }, {});

  // let sortable = Object.entries(div);

  // sortable.sort((a, b) => b[1]-a[1]);

  // console.log(sortable);
};

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cal);


/***/ }),

/***/ "./js/cards.js":
/*!*********************!*\
  !*** ./js/cards.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
/* harmony import */ var _services_services__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./services/services */ "./js/services/services.js");


function cards() {
  // Шаблон карт(высота, ширина, название меню, текст меню, цена)
  class Cards {
    constructor(img, imgalt, title, description, price, parent) {
      // this.width = width;
      // this.height = height;
      this.imgalt = imgalt;
      this.title = title;
      this.description = description;
      this.price = price;
      this.img = img;
      this.parent = document.querySelector(parent);
      //this.element = element;
      this.showCard();
    }

    showCard() {
      //console.log(this.parent);
      const element = document.createElement("div");
      element.classList.add("menu__item");
      element.innerHTML = `            
              
              <img src="${this.img}" alt="${this.imgalt}">
              <h3 class="menu__item-subtitle">${this.title}</h3>
              <div class="menu__item-descr">${this.description}</div>
              <div class="menu__item-divider"></div>
              <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
              </div>
             
              `;

      this.parent.append(element);
    }
  }
  
  (0,_services_services__WEBPACK_IMPORTED_MODULE_0__.getJsonFromUrl)("http://localhost:3000/menu").then((jsonData) => {  
    renderData(jsonData);
  });

  // Отобразить меню на странице
  function renderData(jsonData) {
    jsonData.forEach(({ img, imgalt, title, description, price }) => {
      new Cards(img, imgalt, title, description, price, ".menu .container");
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);


/***/ }),

/***/ "./js/promo.js":
/*!*********************!*\
  !*** ./js/promo.js ***!
  \*********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function promo(date) {

  // let promoDate = new Date(2022, 10, 13, 17, 25, 0);
  let promoDate = date;
  const timerBlock = document.querySelectorAll(".timer__block span");

  const timer = setInterval(() => {
    let promoTimeLeft = getTimeLeft(promoDate);
    // console.log(promoTimeLeft);
    if (promoTimeLeft) {
      setTimeToPromoBlock(promoTimeLeft);
    }
  }, 1000);

  function getTimeLeft(promoDate) {

 
    let diff = Date.parse(promoDate) - Date.parse(new Date());
    // console.log(diff);
    if (diff <= 0) {
      clearInterval(timer);
      return;
    }

    let secsLeft = Math.floor((diff / 1000) % 60);
    let minsLeft = Math.floor((diff / 1000 / 60) % 60);
    let hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
    let daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24)) % 60;

    // console.log(secsLeft);
    // console.log(minsLeft);
    // console.log(hoursLeft);
    // console.log(daysLeft);

    return {
      // 'total': diff,
      days: daysLeft,
      hours: hoursLeft,
      minutes: minsLeft,
      seconds: secsLeft,
    };
  }

  //const timerId = setInterval('');
  //console.log(timerBlock);

  function setTimeToPromoBlock(time) {
    timerBlock.forEach((item, i) => {
      item.innerHTML = ("0" + time[item.id]).slice(-2);
      //console.log();
      // console.log(timeList[days]);
    });
  }
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (promo);


/***/ }),

/***/ "./js/services/services.js":
/*!*********************************!*\
  !*** ./js/services/services.js ***!
  \*********************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "getJsonFromUrl": () => (/* binding */ getJsonFromUrl)
/* harmony export */ });
async function getJsonFromUrl(url) {
  // Get запрос на сервер и получение данный в виде JSON

  let response = await fetch(url);

  return await response.json();
  
}




/***/ }),

/***/ "./js/slider.js":
/*!**********************!*\
  !*** ./js/slider.js ***!
  \**********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
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

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/tabs.js":
/*!********************!*\
  !*** ./js/tabs.js ***!
  \********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs(tabSelector, itemSelector, contentSelector, activeClass) {
  // Переменный с элементами Верхнего банера страницы
  const tabs = document.querySelector(tabSelector),
    // Меню
    tabItems = document.querySelectorAll(itemSelector),
    // Банер
    tabContent = document.querySelectorAll(contentSelector);

  // Скрыть все баннеры вверху
  function hideAllTabs() {
    tabContent.forEach((element) => {
      element.style.display = "none";
    });
  }
  // Убрать активный класс из списка
  function removeAllActiveClass() {
    tabItems.forEach((element) => {
      element.classList.remove(activeClass);
    });
  }

  hideAllTabs();
  tabContent[0].style.display = "block";
  //removeAllActiveClass();

  // Отобразить  по индексу
  function showTab(i = 0) {
    //console.log(tabContent[i]);
    tabContent[i].style.display = "block";
  }

  tabs.addEventListener("click", (e) => {
    const event = e.target;
    if (event && event.classList.contains(itemSelector.slice(1))) {
      hideAllTabs();
      removeAllActiveClass();
      tabItems.forEach((item, i) => {1
        if (event == item) {
          console.log(i);
          showTab(i);
        }
      });

      event.classList.toggle(activeClass);
    }
  });
}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);


/***/ }),

/***/ "./js/touchUs.js":
/*!***********************!*\
  !*** ./js/touchUs.js ***!
  \***********************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function touchUs() {

  const forms = document.querySelectorAll("form");

  // Кнопка Связаться с нами
  const submitBtn = document.querySelectorAll("[data-submit]"),
    // Модальное окно
    modal = document.querySelector(".modal"),
    // Кнопка закрыть модальное окно
    closeModalBtn = document.querySelector("[data-modal]");

  // Закрыть модальное окно
  function closeModal() {
    modal.style.display = "none";
    document.body.style.overflow = "auto";
  }

  modal.addEventListener("click", (event) => {
    const e = event.target;
    if (e === modal) {
      closeModal();
    }
  });

  submitBtn.forEach((btn) => {
    btn.addEventListener("click", () => {
      modal.style.display = "block";
      document.body.style.overflow = "hidden";
    });
  });

  closeModalBtn.addEventListener("click", closeModal);

  document.addEventListener("keydown", (event) => {
    if (event.code == "Escape" && modal.style.display == "block") {
      closeModal();
    }
  });

  forms.forEach((form) => {
    prepairData(form);
  });

  // Отправка данных
  async function postData(url, obj) {
    const postData = await fetch("http://localhost:3000/requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json;charset=utf-8",
      },
      body: obj,
    });

    if (!postData.ok) {
      alert("Ошибка HTTP: " + postData.status);
    }

    return await postData.json();
  }

  // Формирование данных и отправка
  function prepairData(form) {
    form.addEventListener("submit", (event) => {
      event.preventDefault();

      const formData = new FormData(form);
      let json = JSON.stringify(Object.fromEntries(formData.entries()));

      postData("http://localhost:3000/requests", json);
    });
  }

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (touchUs);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!*********************!*\
  !*** ./js/index.js ***!
  \*********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _slider__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./slider */ "./js/slider.js");
/* harmony import */ var _cal__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./cal */ "./js/cal.js");
/* harmony import */ var _touchUs__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./touchUs */ "./js/touchUs.js");
/* harmony import */ var _cards__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./cards */ "./js/cards.js");
/* harmony import */ var _promo__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./promo */ "./js/promo.js");
/* harmony import */ var _tabs__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./tabs */ "./js/tabs.js");







document.addEventListener("DOMContentLoaded", () => {
  (0,_slider__WEBPACK_IMPORTED_MODULE_0__["default"])();
  (0,_touchUs__WEBPACK_IMPORTED_MODULE_2__["default"])();
  (0,_promo__WEBPACK_IMPORTED_MODULE_4__["default"])('2022-06-30');
  (0,_tabs__WEBPACK_IMPORTED_MODULE_5__["default"])(".tabheader__items", ".tabheader__item", ".tabcontent", "tabheader__item_active");
  (0,_cards__WEBPACK_IMPORTED_MODULE_3__["default"])();
  (0,_cal__WEBPACK_IMPORTED_MODULE_1__["default"])();
});

})();

/******/ })()
;
//# sourceMappingURL=main.js.map