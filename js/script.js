document.addEventListener("DOMContentLoaded", () => {
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

  // new Cards('img/tabs/vegy.jpg', 'vegy', 'Фитнес', 'description', 123, '.menu .container');
  // new Cards('img/tabs/vegy.jpg', 'vegy', 'Фитнес1', 'description', 123, '.menu .container');

  // Переменный с элементами Верхнего банера страницы
  const tabs = document.querySelector(".tabheader__items"),
    // Меню
    tabItems = document.querySelectorAll(".tabheader__item"),
    // Банер
    tabContent = document.querySelectorAll(".tabcontent"),
    // Кнопка Связаться с нами
    submitBtn = document.querySelectorAll("[data-submit]");
  // Модальное окно
  modal = document.querySelector(".modal");
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

  // Скрыть все баннеры вверху
  function hideAllTabs() {
    tabContent.forEach((element) => {
      element.style.display = "none";
    });
  }
  // Убрать активный класс из списка
  function removeAllActiveClass() {
    tabItems.forEach((element) => {
      element.classList.remove("tabheader__item_active");
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
    if (event && event.classList.contains("tabheader__item")) {
      hideAllTabs();
      removeAllActiveClass();
      tabItems.forEach((item, i) => {
        if (event == item) {
          //console.log(i);
          showTab(i);
        }
      });

      event.classList.toggle("tabheader__item_active");
    }
  });

  function getTimeLeft(endtime) {
    let endt = endtime;
    let nowTime = new Date();

    let diff = endt - nowTime;

    if (diff <= 0) {
      clearInterval(timer);
      return;
    }

    secsLeft = Math.floor((diff / 1000) % 60);
    minsLeft = Math.floor((diff / 1000 / 60) % 60);
    hoursLeft = Math.floor((diff / (1000 * 60 * 60)) % 24);
    daysLeft = Math.floor(diff / (1000 * 60 * 60 * 24)) % 60;

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

  let promoDate = new Date(2022, 10, 13, 17, 25, 0);

  const timerBlock = document.querySelectorAll(".timer__block span");
  //const timerId = setInterval('');
  //console.log(timerBlock);

  function setTimeToPromoBlock(timeList) {
    timerBlock.forEach((item, i) => {
      item.innerHTML = ("0" + timeList[item.id]).slice(-2);
      //console.log();
      // console.log(timeList[days]);
    });
  }

  const timer = setInterval(() => {
    let promoTimeLeft = getTimeLeft(promoDate);
    // console.log(promoTimeLeft);
    if (promoTimeLeft) {
      setTimeToPromoBlock(promoTimeLeft);
    }
  }, 1000);

  // Get запрос на сервер и получение данный в виде JSON
  fetch("http://localhost:3000/menu")
    .then((response) => response.json())
    .then((json) => renderData(json));

  // Отобразить данные на странице
  function renderData(jsonData) {
    jsonData.forEach(({ img, imgalt, title, description, price }) => {
      new Cards(img, imgalt, title, description, price, ".menu .container");
    });
  }

  const forms = document.querySelectorAll("form");

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

  // Слайд
  const next = document.querySelector(".offer__slider-next");
  const prev = document.querySelector(".offer__slider-prev");
  const currentSlideTitle = document.querySelector(".offer__slider-counter #current");
  const sliderWrapper = document.querySelector(".offer__slider-wrapper");


  const slides = [
    { src: "pepper.jpg", alt: "pepper" },
    { src: "food-12.jpg", alt: "food" },
    { src: "olive-oil.jpg", alt: "oil" },
    { src: "paprika.jpg", alt: "paprika" },
  ];
  
  const numItems = slides.length - 1;
  let currentSlide = 0;
  
  function imgElement(numOfSlide) {
    const element = document.createElement("div");
    element.classList.add("offer__slide");
    element.innerHTML = `<img src=\"img/slider/${slides[numOfSlide].src}\" alt=\"${slides[numOfSlide].alt}\" </img>`;
    return element;
  }

  function changeImage(opt) {
    const slide = document.querySelector(".offer__slide");
    currentSlide += opt;
    
    slide.remove();

    if (currentSlide < 0) {
      currentSlide = numItems;
    }
    if (currentSlide > numItems) {
      currentSlide = 0;
    }

    if (currentSlide > 9) {
      currentSlideTitle.innerHTML = currentSlide + 1;
    } else {
      currentSlideTitle.innerHTML = `0${currentSlide + 1}`;
    }
    

    sliderWrapper.append(imgElement(currentSlide));
  }

  next.addEventListener("click", () => {
    changeImage(1);
  });
  prev.addEventListener("click", () => {
    changeImage(-1);
  });

});
